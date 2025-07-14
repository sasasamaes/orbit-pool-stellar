#!/bin/bash

# Build script optimizado para Render con Node.js 20.x
# Resuelve problemas con Sharp, Stellar SDK y dependencias nativas

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

# 2. Instalar dependencias principales con configuraciones específicas
echo "📦 Instalando dependencias principales..."
npm install --production=false --prefer-online --no-audit

# 3. Build de contratos primero (si es necesario)
echo "🏗️ Building contracts..."
if [ -d "packages/contracts" ]; then
  cd packages/contracts
  npm install --production=false || echo "⚠️ Contracts install failed, continuing..."
  npm run build || echo "⚠️ Contracts build failed, continuing..."
  cd ../..
fi

# 4. Build del backend
echo "🔧 Building backend..."
cd apps/backend
npm install --production=false || echo "⚠️ Backend install failed, continuing..."
npm run build || echo "❌ Backend build failed"
cd ../..

# 5. Build del frontend (más sensible a errores)
echo "🎨 Building frontend..."
cd apps/frontend

# Instalar dependencias del frontend específicamente
echo "📦 Installing frontend dependencies..."
npm install --production=false

# Verificar que sharp esté correctamente instalado
echo "🔍 Verificando instalación de Sharp..."
npm list sharp || echo "⚠️ Sharp not found, will be installed by Next.js"

# Build del frontend con configuraciones optimizadas
echo "🏗️ Building Next.js application..."
npm run build

echo "✅ Frontend build exitoso"
cd ../..

# 6. Verificar builds
echo "🔍 Verificando builds..."

# Verificar backend
if [ -f "apps/backend/dist/index.js" ]; then
  echo "✅ Backend build verificado (index.js creado)"
else
  echo "❌ Backend build no encontrado (index.js faltante)"
  exit 1
fi

# Verificar frontend
if [ -d "apps/frontend/.next" ]; then
  echo "✅ Frontend build (.next) verificado"
else
  echo "❌ Frontend build (.next) no encontrado"
  exit 1
fi

# 7. Limpiar archivos innecesarios para reducir tamaño
echo "🧹 Limpiando archivos innecesarios..."
find . -name "*.map" -type f -delete || true
find . -name "*.tsbuildinfo" -type f -delete || true
rm -rf node_modules/.cache || true
rm -rf apps/*/node_modules/.cache || true

echo "🎉 Build completado exitosamente para Render!"
echo "📊 Tamaño de builds:"
echo "  - Backend: $(du -sh apps/backend 2>/dev/null || echo 'N/A')"
echo "  - Frontend: $(du -sh apps/frontend/.next 2>/dev/null || echo 'N/A')"

echo "✅ Listo para deployment en Render con Node.js 20.x" 