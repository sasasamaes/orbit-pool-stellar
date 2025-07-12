# 🏦 Wallet Grupal para Ahorro Comunitario

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=flat&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Next.js](https://img.shields.io/badge/Next.js-000000?style=flat&logo=next.js&logoColor=white)](https://nextjs.org/)
[![Stellar](https://img.shields.io/badge/Stellar-7B2CBF?style=flat&logo=stellar&logoColor=white)](https://stellar.org/)
[![Supabase](https://img.shields.io/badge/Supabase-3ECF8E?style=flat&logo=supabase&logoColor=white)](https://supabase.com/)

## 📋 Descripción

Una aplicación innovadora que digitaliza las tradicionales "cajas de ahorro" permitiendo a comunidades, familias y grupos sociales crear fondos comunes de manera segura y transparente. Utiliza la tecnología blockchain de Stellar para facilitar el ahorro colectivo y la generación de intereses mediante el protocolo DeFi Blend.

## 🎯 Visión

Facilitar el ahorro colectivo y la inversión para comunidades en Latinoamérica usando tecnología blockchain, aprovechando la autenticación social/segura y la transparencia de web3 para democratizar el acceso a servicios financieros.

## ✨ Objetivos Principales

- ✅ Permitir crear o unirse a "cajas de ahorro" digitales grupales
- ✅ Realizar aportes y retiros de manera sencilla y transparente
- ✅ Generar intereses automáticamente mediante Blend Protocol
- ✅ Proporcionar transparencia total en el manejo de fondos
- ✅ Ofrecer una experiencia de usuario intuitiva y segura

## 🎨 Documentación y Diagramas

### 📊 Diagramas Técnicos

- **[🏗️ Arquitectura del Sistema](docs/architecture-diagram.md)** - Vista general del monorepo y stack tecnológico
- **[👤 Flujo de Usuario](docs/user-flow-diagram.md)** - Experiencia completa del usuario
- **[🗄️ Esquema de Base de Datos](docs/database-schema.md)** - Modelo de datos con 8 tablas principales
- **[⭐ Integración Stellar & Blend](docs/stellar-blend-integration.md)** - Flujo de transacciones blockchain
- **[🚀 Arquitectura de Deployment](docs/deployment-architecture.md)** - Infraestructura de producción

### 📚 Documentación Técnica

- **[📋 TODO Técnico](specs/TODO.md)** - 120+ tareas específicas para el MVP
- **[📝 PRD](specs/prd.md)** - Product Requirements Document
- **[🔧 Tech Flow](specs/tech-flow.md)** - Flujo técnico detallado
- **[📖 Guía Completa](docs/README.md)** - Índice completo de documentación

## 👥 Usuarios Objetivo

### 🏘️ Comunidades

- **Barrios y vecindarios** que quieren ahorrar juntos
- **Grupos familiares** con metas financieras comunes
- **Organizaciones comunitarias** con proyectos específicos

### 🎯 Casos de Uso

- **Cajas de ahorro familiares** digitales
- **Fondos comunitarios** para proyectos locales
- **Grupos de inversión** pequeños y medianos
- **Ahorro cooperativo** entre amigos

## 🏗️ Arquitectura Técnica

### 📦 Estructura del Monorepo

```
communityWallet/
├── apps/
│   ├── frontend/         # Next.js 14+ con TypeScript
│   └── backend/          # Express.js con TypeScript
├── packages/
│   ├── contracts/        # Smart Contracts Soroban
│   ├── shared/           # Utilidades compartidas
│   └── types/            # Tipos TypeScript
├── docs/                 # Documentación técnica
└── specs/                # Especificaciones del proyecto
```

### 🛠️ Stack Tecnológico

#### Frontend

- **Next.js 14+** - Framework React con SSR/SSG
- **TypeScript** - Tipado estático
- **Tailwind CSS** - Estilos utilitarios
- **Supabase Auth** - Autenticación
- **Freighter API** - Integración con wallets Stellar

#### Backend

- **Express.js** - API REST
- **TypeScript** - Tipado estático
- **Supabase** - Base de datos y autenticación
- **Stellar SDK** - Integración blockchain
- **Blend SDK** - Protocolo DeFi

#### Blockchain

- **Stellar Network** - Blockchain principal
- **Soroban** - Smart contracts
- **Blend Protocol** - Generación de intereses
- **USDC** - Stablecoin principal

#### Infraestructura

- **Vercel** - Deployment frontend
- **Railway** - Deployment backend
- **Supabase** - Database y Auth
- **Sentry** - Error tracking

## 🚀 Instalación y Configuración

### 📋 Prerrequisitos

```bash
# Node.js 22+
node --version

# Bun
bun --version

# Stellar CLI
stellar --version
```

### ⚙️ Configuración Inicial

```bash
# Clonar repositorio
git clone https://github.com/tu-usuario/communityWallet.git
cd communityWallet

# Instalar dependencias
bun install

# Configurar variables de entorno
cp .env.example .env.local

# Configurar Supabase
cp apps/frontend/.env.local.example apps/frontend/.env.local
cp apps/backend/.env.example apps/backend/.env

# Inicializar base de datos
bun run db:setup
```

### 🔧 Variables de Entorno

#### Frontend (.env.local)

```bash
NEXT_PUBLIC_SUPABASE_URL=tu_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=tu_supabase_anon_key
NEXT_PUBLIC_STELLAR_NETWORK=testnet
NEXT_PUBLIC_API_URL=http://localhost:5000
```

#### Backend (.env)

```bash
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...
SUPABASE_URL=https://...
SUPABASE_SERVICE_ROLE_KEY=...
JWT_SECRET=tu_jwt_secret
STELLAR_NETWORK=testnet
BLEND_PROTOCOL_URL=https://...
```

### 🏃‍♂️ Desarrollo

```bash
# Instalar dependencias
bun install

# Iniciar desarrollo (frontend + backend)
bun run dev

# O iniciar por separado
bun run dev:frontend  # http://localhost:3000
bun run dev:backend   # http://localhost:5000

# Compilar smart contracts
bun run build:contracts

# Ejecutar tests
bun run test:all
```

## 🔄 Flujo de Trabajo

### 1. Crear Grupo de Ahorro

```typescript
// Usuario administrador crea grupo
const group = await createGroup({
  name: "Ahorro Familiar 2024",
  description: "Fondo para vacaciones familiares",
  rules: {
    minContribution: 50,
    maxContribution: 1000,
    withdrawalLimit: 500,
    requiresApproval: true,
  },
});
```

### 2. Unirse a Grupo

```typescript
// Usuario se une con código de invitación
const membership = await joinGroup({
  inviteCode: "FAM2024-ABC123",
  initialContribution: 100,
});
```

### 3. Realizar Transacciones

```typescript
// Aporte al grupo
const contribution = await contribute({
  groupId: group.id,
  amount: 200,
  walletSignature: signature,
});

// Retiro del grupo
const withdrawal = await withdraw({
  groupId: group.id,
  amount: 150,
  reason: "Gastos médicos",
});
```

## 🔐 Seguridad

### 🛡️ Medidas Implementadas

- **Autenticación dual**: Supabase Auth + Stellar wallets
- **Smart contracts**: Validación de reglas on-chain
- **Multisignatura**: Cuentas grupales seguras
- **Audit trail**: Registro completo de transacciones
- **Encriptación**: Datos sensibles protegidos

### 🔒 Best Practices

- **HTTPS obligatorio** en producción
- **Validación de inputs** en frontend y backend
- **Rate limiting** para prevenir abuso
- **Manejo seguro de errores**
- **Logs estructurados** para auditoría

## 📊 Métricas y Monitoreo

### 🎯 KPIs del Proyecto

- **Total Value Locked (TVL)**: $0 → $100K (Meta 6 meses)
- **Active Users**: 0 → 1,000 usuarios
- **Groups Created**: 0 → 100 grupos
- **Transaction Volume**: $0 → $50K mensual
- **Yield Generated**: Intereses generados via Blend

### 📈 Monitoreo Técnico

- **Uptime**: 99.9% disponibilidad
- **Response Time**: <200ms promedio
- **Error Rate**: <1% de requests
- **Database Performance**: Queries optimizadas
- **Blockchain Sync**: Sincronización en tiempo real

## 🚢 Roadmap

### 🎯 MVP (Fase 1 - 3 meses)

- [ ] Autenticación con Supabase y wallets Stellar
- [ ] Crear y unirse a grupos de ahorro
- [ ] Aportes y retiros básicos
- [ ] Integración con Blend Protocol
- [ ] Dashboard básico de usuario

### 🚀 Fase 2 (3-6 meses)

- [ ] Notificaciones push y email
- [ ] Reportes y analytics avanzados
- [ ] Múltiples tipos de grupos
- [ ] Integración con más wallets
- [ ] Versión mobile (PWA)

### 🌟 Fase 3 (6-12 meses)

- [ ] Governance tokens
- [ ] Integración con más protocolos DeFi
- [ ] Marketplace de grupos
- [ ] AI para recomendaciones
- [ ] Expansión a otras blockchains

## 🤝 Contribuir

### 📝 Guía de Contribución

1. **Fork** el repositorio
2. **Crear branch**: `git checkout -b feature/nueva-funcionalidad`
3. **Commit**: `git commit -m 'Agregar nueva funcionalidad'`
4. **Push**: `git push origin feature/nueva-funcionalidad`
5. **Pull Request**: Crear PR con descripción detallada

### 🐛 Reportar Issues

- Usar [templates de issues](https://github.com/tu-repo/issues/new/choose)
- Incluir pasos para reproducir
- Agregar screenshots si es necesario
- Etiquetar apropiadamente

### 🧪 Testing

```bash
# Ejecutar todos los tests
bun run test:all

# Coverage
bun run test:coverage

# E2E tests
bun run test:e2e
```

## 🔗 Enlaces Útiles

### 📚 Documentación

- [Stellar Developers](https://developers.stellar.org/)
- [Blend Protocol Docs](https://docs.blend.capital/)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)

### 🌐 Comunidad

- [Discord](https://discord.gg/sasasamaes)
- [Twitter](https://twitter.com/sasasamaes)
- [Telegram](https://t.me/sasasamaes)

## 📞 Soporte

### 🆘 Obtener Ayuda

- **Documentación**: Revisar [docs/](docs/) primero
- **Issues**: [Crear issue](https://github.com/tu-repo/issues/new)

### 👥 Equipo

- **Frontend**: Anouk Rimola
- **Backend**: Francisco Campos
- **Blockchain**: Francisco Campos
- **DevOps**: Anouk Rimola

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver el archivo [LICENSE](LICENSE) para más detalles.

---

<div align="center">
  <p>
    <strong>🏦 Community Wallet - Democratizando el ahorro comunitario</strong>
  </p>
  <p>
    Hecho con ❤️ por Francisco Campos y Anouk Rimola
  </p>
</div>
