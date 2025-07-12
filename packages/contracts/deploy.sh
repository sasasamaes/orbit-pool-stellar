#!/bin/bash

# Community Wallet Contract Deployment Script
# This script deploys the community wallet contract to Stellar Testnet

set -e

echo "🚀 Deploying Community Wallet Contract to Stellar Testnet"

# Check if stellar CLI is available
if ! command -v stellar &> /dev/null; then
    echo "❌ Stellar CLI is not installed. Please install it first."
    echo "   Install: curl -L https://github.com/stellar/stellar-cli/releases/download/v22.0.0/stellar-cli-22.0.0-x86_64-apple-darwin.tar.gz | tar -xz"
    exit 1
fi

# Network configuration
NETWORK="testnet"
RPC_URL="https://soroban-testnet.stellar.org:443"

# Identity configuration
IDENTITY_NAME="${IDENTITY_NAME:-alice}"

echo "📋 Configuration:"
echo "   Network: $NETWORK"
echo "   RPC URL: $RPC_URL" 
echo "   Identity: $IDENTITY_NAME"

# Check if identity exists
if ! stellar keys list | grep -q "$IDENTITY_NAME"; then
    echo "❌ Identity '$IDENTITY_NAME' not found. Creating new identity..."
    stellar keys generate "$IDENTITY_NAME" --network "$NETWORK"
fi

# Fund the account if needed (testnet only)
if [ "$NETWORK" = "testnet" ]; then
    echo "💰 Funding account on testnet..."
    stellar keys fund "$IDENTITY_NAME" --network "$NETWORK" || echo "   Account already funded or funding failed"
fi

# Build the contract
echo "🔨 Building contract..."
if ! stellar contract build; then
    echo "❌ Contract build failed. Ensure Rust toolchain is properly configured."
    echo "   Run: rustup target add wasm32-unknown-unknown"
    exit 1
fi

# Deploy the contract
echo "📤 Deploying contract..."
CONTRACT_ID=$(stellar contract deploy \
    --wasm target/wasm32-unknown-unknown/release/community_wallet.wasm \
    --source "$IDENTITY_NAME" \
    --network "$NETWORK" \
    --rpc-url "$RPC_URL")

if [ -z "$CONTRACT_ID" ]; then
    echo "❌ Contract deployment failed"
    exit 1
fi

echo "✅ Contract deployed successfully!"
echo "   Contract ID: $CONTRACT_ID"

# Install the contract for easier calling
echo "📋 Installing contract..."
stellar contract install \
    --wasm target/wasm32-unknown-unknown/release/community_wallet.wasm \
    --source "$IDENTITY_NAME" \
    --network "$NETWORK" \
    --rpc-url "$RPC_URL"

# Update the bindings file with the actual contract ID
if [ -f "bindings/community_wallet.ts" ]; then
    echo "🔧 Updating TypeScript bindings with contract ID..."
    sed -i.bak "s/CBQHNAXSI55GX2GN6D67GK7BHVPSLJUGZQEU7WJ5LKR5PNUCGLIMAO4K/$CONTRACT_ID/g" bindings/community_wallet.ts
    rm -f bindings/community_wallet.ts.bak
    echo "   Updated bindings/community_wallet.ts"
fi

# Generate a .env file for the frontend
echo "📝 Creating environment configuration..."
cat > ../../apps/frontend/.env.local << EOF
# Stellar Configuration
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_RPC_URL=$RPC_URL
NEXT_PUBLIC_COMMUNITY_WALLET_CONTRACT=$CONTRACT_ID

# Mock token addresses for testnet
NEXT_PUBLIC_USDC_CONTRACT=CBIELTK6YBZJU5UP2WWQEUCYKLPU6AUNZ2BQ4WWFEIE3USCIHMXQDAMA
NEXT_PUBLIC_XLM_CONTRACT=NATIVE

# Blend Protocol (mock for development)
NEXT_PUBLIC_BLEND_POOL_CONTRACT=BLEND123456789ABCDEF
EOF

echo "   Created apps/frontend/.env.local"

echo ""
echo "🎉 Deployment completed successfully!"
echo ""
echo "📋 Summary:"
echo "   Contract ID: $CONTRACT_ID"
echo "   Network: $NETWORK"
echo "   RPC URL: $RPC_URL"
echo ""
echo "📋 Next steps:"
echo "   1. Update your frontend to use the deployed contract"
echo "   2. Test contract functions using the Stellar CLI"
echo "   3. Initialize the contract with any required setup"
echo ""
echo "💡 Example contract call:"
echo "   stellar contract invoke \\"
echo "     --id $CONTRACT_ID \\"
echo "     --source $IDENTITY_NAME \\"
echo "     --network $NETWORK \\"
echo "     --rpc-url $RPC_URL \\"
echo "     -- get_group_count"