# Test Flow - Agentic Office Inventory

Este documento define los comandos de testing que deben ejecutarse antes de cada commit.

## Backend Tests (NestJS)

### Unit Tests
```bash
cd api && npm test
```

### E2E Tests
```bash
cd api && npm run test:e2e
```

### Test Coverage
```bash
cd api && npm run test:cov
```

### Build Verification
```bash
cd api && npm run build
```

## Frontend Tests (Angular)

### Unit Tests
```bash
cd web && npm test -- --watch=false --browsers=ChromeHeadless
```

### Build Verification
```bash
cd web && npm run build
```

### Lint
```bash
cd web && npm run lint
```

## Full Test Suite

Para ejecutar todos los tests del proyecto:

```bash
# Backend
cd api && npm test && npm run build

# Frontend
cd web && npm run build

# Volver al root
cd ..
```

## CI/CD Checklist

Antes de hacer commit, asegurarse de que:
- ✅ Todos los tests unitarios pasan
- ✅ Backend compila sin errores
- ✅ Frontend compila sin errores
- ✅ No hay console.errors ni warnings críticos
- ✅ Las validaciones de negocio funcionan correctamente

## Test Automation

Este archivo puede ser usado por agentes para ejecutar automáticamente los tests necesarios antes de cada commit.
