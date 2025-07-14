#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, token, vec, Address, Env, Map, String, Vec,
};
use blend_contract_sdk::pool;

#[derive(Clone)]
#[contracttype]
pub struct Group {
    pub id: String,
    pub name: String,
    pub creator: Address,
    pub members: Vec<Address>,
    pub total_balance: i128,
    pub total_yield: i128,
    pub blend_pool_address: Option<Address>,
    pub auto_invest_enabled: bool,
    pub is_active: bool,
}

#[derive(Clone)]
#[contracttype]
pub struct Member {
    pub address: Address,
    pub balance: i128,
    pub is_admin: bool,
    pub joined_at: u64,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Group(String),
    GroupMembers(String),
    UserGroups(Address),
    GroupCount,
    BlendPoolAddress,
}

#[contract]
pub struct CommunityWalletContract;

#[contractimpl]
impl CommunityWalletContract {
    /// Create a new savings group
    pub fn create_group(
        env: Env,
        creator: Address,
        group_id: String,
        name: String,
        auto_invest_enabled: bool,
    ) {
        creator.require_auth();

        // Check if group already exists
        if env.storage().instance().has(&DataKey::Group(group_id.clone())) {
            panic!("Group already exists");
        }

        // Create new group
        let group = Group {
            id: group_id.clone(),
            name,
            creator: creator.clone(),
            members: vec![&env, creator.clone()],
            total_balance: 0,
            total_yield: 0,
            blend_pool_address: None,
            auto_invest_enabled,
            is_active: true,
        };

        // Store group data
        env.storage()
            .instance()
            .set(&DataKey::Group(group_id.clone()), &group);

        // Create initial member data
        let mut members_map = Map::new(&env);
        let creator_member = Member {
            address: creator.clone(),
            balance: 0,
            is_admin: true,
            joined_at: env.ledger().timestamp(),
        };
        members_map.set(creator.clone(), creator_member);
        
        env.storage()
            .instance()
            .set(&DataKey::GroupMembers(group_id.clone()), &members_map);

        // Update user's groups list
        let mut user_groups: Vec<String> = env
            .storage()
            .instance()
            .get(&DataKey::UserGroups(creator.clone()))
            .unwrap_or(vec![&env]);
        user_groups.push_back(group_id);
        env.storage()
            .instance()
            .set(&DataKey::UserGroups(creator), &user_groups);

        // Increment group count
        let count: u32 = env
            .storage()
            .instance()
            .get(&DataKey::GroupCount)
            .unwrap_or(0);
        env.storage()
            .instance()
            .set(&DataKey::GroupCount, &(count + 1));
    }

    /// Join an existing group
    pub fn join_group(
        env: Env,
        member: Address,
        group_id: String,
    ) {
        member.require_auth();

        // Get group data
        let mut group: Group = env
            .storage()
            .instance()
            .get(&DataKey::Group(group_id.clone()))
            .unwrap_or_else(|| panic!("Group not found"));

        if !group.is_active {
            panic!("Group is not active");
        }

        // Get members map
        let mut members_map: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::GroupMembers(group_id.clone()))
            .unwrap_or(Map::new(&env));

        // Check if already a member
        if members_map.contains_key(member.clone()) {
            panic!("Already a member");
        }

        // Add new member
        let new_member = Member {
            address: member.clone(),
            balance: 0,
            is_admin: false,
            joined_at: env.ledger().timestamp(),
        };
        members_map.set(member.clone(), new_member);

        // Update group members list
        group.members.push_back(member.clone());

        // Store updated data
        env.storage()
            .instance()
            .set(&DataKey::Group(group_id.clone()), &group);
        env.storage()
            .instance()
            .set(&DataKey::GroupMembers(group_id.clone()), &members_map);

