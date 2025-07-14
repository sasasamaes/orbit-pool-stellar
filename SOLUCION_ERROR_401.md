# 🚨 SOLUCIÓN: Error 401 "Invalid token"

## ❌ **PROBLEMA IDENTIFICADO**

El frontend está enviando tokens JWT válidos de Supabase, pero el **backend tiene una clave de servicio corrupta/duplicada**, causando errores de autenticación.

### **Evidencia del Error:**

```
🔍 Frontend: Token JWT válido generado ✅
🔍 Backend: "Invalid token" - Error 401 ❌
🔍 Causa: SUPABASE_SERVICE_ROLE_KEY duplicada/corrupta
```

---

## 🔧 **SOLUCIÓN RÁPIDA**

### **Paso 1: Obtener Clave de Servicio Correcta**

1. **Ve a tu dashboard de Supabase:**
   - URL: `https://hnmmkcjphbsqldsyaglw.supabase.co/project/settings/api`

2. **Copia la "service_role" key:**
   - Busca la sección "Project API keys"
   - Copia la clave que dice **"service_role"** (NO la "anon" key)
   - Debe empezar con `eyJ` y tener formato JWT

### **Paso 2: Ejecutar Script de Corrección**

```bash
./fix-supabase-config.sh
```

**El script hará:**

- ✅ Detectar URL de Supabase actual
- ✅ Solicitar clave de servicio correcta
- ✅ Validar formato JWT
- ✅ Limpiar configuración corrupta
- ✅ Probar conexión a Supabase
- ✅ Crear backup de seguridad

### **Paso 3: Reiniciar Backend**

```bash
cd apps/backend && bun run dev
```

---

## 🎯 **RESULTADO ESPERADO**

Después de ejecutar el script:

```
✅ Configuración de Supabase corregida
✅ Conexión exitosa a base de datos
✅ Autenticación funcionando
✅ Frontend puede cargar grupos
```

---

## 🔍 **VERIFICACIÓN**

### **1. Backend Logs**

```bash
cd apps/backend && bun run dev
# Debe mostrar: "✅ Connected to Supabase"
```

### **2. Frontend**

- Recargar página del dashboard
- Los grupos deben cargarse sin error 401
- La autenticación debe funcionar correctamente

### **3. Test Manual**

```bash
# Probar conexión directa
node test-supabase-connection.js
```

---

## 🆘 **SI EL PROBLEMA PERSISTE**

### **Verificar estas configuraciones:**

1. **URL de Supabase correcta:**

   ```bash
   grep "SUPABASE_URL" apps/backend/.env
   ```

2. **Clave de servicio válida:**

   ```bash
   grep "SUPABASE_SERVICE_ROLE_KEY" apps/backend/.env
   ```

3. **Variables en frontend:**
   ```bash
   grep "SUPABASE" apps/frontend/.env.local
   ```

### **Comandos de Diagnóstico:**

```bash
# Verificar configuración completa
node test-contract-deployment.js

# Ver logs del backend
tail -f apps/backend/logs/backend.log

# Probar API directamente
curl -H "Authorization: Bearer TU_TOKEN" http://localhost:5001/api/users/groups
```

---

## 🎉 **UNA VEZ SOLUCIONADO**

Tu sistema tendrá:

- ✅ **Autenticación funcionando** entre frontend y backend
- ✅ **Grupos cargándose** correctamente
- ✅ **Contratos Stellar** listos para despliegue
- ✅ **Sistema completamente funcional**

**¡Ya puedes crear grupos con contratos individuales! 🚀**
