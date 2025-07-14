#!/usr/bin/env node

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

// Función para verificar si un comando está disponible
function commandExists(command) {
  try {
    execSync(`command -v ${command}`, { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
}

// Limpiar directorio dist
const distPath = path.join(__dirname, "dist");
if (fs.existsSync(distPath)) {
  console.log("🧹 Limpiando directorio dist...");
  execSync("rm -rf dist", { cwd: __dirname });
}

// Crear directorio dist
fs.mkdirSync(distPath, { recursive: true });

console.log("🏗️ Iniciando build del backend...");

// Intentar con Bun primero
if (commandExists("bun")) {
  console.log("📦 Building con Bun...");
  try {
    execSync(
      "bun build src/index.ts --outdir dist --target node --external @blend-capital/blend-sdk --external express-rate-limit",
      {
        stdio: "inherit",
        cwd: __dirname,
      }
    );
    console.log("✅ Build con Bun exitoso");
  } catch (error) {
    console.log("⚠️ Build con Bun falló, intentando con externals...");
    try {
      execSync(
        "bun build src/index.ts --outdir dist --target node --external=*",
        {
          stdio: "inherit",
          cwd: __dirname,
        }
      );
      console.log("✅ Build con Bun (externals) exitoso");
    } catch (error2) {
      console.log("❌ Build con Bun falló completamente");
      throw error2;
    }
  }
}
// Fallback a TypeScript Compiler
else if (commandExists("tsc")) {
  console.log("📦 Building con TypeScript Compiler...");
  try {
    execSync("tsc", { stdio: "inherit", cwd: __dirname });
    console.log("✅ Build con TypeScript exitoso");
  } catch (error) {
    console.log("❌ Build con TypeScript falló");
    throw error;
  }
}
// Fallback a npx tsc
else if (commandExists("npx")) {
  console.log("📦 Building con npx tsc...");
  try {
    execSync("npx tsc", { stdio: "inherit", cwd: __dirname });
    console.log("✅ Build con npx tsc exitoso");
  } catch (error) {
    console.log("❌ Build con npx tsc falló");
    throw error;
  }
} else {
  console.error("❌ Error: No se encontró bun, tsc, ni npx");
  process.exit(1);
}

// Verificar que el build fue exitoso
const indexPath = path.join(distPath, "index.js");
if (fs.existsSync(indexPath)) {
  const stats = fs.statSync(indexPath);
  console.log(
    `✅ Build exitoso: dist/index.js (${Math.round(stats.size / 1024)}KB)`
  );
} else {
  console.error("❌ Error: dist/index.js no fue generado");
  process.exit(1);
}
