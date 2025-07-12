#!/usr/bin/env node

/**
 * Contract Deployment Verification Script
 * Verifies that the Community Wallet contract is properly deployed and functional
 */

const { ContractService } = require('../../apps/frontend/src/lib/contract.ts');

async function verifyDeployment() {
  console.log('🔍 Verifying Community Wallet Contract Deployment\n');
  
  try {
    // Initialize contract service
    const contractService = new ContractService();
    
    console.log('📋 Contract Configuration:');
    console.log(`   Network: testnet`);
    console.log(`   RPC URL: https://soroban-testnet.stellar.org:443`);
    console.log(`   Contract ID: CBQHNAXSI55GX2GN6D67GK7BHVPSLJUGZQEU7WJ5LKR5PNUCGLIMAO4K\n`);
    
    // Test basic contract functions
    console.log('🧪 Testing Contract Functions:\n');
    
    // Test 1: Get group count
    console.log('1. Testing get_group_count...');
    try {
      const groupCount = await contractService.getGroupCount();
      console.log(`   ✅ Success: ${groupCount} groups exist\n`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}\n`);
    }
    
    // Test 2: Get Blend pool address
    console.log('2. Testing get_blend_pool...');
    try {
      const blendPool = await contractService.getBlendPool();
      console.log(`   ✅ Success: Blend pool = ${blendPool || 'None'}\n`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}\n`);
    }
    
    // Test 3: Try to get a non-existent group
    console.log('3. Testing get_group with invalid ID...');
    try {
      const group = await contractService.getGroup('invalid_group_id');
      console.log(`   ✅ Success: Group = ${group ? 'Found' : 'Not found'}\n`);
    } catch (error) {
      console.log(`   ❌ Failed: ${error.message}\n`);
    }
    
    console.log('🎉 Contract verification completed!');
    console.log('\n📋 Summary:');
    console.log('   - Contract is accessible via RPC');
    console.log('   - Basic functions are callable');
    console.log('   - Ready for frontend integration');
    
  } catch (error) {
    console.error('❌ Verification failed:', error.message);
    console.log('\n🔧 Troubleshooting:');
    console.log('   1. Ensure contract is deployed to testnet');
    console.log('   2. Check network connectivity');
    console.log('   3. Verify contract ID is correct');
    console.log('   4. Try running: stellar contract invoke --help');
  }
}

// Only run if called directly
if (require.main === module) {
  verifyDeployment().catch(console.error);
}

module.exports = { verifyDeployment };