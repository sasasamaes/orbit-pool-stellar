#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_create_group() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CommunityWalletContract);
    let client = CommunityWalletContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let group_id = String::from_str(&env, "test_group_1");
    let group_name = String::from_str(&env, "Test Savings Group");

    // Create group
    let result = client.create_group(&creator, &group_id, &group_name);
    assert!(result.is_ok());

    // Check group was created
    let group = client.get_group(&group_id);
    assert!(group.is_some());
    
    let group_data = group.unwrap();
    assert_eq!(group_data.id, group_id);
    assert_eq!(group_data.name, group_name);
    assert_eq!(group_data.creator, creator);
    assert_eq!(group_data.total_balance, 0);
    assert!(group_data.is_active);

    // Check creator is admin
    assert!(client.is_group_admin(&group_id, &creator));

    // Check group count
    assert_eq!(client.get_group_count(), 1);

    // Check user groups
    let user_groups = client.get_user_groups(&creator);
    assert_eq!(user_groups.len(), 1);
    assert_eq!(user_groups.get(0).unwrap(), group_id);
}

#[test]
fn test_join_group() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CommunityWalletContract);
    let client = CommunityWalletContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let member = Address::generate(&env);
    let group_id = String::from_str(&env, "test_group_2");
    let group_name = String::from_str(&env, "Test Join Group");

    // Create group first
    client.create_group(&creator, &group_id, &group_name).unwrap();

    // Join group
    let result = client.join_group(&member, &group_id);
    assert!(result.is_ok());

    // Check member balance
    let balance = client.get_member_balance(&group_id, &member);
    assert_eq!(balance, 0);

    // Check member is not admin
    assert!(!client.is_group_admin(&group_id, &member));

    // Check group members
    let members = client.get_group_members(&group_id);
    assert_eq!(members.len(), 2);
    assert!(members.contains(creator));
    assert!(members.contains(member));

    // Check user groups for new member
    let user_groups = client.get_user_groups(&member);
    assert_eq!(user_groups.len(), 1);
    assert_eq!(user_groups.get(0).unwrap(), group_id);
}

#[test]
fn test_contribute() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, CommunityWalletContract);
    let client = CommunityWalletContractClient::new(&env, &contract_id);

    // Create mock token
    let token_admin = Address::generate(&env);
    let token_id = env.register_stellar_asset_contract(token_admin.clone());
    let token_client = token::Client::new(&env, &token_id);

    let creator = Address::generate(&env);
    let group_id = String::from_str(&env, "test_group_3");
    let group_name = String::from_str(&env, "Test Contribute Group");
    let contribution_amount = 1000_0000000i128; // 1000 USDC (7 decimals)

    // Create group
    client.create_group(&creator, &group_id, &group_name).unwrap();

    // Mint tokens to creator
    token_client.mint(&creator, &(contribution_amount * 2));

    // Contribute to group
    let result = client.contribute(&creator, &group_id, &contribution_amount, &token_id);
    assert!(result.is_ok());

    // Check member balance
    let member_balance = client.get_member_balance(&group_id, &creator);
    assert_eq!(member_balance, contribution_amount);

    // Check group balance
    let group_balance = client.get_group_balance(&group_id);
    assert_eq!(group_balance, contribution_amount);

    // Check contract token balance
    let contract_balance = token_client.balance(&contract_id);
    assert_eq!(contract_balance, contribution_amount);
}

#[test]
fn test_withdraw() {
    let env = Env::default();
    env.mock_all_auths();

    let contract_id = env.register_contract(None, CommunityWalletContract);
    let client = CommunityWalletContractClient::new(&env, &contract_id);

    // Create mock token
    let token_admin = Address::generate(&env);
    let token_id = env.register_stellar_asset_contract(token_admin.clone());
    let token_client = token::Client::new(&env, &token_id);

    let creator = Address::generate(&env);
    let group_id = String::from_str(&env, "test_group_4");
    let group_name = String::from_str(&env, "Test Withdraw Group");
    let contribution_amount = 1000_0000000i128;
    let withdrawal_amount = 500_0000000i128;

    // Setup: create group and contribute
    client.create_group(&creator, &group_id, &group_name).unwrap();
    token_client.mint(&creator, &(contribution_amount * 2));
    client.contribute(&creator, &group_id, &contribution_amount, &token_id).unwrap();

    // Withdraw from group
    let result = client.withdraw(&creator, &group_id, &withdrawal_amount, &token_id);
    assert!(result.is_ok());

    // Check member balance after withdrawal
    let member_balance = client.get_member_balance(&group_id, &creator);
    assert_eq!(member_balance, contribution_amount - withdrawal_amount);

    // Check group balance after withdrawal
    let group_balance = client.get_group_balance(&group_id);
    assert_eq!(group_balance, contribution_amount - withdrawal_amount);

    // Check creator's token balance increased
    let creator_balance = token_client.balance(&creator);
    assert_eq!(creator_balance, contribution_amount + withdrawal_amount);
}

#[test]
fn test_multiple_groups() {
    let env = Env::default();
    let contract_id = env.register_contract(None, CommunityWalletContract);
    let client = CommunityWalletContractClient::new(&env, &contract_id);

    let user = Address::generate(&env);
    
    // Create multiple groups
    for i in 0..3 {
        let group_id = String::from_str(&env, &format!("group_{}", i));
        let group_name = String::from_str(&env, &format!("Group {}", i));
        client.create_group(&user, &group_id, &group_name).unwrap();
    }

    // Check user has 3 groups
    let user_groups = client.get_user_groups(&user);
    assert_eq!(user_groups.len(), 3);

    // Check total group count
    assert_eq!(client.get_group_count(), 3);
}