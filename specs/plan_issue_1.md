# Plan de Implementación - Issue #1: Scaffold del Proyecto

## Objetivo
Implementar la estructura base del sistema de inventario de oficina con NestJS (backend) y Angular 19 (frontend).

## Tareas Detalladas

### 1. Estructura de Carpetas
```
agentic-office-inventory/
├── api/              # Backend NestJS
└── web/              # Frontend Angular 19
```

### 2. Backend (api/) - NestJS

#### 2.1 Inicialización
- Crear proyecto NestJS con CLI
- Configurar TypeORM para MySQL
- Instalar dependencias necesarias:
  - @nestjs/typeorm
  - typeorm
  - mysql2
  - class-validator
  - class-transformer

#### 2.2 Entidad Item
Crear entidad `Item` con los siguientes campos:
- `id`: number (Primary Key, Auto-generated)
- `name`: string (Required)
- `description`: string (Optional)
- `category`: enum ['Hardware', 'Papelería', 'Periféricos'] (Required)
- `stock`: number (Required, >= 0)
- `unitPrice`: number (Required, >= 0)
- `criticalLimit`: number (Required, >= 0)
- `createdAt`: Date (Auto-generated)
- `updatedAt`: Date (Auto-generated)

#### 2.3 Módulo Items
- Crear módulo `items` con:
  - ItemsController: Endpoint GET /items
  - ItemsService: Lógica de negocio para obtener items
  - ItemsModule: Configuración del módulo

#### 2.4 Endpoint GET /items
- Ruta: `/api/items`
- Método: GET
- Respuesta: Array de items (inicialmente mockeado)
- Status Code: 200 OK

### 3. Frontend (web/) - Angular 19

#### 3.1 Inicialización
- Crear proyecto Angular 19 con CLI
- Configurar Tailwind CSS
- Habilitar Signals (nativo en Angular 19)
- Configurar proxy para desarrollo (proxy.conf.json)

#### 3.2 Estructura Base
- Configuración standalone components
- Service para comunicación con API
- Modelo TypeScript para Item
- Página inicial de dashboard (placeholder)

#### 3.3 Configuración
- Configurar entorno de desarrollo
- Configurar routing básico
- Preparar estructura para despliegue en Vercel

### 4. Configuración de Base de Datos

#### 4.1 TypeORM Configuration
- Archivo `ormconfig.json` o configuración en app.module
- Conexión a MySQL local para desarrollo
- Modo `synchronize: true` para desarrollo (auto-sync schema)

#### 4.2 Seeds/Mocks
- Datos de prueba iniciales para items

### 5. Testing y Validación

#### 5.1 Backend
- Ejecutar `npm run build` en /api
- Verificar que no hay errores de compilación
- Ejecutar `npm run start:dev` para confirmar que el servidor arranca
- Probar endpoint GET /items con curl o Postman

#### 5.2 Frontend
- Ejecutar `npm run build` en /web
- Verificar que no hay errores de compilación
- Ejecutar `ng serve` para confirmar que la app arranca
- Verificar que la página carga correctamente

### 6. Documentación
- README.md en /api con instrucciones de setup
- README.md en /web con instrucciones de setup
- README.md en raíz con descripción general del proyecto

### 7. Git & Deployment
- Commit con mensaje: `chore: scaffold del proyecto NestJS y Angular #1`
- Push a repositorio
- Verificar estado de issues

## Criterios de Aceptación
✅ Carpetas /api y /web creadas y configuradas
✅ Entidad Item definida con todos los campos requeridos
✅ Endpoint GET /items implementado y funcional
✅ Ambos proyectos compilan sin errores
✅ Documentación básica en READMEs
✅ Commit referencía el issue #1
✅ Push exitoso al repositorio

## Tecnologías Confirmadas
- Node.js 22
- NestJS (última versión estable)
- Angular 19 con Signals
- TypeORM
- MySQL
- Tailwind CSS
- Vercel (preparación para despliegue)

## Próximos Pasos (Post Issue #1)
- Implementar validaciones de negocio
- Crear endpoints CRUD completos
- Implementar frontend reactivo con Signals
- Configurar sistema de alertas de reposición
- Implementar audit log
