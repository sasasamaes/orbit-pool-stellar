#![cfg(test)]

use super::*;
use soroban_sdk::{testutils::Address as _, Address, Env, String};

#[test]
fn test_create_group() {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register(CommunityWalletContract, ());
    let client = CommunityWalletContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let group_id = String::from_str(&env, "test_group_1");
    let group_name = String::from_str(&env, "Test Savings Group");

    // Create group with auto-invest enabled
    client.create_group(&creator, &group_id, &group_name, &true);

    // Check group was created
    let group = client.get_group(&group_id);
    assert!(group.is_some());
    
    let group_data = group.unwrap();
    assert_eq!(group_data.id, group_id);
    assert_eq!(group_data.name, group_name);
    assert_eq!(group_data.creator, creator);
    assert_eq!(group_data.total_balance, 0);
    assert_eq!(group_data.total_yield, 0);
    assert!(group_data.auto_invest_enabled);
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
    env.mock_all_auths();
    let contract_id = env.register(CommunityWalletContract, ());
    let client = CommunityWalletContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let member = Address::generate(&env);
    let group_id = String::from_str(&env, "test_group_2");
    let group_name = String::from_str(&env, "Test Join Group");

    // Create group first with auto-invest disabled
    client.create_group(&creator, &group_id, &group_name, &false);

    // Join group
    client.join_group(&member, &group_id);

    // Check member balance
    let balance = client.get_member_balance(&group_id, &member);
    assert_eq!(balance, 0);

    // Check member is not admin
    assert!(!client.is_group_admin(&group_id, &member));

    // Check group members
    let members = client.get_group_members(&group_id);
    assert_eq!(members.len(), 2);
    assert!(members.contains(&creator));
    assert!(members.contains(&member));

    // Check user groups for new member
    let user_groups = client.get_user_groups(&member);
    assert_eq!(user_groups.len(), 1);
    assert_eq!(user_groups.get(0).unwrap(), group_id);
}

#[test]
fn test_basic_functionality() {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register(CommunityWalletContract, ());
    let client = CommunityWalletContractClient::new(&env, &contract_id);

    let user = Address::generate(&env);
    
    // Create multiple groups
    let group_ids = ["group1", "group2", "group3"];
    for group_id_str in group_ids.iter() {
        let group_id = String::from_str(&env, group_id_str);
        let group_name = String::from_str(&env, "Group");
        client.create_group(&user, &group_id, &group_name, &true);
    }

    // Check user has 3 groups
    let user_groups = client.get_user_groups(&user);
    assert_eq!(user_groups.len(), 3);

    // Check total group count
    assert_eq!(client.get_group_count(), 3);
}

#[test]
fn test_blend_integration() {
    let env = Env::default();
    env.mock_all_auths();
    let contract_id = env.register(CommunityWalletContract, ());
    let client = CommunityWalletContractClient::new(&env, &contract_id);

    let creator = Address::generate(&env);
    let blend_pool = Address::generate(&env);
    let group_id = String::from_str(&env, "test_blend_group");
    let group_name = String::from_str(&env, "Blend Test Group");

    // Create group with auto-invest enabled
    client.create_group(&creator, &group_id, &group_name, &true);

    // Set Blend pool address
    client.set_blend_pool(&creator, &blend_pool);

    // Check Blend pool was set
    let retrieved_pool = client.get_blend_pool();
    assert!(retrieved_pool.is_some());
    assert_eq!(retrieved_pool.unwrap(), blend_pool);

    // Check auto-invest is enabled
    assert!(client.is_auto_invest_enabled(&group_id));

    // Check initial yield is zero
    assert_eq!(client.get_group_yield(&group_id), 0);
}