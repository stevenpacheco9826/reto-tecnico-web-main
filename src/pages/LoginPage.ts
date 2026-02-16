import { Page,expect } from '@playwright/test';
import { LoginLocators } from '../locators/login.locator';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  get username(){
    return this.page.locator(LoginLocators.usernameInput)
  }
  get password(){
    return this.page.locator(LoginLocators.passwordInput)
  }

  get loginButton(){
    return this.page.locator(LoginLocators.loginButton)
  }

  get dashboardTitle(){
    return this.page.locator(LoginLocators.dashboardTitle)
  }

  get errorMessage(){ 
    return this.page.locator(LoginLocators.errorMessage)
  }

  async gotoLogin() {
    await this.goto('/');
  }

  async login(username: string, password: string) {
    await this.username.fill(username);
    await this.password.fill(password);
    await this.loginButton.click();
  }

  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: 5000 });
    return await this.errorMessage.textContent() || '';
  }

  async isDashboardVisible(): Promise<boolean> {
    try {
      await this.dashboardTitle.waitFor({ state: 'visible', timeout: 5000 });
      return true;
    } catch {
      return false;
    }
  }

  async isLoginPageDisplayed(): Promise<void> {
    await expect(this.username).toBeVisible();
  }
}
