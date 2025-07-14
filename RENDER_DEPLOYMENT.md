# 🚀 Guía de Deployment en Render - ACTUALIZADA

## ✅ Correcciones Implementadas para Sharp y Node.js

### 1. Cambios en Versiones de Node.js

- ✅ **Node.js downgraded a 20.19.3** (más estable que 22.17.0)
- ✅ **Sharp actualizado a v0.34.5** (compatible con Node.js 20)
- ✅ **Engines configurados** para Node.js 20+ en todos los packages
- ✅ **Stellar SDK mantenido en v13.3.0** (versión estable)

### 2. Configuraciones Anti-Sharp-Compilation

- ✅ **Variables de entorno agregadas:**
  - `SHARP_IGNORE_GLOBAL_LIBVIPS=1`
  - `SHARP_FORCE_GLOBAL_LIBVIPS=false`
- ✅ **Archivo .npmrc creado** con configuraciones específicas
- ✅ **Build script actualizado** para npm en lugar de bun (mayor compatibilidad)

### 3. Archivos Modificados

- ✅ `.nvmrc` - Node.js 20.19.3
- ✅ `apps/backend/package.json` - Sharp 0.34.5, engines updated
- ✅ `apps/frontend/package.json` - Sharp 0.34.5, engines updated
- ✅ `render.yaml` - Variables de entorno y build commands
- ✅ `build.sh` - Script optimizado para Node.js 20
- ✅ `.npmrc` - Configuraciones específicas para sharp
- ✅ `package.json` - Scripts de build mejorados

## 🔧 Configuración en Render

### Build Commands Actualizados

```bash
# Para Backend y Frontend
export SHARP_IGNORE_GLOBAL_LIBVIPS=1
export SHARP_FORCE_GLOBAL_LIBVIPS=false
export NODE_ENV=production
npm install --production=false --no-optional
npm run build
```

### Variables de Entorno Requeridas

#### Backend Service

```bash
# Obligatorias
NODE_ENV=production
PORT=10000
SUPABASE_URL=your_supabase_url
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
JWT_SECRET=your_jwt_secret

# Sharp configuration
SHARP_IGNORE_GLOBAL_LIBVIPS=1
SHARP_FORCE_GLOBAL_LIBVIPS=false

# Stellar configuration
STELLAR_NETWORK=testnet
BLEND_POOL_ADDRESS=CCLBPEYS3XFK65MYYXSBMOGKUI4ODN5S7SUZBGD7NALUQF64QILLX5B5
STELLAR_RPC_URL=https://soroban-testnet.stellar.org
HORIZON_URL=https://horizon-testnet.stellar.org
```

#### Frontend Service

```bash
# Obligatorias
NODE_ENV=production
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key
NEXT_PUBLIC_API_URL=https://your-backend-url.onrender.com

# Sharp configuration
SHARP_IGNORE_GLOBAL_LIBVIPS=1
SHARP_FORCE_GLOBAL_LIBVIPS=false
```

## 🛠️ Pasos para Nuevo Deployment

### 1. Preparar el Repositorio

```bash
# Verificar que todos los cambios están committeados
git add .
git commit -m "fix: deploy configuration for Node.js 20 and sharp compatibility"
git push origin main
```

### 2. Configurar en Render.com

1. **Crear nuevo servicio** desde dashboard
2. **Conectar repositorio** GitHub
3. **Seleccionar configuración:**
   - **Build Command:** `npm run build:render`
   - **Start Command:** `npm start`
   - **Node Version:** 20.19.3 (automático desde .nvmrc)

### 3. Agregar Variables de Entorno

Copiar las variables listadas arriba en la configuración del servicio.

## 🐛 Troubleshooting

### Si Sharp Sigue Fallando:

```bash
# En el build log buscar:
- "sharp: Building from source via node-gyp" ❌ (malo)
- "sharp: Using cached" ✅ (bueno)
- "sharp: Downloaded" ✅ (bueno)
```

### Si Persisten Errores:

1. **Verificar .nvmrc** contiene `20.19.3`
2. **Verificar .npmrc** está presente
3. **Revisar logs** para errores específicos de Node.js
4. **Contactar soporte** si continúan problemas

## 📊 Verificación de Deployment Exitoso

### Señales de Éxito:

- ✅ Build completa sin errores de `node-gyp`
- ✅ Sharp se descarga como binario precompilado
- ✅ No aparecen errores de "NewOrCopy"
- ✅ El servicio se inicia correctamente

### URLs de Verificación:

- Backend: `https://your-backend.onrender.com/health`
- Frontend: `https://your-frontend.onrender.com`

## 🔄 Rollback Plan

Si el deployment falla:

```bash
# Volver a Node.js 22 (no recomendado hasta que sharp sea compatible)
echo "22.17.0" > .nvmrc

# O usar configuraciones alternativas
export NODE_OPTIONS="--max_old_space_size=4096"
```

## 📝 Notas Importantes

1. **Node.js 20.19.3** es más estable para producción
2. **Sharp 0.34.5** es la última versión compatible
3. **npm** se usa en lugar de bun para mayor compatibilidad
4. **Variables de entorno** son críticas para evitar compilación nativa

## 🎯 Próximos Pasos

Una vez que el deployment sea exitoso:

1. Verificar todas las funcionalidades
2. Confirmar que las transacciones de Stellar funcionan
3. Probar las funciones de Blend
4. Monitorear logs por 24-48 horas

---

**Estado:** ✅ Configuración lista para deployment
**Última actualización:** $(date)
**Compatibilidad:** Node.js 20.19.3, Sharp 0.34.5, Render.com
