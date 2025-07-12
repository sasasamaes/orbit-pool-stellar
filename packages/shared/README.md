# Shared - Community Wallet

## 🔄 Utilidades Compartidas

Utilidades y funciones compartidas entre frontend y backend.

### 📦 Contenido

- Funciones de validación
- Helpers para Stellar/Soroban
- Constantes del proyecto
- Utilidades de formato
- Configuración compartida

### 🛠️ Tecnologías

- TypeScript
- Stellar SDK
- Zod para validación
- Date-fns para fechas

### 📁 Estructura

```
shared/
├── src/
│   ├── validations/  # Esquemas de validación
│   ├── stellar/      # Utilidades Stellar
│   ├── constants/    # Constantes del proyecto
│   ├── utils/        # Funciones utilitarias
│   └── config/       # Configuración compartida
├── tests/            # Tests unitarios
└── package.json      # Configuración del paquete
```

### 🔧 Funciones Principales

- `validateGroupConfig()` - Validar configuración de grupo
- `formatAmount()` - Formatear cantidades
- `parseAddress()` - Parsear direcciones Stellar
- `calculateInterest()` - Calcular intereses
- `validateTransaction()` - Validar transacciones

### 📦 Uso

```typescript
import { validateGroupConfig, formatAmount } from "@community-wallet/shared";

const isValid = validateGroupConfig(groupData);
const formattedAmount = formatAmount(1000000, 7); // "1.0000000"
```
