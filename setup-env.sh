#!/bin/bash
# Script para configurar variables de entorno para Community Wallet

echo "🔧 Configurando variables de entorno para Community Wallet..."

# Crear archivo .env para backend
echo "📁 Creando archivo .env para backend..."
cat > apps/backend/.env << 'EOF'
# Server Configuration
NODE_ENV=development
PORT=5001

# Supabase Configuration
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_supabase_service_role_key

# JWT Configuration
JWT_SECRET=your_jwt_secret_key_change_this_in_production

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX_REQUESTS=100

# CORS Configuration
FRONTEND_URL=http://localhost:3000

# Stellar Configuration
STELLAR_NETWORK=testnet
STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
STELLAR_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org

# Stellar Contract Deployment Configuration
# Generate with: stellar keys generate --global deployer --network testnet
STELLAR_DEPLOYER_SECRET_KEY=your_stellar_deployer_secret_key_here
STELLAR_DEPLOYER_PUBLIC_KEY=your_stellar_deployer_public_key_here

# Soroban Contract Configuration
SOROBAN_NETWORK_PASSPHRASE=Test SDF Network ; September 2015
SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
CONTRACT_WASM_PATH=../packages/contracts/target/wasm32-unknown-unknown/release/group_contract.wasm

# Contract Deployment Settings
ENABLE_REAL_DEPLOYMENT=false
SIMULATE_ONLY=true
CONTRACT_FEE_STROOPS=1000000

# Blend Protocol
BLEND_PROTOCOL_URL=https://blend-testnet.stellar.org
BLEND_PROTOCOL_CONTRACT_ID=your_blend_contract_id_when_available

# Email Configuration (optional)
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your_email@gmail.com
SMTP_PASS=your_app_password

# Logging Configuration
LOG_LEVEL=debug
LOG_FILE_PATH=logs/backend.log

# Database Configuration
DATABASE_CONNECTION_TIMEOUT=30000
DATABASE_QUERY_TIMEOUT=10000
EOF

# Crear archivo .env.local para frontend
echo "📁 Creando archivo .env.local para frontend..."
cat > apps/frontend/.env.local << 'EOF'
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# API Configuration
NEXT_PUBLIC_API_URL=http://localhost:5001/api

# Stellar Configuration
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_STELLAR_HORIZON_URL=https://horizon-testnet.stellar.org
NEXT_PUBLIC_SOROBAN_RPC_URL=https://soroban-testnet.stellar.org
NEXT_PUBLIC_STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

# Stellar Assets Configuration
NEXT_PUBLIC_USDC_ASSET_CODE=USDC
NEXT_PUBLIC_USDC_ISSUER=GBBD47IF6LWK7P7MDEVSCWR7DPUWV3NY3DTQEVFL4NAT4AQH3ZLLFLA5

# Blend Protocol
NEXT_PUBLIC_BLEND_PROTOCOL_URL=https://blend-testnet.stellar.org

# App Configuration
NEXT_PUBLIC_APP_NAME=Community Wallet
NEXT_PUBLIC_APP_VERSION=1.0.0
NEXT_PUBLIC_NETWORK_MODE=testnet

# Contract Configuration
NEXT_PUBLIC_ENABLE_CONTRACT_DEPLOYMENT=true
NEXT_PUBLIC_CONTRACT_SIMULATION_MODE=true

# Debug Configuration
NEXT_PUBLIC_DEBUG_MODE=true
NEXT_PUBLIC_ENABLE_CONSOLE_LOGS=true
EOF

echo "✅ Archivos de configuración creados!"
echo ""
echo "🔑 PASOS SIGUIENTES:"
echo "1. Configurar Supabase (URL y claves)"
echo "2. Generar cuentas Stellar para despliegue"
echo "3. Actualizar claves JWT"
echo "4. Configurar email (opcional)"
echo ""
echo "📚 Ejecuta los siguientes comandos:"
echo "   bash generate-stellar-keys.sh"
echo "   bash configure-supabase.sh" 