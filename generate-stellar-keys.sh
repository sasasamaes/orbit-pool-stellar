#!/bin/bash
# Script para generar claves Stellar para despliegue de contratos

echo "🔑 Generando claves Stellar para despliegue de contratos..."

# Verificar si stellar CLI está instalado
if ! command -v stellar &> /dev/null; then
    echo "❌ Stellar CLI no está instalado."
    echo "📥 Instalando Stellar CLI..."
    
    # Detectar SO
    if [[ "$OSTYPE" == "linux-gnu"* ]]; then
        curl -L https://github.com/stellar/stellar-cli/releases/download/v21.0.0/stellar-cli-21.0.0-x86_64-unknown-linux-gnu.tar.gz | tar -xz
        sudo mv stellar /usr/local/bin/
    elif [[ "$OSTYPE" == "darwin"* ]]; then
        curl -L https://github.com/stellar/stellar-cli/releases/download/v21.0.0/stellar-cli-21.0.0-x86_64-apple-darwin.tar.gz | tar -xz
        sudo mv stellar /usr/local/bin/
    else
        echo "❌ Sistema operativo no soportado. Instala Stellar CLI manualmente."
        exit 1
    fi
fi

echo "✅ Stellar CLI detectado/instalado"

# Generar clave para deployer
echo "🔐 Generando clave para deployer de contratos..."
stellar keys generate --global deployer --network testnet

# Obtener las claves generadas
DEPLOYER_SECRET=$(stellar keys show deployer --show-secret)
DEPLOYER_PUBLIC=$(stellar keys show deployer)

echo ""
echo "🎉 Claves generadas exitosamente!"
echo "📝 Agrega estas líneas a apps/backend/.env:"
echo ""
echo "STELLAR_DEPLOYER_SECRET_KEY=$DEPLOYER_SECRET"
echo "STELLAR_DEPLOYER_PUBLIC_KEY=$DEPLOYER_PUBLIC"
echo ""

# Fondear la cuenta en testnet
echo "💰 Fondeando cuenta de deployer en Testnet..."
curl "https://friendbot.stellar.org?addr=$DEPLOYER_PUBLIC"

echo ""
echo "✅ Cuenta fondeada con XLM de prueba"
echo ""
echo "🔧 SIGUIENTES PASOS:"
echo "1. Actualiza apps/backend/.env con las claves mostradas arriba"
echo "2. Actualiza las configuraciones de Supabase"
echo "3. Ejecuta: cd packages/contracts && stellar contract build"
echo "4. Cambia SIMULATE_ONLY=false cuando estés listo para despliegues reales"

# Crear archivo con las claves para referencia
cat > stellar-keys-backup.txt << EOF
# Claves Stellar para Community Wallet - MANTENER SEGURO
# Generado: $(date)

DEPLOYER_SECRET_KEY=$DEPLOYER_SECRET
DEPLOYER_PUBLIC_KEY=$DEPLOYER_PUBLIC

# Comando para verificar balance:
# curl "https://horizon-testnet.stellar.org/accounts/$DEPLOYER_PUBLIC"

# Comando para fondear en testnet:
# curl "https://friendbot.stellar.org?addr=$DEPLOYER_PUBLIC"
EOF

echo ""
echo "🔒 Claves guardadas en: stellar-keys-backup.txt"
echo "⚠️  IMPORTANTE: Mantén este archivo seguro y NO lo subas a control de versiones" 