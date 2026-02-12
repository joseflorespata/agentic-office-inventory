# Plan de Implementación - Issue #2: Lógica de Movimientos de Stock y Validaciones

## Objetivo
Desarrollar funcionalidad completa para registrar entradas y salidas de inventario con validaciones robustas que garanticen la integridad del stock.

## Tareas Detalladas

### 1. Backend (NestJS) - API y Lógica de Negocio

#### 1.1 Crear Entidad Transaction
Nueva entidad para audit log de movimientos:
- `id`: number (Primary Key)
- `itemId`: number (Foreign Key a Item)
- `type`: enum ['ENTRADA', 'SALIDA']
- `quantity`: number (Required, > 0)
- `previousStock`: number (Snapshot del stock antes)
- `newStock`: number (Snapshot del stock después)
- `user`: string (Usuario simulado)
- `timestamp`: Date (Auto-generated)

#### 1.2 DTO para Transacciones
Crear `CreateTransactionDto`:
```typescript
{
  type: 'ENTRADA' | 'SALIDA';
  quantity: number;
  user?: string; // Opcional, default: "system"
}
```

Validaciones con class-validator:
- `@IsEnum(['ENTRADA', 'SALIDA'])`
- `@IsNumber()` y `@Min(1)` para quantity
- `@IsOptional()` y `@IsString()` para user

#### 1.3 Endpoint POST /api/items/:id/transaction
- Ruta: `/api/items/:id/transaction`
- Método: POST
- Body: CreateTransactionDto
- Respuestas:
  - 200 OK: Transacción exitosa, devuelve item actualizado
  - 400 Bad Request: Stock insuficiente o validación fallida
  - 404 Not Found: Item no existe

#### 1.4 Lógica de Validación en ItemsService
```typescript
async createTransaction(itemId: number, dto: CreateTransactionDto) {
  // 1. Buscar item
  // 2. Validar que existe
  // 3. Si es SALIDA:
  //    - Validar que quantity <= stock_actual
  //    - Si no, lanzar BadRequestException
  // 4. Calcular nuevo stock:
  //    - ENTRADA: stock_actual + quantity
  //    - SALIDA: stock_actual - quantity
  // 5. Crear registro de transacción
  // 6. Actualizar item.stock
  // 7. Guardar ambos en DB
  // 8. Retornar item actualizado
}
```

#### 1.5 Tests Unitarios (ItemsService)
Crear archivo `items.service.spec.ts` con casos:
- ✅ ENTRADA aumenta el stock correctamente
- ✅ SALIDA disminuye el stock correctamente
- ✅ SALIDA con stock insuficiente lanza BadRequestException
- ✅ SALIDA que deja stock en 0 es permitida
- ✅ SALIDA que resulta en stock negativo es rechazada
- ✅ Transaction registra previousStock y newStock correctamente
- ✅ Item no encontrado lanza NotFoundException

### 2. Frontend (Angular 19) - UI y Consumo de API

#### 2.1 Modelo TypeScript
Crear interfaces:
```typescript
// models/item.model.ts
export enum ItemCategory {
  HARDWARE = 'Hardware',
  PAPELERIA = 'Papelería',
  PERIFERICOS = 'Periféricos'
}

export interface Item {
  id: number;
  name: string;
  description?: string;
  category: ItemCategory;
  stock: number;
  unitPrice: number;
  criticalLimit: number;
  createdAt: Date;
  updatedAt: Date;
}

// models/transaction.model.ts
export enum TransactionType {
  ENTRADA = 'ENTRADA',
  SALIDA = 'SALIDA'
}

export interface CreateTransactionDto {
  type: TransactionType;
  quantity: number;
  user?: string;
}
```

#### 2.2 Service para Items
Crear `items.service.ts`:
- `getAll(): Observable<Item[]>`
- `getById(id: number): Observable<Item>`
- `createTransaction(itemId: number, dto: CreateTransactionDto): Observable<Item>`

Configurar HttpClient y environment para API URL.

#### 2.3 Componente Dashboard
Actualizar componente principal para:
- Listar todos los items
- Mostrar badge rojo "REORDER" si `stock <= criticalLimit`
- Mostrar badge verde "OK" si `stock > criticalLimit`
- Botón para abrir modal de transacción por cada item

Usar Tailwind CSS para estilos:
- Card para cada item
- Grid responsive
- Badges con colores semánticos

#### 2.4 Modal/Componente de Transacción
Crear `transaction-modal.component.ts`:
- Input: itemId
- Form con:
  - Radio buttons: ENTRADA / SALIDA
  - Input numérico para cantidad (min: 1)
  - Input texto para usuario (opcional)
  - Botones: Cancelar / Confirmar
- Validaciones:
  - Cantidad debe ser > 0
  - Para SALIDA, validar contra stock actual (frontend)
- Manejo de errores del backend:
  - Mostrar mensaje de error si stock insuficiente
  - Mostrar toast/alert de éxito tras transacción
