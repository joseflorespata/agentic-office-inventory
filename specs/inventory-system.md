# Spec: Office & IT Inventory Manager

## Stack Tecnológico
- **Frontend:** Angular 19 (Signals, Tailwind CSS)
- **Backend:** NestJS (Node.js 22)
- **ORM:** TypeORM / MySQL
- **Despliegue:** Vercel

## Entidades de Datos
- **Item:** id, nombre, descripción, categoría (Hardware, Papelería, Periféricos), stock_actual, precio_unitario, stock_critico.

## Reglas de Negocio (Core)
1. **Validación de Salida:** No se puede registrar un retiro de material si el `stock_actual` es insuficiente.
2. **Alerta de Reposición:** Si el `stock_actual` es menor o igual al `stock_critico`, el ítem debe mostrar un estado de "Reorder" en el dashboard.
3. **Audit Log:** Cada movimiento de stock debe registrar quién lo hizo (simulado) y la fecha.