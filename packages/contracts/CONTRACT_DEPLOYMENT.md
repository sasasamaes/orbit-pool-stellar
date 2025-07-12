# Community Wallet Smart Contract

This directory contains the Community Wallet smart contract built with Soroban for the Stellar network.

## Features

- **Group Management**: Create and manage savings groups
- **Member Management**: Join groups, track balances and contributions
- **Yield Integration**: Automated yield generation through Blend Protocol
- **Secure Transactions**: All operations secured by Stellar blockchain

## Contract Functions

### Group Operations
- `create_group(creator, group_id, name, auto_invest_enabled)` - Create a new savings group
- `join_group(member, group_id)` - Join an existing group
- `get_group(group_id)` - Get group information
- `get_group_count()` - Get total number of groups

### Financial Operations
- `contribute(contributor, group_id, amount, token_address)` - Contribute funds to a group
- `withdraw(member, group_id, amount, token_address)` - Withdraw funds from a group
- `get_group_balance(group_id)` - Get total group balance
- `get_member_balance(group_id, member)` - Get member's balance in a group

### Yield Management
- `set_blend_pool(admin, blend_pool_address)` - Configure Blend Protocol integration
- `get_blend_pool()` - Get current Blend pool address
- `deposit_to_blend(group_id, amount, token_address)` - Deposit funds for yield generation
- `withdraw_from_blend(admin, group_id, amount, token_address)` - Withdraw from Blend with yield
- `distribute_yield(group_id)` - Distribute accumulated yield to members
- `get_group_yield(group_id)` - Get group's accumulated yield
- `is_auto_invest_enabled(group_id)` - Check if auto-invest is enabled

### Member Management
- `get_user_groups(user)` - Get all groups a user belongs to
- `get_group_members(group_id)` - Get all members of a group
- `is_group_admin(group_id, user)` - Check if user is group admin

## Development Setup

### Prerequisites

1. **Rust Toolchain**:
   ```bash
   curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
   rustup target add wasm32-unknown-unknown
   ```

2. **Stellar CLI**:
   ```bash
   # Download and install stellar CLI
   curl -L https://github.com/stellar/stellar-cli/releases/download/v22.0.0/stellar-cli-22.0.0-x86_64-apple-darwin.tar.gz | tar -xz
   sudo mv stellar /usr/local/bin/
   ```

3. **Node.js** (for TypeScript bindings):
   ```bash
   npm install
   ```

### Building the Contract

```bash
# Build the contract
stellar contract build

# The compiled WASM will be in target/wasm32-unknown-unknown/release/
```

### Deployment

#### Automatic Deployment (Recommended)

```bash
# Run the deployment script
./deploy.sh

# This will:
# - Build the contract
# - Deploy to Stellar Testnet
# - Update TypeScript bindings
# - Create environment configuration
```

#### Manual Deployment

```bash
# 1. Create/fund identity
stellar keys generate alice --network testnet
stellar keys fund alice --network testnet

# 2. Build contract
stellar contract build

# 3. Deploy contract
stellar contract deploy \
  --wasm target/wasm32-unknown-unknown/release/community_wallet.wasm \
  --source alice \
  --network testnet

# 4. Note the returned contract ID for frontend configuration
```

### Testing Deployment

```bash
# Run verification script
node verify-deployment.js

# Or test manually with stellar CLI
stellar contract invoke \
  --id CONTRACT_ID \
  --source alice \
  --network testnet \
  -- get_group_count
```

## Frontend Integration

### Environment Configuration

Create `.env.local` in the frontend app:

```env
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_RPC_URL=https://soroban-testnet.stellar.org:443
NEXT_PUBLIC_COMMUNITY_WALLET_CONTRACT=YOUR_CONTRACT_ID
```

### TypeScript Integration

```typescript
import { ContractService } from '@/lib/contract';

// Initialize contract service
const contractService = new ContractService();

// Create a group
const txHash = await contractService.createGroup({
  creator: userAddress,
  groupId: 'my-group-1',
  name: 'Family Savings',
  autoInvestEnabled: true
}, walletKit);
```

## Current Status

**Development Mode**: The contract is currently configured for development with a mock contract ID. To deploy to a live network:

1. Fix Rust compilation issues
2. Run the deployment script: `./deploy.sh`
3. Update the contract ID in `bindings/community_wallet.ts`
4. Test with the verification script

## Troubleshooting

### Common Issues

1. **Build Failures**:
   - Ensure `wasm32-unknown-unknown` target is installed
   - Check Rust version compatibility
   - Clear cargo cache: `cargo clean`

2. **Deployment Failures**:
   - Verify account is funded on testnet
   - Check network connectivity
   - Ensure stellar CLI is properly configured

3. **Contract Call Failures**:
   - Verify contract ID is correct
   - Check function signatures match
   - Ensure proper authorization