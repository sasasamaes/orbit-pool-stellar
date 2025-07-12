# Documentación - Community Wallet

## 📚 Documentación del Proyecto

Documentación completa del proyecto Community Wallet.

### 📑 Contenido

- Arquitectura del sistema
- Guías de desarrollo
- Documentación de API
- Diagramas de flujo
- Casos de uso
- Manuales de usuario

### 📁 Estructura

```
docs/
├── architecture/         # Arquitectura del sistema
│   ├── system-design.md
│   ├── database-schema.md
│   └── api-design.md
├── development/          # Guías de desarrollo
│   ├── setup.md
│   ├── contributing.md
│   └── deployment.md
├── api/                  # Documentación de API
│   ├── endpoints.md
│   ├── authentication.md
│   └── examples.md
├── contracts/            # Documentación de contratos
│   ├── functions.md
│   ├── events.md
│   └── integration.md
├── user-guides/          # Guías de usuario
│   ├── getting-started.md
│   ├── creating-groups.md
│   └── managing-funds.md
└── assets/               # Imágenes y diagramas
    ├── diagrams/
    └── screenshots/
```

### 🔧 Generación de Docs

```bash
# Generar documentación de API
npm run docs:api

# Generar documentación de contratos
stellar contract bindings typescript --output-dir docs/contracts/

# Servir documentación localmente
npm run docs:serve
```

### 📖 Recursos Adicionales

- [Stellar Documentation](https://developers.stellar.org/)
- [Blend Protocol Docs](https://docs.blend.capital/)
- [Supabase Documentation](https://supabase.com/docs)
- [Next.js Documentation](https://nextjs.org/docs)
