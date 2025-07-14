#!/usr/bin/env node

const { execSync, spawn } = require("child_process");
const fs = require("fs");
const path = require("path");

// Debug: Show current working directory and structure
console.log("🔍 Current working directory:", process.cwd());
console.log("🔍 Directory contents:", fs.readdirSync("."));

// Verificar si el archivo compilado existe
const distPath = path.join(__dirname, "dist", "index.js");
console.log("🔍 Looking for dist file at:", distPath);

if (!fs.existsSync(distPath)) {
  console.error("❌ Error: dist/index.js no encontrado en:", distPath);

  // Try to find the file in alternative locations
  const possiblePaths = [
    path.join(process.cwd(), "dist", "index.js"),
    path.join(process.cwd(), "apps", "backend", "dist", "index.js"),
    path.join(__dirname, "..", "..", "apps", "backend", "dist", "index.js"),
  ];

  console.log("🔍 Checking alternative paths...");
  for (const altPath of possiblePaths) {
    console.log(
      `  - ${altPath}: ${fs.existsSync(altPath) ? "✅ EXISTS" : "❌ NOT FOUND"}`
    );
  }

  console.error('💡 Run "npm run build" first or check build configuration.');
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
console.log(`🎯 Executing: ${runtime} ${args.join(" ")}`);
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
  console.log(`🏁 Process exited with code: ${code}`);
  process.exit(code);
});
