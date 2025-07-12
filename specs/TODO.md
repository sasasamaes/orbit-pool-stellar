# 📋 TODO: Wallet Grupal Comunitaria MVP

## 🔧 Setup Inicial & Infraestructura

- [ ] **Configurar** monorepo con TurboRepo/NX incluyendo apps (frontend, backend) y packages (contracts, shared, types) `#prioridad`
- [ ] **Inicializar** proyecto Next.js 14+ con TypeScript en `apps/frontend`
- [ ] **Inicializar** proyecto Express.js con TypeScript en `apps/backend`
- [ ] **Configurar** Supabase proyecto con PostgreSQL y Auth habilitado `#prioridad`
- [ ] **Instalar** Stellar CLI y configurar entorno para Soroban development
- [ ] **Crear** variables de entorno para Testnet Stellar y configuración Blend
- [ ] **Configurar** ESLint, Prettier y Git hooks para calidad de código

## 🗄️ Backend & Base de Datos

- [ ] **Definir** esquema de base de datos en Supabase para Users, Groups, Transactions, Memberships
- [ ] **Crear** migraciones SQL para tablas principales con relaciones Foreign Key
- [ ] **Implementar** middleware JWT para validación de tokens Supabase
- [ ] **Crear** endpoints REST API:
  - `POST /api/groups` - crear grupo
  - `GET /api/groups/:id` - obtener grupo
  - `POST /api/groups/:id/join` - unirse a grupo
  - `POST /api/contributions` - registrar aporte
  - `GET /api/groups/:id/balance` - obtener balance grupal
- [ ] **Configurar** CORS para frontend Next.js
- [ ] **Implementar** validación de datos con Zod en todas las rutas
- [ ] **Configurar** logs estructurados con Winston o similar

## 🔐 Smart Contracts (Soroban)

- [ ] **Crear** contrato Soroban básico para gestión de grupos en `packages/contracts`
- [ ] **Implementar** función `create_group(creator: Address, name: String)` con validaciones
- [ ] **Implementar** función `join_group(group_id: String, member: Address)` con autorización
- [ ] **Implementar** función `contribute(group_id: String, amount: i128)` para aportes USDC
- [ ] **Implementar** función `get_group_balance(group_id: String)` para consultar saldos
- [ ] **Integrar** llamadas a Blend Protocol para inversión automática de fondos
- [ ] **Escribir** tests unitarios para todas las funciones del contrato
- [ ] **Compilar** y deployer contrato en Stellar Testnet
- [ ] **Generar** bindings TypeScript con `stellar contract bindings typescript`

## 🎨 Frontend (Next.js)

- [ ] **Configurar** Tailwind CSS y componentes UI base (botones, forms, cards)
- [ ] **Implementar** layout principal con navegación responsive
- [ ] **Crear** páginas principales:
  - `/` - landing page
  - `/dashboard` - dashboard principal
  - `/groups/new` - crear grupo
  - `/groups/[id]` - detalle de grupo
- [ ] **Implementar** componente AuthWrapper para rutas protegidas
- [ ] **Crear** componente ConnectWallet para integración Freighter/Lobstr
- [ ] **Implementar** formulario crear grupo con validación client-side
- [ ] **Crear** dashboard con visualización de saldos, intereses y transacciones
- [ ] **Implementar** sistema de invitaciones por email/link
- [ ] **Configurar** manejo de estados global con Zustand o Context API

## 🔗 Integración Stellar & Wallets

- [ ] **Instalar** `@stellar/freighter-api` y `@creit.tech/stellar-wallets-kit`
- [ ] **Implementar** detección y conexión automática de wallets Stellar
- [ ] **Crear** utilidades para firmar transacciones con wallet conectado
- [ ] **Implementar** función para transferir USDC desde wallet a contrato de grupo
- [ ] **Configurar** notificaciones de transacciones exitosas/fallidas
- [ ] **Implementar** validación de balances USDC antes de transacciones
- [ ] **Crear** componente para mostrar dirección Stellar conectada
- [ ] **Manejar** errores de conexión wallet y timeouts de transacción

## 💰 Integración Blend Protocol

- [ ] **Investigar** endpoints RPC de Blend para depósitos automáticos `#bloqueado`
- [ ] **Implementar** función para depositar fondos grupales en Blend pool
- [ ] **Crear** función para calcular intereses generados desde Blend
- [ ] **Implementar** retiro de fondos + intereses desde Blend cuando se requiera
- [ ] **Configurar** polling automático para actualizar intereses cada X minutos
- [ ] **Crear** fallback/mock para intereses si integración Blend falla `#contingencia`

