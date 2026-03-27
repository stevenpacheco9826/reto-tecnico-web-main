# 📖 Buenas Prácticas - Guía de Desarrollo

Este documento describe las mejores prácticas aplicadas en este proyecto de automatización.

---

## 🏗️ Arquitectura

### Page Object Model (POM)

**Ventajas:**
- ✅ Separación clara entre lógica UI y tests
- ✅ Fácil mantenimiento de localizadores
- ✅ Código reutilizable
- ✅ Tests legibles

**Estructura:**

```typescript
// 1. Definir localizadores
export const PageLocators = {
  element: '#selector',
};

// 2. Crear Page Object
export class MyPage extends BasePage {
  get element() {
    return this.page.locator(PageLocators.element);
  }
  
  async myAction() {
    // Implementar lógica
  }
}

// 3. Usar en steps
Then('I do something', async function (this: CustomWorld) {
  const page = new MyPage(this.page);
  await page.myAction();
});
```

---

## 🧪 Mejores Prácticas de Testing

### 1. **Esperas Explícitas (Nunca Hardcodeadas)**

❌ **Malo:**
```typescript
await page.waitForTimeout(2000);  // Frágil
```

✅ **Bueno:**
```typescript
await element.waitFor({ state: 'visible', timeout: TIMEOUTS.DEFAULT });
await page.waitForLoadState('networkidle');
```

### 2. **Manejo de Errores**

❌ **Malo:**
```typescript
async login(username: string, password: string) {
  await this.username.fill(username);
  await this.password.fill(password);
  await this.loginButton.click();
}
```

✅ **Bueno:**
```typescript
async login(username: string, password: string) {
  try {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
    await this.page.waitForLoadState('networkidle');
  } catch (error) {
    throw new Error(`Login failed: ${error}`);
  }
}
```

### 3. **Evitar Variables Globales**

❌ **Malo:**
```typescript
let loginPage: LoginPage;

Given('I navigate', async function (this: CustomWorld) {
  loginPage = new LoginPage(this.page);
  // ...
});

When('I login', async function (this: CustomWorld) {
  await loginPage.login(...);  // Reutiliza variable global
});
```

✅ **Bueno:**
```typescript
Given('I navigate', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.gotoLogin();
});

When('I login', async function (this: CustomWorld) {
  const loginPage = new LoginPage(this.page);
  await loginPage.login(...);  // Nueva instancia en cada step
});
```

### 4. **Selectores Robustos**

❌ **Frágil:**
```typescript
dashboardTitle: 'h6:has-text("Dashboard")'  // Depende del texto exacto
button: 'button'                             // Demasiado genérico
```

✅ **Robusto:**
```typescript
dashboardTitle: '[data-testid="dashboard-title"]'
loginButton: 'button[type="submit"][data-testid="login-button"]'
errorMessage: '.oxd-alert-content-text'
```

---

## 📝 Documentación

### Documentar Métodos

```typescript
/**
 * Realiza el login con credenciales
 * @param username - Nombre de usuario
 * @param password - Contraseña
 * @throws Error si el login falla
 * @returns Promise<void>
 */
async login(username: string, password: string): Promise<void> {
  // ...
}
```

### Documentar Clases

```typescript
/**
 * Page Object para la página de Login
 * Maneja todas las interacciones relacionadas con el login
 */
export class LoginPage extends BasePage {
  // ...
}
```

---

## 🔒 Configuración Centralizada

### Usar Constantes

❌ **Malo:**
```typescript
await element.waitFor({ timeout: 10000 });
await page.setViewportSize({ width: 1920, height: 1080 });
```

✅ **Bueno:**
```typescript
// src/config/constants.ts
export const TIMEOUTS = {
  DEFAULT: 10000,
  SHORT: 3000,
  LONG: 30000,
};

// Usar:
await element.waitFor({ timeout: TIMEOUTS.DEFAULT });
```

### Variables de Entorno

```bash
# .env
BASE_URL=https://example.com
ADMIN_USERNAME=admin
ADMIN_PASSWORD=pass123
```

```typescript
// Usar:
const url = process.env.BASE_URL || 'default-url';
```

---

## ✅ Assertions

### Usar Playwright Assertions

```typescript
import { expect } from '@playwright/test';

// ✅ Bueno
await expect(element).toBeVisible();
await expect(element).toHaveText('Expected Text');
await expect(page).toHaveURL(/dashboard/);

// ❌ Evitar
if (await element.isVisible()) {
  // Manual assertion
}
```

---

## 🐛 Debugging

### Usar Playwright Inspector

```bash
npm run test:debug
```

### Screenshot en Fallos

Los screenshots se capturan automáticamente en `After` hook:

```typescript
if (scenario.result?.status === Status.FAILED) {
  await page.screenshot({ path: 'screenshots/fail.png' });
}
```

---

## 🚀 Performance

### Optimizaciones

1. **Paralelización:**
   ```bash
   PARALLEL=true npm test
   ```

2. **Selectores eficientes:**
   ```typescript
   // Rápido
   page.getByRole('button', { name: 'Login' })
   page.locator('[data-testid="login"]')
   
   // Lento
   page.locator('body > div > form > button')  // Selector profundo
   ```

3. **Waits optimizados:**
   ```typescript
   // Evitar
   await page.waitForTimeout(5000);
   
   // Usar
   await page.waitForLoadState('networkidle');
   await element.waitFor({ state: 'visible' });
   ```

---

## 💾 Control de Versiones

### Commit Semántico

```bash
git commit -m "feat: Agregar validación de error en login"
git commit -m "fix: Corregir selector frágil en dashboard"
git commit -m "docs: Actualizar README con instrucciones"
```

---

## 🔄 Workflow Recomendado

1. **Crear feature en Gherkin:**
   ```gherkin
   Scenario: User filters by role
     Given I am logged in
     When I filter users by role "Admin"
     Then I should see only admin users
   ```

2. **Crear Page Object:**
   ```typescript
   // Métodos para interactuar con la UI
   ```

3. **Implementar Steps:**
   ```typescript
   // Usar Page Objects en steps
   ```

4. **Ejecutar y Validar:**
   ```bash
   npm test
   ```

5. **Revisar Reporte:**
   ```bash
   npm run test:report
   ```

---

## 📊 Checklist de Calidad

- [ ] Selectores son robustos (no dependen de texto)
- [ ] Timeouts usando TIMEOUTS constantes
- [ ] Manejo de errores con try/catch
- [ ] Documentación (JSDoc comments)
- [ ] Tests pasan localmente
- [ ] Reporte generado correctamente
- [ ] No hay variables globales en steps
- [ ] Screenshots en carpeta correcta

---

## 🔗 Referencias

- [Playwright Best Practices](https://playwright.dev/docs/best-practices)
- [Cucumber Docs](https://cucumber.io/docs/cucumber/)
- [Page Object Model Pattern](https://martinfowler.com/bliki/PageObject.html)
- [TypeScript Handbook](https://www.typescriptlang.org/docs/)

---

**Última actualización**: Marzo 2026
