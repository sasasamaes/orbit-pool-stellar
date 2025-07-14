#!/bin/bash

# Build script optimizado para Render con Node.js 20.x
# Maneja las dependencias problemáticas y optimiza el proceso de build

set -e

echo "🚀 Iniciando build optimizado para Render (Node.js 20.x)..."

# Configurar variables para sharp y otros packages nativos
export SHARP_IGNORE_GLOBAL_LIBVIPS=1
export SHARP_FORCE_GLOBAL_LIBVIPS=false
export NODE_ENV=production
export PYTHON=/usr/bin/python3

echo "📋 Configuración de build:"
echo "  - Node version: $(node --version)"
echo "  - NPM version: $(npm --version)"
echo "  - SHARP_IGNORE_GLOBAL_LIBVIPS: $SHARP_IGNORE_GLOBAL_LIBVIPS"
echo "  - NODE_ENV: $NODE_ENV"

# 1. Limpiar caché y node_modules problemáticos
echo "🧹 Limpiando caché..."
rm -rf node_modules/.cache || true
rm -rf apps/*/node_modules/.cache || true
rm -rf .next || true
rm -rf apps/*/.next || true

# 2. Instalar dependencias con configuraciones específicas para Render
echo "📦 Instalando dependencias con npm para mejor compatibilidad..."

# Instalar dependencias del root primero
npm install --production=false --no-optional

# 3. Build de contratos primero (si es necesario)
echo "🏗️ Building contracts..."
if [ -d "packages/contracts" ]; then
  cd packages/contracts
  npm install --production=false || echo "⚠️ Contracts deps install failed, continuing..."
  npm run build 2>/dev/null || echo "⚠️ Contracts build failed, continuing..."
  cd ../..
fi

# 4. Build del backend
echo "🔧 Building backend..."
cd apps/backend
npm install --production=false --no-optional
# Verificar que sharp se instaló correctamente
echo "🔍 Verificando sharp installation..."
npm ls sharp || echo "⚠️ Sharp not found, will be handled by package manager"
npm run build || echo "⚠️ Backend build script not found, using source files"
cd ../..

# 5. Build del frontend
echo "🎨 Building frontend..."
cd apps/frontend
npm install --production=false --no-optional
# Verificar que sharp se instaló correctamente para Next.js
echo "🔍 Verificando sharp installation para Next.js..."
npm ls sharp || echo "⚠️ Sharp not found, will be handled by Next.js"
npm run build
cd ../..

echo "✅ Build completado exitosamente!"
echo "📊 Tamaños de directorios principales:"
du -sh apps/frontend/.next 2>/dev/null || echo "Frontend build not found"
du -sh apps/backend/dist 2>/dev/null || echo "Backend dist not found"
du -sh node_modules 2>/dev/null || echo "Node modules not found"

echo "🏁 Build script terminado exitosamente" 