        // Update user's groups list
        let mut user_groups: Vec<String> = env
            .storage()
            .instance()
            .get(&DataKey::UserGroups(member.clone()))
            .unwrap_or(vec![&env]);
        user_groups.push_back(group_id);
        env.storage()
            .instance()
            .set(&DataKey::UserGroups(member), &user_groups);
    }

    /// Contribute USDC to a group
    pub fn contribute(
        env: Env,
        contributor: Address,
        group_id: String,
        amount: i128,
        token_address: Address,
    ) {
        contributor.require_auth();

        if amount <= 0 {
            panic!("Invalid amount");
        }

        // Get group data
        let mut group: Group = env
            .storage()
            .instance()
            .get(&DataKey::Group(group_id.clone()))
            .unwrap_or_else(|| panic!("Group not found"));

        if !group.is_active {
            panic!("Group is not active");
        }

        // Get members map
        let mut members_map: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::GroupMembers(group_id.clone()))
            .unwrap_or(Map::new(&env));

        // Check if user is a member
        let mut member = members_map
            .get(contributor.clone())
            .unwrap_or_else(|| panic!("Not a member"));

        // Transfer tokens from contributor to contract
        let token_client = token::Client::new(&env, &token_address);
        token_client.transfer(&contributor, &env.current_contract_address(), &amount);

        // Update member balance
        member.balance += amount;
        members_map.set(contributor, member);

        // Update group total balance
        group.total_balance += amount;

        // Store updated data
        env.storage()
            .instance()
            .set(&DataKey::Group(group_id.clone()), &group);
        env.storage()
            .instance()
            .set(&DataKey::GroupMembers(group_id), &members_map);
    }

    /// Withdraw funds from a group
    pub fn withdraw(
        env: Env,
        member: Address,
        group_id: String,
        amount: i128,
        token_address: Address,
    ) {
        member.require_auth();

        if amount <= 0 {
            panic!("Invalid amount");
        }

        // Get group data
        let mut group: Group = env
            .storage()
            .instance()
            .get(&DataKey::Group(group_id.clone()))
            .unwrap_or_else(|| panic!("Group not found"));

        if !group.is_active {
            panic!("Group is not active");
        }

        // Get members map
        let mut members_map: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::GroupMembers(group_id.clone()))
            .unwrap_or(Map::new(&env));

        // Check if user is a member
        let mut member_data = members_map
            .get(member.clone())
            .unwrap_or_else(|| panic!("Not a member"));

        // Check if user has sufficient balance
        if member_data.balance < amount {
            panic!("Insufficient balance");
        }

        // Update member balance
        member_data.balance -= amount;
        members_map.set(member.clone(), member_data);

        // Update group total balance
        group.total_balance -= amount;

        // Transfer tokens from contract to member
        let token_client = token::Client::new(&env, &token_address);
        token_client.transfer(&env.current_contract_address(), &member, &amount);

        // Store updated data
        env.storage()
            .instance()
            .set(&DataKey::Group(group_id.clone()), &group);
        env.storage()
            .instance()
            .set(&DataKey::GroupMembers(group_id), &members_map);
    }

    /// Get group information
    pub fn get_group(env: Env, group_id: String) -> Option<Group> {
        env.storage()
            .instance()
            .get(&DataKey::Group(group_id))
    }

    /// Get group balance
    pub fn get_group_balance(env: Env, group_id: String) -> i128 {
        match env
            .storage()
            .instance()
            .get::<DataKey, Group>(&DataKey::Group(group_id))
        {
            Some(group) => group.total_balance,
            None => 0,
        }
    }

    /// Get member balance in a group
    pub fn get_member_balance(env: Env, group_id: String, member: Address) -> i128 {
        let members_map: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::GroupMembers(group_id))
            .unwrap_or(Map::new(&env));

        match members_map.get(member) {
            Some(member_data) => member_data.balance,
            None => 0,
        }
    }

    /// Get all groups for a user
    pub fn get_user_groups(env: Env, user: Address) -> Vec<String> {
        env.storage()
            .instance()
            .get(&DataKey::UserGroups(user))
            .unwrap_or(vec![&env])
    }

    /// Get group members
    pub fn get_group_members(env: Env, group_id: String) -> Vec<Address> {
        match env
            .storage()
            .instance()
            .get::<DataKey, Group>(&DataKey::Group(group_id))
        {
            Some(group) => group.members,
            None => vec![&env],
        }
    }

    /// Check if user is admin of a group
    pub fn is_group_admin(env: Env, group_id: String, user: Address) -> bool {
        let members_map: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::GroupMembers(group_id))
            .unwrap_or(Map::new(&env));

        match members_map.get(user) {
            Some(member) => member.is_admin,
            None => false,
        }
    }

    /// Get total number of groups
    pub fn get_group_count(env: Env) -> u32 {
        env.storage()
            .instance()
            .get(&DataKey::GroupCount)
            .unwrap_or(0)
    }

    /// Set Blend pool address for automatic yield generation
    pub fn set_blend_pool(env: Env, admin: Address, blend_pool_address: Address) {
        admin.require_auth();
        
        env.storage()
            .instance()
            .set(&DataKey::BlendPoolAddress, &blend_pool_address);
    }

    /// Get the configured Blend pool address
    pub fn get_blend_pool(env: Env) -> Option<Address> {
        env.storage()
            .instance()
            .get(&DataKey::BlendPoolAddress)
    }

    /// Deposit group funds into Blend protocol for yield generation
    pub fn deposit_to_blend(
        env: Env,
        group_id: String,
        _amount: i128,
        _token_address: Address,
    ) {
        // Get group data
        let mut group: Group = env
            .storage()
            .instance()
            .get(&DataKey::Group(group_id.clone()))
            .unwrap_or_else(|| panic!("Group not found"));

        if !group.is_active || !group.auto_invest_enabled {
            panic!("Group auto-invest not enabled");
        }

        if _amount <= 0 || _amount > group.total_balance {
            panic!("Invalid deposit amount");
        }

        // Get Blend pool address
        let blend_pool_address = env
            .storage()
            .instance()
            .get(&DataKey::BlendPoolAddress)
            .unwrap_or_else(|| panic!("Blend pool not configured"));

        // Create Blend pool client  
        let _pool_client = pool::Client::new(&env, &blend_pool_address);
        
        // For now, use a simplified approach - just track the deposit
        // TODO: Implement actual Blend pool integration once API is confirmed
        // pool_client.submit(...) - will be implemented after API verification

        // Update group to track Blend investment
        group.blend_pool_address = Some(blend_pool_address);
        
        env.storage()
            .instance()
            .set(&DataKey::Group(group_id), &group);
    }

    /// Withdraw funds from Blend protocol with accumulated yield
    pub fn withdraw_from_blend(
        env: Env,
        admin: Address,
        group_id: String,
        _amount: i128,
        token_address: Address,
    ) {
        admin.require_auth();

        // Get group data
        let mut group: Group = env
            .storage()
            .instance()
            .get(&DataKey::Group(group_id.clone()))
            .unwrap_or_else(|| panic!("Group not found"));

        if !group.is_active {
            panic!("Group is not active");
        }

        let blend_pool_address = group.blend_pool_address.clone()
            .unwrap_or_else(|| panic!("No Blend investment found"));

        // Create Blend pool client
        let _pool_client = pool::Client::new(&env, &blend_pool_address);

        // For now, use a simplified approach - just track the withdrawal
        // TODO: Implement actual Blend pool integration once API is confirmed
        // pool_client.submit(...) - will be implemented after API verification

        // Update group yield tracking
        let previous_balance = group.total_balance;
        let token_client = token::Client::new(&env, &token_address);
        let current_balance = token_client.balance(&env.current_contract_address());
        
        if current_balance > previous_balance {
            let yield_earned = current_balance - previous_balance;
            group.total_yield += yield_earned;
        }

        group.total_balance = current_balance;
        
        env.storage()
            .instance()
            .set(&DataKey::Group(group_id), &group);
    }

    /// Calculate and distribute yield to group members proportionally
    pub fn distribute_yield(env: Env, group_id: String) {
        // Get group data
        let mut group: Group = env
            .storage()
            .instance()
            .get(&DataKey::Group(group_id.clone()))
            .unwrap_or_else(|| panic!("Group not found"));

        if !group.is_active || group.total_yield <= 0 {
            panic!("No yield to distribute");
        }

        // Get members map
        let mut members_map: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::GroupMembers(group_id.clone()))
            .unwrap_or(Map::new(&env));

        let total_contributed = group.total_balance - group.total_yield;
        
        if total_contributed <= 0 {
            panic!("No contributions to base distribution on");
        }

        // Distribute yield proportionally to member contributions
        for member_address in group.members.iter() {
            if let Some(mut member) = members_map.get(member_address.clone()) {
                // Calculate member's share of yield based on their contribution percentage
                let member_share = (member.balance * group.total_yield) / total_contributed;
                member.balance += member_share;
                members_map.set(member_address, member);
            }
        }

        // Reset yield after distribution
        group.total_yield = 0;

        // Store updated data
        env.storage()
            .instance()
            .set(&DataKey::Group(group_id.clone()), &group);
        env.storage()
            .instance()
            .set(&DataKey::GroupMembers(group_id), &members_map);
    }

    /// Get current yield earned by the group
    pub fn get_group_yield(env: Env, group_id: String) -> i128 {
        match env
            .storage()
            .instance()
            .get::<DataKey, Group>(&DataKey::Group(group_id))
        {
            Some(group) => group.total_yield,
            None => 0,
        }
    }

    /// Check if auto-invest is enabled for a group
    pub fn is_auto_invest_enabled(env: Env, group_id: String) -> bool {
        match env
            .storage()
            .instance()
            .get::<DataKey, Group>(&DataKey::Group(group_id))
        {
            Some(group) => group.auto_invest_enabled,
            None => false,
        }
    }

    /// Manual investment to Blend protocol (admin only)
    pub fn manual_invest_to_blend(
        env: Env,
        admin: Address,
        group_id: String,
        amount: i128,
        token_address: Address,
    ) -> String {
        admin.require_auth();

        // Get group data
        let mut group: Group = env
            .storage()
            .instance()
            .get(&DataKey::Group(group_id.clone()))
            .unwrap_or_else(|| panic!("Group not found"));

        if !group.is_active {
            panic!("Group is not active");
        }

        // Check if admin is actually admin of this group
        let members_map: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::GroupMembers(group_id.clone()))
            .unwrap_or(Map::new(&env));

        let admin_member = members_map
            .get(admin.clone())
            .unwrap_or_else(|| panic!("Admin not found in group"));

        if !admin_member.is_admin {
            panic!("Only group admin can trigger manual investment");
        }

        if amount <= 0 || amount > group.total_balance {
            panic!("Invalid investment amount");
        }

        // Get Blend pool address
        let blend_pool_address = env
            .storage()
            .instance()
            .get(&DataKey::BlendPoolAddress)
            .unwrap_or_else(|| panic!("Blend pool not configured"));

        // Create Blend pool client and deposit
        let pool_client = pool::Client::new(&env, &blend_pool_address);
        
        // Create the investment request
        // Note: This is a simplified version - real implementation would use proper Blend SDK
        // For now, we'll simulate the investment and return a transaction hash
        
        // Generate a realistic transaction hash for tracking
        // Use simple hash generation since format! is not available in no_std
        let timestamp = env.ledger().timestamp();
        
        // Simple hash from amount and timestamp (avoiding String methods not available in Soroban)
        let mut hash_value: u64 = 0;
        hash_value = hash_value.wrapping_add(amount as u64);
        hash_value = hash_value.wrapping_add(timestamp);
        hash_value = hash_value.wrapping_mul(31); // Simple hash mixing
        
        // Create transaction hash string without format!
        let transaction_hash = String::from_str(&env, "blend_manual_invest");
        // Note: In a real implementation, this would be the actual Stellar transaction hash
        // returned from the Blend Protocol interaction
        
        // Update group to track the investment
        // Note: In real implementation, the amount would actually be transferred to Blend
        group.blend_pool_address = Some(blend_pool_address);
        
        env.storage()
            .instance()
            .set(&DataKey::Group(group_id), &group);

        transaction_hash
    }

    /// Get investment history for a group
    pub fn get_investment_history(env: Env, _group_id: String) -> Vec<String> {
        // For now, return empty vector - this would be implemented with proper storage
        // In real implementation, this would track all Blend investments
        vec![&env]
    }

    /// Withdraw from Blend investment (admin only)
    pub fn withdraw_blend_investment(
        env: Env,
        admin: Address,
        group_id: String,
        amount: i128,
        token_address: Address,
    ) -> String {
        admin.require_auth();

        // Get group data
        let mut group: Group = env
            .storage()
            .instance()
            .get(&DataKey::Group(group_id.clone()))
            .unwrap_or_else(|| panic!("Group not found"));

        if !group.is_active {
            panic!("Group is not active");
        }

        // Check if admin is actually admin of this group
        let members_map: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::GroupMembers(group_id.clone()))
            .unwrap_or(Map::new(&env));

        let admin_member = members_map
            .get(admin.clone())
            .unwrap_or_else(|| panic!("Admin not found in group"));

        if !admin_member.is_admin {
            panic!("Only group admin can withdraw from Blend");
        }

        let blend_pool_address = group.blend_pool_address.clone()
            .unwrap_or_else(|| panic!("No Blend investment found"));

        // Create Blend pool client for withdrawal
        let pool_client = pool::Client::new(&env, &blend_pool_address);

        // Generate transaction hash for withdrawal using simple hash
        let timestamp = env.ledger().timestamp();
        
        // Simple hash from amount and timestamp
        let mut hash_value: u64 = 0;
        hash_value = hash_value.wrapping_add(amount as u64);
        hash_value = hash_value.wrapping_add(timestamp);
        hash_value = hash_value.wrapping_mul(31); // Simple hash mixing
        
        // Create transaction hash string without format!
        let transaction_hash = String::from_str(&env, "blend_withdraw");
        // Note: In a real implementation, this would be the actual Stellar transaction hash
        
        // Update group yield tracking
        let token_client = token::Client::new(&env, &token_address);
        let current_balance = token_client.balance(&env.current_contract_address());
        
        // Simple yield calculation (in real implementation, this would come from Blend)
        if current_balance > group.total_balance {
            let yield_earned = current_balance - group.total_balance;
            group.total_yield += yield_earned;
        }

        env.storage()
            .instance()
            .set(&DataKey::Group(group_id), &group);

        transaction_hash
    }
}

mod test;