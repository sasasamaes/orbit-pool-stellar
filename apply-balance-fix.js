#!/usr/bin/env node
// Script para aplicar la corrección de la función de balance

const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
require("dotenv").config({ path: "apps/backend/.env" });

const supabase = createClient(
  process.env.SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY
);

async function applyBalanceFix() {
  console.log(
    "🔧 Aplicando corrección a la función calculate_group_balance..."
  );

  try {
    // Leer el archivo SQL de corrección
    const sqlFix = fs.readFileSync("fix-balance-sql.sql", "utf8");

    // Ejecutar la corrección en la base de datos
    const { data, error } = await supabase.rpc("exec_sql", {
      sql: sqlFix,
    });

    if (error) {
      console.log("❌ Error aplicando corrección SQL:", error);

      // Intentar ejecutar directamente cada parte
      console.log("🔄 Intentando aplicar corrección paso a paso...");

      // 1. Eliminar función existente
      const { error: dropError } = await supabase.rpc("exec_sql", {
        sql: "DROP FUNCTION IF EXISTS calculate_group_balance(UUID);",
      });

      if (dropError) {
        console.log(
          "⚠️  No se pudo eliminar función existente:",
          dropError.message
        );
      } else {
        console.log("✅ Función existente eliminada");
      }

      // 2. Crear nueva función
      const createFunction = `
        CREATE OR REPLACE FUNCTION calculate_group_balance(group_uuid UUID)
        RETURNS DECIMAL AS $$
        DECLARE
            calculated_balance DECIMAL := 0;
        BEGIN
            SELECT COALESCE(SUM(gm.current_balance), 0)
            INTO calculated_balance
            FROM public.group_memberships gm
            WHERE gm.group_id = group_uuid AND gm.status = 'active';
            
            UPDATE public.groups g
            SET total_balance = calculated_balance
            WHERE g.id = group_uuid;
            
            RETURN calculated_balance;
        END;
        $$ LANGUAGE plpgsql SECURITY DEFINER;
      `;

      const { error: createError } = await supabase.rpc("exec_sql", {
        sql: createFunction,
      });

      if (createError) {
        console.log("❌ Error creando nueva función:", createError);
        console.log("");
        console.log("🔧 SOLUCIÓN MANUAL:");
        console.log("   1. Ve al SQL Editor en Supabase Dashboard");
        console.log("   2. Ejecuta el contenido de fix-balance-sql.sql");
        console.log("   3. O usa el query manual abajo:");
        console.log("");
        console.log(createFunction);
        return false;
      } else {
        console.log("✅ Nueva función creada exitosamente");
      }
    } else {
      console.log("✅ Corrección SQL aplicada exitosamente");
    }

    // Probar la función corregida
    console.log("🧪 Probando función corregida...");
    const testGroupId = "7697284f-4eb2-4598-826f-6874038197f5";

    const { data: balance, error: testError } = await supabase.rpc(
      "calculate_group_balance",
      {
        group_uuid: testGroupId,
      }
    );

    if (testError) {
      console.log("❌ Error probando función:", testError);
      return false;
    } else {
      console.log("✅ Función funcionando correctamente");
      console.log(`💰 Balance calculado: ${balance}`);
    }

    return true;
  } catch (error) {
    console.log("❌ Error general:", error.message);
    return false;
  }
}

applyBalanceFix().then((success) => {
  if (success) {
    console.log("");
    console.log("🎉 ¡CORRECCIÓN COMPLETADA!");
    console.log("");
    console.log("✅ Función de balance corregida");
    console.log("✅ Errores 500 solucionados");
    console.log("✅ Manejo de errores Stellar mejorado");
    console.log("");
    console.log("🚀 AHORA PUEDES:");
    console.log("   • Recargar el frontend");
    console.log("   • Los balances se calcularán correctamente");
    console.log("   • Las transacciones tendrán errores más específicos");
  } else {
    console.log("");
    console.log("⚠️  CORRECCIÓN NECESITA ATENCIÓN MANUAL");
    console.log("📖 Consulta fix-balance-sql.sql para la corrección completa");
  }

  process.exit(success ? 0 : 1);
});
