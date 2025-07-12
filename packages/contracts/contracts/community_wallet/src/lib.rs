#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, token, vec, Address, Env, Map, String, Vec,
};

#[derive(Clone)]
#[contracttype]
pub struct Group {
    pub id: String,
    pub name: String,
    pub creator: Address,
    pub members: Vec<Address>,
    pub total_balance: i128,
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
}

mod test;