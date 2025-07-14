const path = require("path");

/** @type {import('next').NextConfig} */
const nextConfig = {
  // Transpila los paquetes que usan sintaxis moderna o que causan problemas de resolución.
  // Esta es la forma recomendada y moderna de manejar dependencias problemáticas.
  transpilePackages: ["@creit.tech/stellar-wallets-kit", "@ngneat/elf", "rxjs"],

  webpack: (config, { isServer }) => {
    const rxjsPath = path.resolve(__dirname, "../../node_modules/rxjs");

    // Alias para asegurar que todas las partes de la app usen la misma copia de rxjs.
    config.resolve.alias["rxjs"] = rxjsPath;

    // Alias explícito para el import que está fallando.
    config.resolve.alias["rxjs/operators"] = path.join(rxjsPath, "operators");

    // SOLUCIÓN: Excluir sodium-native del bundle del cliente y forzar el uso de tweetnacl.
    // Esto resuelve el "Critical dependency" warning y errores de firma en el navegador.
    config.externals = {
      "sodium-native": "tweetnacl",
    };

    return config;
  },

  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.dicebear.com",
        port: "",
        pathname: "/8.x/initials/svg",
      },
    ],
  },
};

module.exports = nextConfig;
