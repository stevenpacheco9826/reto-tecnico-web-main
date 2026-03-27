import { Given, When, Then, setDefaultTimeout } from '@cucumber/cucumber';
import { expect } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { CustomWorld } from '../support/world';
import { TIMEOUTS } from '../config/constants';

setDefaultTimeout(60 * 1000);

/**
 * Login Feature Steps
 * Handles all login-related step implementations
 */

Given('I navigate to the Orange HRM login page', async function (this: CustomWorld) {
  try {
    const loginPage = new LoginPage(this.page);
    await loginPage.gotoLogin();
    await loginPage.isLoginPageDisplayed();
  } catch (error) {
    throw new Error(`Failed to navigate to login page: ${error}`);
  }
});

When(
  'I login with username {string} and password {string}',
  async function (this: CustomWorld, username: string, password: string) {
    try {
      const loginPage = new LoginPage(this.page);
      await loginPage.login(username, password);
    } catch (error) {
      throw new Error(`Login step failed: ${error}`);
    }
  }
);

Then('I should be logged in successfully', async function (this: CustomWorld) {
  try {
    const loginPage = new LoginPage(this.page);
    const isDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);
  } catch (error) {
    throw new Error(`Dashboard visibility check failed: ${error}`);
  }
});

Then('Dashboard should be visible', async function (this: CustomWorld) {
  try {
    const loginPage = new LoginPage(this.page);
    const isDashboardVisible = await loginPage.isDashboardVisible();
    expect(isDashboardVisible).toBe(true);
  } catch (error) {
    throw new Error(`Dashboard should be visible: ${error}`);
  }
});

Then('I should see an error message', async function (this: CustomWorld) {
  try {
    const loginPage = new LoginPage(this.page);
    const errorMessage = await loginPage.getErrorMessage();
    expect(errorMessage.length).toBeGreaterThan(0);
    expect(errorMessage).toContain('Invalid credentials');
  } catch (error) {
    throw new Error(`Error message validation failed: ${error}`);
  }
});

Then('I should remain on the login page', async function (this: CustomWorld) {
  try {
    const loginPage = new LoginPage(this.page);
    await loginPage.isLoginPageDisplayed();
  } catch (error) {
    throw new Error(`Login page display check failed: ${error}`);
  }
});
