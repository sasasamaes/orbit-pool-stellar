#!/bin/bash
# Script para corregir la configuración corrupta de Supabase

echo "🔧 Corrigiendo configuración de Supabase..."
echo ""

# Detectar la URL de Supabase actual
SUPABASE_URL=$(grep "SUPABASE_URL=" apps/backend/.env | cut -d'=' -f2)
echo "📍 URL de Supabase detectada: $SUPABASE_URL"

if [[ -z "$SUPABASE_URL" || "$SUPABASE_URL" == "your_supabase_url" ]]; then
    echo "❌ URL de Supabase no configurada correctamente"
    echo "🔧 Ejecuta: ./configure-supabase.sh para configurar desde cero"
    exit 1
fi

echo ""
echo "🔑 La clave de servicio parece estar duplicada/corrupta."
echo "📝 Por favor, proporciona la clave de servicio (service role key) correcta:"
echo "   (La puedes encontrar en: $SUPABASE_URL/project/settings/api)"
echo ""
read -s -p "🔐 Service Role Key: " SERVICE_ROLE_KEY
echo ""

# Validar que la clave tenga formato JWT
if [[ ! "$SERVICE_ROLE_KEY" =~ ^eyJ.*\..*\..*$ ]]; then
    echo "❌ La clave no tiene formato JWT válido"
    echo "   Debe empezar con 'eyJ' y tener 3 partes separadas por puntos"
    exit 1
fi

echo "✅ Formato de clave válido"

# Hacer backup del archivo actual
cp apps/backend/.env apps/backend/.env.backup.$(date +%s)
echo "💾 Backup creado: .env.backup.$(date +%s)"

# Limpiar y corregir el archivo .env
echo "🧹 Limpiando configuración corrupta..."

# Eliminar líneas duplicadas/corruptas de SUPABASE_SERVICE_ROLE_KEY
grep -v "SUPABASE_SERVICE_ROLE_KEY=" apps/backend/.env > apps/backend/.env.temp

# Agregar la clave correcta
echo "SUPABASE_SERVICE_ROLE_KEY=$SERVICE_ROLE_KEY" >> apps/backend/.env.temp

# Reemplazar el archivo original
mv apps/backend/.env.temp apps/backend/.env

echo "✅ Configuración corregida"
echo ""

# Verificar la configuración
echo "🔍 Verificando nueva configuración..."
if grep -q "SUPABASE_URL=$SUPABASE_URL" apps/backend/.env && grep -q "SUPABASE_SERVICE_ROLE_KEY=$SERVICE_ROLE_KEY" apps/backend/.env; then
    echo "✅ URL y Service Role Key configurados correctamente"
else
    echo "❌ Error en la configuración"
    exit 1
fi

echo ""
echo "🧪 Probando conexión a Supabase..."

# Crear script de prueba temporal
cat > test-supabase-connection.js << 'EOF'
const { createClient } = require('@supabase/supabase-js');
require('dotenv').config();

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function testConnection() {
  try {
    const { data, error } = await supabase.auth.admin.listUsers();
    
    if (error) {
      console.log('❌ Error de conexión:', error.message);
      return false;
    }
    
    console.log('✅ Conexión exitosa a Supabase');
    console.log(`📊 Usuarios encontrados: ${data.users.length}`);
    return true;
  } catch (error) {
    console.log('❌ Error:', error.message);
    return false;
  }
}

testConnection().then(success => {
  process.exit(success ? 0 : 1);
});
EOF

# Ejecutar prueba desde el directorio del backend
cd apps/backend
if node ../../test-supabase-connection.js; then
    echo ""
    echo "🎉 ¡Configuración de Supabase corregida exitosamente!"
    echo ""
    echo "🚀 PRÓXIMOS PASOS:"
    echo "   1. Reiniciar el backend: bun run dev"
    echo "   2. Probar la autenticación en el frontend"
    echo "   3. Verificar que los grupos se carguen correctamente"
else
    echo ""
    echo "❌ La conexión falló. Verifica:"
    echo "   • Que la clave de servicio sea correcta"
    echo "   • Que tengas acceso a internet"
    echo "   • Que el proyecto de Supabase esté activo"
fi

# Limpiar archivo temporal
rm -f ../../test-supabase-connection.js

cd ../.. 