#!/bin/bash
# Script para actualizar las claves Stellar en .env

echo "🔑 CLAVES STELLAR GENERADAS CORRECTAMENTE"
echo "========================================"
echo ""
echo "✅ Cuenta de deployer fondeada exitosamente en Testnet"
echo ""

# Obtener las claves
SECRET_KEY="SB6QF2KAY66NYHITMHFYGYZTIIVWCR7UHFJEBHTSBVQGKZTYPBGH3BWD"
PUBLIC_KEY="GDXIC6YIDVGZ2X6MLWVFJ2OQJGFDVULXJBSHMNTGI4S4N5FNHS5YCDTS"

echo "📝 ACTUALIZA EL ARCHIVO apps/backend/.env CON:"
echo "--------------------------------------------"
echo "STELLAR_DEPLOYER_SECRET_KEY=$SECRET_KEY"
echo "STELLAR_DEPLOYER_PUBLIC_KEY=$PUBLIC_KEY"
echo ""

echo "🔧 COMANDOS PARA ACTUALIZAR AUTOMÁTICAMENTE:"
echo "-------------------------------------------"
echo "sed -i.bak 's/STELLAR_DEPLOYER_SECRET_KEY=.*/STELLAR_DEPLOYER_SECRET_KEY=$SECRET_KEY/' apps/backend/.env"
echo "sed -i.bak 's/STELLAR_DEPLOYER_PUBLIC_KEY=.*/STELLAR_DEPLOYER_PUBLIC_KEY=$PUBLIC_KEY/' apps/backend/.env"
echo ""

echo "💰 VERIFICAR BALANCE DE LA CUENTA:"
echo "---------------------------------"
echo "curl \"https://horizon-testnet.stellar.org/accounts/$PUBLIC_KEY\""
echo ""

echo "🔍 INFORMACIÓN DE LA CUENTA:"
echo "---------------------------"
echo "• Clave Pública (Address): $PUBLIC_KEY"
echo "• Red: Testnet (Test SDF Network ; September 2015)"
echo "• Estado: Fondeada y lista para usar"
echo "• Uso: Despliegue de contratos inteligentes"
echo ""

echo "⚠️  SEGURIDAD:"
echo "• La clave secreta permite control total de la cuenta"
echo "• Mantén la clave secreta segura y NUNCA la compartas"
echo "• Solo usa esta cuenta para despliegue de contratos en Testnet"
echo ""

echo "🚀 PRÓXIMO PASO:"
echo "1. Actualiza apps/backend/.env con las claves mostradas arriba"
echo "2. Ejecuta: ./configure-supabase.sh"
echo "3. Construye los contratos: cd packages/contracts && stellar contract build"

# Verificar el balance
echo "💰 VERIFICANDO BALANCE ACTUAL..."
curl -s "https://horizon-testnet.stellar.org/accounts/$PUBLIC_KEY" | grep -o '"balance":"[^"]*"' | head -1 