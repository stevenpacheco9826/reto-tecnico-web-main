# Orange HRM Automation

Proyecto de automatización para [Orange HRM](https://opensource-demo.orangehrmlive.com) usando Playwright, Cucumber y Page Object Model (POM).

## ⚡ Inicio Rápido

### 1. Instalar
```bash
npm install
```

### 2. Ejecutar Pruebas
```bash
npm test
```

### 3. Ver Resultados
```
✅ 2 scenarios (2 passed)
✅ 8 steps (8 passed)
```

---

## 📂 Estructura

```
src/
├── features/           # Casos de prueba (Gherkin)
│   └── login.feature
├── pages/             # Page Objects (UI Logic)
│   └── LoginPage.ts
└── step-definitions/  # Implementación de steps
    └── login.steps.ts
```

---

## 🔧 Comandos

| Comando | Descripción |
|---------|------------|
| `npm test` | Ejecutar todas las pruebas |
| `npm run test:debug` | Ejecutar con Playwright Inspector |
| `npm run test:headless` | Ejecutar sin mostrar navegador |
| `npm run test:report` | Abrir reporte HTML |

---

## 🌐 Credenciales

```
URL: https://opensource-demo.orangehrmlive.com
Usuario: Admin
Contraseña: admin123
```

---

## 🛠️ Tecnologías

- **Playwright** - Automatización del navegador
- **Cucumber** - BDD Framework
- **TypeScript** - Lenguaje tipado

## 📄 Licencia

Autor: Steven Pacheco
