# 🤖 Orange HRM Automation

Proyecto de automatización completo y profesional para [Orange HRM](https://opensource-demo.orangehrmlive.com) usando **Playwright**, **Cucumber** y el patrón **Page Object Model (POM)**.

Este proyecto implementa buenas prácticas de BDD (Behavior Driven Development) con pruebas automatizadas escalables y mantenibles.

---

## 📋 Tabla de Contenidos

- [Características](#características)
- [Requisitos Previos](#requisitos-previos)
- [Instalación](#instalación)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Configuración](#configuración)
- [Ejecutar Pruebas](#ejecutar-pruebas)
- [Generar Reportes](#generar-reportes)
- [Arquitectura](#arquitectura)
- [Troubleshooting](#troubleshooting)
- [Mejoras Futuras](#mejoras-futuras)

---

## ✨ Características

✅ **BDD con Cucumber** - Especificaciones legibles en Gherkin  
✅ **Page Object Model** - Código mantenible y escalable  
✅ **TypeScript** - Tipado fuerte para mayor seguridad  
✅ **Playwright** - Automatización moderna y confiable  
✅ **Reportes HTML** - Visualización clara de resultados  
✅ **Screenshots en Fallos** - Captura automática en errores  
✅ **Configuración Centralizada** - Constantes y variables de entorno  
✅ **Manejo de Errores** - Mensajes claros y trazabilidad  

---

## 🖥️ Requisitos Previos

- **Node.js** 16.x o superior
- **npm** 8.x o superior
- **Navegador Chrome** (Playwright instala automáticamente)
- Conexión a Internet
- Git (opcional)

Verificar versiones instaladas:

```bash
node --version
npm --version
```

---

## 📦 Instalación

### 1. Clonar o Descargar el Proyecto

```bash
git clone <repository-url>
cd reto-tecnico-web-main
```

### 2. Instalar Dependencias

```bash
npm install
```

Esto instalará:
- `@cucumber/cucumber` - Framework BDD
- `@playwright/test` - Automatización del navegador
- `typescript` - Tipado
- `ts-node` - Ejecución TypeScript

### 3. Configurar Variables de Entorno

Copiar `.env.example` a `.env`:

```bash
cp .env.example .env
```

Editar `.env` con valores personalizados si es necesario:

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
HEADLESS=false
```

---

## 📂 Estructura del Proyecto

```
reto-tecnico-web-main/
│
├── src/
│   ├── config/
│   │   └── constants.ts           # Constantes globales y configuración
│   │
│   ├── features/
│   │   ├── login.feature          # Escenarios de login (Gherkin)
│   │   └── user.feature           # Escenarios de usuarios
│   │
│   ├── locators/
│   │   ├── login.locator.ts       # Selectores de la página de login
│   │   └── dashboard.locator.ts   # Selectores del dashboard
│   │
│   ├── pages/
│   │   ├── BasePage.ts            # Clase base para todas las páginas
│   │   ├── LoginPage.ts           # Page Object para login
│   │   └── DashboardPage.ts       # Page Object para dashboard
│   │
│   ├── step-definitions/
│   │   ├── login.steps.ts         # Implementación de steps de login
│   │   └── dashboard.steps.ts     # Implementación de steps de dashboard
│   │
│   └── support/
│       ├── world.ts               # CustomWorld para compartir datos
│       └── hooks.ts               # Before/After hooks
│
├── tests/
│   └── example.spec.ts            # Tests de Playwright (opcional)
│
├── reports/
│   ├── report.html                # Reporte HTML generado
│   └── report.json                # Reporte JSON generado
│
├── screenshots/                   # Capturas de pantalla en fallos
│
├── .env.example                   # Ejemplo de variables de entorno
├── cucumber.js                    # Configuración de Cucumber
├── playwright.config.ts           # Configuración de Playwright
├── tsconfig.json                  # Configuración de TypeScript
├── package.json                   # Dependencias del proyecto
└── README.md                      # Este archivo
```

---

## ⚙️ Configuración

### 🔧 Variables de Entorno (`.env`)

```env
BASE_URL=https://opensource-demo.orangehrmlive.com
ADMIN_USERNAME=Admin
ADMIN_PASSWORD=admin123
HEADLESS=false              # true para ejecución sin UI
BROWSER=chromium            # chromium, firefox, webkit
DEFAULT_TIMEOUT=10000       # 10 segundos
PARALLEL_WORKERS=1          # 1 para ejecución secuencial
RETRY_FAILED_TESTS=0        # Reintentos en CI
```

### 📋 Cucumber (cucumber.js)

- **Formato**: progress-bar, HTML y JSON
- **Reportes**: Guardados en `reports/`
- **Paralelización**: Configurable mediante variables de entorno
- **Retry**: Automático en CI/CD

### 🎨 Playwright (playwright.config.ts)

- **Base URL**: Configurada en `.env`
- **Viewport**: 1920x1080
- **Headless**: Configurable
- **Trace**: Activado en reintentos

---

## 🚀 Ejecutar Pruebas

### Ejecutar Todas las Pruebas

```bash
npm test
```

### Ejecutar Pruebas en Modo Debug

Abre Playwright Inspector:

```bash
npm run test:debug
```

### Ejecutar Pruebas Sin Interfaz Gráfica

```bash
npm run test:headless
```

### Ejecutar Pruebas en Paralelo

```bash
PARALLEL=true npm test
```

### Ejecutar un Feature Específico

```bash
npx cucumber-js src/features/login.feature
```

### Ejecutar Pruebas en Diferentes Navegadores

```bash
npx playwright test --project=firefox
npx playwright test --project=webkit
```

---

## 📊 Generar Reportes

### Ver Reporte HTML

Después de ejecutar las pruebas:

```bash
npm run test:report
```

Se abrirá automáticamente en tu navegador predeterminado.

### Reporte JSON

Disponible en: `reports/report.json`

Para procesamiento automatizado o integración CI/CD.

---

## 🏗️ Arquitectura

### Page Object Model (POM)

Cada página tiene:

1. **Locators** - Selectores centralizados
2. **Page Object** - Métodos de interacción
3. **Steps** - Implementación de escenarios

**Ventajas:**
- ✅ Mantenimiento centralizado
- ✅ Reutilización de código
- ✅ Fácil de actualizar selectores
- ✅ Mejor legibilidad

### BasePage

Contiene métodos comunes:

```typescript
// Navegación
await basePage.goto(url);

// Esperadores
await basePage.waitForUrlContains('dashboard');
await basePage.waitForElement(selector);

// Screenshots
await basePage.takeScreenshot('login-page');
```

### CustomWorld

Comparte instancias entre steps:

```typescript
export class CustomWorld {
  browser!: Browser;
  context!: BrowserContext;
  page!: Page;
}
```

---

## 🧪 Ejemplos de Uso

### Crear un Nuevo Step

```typescript
// En src/step-definitions/login.steps.ts
When('I click the login button', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.loginButton.click();
});
```

### Crear una Nueva Página

```typescript
// En src/pages/NewPage.ts
import { BasePage } from './BasePage';

export class NewPage extends BasePage {
  get myElement() {
    return this.page.locator('#my-selector');
  }

  async performAction() {
    await this.myElement.click();
  }
}
```

### Agregar Localizador

```typescript
// En src/locators/new.locator.ts
export const NewPageLocators = {
  element: '[data-testid="element"]',
  button: 'button:has-text("Click Me")',
} as const;
```

---

## 🐛 Troubleshooting

### ❌ Tests Fallan por Timeout

**Solución:**
```bash
# Aumentar timeout en .env
DEFAULT_TIMEOUT=30000
```

### ❌ Localizador No Encontrado

**Verifica:**
1. El selector es correcto: inspecciona el elemento en DevTools
2. El elemento está visible (use debug):
```bash
npm run test:debug
```
3. Aumenta el timeout si es necesario

### ❌ Error "Element not visible"

**Soluciones:**
- Agregar `await page.waitForLoadState('networkidle')`
- Usar `waitForElement` en BasePage
- Verificar el viewport está correcto

### ❌ Screenshots no se guardan

**Verifica:**
- Carpeta `screenshots/` existe
- Permisos de escritura en el directorio
- Que el step After hook se ejecute

### ❌ Pruebas lentas en CI/CD

**Optimizaciones:**
```bash
# Ejecutar en paralelo
PARALLEL=true npm test
```

---

## 📈 Mejoras Futuras

- [ ] Agregar más escenarios de usuarios (crear, editar, eliminar)
- [ ] Implementar data-driven testing con DataTable
- [ ] Agregar pruebas de rendimiento
- [ ] Integración con Slack para notificaciones
- [ ] Screenshots con anotaciones
- [ ] Video recording en fallos
- [ ] Cobertura de accesibilidad (A11y)
- [ ] Tests de API
- [ ] Integración continua (GitHub Actions, Jenkins)
- [ ] Pruebas en múltiples navegadores paralelos

---

## 🛠️ Tecnologías Utilizadas

| Tecnología | Versión | Propósito |
|-----------|---------|----------|
| Playwright | ^1.58.2 | Automatización del navegador |
| Cucumber | ^11.3.0 | Framework BDD |
| TypeScript | Latest | Tipado estático |
| Node.js | 16+ | Runtime |

---

## 📅 Credenciales de Prueba

Las credenciales están en `.env`:

```
Usuario: Admin
Contraseña: admin123
URL: https://opensource-demo.orangehrmlive.com
```

⚠️ **Nota**: Nunca commitear credenciales reales en `.env`. Usar secretos en CI/CD.

---

## 👨‍💻 Contribuciones

Este es un proyecto personal de automatización. Para mejoras:

1. Crear una rama: `git checkout -b feature/mejora`
2. Commitear cambios: `git commit -am 'Mejora agregada'`
3. Push a la rama: `git push origin feature/mejora`
4. Crear Pull Request

---

## 📄 Licencia

**ISC** - Proyecto de Steven Pacheco

---

## 📞 Contacto

- **Autor**: Steven Pacheco
- **Proyecto**: Reto Técnico Web Automation
- **Año**: 2026

---

## ✅ Checklist Pre-Commit

- [ ] Todas las pruebas pasan: `npm test`
- [ ] Sin errores TypeScript: `npx tsc --noEmit`
- [ ] Código limpio y documentado
- [ ] Nuevas features documentadas en README
- [ ] Screenshots capturados en reportes

---

## 🔗 Enlaces Útiles

- [Documentación Playwright](https://playwright.dev)
- [Documentación Cucumber](https://cucumber.io)
- [Orange HRM Demo](https://opensource-demo.orangehrmlive.com)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)

---

**Última actualización**: Marzo 2026  
**Estado**: ✅ Proyecto Activo

