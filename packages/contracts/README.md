# Contracts - Community Wallet

## 🔐 Smart Contracts Soroban

Contratos inteligentes para la lógica de grupos y gestión de fondos.

### 🛠️ Tecnologías

- Soroban (Stellar Smart Contracts)
- Rust programming language
- Stellar SDK
- Blend Protocol integration

### 🚀 Instalación

```bash
# Instalar Rust y Soroban CLI
curl --proto '=https' --tlsv1.2 -sSf https://sh.rustup.rs | sh
cargo install --locked stellar-cli --features opt

# Compilar contratos
stellar contract build

# Desplegar en testnet
stellar contract deploy --wasm target/wasm32-unknown-unknown/release/community_wallet.wasm --network testnet
```

### 📁 Estructura

```
contracts/
├── src/
│   ├── lib.rs              # Contrato principal
│   ├── groups.rs           # Lógica de grupos
│   ├── contributions.rs    # Gestión de aportes
│   ├── withdrawals.rs      # Gestión de retiros
│   ├── blend_integration.rs # Integración con Blend
│   └── types.rs            # Tipos de datos
├── tests/                  # Tests de contratos
└── Cargo.toml             # Dependencias Rust
```

### 🔧 Funciones Principales

- `create_group()` - Crear nuevo grupo
- `join_group()` - Unirse a grupo
- `contribute()` - Realizar aporte
- `withdraw()` - Realizar retiro
- `invest_in_blend()` - Invertir en Blend
- `calculate_interest()` - Calcular intereses

### 🧪 Testing

```bash
cargo test
stellar contract invoke --id CONTRACT_ID -- function_name --arg value
```

### 🔒 Seguridad

- Autorización requerida para todas las operaciones
- Validación de reglas de grupo
- Protección contra reentrancy
- Auditorías de código
