#!/usr/bin/env node
// Script de prueba para verificar la configuración de contratos

const fs = require("fs");
const path = require("path");

console.log("🧪 PRUEBA DE CONFIGURACIÓN DE CONTRATOS");
console.log("=====================================\n");

// 1. Verificar archivos de configuración
console.log("📁 1. Verificando archivos de configuración...");

const backendEnvPath = "apps/backend/.env";
const frontendEnvPath = "apps/frontend/.env.local";
const contractWasmPath =
  "packages/contracts/target/wasm32-unknown-unknown/release/group_contract.wasm";

const checks = [
  { name: "Backend .env", path: backendEnvPath, required: true },
  { name: "Frontend .env.local", path: frontendEnvPath, required: true },
  { name: "Contract WASM", path: contractWasmPath, required: true },
];

let allGood = true;

checks.forEach((check) => {
  if (fs.existsSync(check.path)) {
    const stats = fs.statSync(check.path);
    console.log(`   ✅ ${check.name}: ${stats.size} bytes`);
  } else {
    console.log(`   ❌ ${check.name}: NO ENCONTRADO`);
    if (check.required) allGood = false;
  }
});

console.log("");

// 2. Verificar variables de entorno críticas
console.log("🔑 2. Verificando variables de entorno...");

if (fs.existsSync(backendEnvPath)) {
  const envContent = fs.readFileSync(backendEnvPath, "utf8");

  const criticalVars = [
    "STELLAR_DEPLOYER_SECRET_KEY",
    "STELLAR_DEPLOYER_PUBLIC_KEY",
    "STELLAR_NETWORK",
    "SOROBAN_RPC_URL",
  ];

  criticalVars.forEach((varName) => {
    if (
      envContent.includes(`${varName}=`) &&
      !envContent.includes(`${varName}=your_`)
    ) {
      console.log(`   ✅ ${varName}: Configurado`);
    } else {
      console.log(`   ⚠️  ${varName}: NO configurado o usa valor por defecto`);
      if (varName.includes("STELLAR_DEPLOYER")) allGood = false;
    }
  });
} else {
  console.log("   ❌ No se puede verificar - archivo .env no encontrado");
  allGood = false;
}

console.log("");

// 3. Verificar estructura de contratos
console.log("📦 3. Verificando estructura de contratos...");

const contractPaths = [
  "packages/contracts/contracts/group_contract/src/lib.rs",
  "packages/contracts/contracts/group_contract/Cargo.toml",
  "packages/contracts/Cargo.toml",
];

contractPaths.forEach((contractPath) => {
  if (fs.existsSync(contractPath)) {
    console.log(`   ✅ ${path.basename(contractPath)}: Presente`);
  } else {
    console.log(`   ❌ ${path.basename(contractPath)}: NO ENCONTRADO`);
    allGood = false;
  }
});

console.log("");

// 4. Verificar tamaño y hash del WASM
if (fs.existsSync(contractWasmPath)) {
  console.log("🔍 4. Analizando contrato WASM...");

  const wasmStats = fs.statSync(contractWasmPath);
  console.log(
    `   📏 Tamaño: ${wasmStats.size} bytes (${(wasmStats.size / 1024).toFixed(2)} KB)`
  );
  console.log(`   📅 Modificado: ${wasmStats.mtime.toLocaleString()}`);

  // Verificar que el archivo no esté vacío y tenga un tamaño razonable
  if (wasmStats.size > 1000 && wasmStats.size < 1000000) {
    console.log("   ✅ Tamaño del WASM es válido");
  } else {
    console.log("   ⚠️  Tamaño del WASM parece inusual");
  }
} else {
  console.log("❌ 4. Contrato WASM no encontrado");
  allGood = false;
}

console.log("");

// 5. Mostrar siguientes pasos
console.log("🚀 5. Estado general y próximos pasos:");
console.log("");

if (allGood) {
  console.log("🎉 ¡CONFIGURACIÓN COMPLETADA EXITOSAMENTE!");
  console.log("");
  console.log("✅ Todo está listo para:");
  console.log("   • Desplegar contratos en Testnet de Stellar");
  console.log("   • Crear grupos con contratos individuales");
  console.log("   • Procesar contribuciones en blockchain");
  console.log("");
  console.log("🔧 PRÓXIMOS PASOS:");
  console.log("   1. Configurar Supabase: ./configure-supabase.sh");
  console.log("   2. Iniciar backend: cd apps/backend && bun run dev");
  console.log("   3. Iniciar frontend: cd apps/frontend && bun run dev");
  console.log("   4. Cambiar SIMULATE_ONLY=false para despliegues reales");
} else {
  console.log("⚠️  CONFIGURACIÓN INCOMPLETA");
  console.log("");
  console.log("❌ Problemas encontrados que necesitan atención:");
  console.log("   • Revisa los elementos marcados con ❌ arriba");
  console.log("   • Ejecuta los scripts de configuración si es necesario");
  console.log(
    "   • Verifica que los contratos se hayan compilado correctamente"
  );
  console.log("");
  console.log("🔧 COMANDOS DE REPARACIÓN:");
  console.log("   ./setup-env.sh");
  console.log("   ./update-stellar-keys.sh");
  console.log(
    "   cd packages/contracts && stellar contract build --package group_contract"
  );
}

console.log("");
console.log("📋 INFORMACIÓN ADICIONAL:");
console.log("   • Documentación: ENV_SETUP_SUMMARY.md");
console.log("   • Claves Stellar: stellar-keys-backup.txt");
console.log("   • Logs: apps/backend/logs/");
console.log("");
console.log(
  "⚠️  RECUERDA: Las claves en *-backup.txt son sensibles - NO las subas a Git"
);
