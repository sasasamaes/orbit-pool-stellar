# Backend - Community Wallet

## 🔧 API Express.js

Backend de la aplicación de Wallet Grupal para Ahorro Comunitario.

### 🛠️ Tecnologías

- Express.js con TypeScript
- Supabase (Base de datos y autenticación)
- JWT Authentication
- Stellar SDK para transacciones
- Blend Protocol integration

### 🚀 Instalación

```bash
npm install
cp .env.example .env
npm run dev
```

### 📁 Estructura

```
backend/
├── src/
│   ├── routes/       # Rutas de la API
│   ├── controllers/  # Controladores
│   ├── middleware/   # Middleware personalizado
│   ├── services/     # Lógica de negocio
│   ├── models/       # Modelos de datos
│   └── utils/        # Utilidades
├── prisma/           # Esquemas de base de datos
└── docs/             # Documentación de API
```

### 🔗 Endpoints Principales

- `POST /api/auth/login` - Autenticación
- `POST /api/groups` - Crear grupo
- `GET /api/groups/:id` - Obtener grupo
- `POST /api/contributions` - Realizar aporte
- `POST /api/withdrawals` - Realizar retiro

### 🔧 Scripts

- `dev` - Desarrollo con hot reload
- `build` - Compilar TypeScript
- `start` - Iniciar en producción
- `test` - Tests unitarios
- `migrate` - Ejecutar migraciones
