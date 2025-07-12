Frontend en Next.js
Autenticación Supabase (Social, magic link)
Conexión web3 con wallet Stellar (LOBSTR, Freighter)
Backend Express.js
Contratos Soroban/Blend
Base de datos Supabase

Tech Flow – Wallet Grupal para Ahorro Comunitario

1. Autenticación y Onboarding
   Usuario entra al frontend (Next.js)
   Selecciona autenticación: Google, Apple, Facebook, Email OTP, Magic Link (Supervisado por Supabase Auth).
   Supabase valida e inicia sesión.
   El usuario recibe un JWT/session token.
2. Conexión de Wallet Stellar
   Frontend muestra opciones para conectar wallet:
   LOBSTR (via SEP-7/web o QR para mobile)
   Freighter (vía extensión web)
   Usuario conecta wallet.
   Se obtiene el publicKey (clave pública Stellar).
   Se guarda y asocia la cuenta wallet a su perfil Supabase.
3. Creación o Unirse a Grupo de Ahorro
   Usuario (autenticado y con wallet) crea un grupo o acepta invitación con link/email.
   Se definen reglas (periodicidad, monto, miembros).
   Grupo y miembros se crean en la base de datos Supabase.
4. Aporte de Fondos al Grupo
   El usuario inicia aporte desde el frontend.
   El frontend genera una transacción Stellar (transfiere USDC de su wallet al contrato wallet grupal en Stellar).
   El usuario firma la transacción con su wallet Freighter/Lobstr Signer.
   La transacción on-chain completa el aporte y se registra en Supabase.
5. Inversión Automática en Blend
   Cuando el monto grupal es suficiente o según reglas,
   El backend Express llama al contrato Soroban responsable del grupo.
   El contrato mueve los fondos grupales a Blend para generar intereses.
6. Dashboard y Transparencia
   Frontend muestra:
   Estado del grupo: aportes individuales, totales, intereses generados, saldo actual en Blend-on-chain.
   Todo se consulta al backend, que recopila datos desde la blockchain y Supabase DB.
7. Ciclo de Retiro/Reparto
   Al completar el ciclo de ahorro,
   Contrato Soroban retira fondos de Blend.
   Backend/contrato calcula reparto conforme a reglas.
   Back y frontend notifican a cada miembro su saldo disponible y permiten retirar (firma de transacción en wallet).
8. Auditoría y Seguimiento
   Todos los movimientos (ingresos, egresos, intereses) quedan visibles para todos los miembros, haciendo uso tanto de:
   La blockchain Stellar (operaciones públicas)
   El backend y Supabase para lógica y relacionamiento
