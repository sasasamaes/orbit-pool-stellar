#!/bin/bash

# Build script optimizado para Render
# Maneja las dependencias problemáticas y optimiza el proceso de build

set -e

echo "🚀 Iniciando build optimizado para Render..."

# 1. Limpiar caché y node_modules problemáticos
echo "🧹 Limpiando caché..."
rm -rf node_modules/.cache || true
rm -rf apps/*/node_modules/.cache || true

# 2. Instalar dependencias con configuraciones específicas para Render
echo "📦 Instalando dependencias..."

# Configurar variables para sharp (evita compilación desde código fuente)
export SHARP_IGNORE_GLOBAL_LIBVIPS=1
export SHARP_FORCE_GLOBAL_LIBVIPS=false

# Instalar dependencias
bun install --frozen-lockfile

# 3. Build de contratos primero (si es necesario)
echo "🏗️ Building contracts..."
bun run build:contracts || echo "⚠️ Contracts build failed, continuing..."

# 4. Build de backend
echo "🏗️ Building backend..."
bun run build:backend

# 5. Build de frontend  
echo "🏗️ Building frontend..."
bun run build:frontend

echo "✅ Build completado exitosamente!" 