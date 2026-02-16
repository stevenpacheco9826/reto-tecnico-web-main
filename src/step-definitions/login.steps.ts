import { Given, When, Then, Before, After, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from '../support/world';

setDefaultTimeout(60 * 1000);

let loginPage: LoginPage;

Given('I navigate to the Orange HRM login page', async function (this: CustomWorld) {
    loginPage = new LoginPage(this.page);
    await loginPage.gotoLogin();
    await loginPage.isLoginPageDisplayed();
    ;
});

When('I login with username {string} and password {string}', async function (username: string, password: string) {
  await loginPage.login(username, password);
  //await page.waitForLoadState('networkidle');
});

Then('I should be logged in successfully', async function () {
  const isDashboardVisible = await loginPage.isDashboardVisible();
  expect(isDashboardVisible).toBe(true);
});

Then('Dashboard should be visible', async function () {
  const isDashboardVisible = await loginPage.isDashboardVisible();
  expect(isDashboardVisible).toBe(true);
});

Then('I should see an error message', async function () {
  const errorMessage = await loginPage.getErrorMessage();
  expect(errorMessage.length).toBeGreaterThan(0);
  expect(errorMessage).toContain('Invalid credentials');
});

Then('I should remain on the login page', async function () {
    await loginPage.isLoginPageDisplayed();
});
