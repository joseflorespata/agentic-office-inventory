# Office & IT Inventory Manager

Sistema de gestión de inventario para oficina e IT desarrollado como parte del Agentic AI Challenge.

## Descripción

Aplicación full-stack para gestionar el inventario de materiales de oficina, hardware y periféricos con alertas automáticas de reposición y registro de auditoría.

## Stack Tecnológico

### Backend (`/api`)
- **Framework:** NestJS
- **Runtime:** Node.js 22
- **ORM:** TypeORM
- **Database:** MySQL

### Frontend (`/web`)
- **Framework:** Angular 19
- **State:** Signals (Angular native)
- **Styling:** Tailwind CSS

### Deployment
- **Platform:** Vercel

## Estructura del Proyecto

```
agentic-office-inventory/
├── api/              # Backend NestJS
├── web/              # Frontend Angular 19
├── specs/            # Especificaciones y documentación
└── README.md
```

## Entidades de Datos

### Item
- `id`: Identificador único
- `name`: Nombre del item
- `description`: Descripción (opcional)
- `category`: Hardware, Papelería, Periféricos
- `stock`: Stock actual
- `unitPrice`: Precio unitario
- `criticalLimit`: Límite crítico para alertas

## Reglas de Negocio (Core)

1. **Validación de Salida:** No se puede registrar un retiro si el stock es insuficiente
2. **Alerta de Reposición:** Si el stock actual ≤ stock crítico, mostrar estado "Reorder"
3. **Audit Log:** Registrar quién realizó cada movimiento y la fecha

## Instalación y Ejecución

### Backend
```bash
cd api
npm install
npm run start:dev
```

### Frontend
```bash
cd web
npm install
npm start
```

## API Endpoints

- `GET /api/items` - Lista todos los items
- `GET /api/items/:id` - Obtiene un item específico
- `POST /api/items` - Crea un nuevo item
- `PATCH /api/items/:id` - Actualiza un item
- `DELETE /api/items/:id` - Elimina un item

## Desarrollo

Este proyecto sigue el workflow **Plan → Build → Test** del Agentic AI Challenge.

### Issues y Commits
Todos los commits deben referenciar el issue correspondiente usando `#N` en el mensaje.

## Licencia

MIT