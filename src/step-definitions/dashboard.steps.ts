import { Then, When, Given } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { CustomWorld } from '../support/world';
import { DashboardPage } from '../pages/DashboardPage';

let dashboardPage: DashboardPage;

When('I search users by role admin', async function (this: CustomWorld) {
    dashboardPage = new DashboardPage(this.page);
    await dashboardPage.filterUserAdmin();
});

Then('all results should have role {string}', async function (this: CustomWorld, role: string) {
  await dashboardPage.assertAllRowsHaveRole(role);
});

Then('each user should have edit and delete actions available', async function () {
  await this.adminPage.assertEditAndDeleteButtonsVisible();
});