import { Page, expect } from '@playwright/test';
import { DashboardLocators } from '../locators/dashboard.locator';
import { BasePage } from './BasePage';
import { TIMEOUTS } from '../config/constants';

/**
 * Dashboard Page Object
 * Handles all dashboard-related interactions and validations
 */
export class DashboardPage extends BasePage {
  constructor(page: Page) {
    super(page);
  }

  /**
   * Getters for common dashboard elements
   */
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
   * Open the user profile menu
   * @throws Error if user menu cannot be opened
   */
  async openUserMenu(): Promise<void> {
    try {
      const userDropdown = this.page
        .locator('[data-v-app] button[aria-label*="user"], [data-v-app] img[class*="profile"]')
        .first();
      await userDropdown.click();
      await this.wait(500);
    } catch (error) {
      throw new Error(`Failed to open user menu: ${error}`);
    }
  }

  /**
   * Perform logout action
   * Navigates to login page upon successful logout
   */
  async logout(): Promise<void> {
    try {
      await this.openUserMenu();
      await this.logoutButton.click();
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      throw new Error(`Logout failed: ${error}`);
    }
  }

  /**
   * Filter users by Admin role
   * @throws Error if filtering fails
   */
  async filterUserAdmin(): Promise<void> {
    try {
      await this.adminMenuLink.click();
      await this.userRoleSelect.click();
      await this.adminOptionSelect.click();
      await this.searchButton.click();
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      throw new Error(`Failed to filter users by Admin role: ${error}`);
    }
  }

  /**
   * Assert all visible rows have a specific role
   * @param role - The role to check for in the table
   */
  async assertAllRowsHaveRole(role: string): Promise<void> {
    try {
      const rowsCount = await this.tableRows.count();

      if (rowsCount === 0) {
        throw new Error('No rows found in the table');
      }

      for (let i = 0; i < rowsCount; i++) {
        const roleCell = this.tableRows.nth(i).locator('.oxd-table-cell').nth(2);
        await expect(roleCell).toHaveText(role, { timeout: TIMEOUTS.DEFAULT });
      }
    } catch (error) {
      throw new Error(`Role assertion failed: ${error}`);
    }
  }

  /**
   * Assert that Edit and Delete buttons are visible and enabled
   * @throws Error if buttons are not visible or not enabled
   */
  async assertEditAndDeleteButtonsVisible(): Promise<void> {
    try {
      const rowsCount = await this.tableRows.count();

      if (rowsCount === 0) {
        throw new Error('No rows found in the table');
      }

      for (let i = 0; i < rowsCount; i++) {
        const row = this.tableRows.nth(i);
        const editButton = row.locator('button').nth(0);
        const deleteButton = row.locator('button').nth(1);

        await expect(editButton).toBeVisible();
        await expect(deleteButton).toBeVisible();
        await expect(editButton).toBeEnabled();
        await expect(deleteButton).toBeEnabled();
      }
    } catch (error) {
      throw new Error(`Button visibility assertion failed: ${error}`);
    }
  }
}
