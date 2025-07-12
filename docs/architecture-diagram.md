# 🏗️ Diagrama de Arquitectura del Sistema

## Community Wallet - Arquitectura General

```mermaid
graph TD
    A["👤 Usuario"] --> B["🌐 Frontend Next.js"]
    B --> C["🔐 Supabase Auth"]
    B --> D["🔙 Backend Express.js"]
    B --> E["👛 Freighter Wallet"]

    D --> F["🗄️ Supabase PostgreSQL"]
    D --> G["⭐ Stellar Network"]
    D --> H["🏦 Blend Protocol"]

    I["📄 Smart Contracts<br/>Soroban"] --> G
    G --> J["💰 USDC Asset"]
    G --> K["🏛️ Stellar Accounts"]

    H --> L["📈 Lending Pool"]
    H --> M["💸 Interest Generation"]

    subgraph "Monorepo Structure"
        N["📦 packages/types"]
        O["📦 packages/shared"]
        P["📦 packages/contracts"]
    end

    B -.-> N
    D -.-> N
    B -.-> O
    D -.-> O
    I -.-> P

    style A fill:#e1f5fe
    style B fill:#f3e5f5
    style D fill:#e8f5e8
    style G fill:#fff3e0
    style H fill:#fce4ec
```

## 🔧 Componentes Principales

### Frontend (Next.js)

- Interface de usuario responsive
- Autenticación con Supabase
- Integración con wallets Stellar
- Gestión de estado global

### Backend (Express.js)

- API REST para operaciones CRUD
- Middleware de autenticación
- Integración con Stellar SDK
- Validación de transacciones

### Smart Contracts (Soroban)

- Lógica de grupos de ahorro
- Gestión de aportes y retiros
- Integración con Blend Protocol
- Eventos y notificaciones

### Integración Stellar/Blend

- Cuentas multisignatura
- Transacciones atómicas
- Generación de intereses
- Gestión de assets USDC
