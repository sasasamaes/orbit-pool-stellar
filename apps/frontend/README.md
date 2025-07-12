# Frontend - Community Wallet

## 📱 Aplicación Next.js

Frontend de la aplicación de Wallet Grupal para Ahorro Comunitario.

### 🛠️ Tecnologías

- Next.js 14+ con TypeScript
- Tailwind CSS para estilos
- Supabase Auth para autenticación
- Freighter API para wallets Stellar
- StellarWalletsKit para múltiples wallets

### 🚀 Instalación

```bash
npm install
cp .env.example .env.local
npm run dev
```

### 📁 Estructura

```
frontend/
├── src/
│   ├── app/          # App Router de Next.js
│   ├── components/   # Componentes reutilizables
│   ├── lib/          # Utilidades y configuración
│   ├── hooks/        # Custom hooks
│   └── types/        # Tipos TypeScript
├── public/           # Archivos estáticos
└── docs/             # Documentación específica
```

### 🔧 Scripts

- `dev` - Desarrollo
- `build` - Compilar para producción
- `start` - Iniciar en producción
- `lint` - Linting
- `test` - Tests
