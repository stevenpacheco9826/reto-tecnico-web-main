import { Page, expect } from '@playwright/test';
import { LoginLocators } from '../locators/login.locator';
import { BasePage } from './BasePage';
import { TIMEOUTS } from '../config/constants';

/**
 * Login Page Object
 * Handles all login-related interactions and validations
 */
export class LoginPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Getters for common login elements
   */
  get username() {
    return this.page.locator(LoginLocators.usernameInput);
  }

  get password() {
    return this.page.locator(LoginLocators.passwordInput);
  }

  get loginButton() {
    return this.page.locator(LoginLocators.loginButton);
  }

  get dashboardTitle() {
    return this.page.locator(LoginLocators.dashboardTitle);
  }

  get errorMessage() {
    return this.page.locator(LoginLocators.errorMessage);
  }

  /**
   * Navigate to the login page
   */
  async gotoLogin() {
    try {
      await this.goto('/');
    } catch (error) {
      throw new Error(`Failed to navigate to login page: ${error}`);
    }
  }

  /**
   * Perform login with credentials
   * @param username - User's username
   * @param password - User's password
   */
  async login(username: string, password: string) {
    try {
      await this.username.fill(username);
      await this.password.fill(password);
      await this.loginButton.click();
      // Wait for navigation to complete
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      throw new Error(`Login failed: ${error}`);
    }
  }

  /**
   * Get error message text
   * @returns The error message displayed to the user
   */
  async getErrorMessage(): Promise<string> {
    try {
      await this.errorMessage.waitFor({
        state: 'visible',
        timeout: TIMEOUTS.DEFAULT,
      });
      const message = await this.errorMessage.textContent();
      return message || '';
    } catch (error) {
      throw new Error(`Error message not found: ${error}`);
    }
  }

  /**
   * Check if dashboard is visible (user logged in successfully)
   * @returns True if dashboard is visible, false otherwise
   */
  async isDashboardVisible(): Promise<boolean> {
    try {
      await this.dashboardTitle.waitFor({
        state: 'visible',
        timeout: TIMEOUTS.DEFAULT,
      });
      return true;
    } catch {
      return false;
    }
  }

  /**
   * Verify login page is displayed
   */
  async isLoginPageDisplayed(): Promise<void> {
    try {
      await expect(this.username).toBeVisible({ timeout: TIMEOUTS.SHORT });
    } catch (error) {
      throw new Error(`Login page is not displayed: ${error}`);
    }
  }
}
