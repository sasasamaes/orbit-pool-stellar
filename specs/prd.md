# PRD – Hackathon MVP: Wallet Grupal Comunitaria en Stellar

---

### 1. \*\*Nombre del Proyecto y Resumen Ejecutivo

**Nombre:**  
Wallet Grupal Comunitaria DeFi

**Resumen Ejecutivo:**  
Desarrollaremos una aplicación web que empodera a grupos (amigos, familias, cooperativas, comunidades rurales) en Latinoamérica para crear “cajas de ahorro” digitales seguras en blockchain. Permitirá a cualquier grupo ahorrar de forma colectiva, invertir automáticamente fondos en protocolos DeFi como Blend (sobre Stellar) y así obtener intereses transparentes, todo con una experiencia simple y social.

---

### 2. **Problema y Solución Propuesta**

**Problema:**  
En América Latina, las comunidades carecen de herramientas seguras, transparentes y accesibles para ahorrar e invertir colectivamente.

**Solución:**  
Una app web que permite a las personas crear grupos, aportar fondos desde sus wallets Stellar y, de forma automática, invertir estos fondos en Blend para generar intereses. Los usuarios pueden ver su saldo, intereses y toda la actividad del grupo de forma transparente y controlada.

---

### 3. **Audiencia Objetivo**

- Grupos de amigos
- Familias
- Cooperativas
- Comunidades rurales

---

### 4. **Funcionalidades Clave del MVP**

- **Onboarding:** Login social (email, Google) vía Supabase.
- **Creación de grupo:** Crear nueva “caja de ahorro”, definir nombre.
- **Invitación:** Invitar miembros por email o link.
- **Conexión de wallet Stellar:** Integración con Freighter/Lobstr.
- **Aportar fondos:** Enviar USDC/XLM desde wallet Stellar al grupo.
- **Inversión automática:** Depósito colectivo en Blend para generar intereses.
- **Dashboard:** Visualización del saldo total, intereses acumulados y aportes individuales.
- **Auditoría básica:** Ver historial de movimientos del grupo.

---

### 5. **Stack Tecnológico**

- **Frontend:** Next.js (React)
- **Backend:** Express.js (Node)
- **Base de datos y autenticación:** Supabase (PostgreSQL + Auth)
- **Blockchain:** Stellar (StellarJS, SEP-7)
- **Wallet:** Freighter y/o Lobstr
- **DeFi:** Blend protocol (sobre Stellar)
- **Smart Contracts:** Soroban (Rust)

---

### 6. **Criterios de Éxito en el Hackathon**

- El usuario puede registrarse, conectar su wallet, crear un grupo, invitar a un miembro, realizar un aporte real (en testnet), y visualizar en menos de 10 minutos el balance grupal y los intereses generados.
- La experiencia es transparente, simple y segura para perfiles no técnicos.
- El demo muestra claramente mejoras sobre métodos tradicionales (transparencia, seguridad, intereses visibles).

---

### 7. **Roadmap de 48-72 Horas**

| Tiempo | Actividad                                                                   |
| ------ | --------------------------------------------------------------------------- |
| 0-6h   | Definir flujos, diseñar wireframes, setup monorepo y entorno de trabajo     |
| 6-18h  | Implementar login social y conexión de wallet, crear modelo de datos Grupo  |
| 18-30h | Crear y listar grupos, flujo de invitación/aceptación                       |
| 30-40h | Integrar aporte desde wallet (testnet), validar recepción y DB              |
| 40-50h | Desarrollar integración Blend (fondos del grupo invertidos automáticamente) |
| 50-60h | Generar dashboard: saldo, intereses, historial                              |
| 60-68h | Testeo end-to-end, pulido de UI y error handling                            |
| 68-72h | Preparar pitch demo y video                                                 |

---

### 8. **Responsabilidades del Equipo**

- **Lead Dev / Full Stack:** Infraestructura, backend API, integración blockchain/smart contract.
- **Frontend Dev:** UI/UX, conexión wallet, integración con backend y auth.
- **Blockchain Dev:** Contrato Soroban mínimo e integración Blend.
- **Product Manager / QA:** Gestión de tiempos, documentación, presentación/pitch, pruebas y feedback continuo.

---

### 9. **Riesgos Principales y Contingencias**

| Riesgo                                  | Contingencia                                    |
| --------------------------------------- | ----------------------------------------------- |
| Dificultad integración Blend/Soroban    | Mockear respuesta de intereses si surge bloqueo |
| Problemas con conexión de wallet        | Limitar soporte a Freighter o solo SEP-7        |
| Falta de tiempo en integración completa | Priorizar flujo: login → crear/grupo → aporte   |
| Problemas con Auth social en Supabase   | Habilitar fallback con email/OTP                |
| UX no intuitiva                         | Usar plantilla sencilla, pedir feedback rápido  |