- Al completar exitosamente:
  - Cerrar modal
  - Emitir evento para refrescar lista
  - Mostrar notificación de éxito

#### 2.5 Auto-refresh del Dashboard
Implementar con Signals:
- Signal para lista de items
- Método `refreshItems()` que actualiza el signal
- Llamar a `refreshItems()` tras transacción exitosa

### 3. Integración y Configuración

#### 3.1 Actualizar AppModule (Backend)
- Importar TypeORM con configuración de entidades
- Registrar TransactionModule

#### 3.2 Configurar CORS
Ya configurado en Issue #1, verificar que sigue activo.

#### 3.3 Proxy Configuration (Frontend)
Crear `proxy.conf.json` para desarrollo:
```json
{
  "/api": {
    "target": "http://localhost:3000",
    "secure": false,
    "changeOrigin": true
  }
}
```

Actualizar `angular.json` para usar el proxy.

### 4. Testing

#### 4.1 Backend Tests
```bash
cd api
npm test
```

Verificar:
- ✅ Todos los tests unitarios pasan
- ✅ Cobertura de código > 80% en ItemsService
- ✅ Casos de edge cases cubiertos

#### 4.2 Frontend Build
```bash
cd web
npm run build
```

Verificar:
- ✅ Sin errores de compilación
- ✅ Sin warnings críticos

#### 4.3 E2E Testing (Manual)
1. Iniciar backend: `cd api && npm run start:dev`
2. Iniciar frontend: `cd web && npm start`
3. Probar escenarios:
   - ✅ ENTRADA aumenta stock
   - ✅ SALIDA disminuye stock
   - ✅ SALIDA con stock insuficiente muestra error
   - ✅ Badge "REORDER" aparece cuando stock <= criticalLimit
   - ✅ Dashboard se actualiza automáticamente

### 5. Documentación

#### 5.1 Actualizar README del Backend
- Documentar nuevo endpoint POST /api/items/:id/transaction
- Ejemplos de request/response
- Códigos de error

#### 5.2 Actualizar README del Frontend
- Documentar nuevos componentes
- Instrucciones para ejecutar con proxy

#### 5.3 Crear test-flow.md
Crear `.claude/commands/test-flow.md` con comandos de testing:
```bash
# Backend tests
cd api && npm test

# Frontend build
cd web && npm run build
```

### 6. Git & Deployment

#### 6.1 Commit Strategy
Opción 1 - Single commit:
```
feat: implementar movimientos de stock con validaciones (fixes #2)

Backend:
- Entidad Transaction para audit log
- Endpoint POST /api/items/:id/transaction
- Validación de stock insuficiente
- Tests unitarios para casos edge

Frontend:
- Dashboard con badges de estado
- Modal para registrar transacciones
- Auto-refresh con Signals
- Manejo de errores

✅ Tests unitarios pasan
✅ Ambos proyectos compilan
```

Opción 2 - Commits separados:
1. `feat(api): agregar endpoint de transacciones con validaciones #2`
2. `feat(web): implementar UI para movimientos de stock #2`
3. `test(api): agregar tests unitarios para validaciones #2`
4. `docs: actualizar READMEs con nuevas features (fixes #2)`

## Criterios de Aceptación

### Backend
- ✅ Endpoint POST /api/items/:id/transaction implementado
- ✅ Validación de stock insuficiente funciona correctamente
- ✅ No se permiten stocks negativos
- ✅ Transacciones se registran en audit log
- ✅ Tests unitarios cubren casos edge
- ✅ Todos los tests pasan

### Frontend
- ✅ Dashboard lista items con información completa
- ✅ Badge rojo "REORDER" visible cuando stock <= criticalLimit
- ✅ Modal/componente de transacción funcional
- ✅ Validación de cantidad en frontend
- ✅ Errores del backend se muestran al usuario
- ✅ Dashboard se actualiza automáticamente tras transacción exitosa

### Testing
- ✅ Test unitario para "stock insuficiente" existe y pasa
- ✅ Backend compila sin errores
- ✅ Frontend compila sin errores

### Documentación
- ✅ README del backend actualizado
- ✅ README del frontend actualizado
- ✅ Archivo test-flow.md creado

## Consideraciones Técnicas

### Transaccionalidad
- Usar transacciones de DB para garantizar consistencia
- Si falla el guardado de Transaction, revertir actualización de Item

### Validaciones en Capas
1. Frontend: Validación básica de UX
2. DTOs: Validación de tipos y formato
3. Service: Validación de reglas de negocio

### Manejo de Errores
- Backend: Usar excepciones específicas de NestJS
- Frontend: Interceptores HTTP para manejo centralizado

### Performance
- Considerar índices en DB para itemId en Transaction
- Limitar historial de transacciones mostrado inicialmente

## Próximos Pasos (Post Issue #2)
- Implementar filtros y búsqueda en dashboard
- Agregar paginación para lista de items
- Implementar historial de transacciones por item
- Dashboard analytics con gráficas
- Sistema de notificaciones para items críticos
