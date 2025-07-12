# 👤 Diagrama de Flujo de Usuario

## Community Wallet - Experiencia de Usuario

```mermaid
flowchart TD
    A["🚀 Usuario Inicia Sesión"] --> B{"👤 ¿Primer Ingreso?"}
    B -->|Sí| C["📝 Crear Perfil"]
    B -->|No| D["🏠 Dashboard Principal"]

    C --> D
    D --> E{"🎯 ¿Qué Desea Hacer?"}

    E -->|Crear Grupo| F["📋 Formulario Nuevo Grupo"]
    E -->|Unirse a Grupo| G["🔍 Buscar Grupo por Código"]
    E -->|Ver Mis Grupos| H["📊 Lista de Grupos"]

    F --> I["⚙️ Configurar Reglas del Grupo"]
    I --> J["🎨 Personalizar Grupo"]
    J --> K["📤 Compartir Código de Invitación"]
    K --> L["✅ Grupo Creado"]

    G --> M{"🔑 ¿Código Válido?"}
    M -->|Sí| N["📋 Formulario de Unión"]
    M -->|No| O["❌ Error - Código Inválido"]
    O --> G

    N --> P["💰 Realizar Primer Aporte"]
    P --> Q["✅ Miembro Activo"]

    H --> R["📊 Seleccionar Grupo"]
    R --> S["💼 Vista Detallada del Grupo"]

    S --> T{"🎯 Acciones Disponibles"}
    T -->|Aportar| U["💸 Realizar Aporte"]
    T -->|Retirar| V["🏦 Solicitar Retiro"]
    T -->|Ver Historial| W["📈 Historial de Transacciones"]
    T -->|Configurar| X["⚙️ Configuración del Grupo"]

    U --> Y["👛 Conectar Wallet"]
    Y --> Z["🔐 Firmar Transacción"]
    Z --> AA["✅ Aporte Confirmado"]

    V --> BB{"🔍 ¿Cumple Reglas?"}
    BB -->|Sí| CC["👛 Conectar Wallet"]
    BB -->|No| DD["❌ Retiro Rechazado"]

    CC --> EE["🔐 Firmar Transacción"]
    EE --> FF["✅ Retiro Confirmado"]

    style A fill:#e3f2fd
    style L fill:#e8f5e8
    style Q fill:#e8f5e8
    style AA fill:#e8f5e8
    style FF fill:#e8f5e8
    style O fill:#ffebee
    style DD fill:#ffebee
```

## 🎯 Casos de Uso Principales

### 1. Crear Grupo de Ahorro

- **Administrador** define reglas y configuración
- **Sistema** genera código de invitación único
- **Administrador** comparte código con miembros

### 2. Unirse a Grupo

- **Usuario** introduce código de invitación
- **Sistema** valida código y permisos
- **Usuario** realiza primer aporte obligatorio

### 3. Realizar Transacciones

- **Aportes**: Transferencia desde wallet personal
- **Retiros**: Validación de reglas y consenso
- **Intereses**: Generación automática via Blend

### 4. Gestión de Grupo

- **Historial**: Visualización de transacciones
- **Configuración**: Modificar reglas (solo admin)
- **Notificaciones**: Eventos importantes

## 🔒 Validaciones de Seguridad

- **Autenticación**: Supabase Auth + Stellar wallet
- **Autorización**: Roles y permisos por grupo
- **Transacciones**: Firmas digitales obligatorias
- **Reglas**: Validación automática de retiros
