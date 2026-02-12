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
- `POST /api/items/:id/transaction` - Registrar una transacción de stock

### Transacciones

#### POST /api/items/:id/transaction

Registra una entrada o salida de stock para un item.

**Request Body:**
```json
{
  "type": "ENTRADA" | "SALIDA",
  "quantity": number,
  "user": "string (opcional)"
}
```

**Response:** Item actualizado con el nuevo stock

**Validaciones:**
- La cantidad debe ser mayor a 0
- Para SALIDA: no se permite retirar más stock del disponible
- No se permiten stocks negativos bajo ninguna circunstancia

**Códigos de respuesta:**
- `200 OK` - Transacción exitosa
- `400 Bad Request` - Stock insuficiente o validación fallida
- `404 Not Found` - Item no existe

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
