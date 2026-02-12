# Office Inventory API

Backend API para el sistema de gestión de inventario de oficina.

## Stack Tecnológico

- **Framework:** NestJS
- **Runtime:** Node.js 22
- **ORM:** TypeORM
- **Database:** MySQL
- **Language:** TypeScript

## Instalación

```bash
npm install
```

## Configuración

Crear archivo `.env` en la raíz del proyecto:

```env
PORT=3000
DB_HOST=localhost
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=
DB_DATABASE=inventory_db
```

## Ejecución

### Desarrollo
```bash
npm run start:dev
```

### Producción
```bash
npm run build
npm run start:prod
```

## API Endpoints

### Items

- `GET /api/items` - Obtener todos los items
- `GET /api/items/:id` - Obtener un item por ID
- `POST /api/items` - Crear un nuevo item
- `PATCH /api/items/:id` - Actualizar un item
- `DELETE /api/items/:id` - Eliminar un item

## Entidad Item

```typescript
{
  id: number;
  name: string;
  description?: string;
  category: 'Hardware' | 'Papelería' | 'Periféricos';
  stock: number;
  unitPrice: number;
  criticalLimit: number;
  createdAt: Date;
  updatedAt: Date;
}
```

## Testing

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Test coverage
npm run test:cov
```

## Build

```bash
npm run build
```
