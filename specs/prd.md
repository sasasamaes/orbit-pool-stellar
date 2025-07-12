# PRD – Wallet Grupal para Ahorro Comunitario con Intereses

---

## 1. **Visión**

Facilitar el ahorro colectivo y la inversión para comunidades, familias o grupos sociales en Latinoamérica usando tecnología blockchain. Digitalizamos las tradicionales “cajas de ahorro” permitiendo a cualquier grupo conformar fondos comunes, invertirlos de forma segura para obtener intereses mediante Blend (protocolo DeFi en Stellar), y aprovechando la autenticación social/segura y la transparencia de la web3.

---

## 2. **Objetivos**

- Permitir a cualquier usuario crear o unirse a una “caja de ahorro” digital grupal.
- Realizar aportes y retiros de manera sencilla y transparente.
- Invertir automáticamente los fondos comunitarios en Blend para obtener intereses colectivos.
- Brindar onboarding sencillo mediante autenticación social/magic link/email.
- Garantizar seguridad y claridad en el manejo de los fondos gracias a la integración de wallets Stellar.
- Ofrecer visibilidad del ahorro, rendimiento, transacciones e historial a todos los participantes.

---

## 3. **Personas Usuarias**

- **Individuos o grupos** sin fácil acceso a servicios financieros (familias, amigos, cooperativas).
- **Migrantes o jóvenes** con conocimiento digital básico/intermedio.
- **Community managers** que promueven el ahorro colaborativo en zonas vulnerables.

---

## 4. **User Stories Principales**

### Como usuario:

- **Quiero** iniciar sesión de forma sencilla (email OTP/magic link o login social con Google, Apple, Facebook) para no depender de contraseñas tradicionales.
- **Quiero** conectar mi wallet Stellar web3 (como Freighter o LOBSTR), para aportar, invertir y retirar de forma segura.
- **Quiero** crear un grupo, definir las reglas (cuánto, cuándo, quiénes), e invitar a otras personas fácilmente.
- **Quiero** aportar fondos al grupo usando mi wallet, sin temor a fraudes o errores.
- **Quiero** saber en tiempo real cuánto hemos ahorrado e invertido, y cuántos intereses llevamos generados.
- **Quiero** retirar mi parte de los fondos (cuando la ronda/grupo lo permita) y que el proceso sea rápido y auditable.
- **Quiero** ver el historial de movimientos y reglas del grupo en todo momento.

---

## 5. **Funcionalidades Principales**

**Onboarding y Auth**

- Registro/login con Supabase (Email OTP, Magic Link, Google, Apple, Facebook).
- Vinculación de wallet Stellar (Freighter extensión, LOBSTR Signer, QR o SEP-7).

**Gestión de grupos**

- Crear grupo: nombre, reglas (número de miembros, monto, periodicidad, orden de retiros).
- Invitar usuarios (link, QR, email).
- Ver y modificar miembros del grupo.

**Aportes y retiros**

- Aportar fondos desde wallet Stellar (interfaz para firmar transacciones).
- Notificación para aportar y control de aportes pendientes.
- Retiro de capital e intereses siguiendo reglas del grupo, con firma on-chain.

**Inversión en Blend**

- Los fondos grupales se invierten automáticamente en Blend al alcanzar el umbral o al final del ciclo.
- Visualización de intereses generados.
- Retiro de fondos incluyendo rendimiento a los miembros.

**Transparencia y rendición de cuentas**

- Visibilidad del historial de aportes, retiros e intereses por usuario/grupo.
- Seguimiento de transacciones y estados on-chain.

**Dashboard**

- Dashboard con saldos, próximos ciclos, aportes realizados/pedientes, intereses generados, historial, reglas visibles.

---

## 6. **Alcance (Scope) del MVP**

- Lanzar solo versión web desktop/mobile.
- Integrar login/email, social y web3 wallet.
- Operar con USDC en Stellar.
- Un solo modelo de grupo (“tanda simple”).
- Integrar únicamente Blend como opción de inversión.
- Notificaciones básicas por email (vía Supabase).

---

## 7. **Requisitos Técnicos**

**Frontend**:

- Next.js + Tailwind/Chakra UI/AntD
- SDK Supabase
- Freighter API y/o SEP-7 integraciones

**Backend**:

- Express.js
- API REST/GraphQL
- Validación JWT de Supabase
- Comunicación web3 con Soroban/Stellar

**Contracts**:

- Soroban (Rust) — lógica grupal y Blend integration

**Infra**:

- Supabase (Auth y PostgreSQL)
- Stellar Testnet/Mainnet
- Blend Protocol

**Repositorio:**

- Monorepo con TurboRepo/NX

---

## 8. **KPI/Éxito -- Criterios de Aceptación**

- En menos de 5 minutos, un usuario puede: registrarse, conectar wallet, crear grupo, invitar a otro usuario, y aportar fondos.
- Fondos grupales se reflejan en tiempo real y muestran intereses generados de forma comprensible.
- Todas las transacciones críticas requieren firma on-chain del usuario.
- Cada usuario puede consultar su historial y saldo en cualquier momento.
- El retiro de fondos debe ser claro, seguro y con feedback inmediato.

---

## 9. **Roadmap Futuro (No MVP)**

- Multimoneda y opciones de stablecoins.
- Notificaciones push/SMS.
- Múltiples tipos de grupos, reglas avanzadas.
- Mobile app nativa.
- Métricas personalizadas, reputación y scoring.
- Integración con microcréditos.

---

## 10. **Riesgos y Consideraciones**

- Fricción en onboarding por desconocimiento cripto/web3 (mitigable con tutorial y soporte).
- Seguridad de los fondos — priorizar contratos auditables y transparente.
- Regulación local de stablecoins/web3.
