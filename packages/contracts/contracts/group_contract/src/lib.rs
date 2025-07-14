#![no_std]

use soroban_sdk::{
    contract, contractimpl, contracttype, token, vec, Address, Env, Map, String, Vec,
};

#[derive(Clone)]
#[contracttype]
pub struct GroupConfig {
    pub name: String,
    pub creator: Address,
    pub min_contribution: i128,
    pub max_contribution: i128,
    pub max_members: u32,
    pub auto_invest_enabled: bool,
    pub created_at: u64,
}

#[derive(Clone)]
#[contracttype]
pub struct Member {
    pub address: Address,
    pub balance: i128,
    pub total_contributed: i128,
    pub yield_earned: i128,
    pub is_admin: bool,
    pub joined_at: u64,
}

#[derive(Clone)]
#[contracttype]
pub struct ContributionRecord {
    pub contributor: Address,
    pub amount: i128,
    pub timestamp: u64,
    pub stellar_tx_id: String,
}

#[derive(Clone)]
#[contracttype]
pub enum DataKey {
    Config,
    Members,
    Member(Address),
    TotalBalance,
    TotalYield,
    ContributionHistory,
    IsActive,
    BlendPool,
}

#[contract]
pub struct GroupContract;

#[contractimpl]
impl GroupContract {
    /// Initialize the group contract (called once after deployment)
    pub fn initialize(
        env: Env,
        creator: Address,
        name: String,
        min_contribution: i128,
        max_contribution: i128,
        max_members: u32,
        auto_invest_enabled: bool,
    ) {
        creator.require_auth();

        // Ensure contract is not already initialized
        if env.storage().instance().has(&DataKey::Config) {
            panic!("Contract already initialized");
        }

        let config = GroupConfig {
            name,
            creator: creator.clone(),
            min_contribution,
            max_contribution,
            max_members,
            auto_invest_enabled,
            created_at: env.ledger().timestamp(),
        };

        // Store configuration
        env.storage().instance().set(&DataKey::Config, &config);
        env.storage().instance().set(&DataKey::TotalBalance, &0i128);
        env.storage().instance().set(&DataKey::TotalYield, &0i128);
        env.storage().instance().set(&DataKey::IsActive, &true);

        // Initialize members map and add creator as admin
        let mut members = Map::new(&env);
        let creator_member = Member {
            address: creator.clone(),
            balance: 0,
            total_contributed: 0,
            yield_earned: 0,
            is_admin: true,
            joined_at: env.ledger().timestamp(),
        };
        members.set(creator.clone(), creator_member);
        env.storage().instance().set(&DataKey::Members, &members);

        // Initialize contribution history
        let contribution_history: Vec<ContributionRecord> = vec![&env];
        env.storage().instance().set(&DataKey::ContributionHistory, &contribution_history);
    }

    /// Join the group
    pub fn join_group(env: Env, member: Address) {
        member.require_auth();

        let config: GroupConfig = env
            .storage()
            .instance()
            .get(&DataKey::Config)
            .unwrap_or_else(|| panic!("Group not initialized"));

        let is_active: bool = env
            .storage()
            .instance()
            .get(&DataKey::IsActive)
            .unwrap_or(false);

        if !is_active {
            panic!("Group is not active");
        }

        let mut members: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::Members)
            .unwrap_or(Map::new(&env));

        // Check if already a member
        if members.contains_key(member.clone()) {
            panic!("Already a member");
        }

        // Check max members limit
        if members.len() >= config.max_members {
            panic!("Group is full");
        }

        // Add new member
        let new_member = Member {
            address: member.clone(),
            balance: 0,
            total_contributed: 0,
            yield_earned: 0,
            is_admin: false,
            joined_at: env.ledger().timestamp(),
        };
        members.set(member, new_member);

