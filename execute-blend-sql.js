const { createClient } = require("@supabase/supabase-js");
const fs = require("fs");
const path = require("path");

// Cargar variables de entorno
require("dotenv").config({ path: "./apps/backend/.env" });

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !supabaseServiceKey) {
  console.error(
    "❌ Faltan variables de entorno SUPABASE_URL o SUPABASE_SERVICE_ROLE_KEY"
  );
  process.exit(1);
}

const supabase = createClient(supabaseUrl, supabaseServiceKey);

async function executeBlendSQL() {
  try {
    console.log("🚀 Ejecutando script SQL para crear tablas de Blend...");

    // Leer el archivo SQL
    const sqlContent = fs.readFileSync("create-blend-tables.sql", "utf8");

    // Dividir en statements individuales (filtrar comentarios y líneas vacías)
    const statements = sqlContent
      .split(";")
      .map((stmt) => stmt.trim())
      .filter((stmt) => stmt.length > 0 && !stmt.startsWith("--"))
      .filter((stmt) => stmt !== "");

    console.log(
      `📄 Encontrados ${statements.length} statements SQL para ejecutar`
    );

    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i];

      // Saltar si es solo comentarios
      if (statement.startsWith("--") || statement.trim().length === 0) {
        continue;
      }

      console.log(`⚡ Ejecutando statement ${i + 1}/${statements.length}...`);

      try {
        const { data, error } = await supabase.rpc("exec_sql", {
          query: statement + ";",
        });

        if (error) {
          // Intentar ejecución directa si RPC no funciona
          const { data: directData, error: directError } = await supabase
            .from("information_schema.tables")
            .select("*")
            .limit(1);

          if (directError) {
            console.log(
              `⚠️  RPC no disponible, statement ${i + 1} skipped:`,
              error.message
            );
          } else {
            console.log(`⚠️  Error en statement ${i + 1}:`, error.message);
          }
        } else {
          console.log(`✅ Statement ${i + 1} ejecutado exitosamente`);
        }
      } catch (err) {
        console.log(`⚠️  Error ejecutando statement ${i + 1}:`, err.message);
      }
    }

    // Verificar que las tablas se crearon
    console.log("\n🔍 Verificando tablas creadas...");

    const tablesToCheck = [
      "group_blend_investments",
      "group_blend_withdrawals",
      "group_blend_settings",
      "auto_invest_logs",
    ];

    for (const tableName of tablesToCheck) {
      try {
        const { data, error } = await supabase
          .from(tableName)
          .select("*")
          .limit(1);

        if (error) {
          console.log(`❌ Tabla ${tableName}: Error - ${error.message}`);
        } else {
          console.log(`✅ Tabla ${tableName}: Existe y accesible`);
        }
      } catch (err) {
        console.log(`❌ Tabla ${tableName}: Error - ${err.message}`);
      }
    }

    console.log("\n🎉 Script de Blend completado!");
  } catch (error) {
    console.error("❌ Error ejecutando script SQL:", error);
    process.exit(1);
  }
}

executeBlendSQL();
