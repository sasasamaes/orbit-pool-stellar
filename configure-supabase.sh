#!/bin/bash
# Script para configurar Supabase en Community Wallet

echo "🗄️  Configurando Supabase para Community Wallet..."

# Función para validar URL de Supabase
validate_supabase_url() {
    if [[ $1 =~ ^https://[a-z0-9]{20}\.supabase\.co$ ]]; then
        return 0
    else
        return 1
    fi
}

# Solicitar URL de Supabase
echo "📝 Ingresa tu URL de Supabase (formato: https://xxxxxx.supabase.co):"
read -r SUPABASE_URL

if ! validate_supabase_url "$SUPABASE_URL"; then
    echo "❌ URL de Supabase inválida. Debe tener el formato: https://xxxxxx.supabase.co"
    exit 1
fi

# Solicitar clave anónima
echo "🔑 Ingresa tu clave anónima (anon key) de Supabase:"
read -r SUPABASE_ANON_KEY

# Solicitar clave de servicio
echo "🔐 Ingresa tu clave de servicio (service role key) de Supabase:"
read -s SUPABASE_SERVICE_ROLE_KEY
echo ""

# Generar JWT secret
JWT_SECRET=$(openssl rand -hex 64)

echo "✅ Configuraciones recopiladas"

# Actualizar archivo .env del backend
echo "📝 Actualizando apps/backend/.env..."
sed -i.bak "s|SUPABASE_URL=.*|SUPABASE_URL=$SUPABASE_URL|" apps/backend/.env
sed -i.bak "s|SUPABASE_SERVICE_ROLE_KEY=.*|SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY|" apps/backend/.env
sed -i.bak "s|JWT_SECRET=.*|JWT_SECRET=$JWT_SECRET|" apps/backend/.env

# Actualizar archivo .env.local del frontend
echo "📝 Actualizando apps/frontend/.env.local..."
sed -i.bak "s|NEXT_PUBLIC_SUPABASE_URL=.*|NEXT_PUBLIC_SUPABASE_URL=$SUPABASE_URL|" apps/frontend/.env.local
sed -i.bak "s|NEXT_PUBLIC_SUPABASE_ANON_KEY=.*|NEXT_PUBLIC_SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY|" apps/frontend/.env.local

echo ""
echo "🎉 Configuración de Supabase completada!"
echo ""
echo "🔧 VERIFICAR CONFIGURACIÓN:"
echo "1. Backend .env actualizado con URL y service role key"
echo "2. Frontend .env.local actualizado con URL y anon key"
echo "3. JWT secret generado automáticamente"
echo ""
echo "📊 PRÓXIMOS PASOS:"
echo "1. Verifica que tu base de datos Supabase tenga las tablas necesarias"
echo "2. Ejecuta las migraciones si es necesario"
echo "3. Prueba la conexión: bun run dev"
echo ""
echo "🗄️  Para verificar las tablas en Supabase:"
echo "   - Ve a tu proyecto en https://supabase.com"
echo "   - Navega a Database > Tables"
echo "   - Asegúrate de tener: users, groups, group_memberships, transactions, etc."

# Crear archivo de respaldo con las configuraciones
cat > supabase-config-backup.txt << EOF
# Configuración Supabase para Community Wallet - MANTENER SEGURO
# Generado: $(date)

SUPABASE_URL=$SUPABASE_URL
SUPABASE_ANON_KEY=$SUPABASE_ANON_KEY
SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
JWT_SECRET=$JWT_SECRET

# Dashboard: ${SUPABASE_URL/https:\/\//https://supabase.com/dashboard/project/}/
EOF

echo "🔒 Configuración guardada en: supabase-config-backup.txt"
echo "⚠️  IMPORTANTE: Mantén este archivo seguro y NO lo subas a control de versiones" 