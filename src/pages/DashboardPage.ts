import { Page, expect } from '@playwright/test';
import { DashboardLocators } from '../locators/dashboard.locator';
import { BasePage } from './BasePage';

export class DashboardPage extends BasePage {

  constructor(page: Page) {
    super(page);
  }

  get adminMenuLink() {
    return this.page.getByRole('link', { name: DashboardLocators.AdminMenuLink });
  }

  get searchButton() {
    return this.page.getByRole('button', { name: DashboardLocators.SearchButton });
  }
  
  get userRoleSelect() {
    return this.page.locator(DashboardLocators.UserRoleSelect).first();
  }

  get adminOptionSelect() {
    return this.page.getByRole('option', { name: DashboardLocators.AdminOptionSelect });
  }

  get addUserButton() {
    return this.page.getByRole('button', { name: DashboardLocators.AddUserButton });
  }
  
  get logoutButton() {
    return this.page.locator(DashboardLocators.LogoutLink);
  }

  get tableRows() {
    return this.page.locator('.oxd-table-body .oxd-table-row');
  }

  /**
   * Abre el menú del usuario
   */
  async openUserMenu(): Promise<void> {
    const userDropdown = this.page.locator('[data-v-app] button[aria-label*="user"], [data-v-app] img[class*="profile"]').first();
    await userDropdown.click();
    await this.page.waitForTimeout(500);
  }

  /**
   * Realiza logout
   */
  async logout(): Promise<void> {
    await this.openUserMenu();
    await this.logoutButton.click();
    await this.page.waitForLoadState('networkidle');
  }

  async filterUserAdmin(){
    await this.adminMenuLink.click();
    await this.userRoleSelect.click();
    await this.adminOptionSelect.click();
    await this.searchButton.click();
  }

  async assertAllRowsHaveRole(role: string) {
    const rowsCount = await this.tableRows.count();

    for (let i = 0; i < rowsCount; i++) {
      const roleCell = this.tableRows.nth(i).locator('.oxd-table-cell').nth(2);
      await expect(roleCell).toHaveText(role);
    }
  }

  async assertEditAndDeleteButtonsVisible() {
    const rowsCount = await this.tableRows.count();

    for (let i = 0; i < rowsCount; i++) {
      const row = this.tableRows.nth(i);

      const editButton = row.locator('button').nth(0);
      const deleteButton = row.locator('button').nth(1);

      await expect(editButton).toBeVisible();
      await expect(deleteButton).toBeVisible();
      await expect(editButton).toBeEnabled();
      await expect(deleteButton).toBeEnabled();
    }
  }
}
