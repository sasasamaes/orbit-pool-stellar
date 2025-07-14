#!/usr/bin/env node

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

// Verificar si el archivo compilado existe
const distPath = path.join(__dirname, "dist", "index.js");
if (!fs.existsSync(distPath)) {
  console.error(
    '❌ Error: dist/index.js no encontrado. Ejecuta "npm run build" primero.'
  );
  process.exit(1);
}

// Función para verificar si un comando está disponible
function commandExists(command) {
  try {
    execSync(`command -v ${command}`, { stdio: "ignore" });
    return true;
  } catch (error) {
    return false;
  }
}

// Detectar el runtime disponible
let runtime = null;
let args = ["dist/index.js"];

if (commandExists("bun")) {
  runtime = "bun";
  args = ["run", "dist/index.js"];
  console.log("🚀 Iniciando con Bun...");
} else if (commandExists("node")) {
  runtime = "node";
  console.log("🚀 Iniciando con Node.js...");
} else {
  console.error("❌ Error: Ni Bun ni Node.js están disponibles");
  process.exit(1);
}

// Iniciar el servidor
const child = spawn(runtime, args, {
  stdio: "inherit",
  env: process.env,
});

// Manejar señales de terminación
process.on("SIGTERM", () => {
  child.kill("SIGTERM");
});

process.on("SIGINT", () => {
  child.kill("SIGINT");
});

child.on("exit", (code) => {
  process.exit(code);
});
