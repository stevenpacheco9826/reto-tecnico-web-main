/**
 * Login Page Locators
 * Centralized selectors for the login page
 * Uses data-testid and CSS selectors for better stability
 */

export const LoginLocators = {
  // Input Fields
  usernameInput: 'input[name="username"]',
  passwordInput: 'input[name="password"]',
  
  // Buttons
  loginButton: 'button[type="submit"]',
  
  // Messages & Validation
  errorMessage: '.oxd-alert-content-text',
  successMessage: '.oxd-toast-content-text',
  
  // Navigation Elements
  dashboardTitle: 'h6:has-text("Dashboard")',
  
  // Loading & Status
  loadingSpinner: '[class*="spinner"]',
} as const;