import { Before, After } from '@cucumber/cucumber';
import { chromium } from '@playwright/test';
import { CustomWorld } from './world';
import playwrightConfig from '../../playwright.config';

Before(async function (this: CustomWorld) {

  this.browser = await chromium.launch({
    headless: false
  });

  this.context = await this.browser.newContext({
    baseURL: playwrightConfig.use?.baseURL
  });

  this.page = await this.context.newPage();
});

After(async function (this: CustomWorld) {
  await this.browser.close();
});