        env.storage().instance().set(&DataKey::Members, &members);
    }

    /// Contribute USDC to the group
    pub fn contribute(
        env: Env,
        contributor: Address,
        amount: i128,
        token_address: Address,
        stellar_tx_id: String,
    ) {
        contributor.require_auth();

        if amount <= 0 {
            panic!("Invalid amount");
        }

        let config: GroupConfig = env
            .storage()
            .instance()
            .get(&DataKey::Config)
            .unwrap_or_else(|| panic!("Group not initialized"));

        let is_active: bool = env
            .storage()
            .instance()
            .get(&DataKey::IsActive)
            .unwrap_or(false);

        if !is_active {
            panic!("Group is not active");
        }

        // Validate contribution amount
        if amount < config.min_contribution || amount > config.max_contribution {
            panic!("Contribution amount out of allowed range");
        }

        let mut members: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::Members)
            .unwrap_or(Map::new(&env));

        // Check if user is a member
        let mut member = members
            .get(contributor.clone())
            .unwrap_or_else(|| panic!("Not a member"));

        // Transfer tokens from contributor to contract
        let token_client = token::Client::new(&env, &token_address);
        token_client.transfer(&contributor, &env.current_contract_address(), &amount);

        // Update member balance
        member.balance += amount;
        member.total_contributed += amount;
        members.set(contributor.clone(), member);

        // Update total balance
        let mut total_balance: i128 = env
            .storage()
            .instance()
            .get(&DataKey::TotalBalance)
            .unwrap_or(0);
        total_balance += amount;
        env.storage().instance().set(&DataKey::TotalBalance, &total_balance);

        // Record contribution
        let mut contribution_history: Vec<ContributionRecord> = env
            .storage()
            .instance()
            .get(&DataKey::ContributionHistory)
            .unwrap_or(vec![&env]);

        let contribution_record = ContributionRecord {
            contributor: contributor.clone(),
            amount,
            timestamp: env.ledger().timestamp(),
            stellar_tx_id,
        };
        contribution_history.push_back(contribution_record);

        // Store updated data
        env.storage().instance().set(&DataKey::Members, &members);
        env.storage().instance().set(&DataKey::ContributionHistory, &contribution_history);

        // Auto-invest if enabled (TODO: Implement Blend integration)
        if config.auto_invest_enabled {
            Self::auto_invest_to_blend(env.clone(), amount, token_address);
        }
    }

    /// Withdraw funds from the group
    pub fn withdraw(
        env: Env,
        member: Address,
        amount: i128,
        token_address: Address,
    ) {
        member.require_auth();

        if amount <= 0 {
            panic!("Invalid amount");
        }

        let is_active: bool = env
            .storage()
            .instance()
            .get(&DataKey::IsActive)
            .unwrap_or(false);

        if !is_active {
            panic!("Group is not active");
        }

        let mut members: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::Members)
            .unwrap_or(Map::new(&env));

        let mut member_data = members
            .get(member.clone())
            .unwrap_or_else(|| panic!("Not a member"));

        // Check if user has sufficient balance
        if member_data.balance < amount {
            panic!("Insufficient balance");
        }

        // Update member balance
        member_data.balance -= amount;
        members.set(member.clone(), member_data);

        // Update total balance
        let mut total_balance: i128 = env
            .storage()
            .instance()
            .get(&DataKey::TotalBalance)
            .unwrap_or(0);
        total_balance -= amount;
        env.storage().instance().set(&DataKey::TotalBalance, &total_balance);

        // Transfer tokens from contract to member
        let token_client = token::Client::new(&env, &token_address);
        token_client.transfer(&env.current_contract_address(), &member, &amount);

        env.storage().instance().set(&DataKey::Members, &members);
    }

    /// Get group configuration
    pub fn get_config(env: Env) -> GroupConfig {
        env.storage()
            .instance()
            .get(&DataKey::Config)
            .unwrap_or_else(|| panic!("Group not initialized"))
    }

    /// Get group total balance
    pub fn get_total_balance(env: Env) -> i128 {
        env.storage()
            .instance()
            .get(&DataKey::TotalBalance)
            .unwrap_or(0)
    }

    /// Get member information
    pub fn get_member(env: Env, member_address: Address) -> Option<Member> {
        let members: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::Members)
            .unwrap_or(Map::new(&env));
        
        members.get(member_address)
    }

    /// Get all members
    pub fn get_all_members(env: Env) -> Map<Address, Member> {
        env.storage()
            .instance()
            .get(&DataKey::Members)
            .unwrap_or(Map::new(&env))
    }

    /// Get contribution history
    pub fn get_contribution_history(env: Env) -> Vec<ContributionRecord> {
        env.storage()
            .instance()
            .get(&DataKey::ContributionHistory)
            .unwrap_or(vec![&env])
    }

    /// Check if user is admin
    pub fn is_admin(env: Env, user: Address) -> bool {
        let members: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::Members)
            .unwrap_or(Map::new(&env));
        
        if let Some(member) = members.get(user) {
            member.is_admin
        } else {
            false
        }
    }

    /// Get member count
    pub fn get_member_count(env: Env) -> u32 {
        let members: Map<Address, Member> = env
            .storage()
            .instance()
            .get(&DataKey::Members)
            .unwrap_or(Map::new(&env));
        
        members.len()
    }

    /// Emergency: Deactivate group (admin only)
    pub fn deactivate_group(env: Env, admin: Address) {
        admin.require_auth();

        if !Self::is_admin(env.clone(), admin) {
            panic!("Only admin can deactivate group");
        }

        env.storage().instance().set(&DataKey::IsActive, &false);
    }

    // Private helper for auto-investing (placeholder for Blend integration)
    fn auto_invest_to_blend(env: Env, amount: i128, _token_address: Address) {
        // TODO: Implement actual Blend Protocol integration
        // For now, just track that auto-invest was triggered
        let _current_time = env.ledger().timestamp();
        
        // This would call Blend Protocol smart contracts to invest the amount
        // blend_client.deposit(amount, token_address);
        
        // Update yield tracking when implemented
    }

    /// Set Blend pool for yield generation (admin only)
    pub fn set_blend_pool(env: Env, admin: Address, blend_pool_address: Address) {
        admin.require_auth();

        if !Self::is_admin(env.clone(), admin) {
            panic!("Only admin can set Blend pool");
        }

        env.storage()
            .instance()
            .set(&DataKey::BlendPool, &blend_pool_address);
    }

    /// Get current Blend pool address
    pub fn get_blend_pool(env: Env) -> Option<Address> {
        env.storage()
            .instance()
            .get(&DataKey::BlendPool)
    }
} 