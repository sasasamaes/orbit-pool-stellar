# Types - Community Wallet

## 🏷️ Tipos TypeScript

Definiciones de tipos compartidos para todo el proyecto.

### 📦 Contenido

- Interfaces de datos
- Tipos de API
- Tipos de contratos Soroban
- Enums y constantes
- Tipos de autenticación

### 🛠️ Tecnologías

- TypeScript
- Stellar SDK Types
- Zod para runtime validation

### 📁 Estructura

```
types/
├── src/
│   ├── api/          # Tipos de API
│   ├── contracts/    # Tipos de contratos
│   ├── auth/         # Tipos de autenticación
│   ├── database/     # Tipos de base de datos
│   └── common/       # Tipos comunes
├── tests/            # Tests de tipos
└── package.json      # Configuración del paquete
```

### 🔧 Tipos Principales

```typescript
// Grupo de ahorro
interface SavingsGroup {
  id: string;
  name: string;
  members: Address[];
  rules: GroupRules;
  totalAmount: bigint;
  interestGenerated: bigint;
  status: GroupStatus;
  createdAt: Date;
}

// Reglas del grupo
interface GroupRules {
  memberLimit: number;
  contributionAmount: bigint;
  frequency: ContributionFrequency;
  withdrawalOrder: WithdrawalOrder[];
  minimumMembers: number;
}

// Transacción
interface Transaction {
  id: string;
  groupId: string;
  userId: string;
  amount: bigint;
  type: TransactionType;
  status: TransactionStatus;
  stellarTxHash: string;
  timestamp: Date;
}
```

### 📦 Uso

```typescript
import type { SavingsGroup, Transaction } from "@community-wallet/types";

const group: SavingsGroup = {
  id: "123",
  name: "Grupo Familiar",
  // ... resto de propiedades
};
```
