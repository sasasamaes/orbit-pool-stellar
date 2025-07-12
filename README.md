# 🏦 Wallet Grupal para Ahorro Comunitario

## 📋 Descripción

Una aplicación innovadora que digitaliza las tradicionales "cajas de ahorro" permitiendo a comunidades, familias y grupos sociales crear fondos comunes de manera segura y transparente. Utiliza la tecnología blockchain de Stellar para facilitar el ahorro colectivo y la generación de intereses mediante el protocolo DeFi Blend.

## 🎯 Visión

Facilitar el ahorro colectivo y la inversión para comunidades en Latinoamérica usando tecnología blockchain, aprovechando la autenticación social/segura y la transparencia de web3 para democratizar el acceso a servicios financieros.

## ✨ Objetivos Principales

- ✅ Permitir crear o unirse a "cajas de ahorro" digitales grupales
- ✅ Realizar aportes y retiros de manera sencilla y transparente
- ✅ Invertir automáticamente los fondos comunitarios en Blend para obtener intereses
- ✅ Brindar onboarding sencillo mediante autenticación social/magic link
- ✅ Garantizar seguridad y transparencia en el manejo de fondos
- ✅ Ofrecer visibilidad completa del ahorro, rendimiento y transacciones

## 👥 Usuarios Objetivo

- **Individuos o grupos** sin fácil acceso a servicios financieros
- **Migrantes o jóvenes** con conocimiento digital básico/intermedio
- **Community managers** que promueven el ahorro colaborativo
- **Cooperativas y asociaciones** que buscan digitalizar sus procesos

## 🏗️ Arquitectura Técnica

### Stack Tecnológico

**Frontend:**

- Next.js con TypeScript
- Tailwind CSS / Chakra UI
- Supabase SDK para autenticación
- Freighter API para integración con wallets Stellar

**Backend:**

- Express.js con TypeScript
- API REST con validación JWT
- Integración con Soroban/Stellar
- Comunicación con protocolo Blend

**Blockchain:**

- Stellar Network (Testnet/Mainnet)
- Soroban Smart Contracts (Rust)
- Protocolo Blend para generación de intereses
- USDC como token principal

**Infraestructura:**

- Supabase (Auth + PostgreSQL)
- Monorepo con TurboRepo/NX

## 🔄 Flujo Técnico

### 1. Autenticación y Onboarding

- Autenticación social (Google, Apple, Facebook) via Supabase
- Magic Link y Email OTP
- Conexión segura con wallet Stellar (Freighter/LOBSTR)

### 2. Gestión de Grupos

- Creación de grupos con reglas personalizables
- Invitación de miembros via link/email
- Definición de periodicidad y montos

### 3. Aportes y Transacciones

- Transferencias de USDC desde wallet personal
- Firma de transacciones on-chain
- Registro automático en base de datos

### 4. Inversión Automática

- Inversión de fondos grupales en protocolo Blend
- Generación de intereses de manera automática
- Transparencia total del rendimiento

### 5. Retiros y Distribución

- Retiros según reglas del grupo
- Distribución automática de intereses
- Auditoría completa de transacciones

## 📁 Estructura del Proyecto

```
communityWallet/
├── apps/
│   ├── frontend/          # Aplicación Next.js
│   └── backend/           # API Express.js
├── packages/
│   ├── contracts/         # Smart contracts Soroban
│   ├── shared/           # Utilidades compartidas
│   └── types/            # Tipos TypeScript
├── specs/                # Documentación técnica
└── docs/                 # Documentación del proyecto
```

## 🚀 Instalación y Setup

### Prerrequisitos

- Node.js v18.14.1 o superior
- npm/yarn
- Stellar CLI
- Cuenta en Supabase
- Wallet Stellar (Freighter recomendado)

### Instalación

```bash
# Clonar el repositorio
git clone https://github.com/tu-usuario/communityWallet.git
cd communityWallet

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env
# Editar .env con tus configuraciones

# Compilar contratos
npm run build:contracts

# Inicializar base de datos
npm run db:setup

# Iniciar en modo desarrollo
npm run dev
```