## 🏗️ Packages Compartidos

- [ ] **Definir** tipos TypeScript en `packages/types` para Groups, Transactions, Users
- [ ] **Crear** utilidades de validación Zod en `packages/shared`
- [ ] **Implementar** helpers para formateo de cantidades Stellar (7 decimales)
- [ ] **Crear** constantes para direcciones de contratos y configuración de red
- [ ] **Implementar** utilidades para parsing de direcciones Stellar
- [ ] **Exportar** funciones compartidas entre frontend y backend

## 🧪 Testing & QA

- [ ] **Escribir** tests unitarios para funciones críticas del backend
- [ ] **Crear** tests de integración para flujo completo: crear grupo → aportar → ver saldo
- [ ] **Implementar** tests E2E con Playwright para flujo de usuario principal
- [ ] **Testear** integración wallet en diferentes navegadores (Chrome, Firefox)
- [ ] **Validar** manejo de errores en transacciones fallidas
- [ ] **Verificar** responsive design en mobile y desktop
- [ ] **Probar** flujo completo en Stellar Testnet con fondos reales

## 🚀 Deploy & Documentation

- [ ] **Configurar** Vercel para deploy automático de frontend desde main branch
- [ ] **Configurar** Railway/Render para deploy de backend Express.js
- [ ] **Crear** script de deploy para smart contracts a Stellar Mainnet
- [ ] **Configurar** variables de entorno de producción en todos los servicios
- [ ] **Documentar** APIs con Swagger/OpenAPI en `/docs/api`
- [ ] **Crear** video demo de 3 minutos mostrando flujo completo
- [ ] **Preparar** documentación de setup para desarrolladores
- [ ] **Configurar** monitoreo básico con logs y alertas de errores

## 🎯 Criterios de Aceptación MVP

- [ ] **Validar** que usuario puede registrarse con Google en <30 segundos
- [ ] **Verificar** que usuario puede conectar Freighter wallet exitosamente
- [ ] **Confirmar** que usuario puede crear grupo y obtener link de invitación
- [ ] **Testear** que usuario puede aportar USDC real desde wallet (testnet)
- [ ] **Validar** que dashboard muestra saldo grupal actualizado en tiempo real
- [ ] **Verificar** que intereses de Blend se muestran correctamente (o mock)
- [ ] **Confirmar** que flujo completo toma <10 minutos para usuario no técnico

## 🚨 Contingencias Identificadas

- [ ] **Implementar** mock de Blend API si integración toma >6 horas `#contingencia`
- [ ] **Crear** wallet fallback si Freighter falla (solo SEP-7) `#contingencia`
- [ ] **Simplificar** a email/OTP si OAuth social falla `#contingencia`
- [ ] **Preparar** demo con datos mockeados si testnet falla día del pitch `#contingencia`

---

## 📊 Métricas de Éxito

- Tiempo total de onboarding: <10 minutos
- Tasa de transacciones exitosas: >90%
- Tiempo de respuesta API: <2 segundos
- Cobertura de tests: >70%

## ⏰ Timeline Sugerido

**48-72 horas** siguiendo el roadmap del PRD, priorizando tareas marcadas con `#prioridad` y manteniendo contingencias listas para `#bloqueado`.

### 📅 Distribución de Tiempo

| Tiempo | Actividad Principal                        |
| ------ | ------------------------------------------ |
| 0-6h   | Setup inicial, monorepo, wireframes        |
| 6-18h  | Auth social, wallet connection, modelos DB |
| 18-30h | CRUD grupos, invitaciones, frontend base   |
| 30-40h | Aportes desde wallet, validación testnet   |
| 40-50h | Integración Blend, inversión automática    |
| 50-60h | Dashboard, balance, historial              |
| 60-68h | Testing E2E, polish UI, error handling     |
| 68-72h | Demo preparation, video, pitch             |

## 🎯 Entregables Finales

- [ ] **App web funcional** deployed en Vercel/Railway
- [ ] **Smart contracts** deployed en Stellar Testnet
- [ ] **Video demo** de 3 minutos mostrando flujo completo
- [ ] **Documentación técnica** actualizada
- [ ] **Pitch deck** para presentación final
