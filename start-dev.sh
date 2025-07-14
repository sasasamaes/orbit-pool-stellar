#!/bin/bash

# Script para iniciar el frontend y backend juntos

echo "🚀 Iniciando Community Wallet..."

# Verificar que bun esté instalado
if ! command -v bun &> /dev/null; then
    echo "❌ Bun no está instalado. Instala bun primero: https://bun.sh/"
    exit 1
fi

# Verificar que las variables de entorno estén configuradas
if [ ! -f "apps/backend/.env" ]; then
    echo "⚠️  No se encontró apps/backend/.env"
    echo "   Copia el archivo de ejemplo: cp apps/backend/env.example apps/backend/.env"
    echo "   Y configura tus variables de entorno"
fi

if [ ! -f "apps/frontend/.env.local" ]; then
    echo "⚠️  No se encontró apps/frontend/.env.local"
    echo "   Copia el archivo de ejemplo: cp apps/frontend/env.example apps/frontend/.env.local"
    echo "   Y configura tus variables de entorno"
fi

# Instalar dependencias si no existen
echo "📦 Instalando dependencias..."
bun install

# Iniciar servicios
echo "🔧 Iniciando backend en puerto 5001..."
echo "⚛️  Iniciando frontend en puerto 3000..."

# Ejecutar en paralelo
bun run dev 