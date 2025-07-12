🏗️ Technical Cheat Sheet — Wallet Grupal Comunitaria con Intereses (Stellar, Blend, Supabase, Web3)

1. Frontend (Next.js)
   Stack: Next.js (React), Tailwind/Chakra UI (opcional), JavaScript/TypeScript.
   Autenticación:
   Supabase Auth:
   Email (OTP, Magic Link)
   Google, Apple, Facebook (OAuth social)
   Conexión con sesión Supabase.
   Web3/Wallet Integration:
   Opción 1: Freighter API
   Instalación:
   bash
   npm install @stellar/freighter-api
   Ejemplo:
   js
   import { getPublicKey } from "@stellar/freighter-api";
   const pk = await getPublicKey();
   Opción 2: SEP-7 / Lobstr Signer
   Genera SEP-7 URI, abrir nueva pestaña o QR para firmar.
   Funcionalidad:
   Onboarding, dashboard de grupos, listado de grupos, historial de transacciones, integración con backend (API REST/GraphQL).
2. Backend (Express.js)
   Endpoints:
   Autorizados con JWT de Supabase en los headers.
   Creación/actualización de grupos.
   Registro de aportes y retiros.
   Consulta de historial/fondos.
   Lógica:
   Recibe instrucciones del frontend.
   Orquesta llamadas a contratos Soroban en Stellar.
   Integra con Blend para depositar/reclamar intereses.
   Seguridad:
   Valida que el publicKey asociado corresponde al usuario autenticado via Supabase.
3. Auth & Database (Supabase)
   PostgreSQL para datos de usuario, grupos, membresías, historial de aportes/retiros.
   Supabase Auth: rápido y seguro para onboarding.
   Ventajas: evitas tener que construir tu propio backend de auth, social login listo para producción.
4. Smart Contracts (Soroban + Blend)
   Soroban:
   Lógica de control sobre la wallet grupal:
   Administrar miembros,
   Validar aportes y reglas,
   Dispersión automática de retiro/interés.
   Blend:
   Deposita el saldo ahorrado
   Realiza operaciones de lending/borrowing para generar intereses.
   Lenguaje: Rust.
   Repo: Carpeta /packages/contracts en monorepo.
5. Stellar Blockchain
   Tokens: USDC, XLM, etc.
   Wallets: Freighter/LOBSTR para firmar/transaccionar.
   SEP-7: Usado para facilitar solicitudes de transacción al usuario (sobre todo en mobile/web).
   Monitor: Herramientas como Stellar Expert para auditar movimientos.
6. Infraestructura y Organización
   Monorepo: TurboRepo/NX, workspace con subcarpetas:
   /apps/frontend
   /apps/backend
   /packages/contracts
   /packages/shared (Utilidades comunes)
   .env: variables para Supabase (URL, Public Key), endpoints Stellar, etc.
7. User Flow (Súper resumido)
   Usuario ingresa y se autentica (Supabase).
   Usuario conecta su wallet Web3 (Freighter/LOBSTR).
   Crea/grupo de ahorro o se suma a uno.
   Realiza aporte con su wallet (firma on-chain).
   Contrato Soroban invierte fondo grupal en Blend.
   El grupo gana intereses y puede retirar capital/intereses al cierre del ciclo.
   Todo es transparente y auditable.
8. Comandos Útiles
   Inicializa Next.js:
   bash
   npx create-next-app
   Inicializa Express:
   bash
   npm init -y & npm install express
   Configura Supabase: > Guía Quickstart
   Instala Freighter:
   bash
   npm install @stellar/freighter-api
   Compila Contratos Soroban:
   bash
   cargo build --target wasm32-unknown-unknown --release
