# 🤝 Guía de Contribuciones

Gracias por tu interés en mejorar este proyecto. Esta guía te ayudará a contribuir de manera efectiva.

---

## 📋 Antes de Empezar

1. **Fork** el repositorio
2. **Clone** tu fork localmente
3. **Crea una rama** para tu feature
4. **Instala dependencias**: `npm install`

---

## 🔄 Flujo de Trabajo

### 1. Crear una Rama

```bash
# Feature nueva
git checkout -b feature/nueva-funcionalidad

# Bug fix
git checkout -b fix/descripcion-del-bug

# Documentación
git checkout -b docs/actualizacion-readme
```

### 2. Hacer Cambios

Seguir las [Mejores Prácticas](./BEST_PRACTICES.md)

### 3. Probar Localmente

```bash
# Ejecutar todas las pruebas
npm test

# Con debug
npm run test:debug

# Ver reporte
npm run test:report
```

### 4. Verificar Calidad

```bash
# TypeScript sin errores
npx tsc --noEmit

# Formatear código (opcional)
npx prettier --write "src/**/*.ts"

# Lint (opcional)
npx eslint src/**/*.ts
```

### 5. Commit y Push

```bash
# Commit semántico
git commit -m "feat: Agregar nuevo escenario de login"

# Push a tu rama
git push origin feature/nueva-funcionalidad
```

### 6. Pull Request

- Describir cambios claramente
- Referenciar issues si aplica
- Esperar revisión

---

## 📝 Tipos de Contribuciones

### 🆕 Nueva Feature

1. Crear `.feature` file con escenarios
2. Crear/actualizar `Page Objects`
3. Crear/actualizar `locators`
4. Implementar `steps`
5. Agregar test localmente
6. Actualizar `README`

**Ejemplo:**

```gherkin
Feature: User Search

  Scenario: Search user by name
    Given I am logged in as Admin
    When I search for user "John Doe"
    Then I should see "John Doe" in results
```

### 🐛 Bug Fix

1. Identificar el problema
2. Crear test que reproduzca
3. Implementar fix
4. Verificar test pasa
5. Documentar cambio

### 📚 Documentación

- Actualizar `README.md`
- Crear/actualizar archivos `.md`
- Agregar comentarios JSDoc

---

## ✅ Checklist Pre-Commit

- [ ] Pruebas pasan: `npm test`
- [ ] TypeScript sin errores: `npx tsc --noEmit`
- [ ] Código documentado
- [ ] README actualizado si aplica
- [ ] Localizadores centralizados
- [ ] Manejo de errores implementado
- [ ] Sin variables globales en steps
- [ ] Screenshots en fallos funciona

---

## 📐 Convenciones de Código

### Nombres de Variables

```typescript
// ✅ Bueno
const loginPage = new LoginPage(page);
const isVisible = await element.isVisible();

// ❌ Evitar
const lp = new LoginPage(page);
const v = await element.isVisible();
```

### Estructura de Métodos

```typescript
async myMethod(param1: string, param2: number): Promise<void> {
  try {
    // Implementación
  } catch (error) {
    throw new Error(`Failed to do something: ${error}`);
  }
}
```

### Orden en Page Objects

```typescript
export class MyPage extends BasePage {
  // 1. Constructor
  constructor(page: Page) {
    super(page);
  }

  // 2. Getters
  get element() {
    return this.page.locator('selector');
  }

  // 3. Métodos públicos
  async publicMethod() {}

  // 4. Métodos privados
  private async privateMethod() {}
}
```

---

## 🐛 Reporting Bugs

Crea un issue con:

1. **Descripción clara** del problema
2. **Pasos para reproducir**
3. **Resultado esperado vs actual**
4. **Versiones** (Node, Playwright, etc)
5. **Screenshots o logs**

**Template:**

```markdown
## 🐛 Bug Report

### Descripción
...

### Pasos para Reproducir
1. ...
2. ...

### Resultado Esperado
...

### Resultado Actual
...

### Información del Sistema
- Node: v18.0.0
- Playwright: v1.58.2
```

---

## 🎯 Feature Requests

Crea un issue con etiqueta `enhancement`:

1. **Descripción** de la feature
2. **Beneficio** que aporta
3. **Casos de uso**
4. **Posible implementación** (opcional)

---

## 📊 Code Review

### Criterios de Revisión

- ✅ Tests implementados y pasan
- ✅ Código sigue convenciones
- ✅ Documentación clara
- ✅ Performance optimizado
- ✅ Sin variables globales
- ✅ Manejo de errores

### Dar Feedback

```
# ✅ Aprobado
Excelente implementación, LGTM

# 🔄 Cambios Solicitados
Por favor, refactorizar X para mejorar legibilidad
```

---

## 🚀 Release Process

1. Actualizar version en `package.json`
2. Actualizar `CHANGELOG` (si existe)
3. Crear tag: `git tag v1.2.3`
4. Push: `git push origin v1.2.3`

---

## 💬 Comunicación

- **Issues**: Para bugs y features
- **Discussions**: Para preguntas generales
- **Pull Requests**: Para cambios de código

---

## 📚 Recursos Útiles

- [Playwright Docs](https://playwright.dev)
- [Cucumber Docs](https://cucumber.io)
- [TypeScript Handbook](https://www.typescriptlang.org)
- [Git Workflow](https://git-scm.com/book/en/v2)

---

!Gracias por contribuir! 🙏

**Última actualización**: Marzo 2026
