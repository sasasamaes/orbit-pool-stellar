# 🗄️ Esquema de Base de Datos

## Community Wallet - Estructura de Datos

```mermaid
erDiagram
    USERS ||--o{ USER_GROUPS : belongs_to
    GROUPS ||--o{ USER_GROUPS : has_many
    GROUPS ||--o{ TRANSACTIONS : contains
    GROUPS ||--o{ GROUP_RULES : has_rules
    USERS ||--o{ TRANSACTIONS : makes
    GROUPS ||--o{ INVITATIONS : generates
    USERS ||--o{ INVITATIONS : receives
    GROUPS ||--o{ BLEND_POOLS : uses

    USERS {
        uuid id PK
        string stellar_address UK
        string email UK
        string full_name
        string phone
        json profile_data
        boolean is_active
        timestamp created_at
        timestamp updated_at
    }

    GROUPS {
        uuid id PK
        string name
        string description
        string invite_code UK
        uuid creator_id FK
        string stellar_account
        string contract_address
        decimal total_amount
        integer member_count
        string status
        json metadata
        timestamp created_at
        timestamp updated_at
    }

    USER_GROUPS {
        uuid id PK
        uuid user_id FK
        uuid group_id FK
        string role
        decimal total_contributed
        decimal total_withdrawn
        timestamp joined_at
        boolean is_active
        json member_metadata
    }

    TRANSACTIONS {
        uuid id PK
        uuid group_id FK
        uuid user_id FK
        string stellar_tx_hash UK
        string type
        decimal amount
        string status
        string description
        json stellar_operation
        timestamp processed_at
        timestamp created_at
    }

    GROUP_RULES {
        uuid id PK
        uuid group_id FK
        decimal min_contribution
        decimal max_contribution
        integer contribution_frequency
        decimal withdrawal_limit
        boolean requires_approval
        integer min_members
        integer max_members
        json custom_rules
        timestamp created_at
        timestamp updated_at
    }

    INVITATIONS {
        uuid id PK
        uuid group_id FK
        uuid inviter_id FK
        uuid invitee_id FK
        string status
        string invite_code
        timestamp expires_at
        timestamp used_at
        timestamp created_at
    }

    BLEND_POOLS {
        uuid id PK
        uuid group_id FK
        string pool_address
        string asset_code
        decimal deposited_amount
        decimal earned_interest
        decimal current_balance
        timestamp last_update
        json pool_metadata
    }
```

## 📋 Descripción de Tablas

### 👤 USERS

**Usuarios del sistema**

- `stellar_address`: Dirección pública de Stellar del usuario
- `email`: Email para autenticación con Supabase
- `profile_data`: Información adicional del perfil (JSON)
- `is_active`: Estado del usuario

### 👥 GROUPS

**Grupos de ahorro comunitario**

- `invite_code`: Código único para unirse al grupo
- `creator_id`: Usuario que creó el grupo
- `stellar_account`: Cuenta Stellar del grupo (multisig)
- `contract_address`: Dirección del smart contract
- `total_amount`: Monto total acumulado
- `status`: Estado del grupo (active, paused, closed)

### 🔗 USER_GROUPS

**Relación usuarios-grupos**

- `role`: Rol del usuario (admin, member, viewer)
- `total_contributed`: Total aportado por el usuario
- `total_withdrawn`: Total retirado por el usuario
- `member_metadata`: Datos específicos del miembro

### 💰 TRANSACTIONS

**Historial de transacciones**

- `stellar_tx_hash`: Hash de la transacción en Stellar
- `type`: Tipo (contribution, withdrawal, interest)
- `stellar_operation`: Datos completos de la operación
- `status`: Estado (pending, confirmed, failed)

### ⚙️ GROUP_RULES

**Reglas de funcionamiento del grupo**

- `min/max_contribution`: Límites de aportes
- `contribution_frequency`: Frecuencia de aportes
- `withdrawal_limit`: Límite de retiros
- `requires_approval`: Si requiere aprobación
- `custom_rules`: Reglas personalizadas (JSON)

### 📧 INVITATIONS

**Invitaciones a grupos**

- `invite_code`: Código único de invitación
- `expires_at`: Fecha de expiración
- `used_at`: Fecha de uso
- `status`: Estado (pending, used, expired)

### 🏦 BLEND_POOLS

**Integración con Blend Protocol**

- `pool_address`: Dirección del pool en Blend
- `asset_code`: Código del asset (USDC)
- `deposited_amount`: Monto depositado
- `earned_interest`: Intereses ganados
- `current_balance`: Balance actual

## 🔐 Índices y Constraints

### Índices Principales

- `users_stellar_address_idx` (UNIQUE)
- `groups_invite_code_idx` (UNIQUE)
- `transactions_stellar_tx_hash_idx` (UNIQUE)
- `user_groups_user_group_idx` (UNIQUE)

### Constraints

- `users_email_unique`
- `groups_invite_code_unique`
- `transactions_stellar_tx_hash_unique`
- `user_groups_user_id_group_id_unique`

## 🚀 Consideraciones de Rendimiento

- **Particionamiento**: Transacciones por fecha
- **Índices**: Optimización de consultas frecuentes
- **Archivado**: Datos históricos older than 2 años
- **Caching**: Redis para datos frequently accessed
