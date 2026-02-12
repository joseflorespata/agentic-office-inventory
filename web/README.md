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

### Dashboard
- **Grid responsive** con diseño moderno usando Tailwind CSS
- **Visualización de items** con información detallada (nombre, descripción, stock, precio)
- **Badges de categoría** con colores diferenciados (Hardware, Papelería, Periféricos)
- **Alertas visuales de reposición:** Badge rojo "REORDER" cuando stock ≤ límite crítico
- **Estado del stock** en tiempo real con colores (verde para OK, rojo para crítico)

### Gestión de Movimientos
- **Modal interactivo** para registrar transacciones
- **Dos tipos de movimientos:** ENTRADA (añadir stock) y SALIDA (retirar stock)
- **Validación en tiempo real** de stock insuficiente
- **Preview del nuevo stock** antes de confirmar
- **Campo opcional de usuario** para registro de auditoría
- **Manejo de errores** con mensajes claros al usuario

### Reactividad
- **Angular Signals** para actualización reactiva de la UI
- **Auto-refresh** del dashboard tras transacciones exitosas
- **Loading states** durante operaciones asíncronas
- **Notificaciones de éxito** después de cada transacción

### UX/UI
- **Tailwind CSS** para diseño moderno y responsive
- **Animaciones suaves** en hover y transiciones
- **Cards con sombras** que mejoran en hover
- **Íconos SVG** para mejor experiencia visual
- **Estados de carga** con spinners animados

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
