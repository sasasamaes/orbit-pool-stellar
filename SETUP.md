# 🚀 Configuración del Proyecto - Community Wallet

## ❌ Error: "No authenticated session"

Si obtienes este error, significa que el usuario no está autenticado. Sigue estos pasos:

## 📋 **Paso 1: Configurar Supabase**

### 1.1. Crear proyecto en Supabase

1. Ve a https://supabase.com/
2. Crea un nuevo proyecto
3. Espera a que se complete la configuración

### 1.2. Obtener credenciales

1. Ve a **Settings** > **API**
2. Copia estas credenciales:
   - **URL**: `https://tu-proyecto.supabase.co`
   - **anon public**: Para el frontend
   - **service_role**: Para el backend

### 1.3. Configurar base de datos

1. Ve a **SQL Editor** en Supabase
2. Copia el contenido completo de `apps/backend/src/database/schema.sql`
3. Pégalo y ejecuta el SQL

### 1.4. Configurar autenticación

1. Ve a **Authentication** > **Settings**
2. Habilita **Email** authentication
3. Opcionalmente, configura **Google OAuth**

## 📋 **Paso 2: Variables de Entorno**

### 2.1. Backend

```bash
# Copia el archivo de ejemplo
cp apps/backend/env.example apps/backend/.env

# Edita apps/backend/.env
SUPABASE_URL=https://tu-proyecto.supabase.co
SUPABASE_SERVICE_ROLE_KEY=tu_service_role_key
PORT=5001
NODE_ENV=development
```

### 2.2. Frontend

```bash
# Copia el archivo de ejemplo
cp apps/frontend/env.example apps/frontend/.env.local

# Edita apps/frontend/.env.local
NEXT_PUBLIC_SUPABASE_URL=https://tu-proyecto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_anon_key
NEXT_PUBLIC_API_URL=http://localhost:5001/api
```

## 📋 **Paso 3: Instalar y ejecutar**

```bash
# Instalar dependencias
bun install

# Iniciar ambos servicios
bun run dev
```

## 📋 **Paso 4: Verificar autenticación**

### 4.1. Abrir la aplicación

- Ve a `http://localhost:3000`
- Deberías ver el componente de debug que muestra el estado de autenticación

### 4.2. Iniciar sesión

- Ve a `http://localhost:3000/auth/login`
- Inicia sesión con Google o email
- Verifica que el componente de debug muestre "Authenticated"

### 4.3. Crear grupo

- Ve a **Create Group**
- Verifica que el componente de debug muestre "Authenticated"
- Llena el formulario y crea el grupo
- Debería funcionar sin el error "No authenticated session"

## 🔧 **Troubleshooting**

### Error: "No authenticated session"

- ✅ Verifica que las variables de entorno estén correctas
- ✅ Asegúrate de estar autenticado en `/auth/login`
- ✅ Verifica que Supabase esté funcionando

### Error: "Network error"

- ✅ Verifica que el backend esté corriendo en puerto 5001
- ✅ Verifica que `NEXT_PUBLIC_API_URL` apunte a `http://localhost:5001/api`

### Error: "Group not found"

- ✅ Verifica que el esquema SQL se haya ejecutado correctamente
- ✅ Verifica que el backend tenga acceso a Supabase

## 📊 **Verificación final**

### Backend funcionando

- Ve a `http://localhost:5001/health`
- Deberías ver: `{"status":"OK","timestamp":"..."}`

### Frontend funcionando

- Ve a `http://localhost:3000`
- Deberías ver la página principal

### Autenticación funcionando

- El componente de debug debe mostrar "Authenticated"
- Puedes crear grupos sin errores

## 🗑️ **Remover componente de debug**

Una vez que todo funcione, puedes remover el componente de debug editando `apps/frontend/src/app/groups/new/page.tsx` y eliminando:

```tsx
{
  /* Debug Component - Remove in production */
}
<div className="mb-8">
  <AuthDebug />
</div>;
```

## 📝 **Estructura de archivos**

```
communityWallet/
├── apps/
│   ├── backend/
│   │   ├── .env              # Variables de entorno del backend
│   │   └── src/
│   │       └── database/
│   │           └── schema.sql # Esquema de la base de datos
│   └── frontend/
│       ├── .env.local        # Variables de entorno del frontend
│       └── src/
│           ├── lib/
│           │   └── api.ts    # Cliente API
│           └── app/
│               └── groups/
│                   └── new/
│                       └── page.tsx # Página de crear grupo
└── start-dev.sh             # Script para iniciar ambos servicios
```

## 🎯 **Flujo completo**

1. **Usuario se autentica** → `/auth/login`
2. **Usuario crea grupo** → `/groups/new`
3. **Frontend llama API** → `http://localhost:5001/api/groups`
4. **Backend guarda en Supabase** → Base de datos
5. **Usuario ve el grupo** → `/groups/[id]`

¡Listo! Tu aplicación debería funcionar correctamente. 🚀