### Configuración de Entorno

```env
# Supabase
SUPABASE_URL=tu_supabase_url
SUPABASE_ANON_KEY=tu_supabase_anon_key

# Stellar
STELLAR_NETWORK=testnet
STELLAR_RPC_URL=https://soroban-testnet.stellar.org:443
STELLAR_NETWORK_PASSPHRASE=Test SDF Network ; September 2015

# Blend Protocol
BLEND_POOL_ADDRESS=tu_blend_pool_address
```

## 💡 Funcionalidades Principales

### 🔐 Autenticación Segura

- Login social con Google, Apple, Facebook
- Magic Link y Email OTP
- Integración con wallets Stellar

### 👥 Gestión de Grupos

- Creación de grupos con reglas personalizables
- Invitación de miembros
- Roles y permisos configurables

### 💰 Manejo de Fondos

- Aportes automáticos o manuales
- Inversión en protocolo Blend
- Generación de intereses
- Retiros programados

### 📊 Dashboard Completo

- Saldos en tiempo real
- Historial de transacciones
- Rendimiento de inversiones
- Proyecciones futuras

### 🔍 Transparencia Total

- Todas las transacciones en blockchain
- Auditoría completa de movimientos
- Visibilidad para todos los miembros

## 🛠️ Comandos de Desarrollo

```bash
# Desarrollo
npm run dev              # Iniciar en modo desarrollo
npm run build            # Compilar para producción
npm run start            # Iniciar en producción

# Contratos
npm run build:contracts  # Compilar contratos Soroban
npm run deploy:contracts # Desplegar contratos
npm run test:contracts   # Ejecutar tests de contratos

# Base de datos
npm run db:setup         # Configurar base de datos
npm run db:migrate       # Ejecutar migraciones
npm run db:seed          # Poblar con datos de ejemplo

# Testing
npm run test             # Ejecutar todos los tests
npm run test:e2e         # Tests end-to-end
npm run test:unit        # Tests unitarios
```

## 🔗 Integración con Stellar y Blend

### Stellar Network

- Utiliza USDC como token principal
- Transacciones seguras y transparentes
- Costos de transacción ultra bajos
- Confirmaciones rápidas

### Protocolo Blend

- Lending pools aislados para seguridad
- Intereses competitivos
- Backstop modules para protección
- Liquidez profunda

### Smart Contracts

- Lógica de grupos y reglas
- Gestión automática de fondos
- Integración con Blend
- Auditoría y transparencia

## 📈 Roadmap

### MVP (Fase 1)

- [x] Autenticación social y web3
- [x] Creación de grupos básicos
- [x] Aportes y retiros
- [x] Integración con Blend
- [x] Dashboard fundamental

### Fase 2

- [ ] Múltiples tipos de grupos
- [ ] Notificaciones push/SMS
- [ ] Aplicación móvil nativa
- [ ] Múltiples stablecoins

### Fase 3

- [ ] Integración con microcréditos
- [ ] Métricas y scoring
- [ ] Herramientas de análisis
- [ ] Expansión internacional

## 🤝 Contribución

¡Las contribuciones son bienvenidas! Para contribuir:

1. Fork el proyecto
2. Crea una rama para tu feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit tus cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Abre un Pull Request

## 📜 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo `LICENSE` para más detalles.

## 🔒 Seguridad

La seguridad es nuestra prioridad. Para reportar vulnerabilidades:

- **NO** abras issues públicos para problemas de seguridad
- Envía un email a security@communityWallet.com
- Incluye todos los detalles relevantes

## 📞 Soporte

- **Discord:** [discord.gg/communityWallet](https://discord.gg/sasasamaes)
- **Email:** hey@francampos.me
- **Twitter:** [@communityWallet](https://twitter.com/sasasamaes)

## 🌟 Agradecimientos

- **Stellar Development Foundation** por la infraestructura blockchain
- **Blend Protocol** por el protocolo DeFi
- **Supabase** por los servicios de backend
- **Comunidad open source** por las herramientas utilizadas

---

**Hecho con ❤️ por Francisco Campos y Anouk Rimola**
