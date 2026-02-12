# Office Inventory Web

Frontend web application para el sistema de gestión de inventario de oficina.

## Stack Tecnológico

- **Framework:** Angular 19
- **Styling:** Tailwind CSS
- **State Management:** Signals (Angular native)
- **Language:** TypeScript

## Instalación

```bash
npm install
```

## Configuración

La aplicación se conecta al backend API. Por defecto, el backend corre en `http://localhost:3000`.

## Ejecución

### Desarrollo
```bash
npm start
```

La aplicación estará disponible en `http://localhost:4200`

### Producción
```bash
npm run build
```

Los archivos de producción se generarán en `dist/web/`

## Estructura del Proyecto

```
src/
├── app/           # Componentes y módulos de la aplicación
├── assets/        # Archivos estáticos
├── styles.css     # Estilos globales con Tailwind
└── index.html     # HTML principal
```

## Features

- Dashboard de inventario
- Visualización de items
- Alertas de reposición
- Gestión de categorías (Hardware, Papelería, Periféricos)
- Registro de movimientos

## Testing

```bash
# Unit tests
npm test

# E2E tests
npm run e2e
```

## Build

```bash
npm run build
```

## Deployment

La aplicación está configurada para despliegue en Vercel.

```bash
vercel deploy
```
