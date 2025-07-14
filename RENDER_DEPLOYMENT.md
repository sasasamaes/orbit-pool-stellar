# 🚀 Guía de Deployment en Render

## ✅ Correcciones Implementadas

### 1. Dependencias Actualizadas

- ✅ **Sharp actualizado** a v0.33.5 (mejor compatibilidad con Render)
- ✅ **Stellar SDK alineado** a v13.3.0 en backend y frontend
- ✅ **node-gyp agregado** como devDependency en todos los packages
- ✅ **Build script optimizado** creado

### 2. Archivos de Configuración

- ✅ `.nvmrc` - Especifica Node.js 22.17.0
- ✅ `render.yaml` - Configuración de servicios
- ✅ `build.sh` - Script de build optimizado
- ✅ Package.json actualizados con dependencias correctas

## 🔧 Configuración en Render

### Variables de Entorno Requeridas

#### Backend Service

```bash
# Obligatorias
NODE_ENV=production
PORT=10000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret

# Stellar/Blockchain
STELLAR_NETWORK=testnet
BLEND_POOL_ADDRESS=CCLBPEYS3XFK65MYYXSBMOGKUI4ODN5S7SUZBGD7NALUQF64QILLX5B5
USDC_CONTRACT_ADDRESS=CAQCFVLOBK5GIULPNZRGATJJMIZL5BSP7X5YJVMGCPTUEPFM4AVSRCJU
COMMUNITY_WALLET_CONTRACT_ID=CACWNNSVIL3EMEJUKL4V6ZBBGL4M66GR65IHG5JTFD6AF7OTVETG564G

# Sharp optimization
SHARP_IGNORE_GLOBAL_LIBVIPS=1
SHARP_FORCE_GLOBAL_LIBVIPS=false
```

#### Frontend Service

```bash
# Obligatorias
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=https://your-backend-service.onrender.com

# Sharp optimization
SHARP_IGNORE_GLOBAL_LIBVIPS=1
SHARP_FORCE_GLOBAL_LIBVIPS=false
```

## 🛠️ Comandos de Build

### Opción 1: Build Script Optimizado (Recomendado)

```bash
# Build Command en Render
chmod +x build.sh && ./build.sh
```

### Opción 2: Build Directo

```bash
# Build Command alternativo
bun install --frozen-lockfile && bun run build:render
```

## 📋 Checklist de Deployment

### Pre-deployment

- [ ] Verificar que todos los valores en `.env.example` están configurados en Render
- [ ] Confirmar que Supabase está configurado y accesible
- [ ] Verificar que las claves de Stellar están correctas

### En Render Dashboard

- [ ] Crear servicio para Backend
  - [ ] Environment: Node
  - [ ] Build Command: `chmod +x build.sh && ./build.sh`
  - [ ] Start Command: `cd apps/backend && bun start`
  - [ ] Agregar todas las variables de entorno del backend

- [ ] Crear servicio para Frontend
  - [ ] Environment: Node
  - [ ] Build Command: `chmod +x build.sh && ./build.sh`
  - [ ] Start Command: `cd apps/frontend && bun start`
  - [ ] Agregar todas las variables de entorno del frontend

### Post-deployment

- [ ] Verificar que ambos servicios están running
- [ ] Probar endpoints del backend: `/health`
- [ ] Verificar que el frontend carga correctamente
- [ ] Probar funcionalidad de login/registro
- [ ] Verificar conexión con Stellar testnet

## 🐛 Troubleshooting

### Error: "sharp compilation failed"

- ✅ **Solucionado**: Actualizado a sharp v0.33.5 y agregado node-gyp

### Error: "peer dependency warnings"

- ✅ **Solucionado**: Alineadas versiones de Stellar SDK

### Error: "node-gyp not found"

- ✅ **Solucionado**: Agregado node-gyp a devDependencies

### Build Timeout

- Usar el build script optimizado que limpia caché
- Verificar que las variables de entorno están configuradas

### Memoria insuficiente

- En Render, usar plan Starter si el plan gratuito falla
- El build script está optimizado para uso mínimo de memoria

## 🔗 URLs de Servicios

Una vez deployado, tendrás:

- **Backend**: `https://community-wallet-backend-xxx.onrender.com`
- **Frontend**: `https://community-wallet-frontend-xxx.onrender.com`

## 📞 Soporte

Si continúas teniendo problemas:

1. Verificar logs en Render Dashboard
2. Confirmar todas las variables de entorno
3. Verificar que Supabase está accesible desde Render IPs
4. Revisar que los contratos de Stellar están deployados correctamente
