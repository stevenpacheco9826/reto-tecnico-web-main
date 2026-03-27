import { Before, After, Status } from '@cucumber/cucumber';
import { chromium, BrowserContext } from '@playwright/test';
import { CustomWorld } from './world';
import { BASE_URL, TIMEOUTS, PATHS } from '../config/constants';
import * as fs from 'fs';

Before(async function (this: CustomWorld) {
  try {
    this.browser = await chromium.launch({
      headless: process.env.HEADLESS === 'true',
      slowMo: process.env.SLOWMO ? parseInt(process.env.SLOWMO) : 0,
    });

    this.context = await this.browser.newContext({
      baseURL: BASE_URL,
      viewport: { width: 1920, height: 1080 },
    });

    // Set default timeout for all browser actions
    this.context.setDefaultTimeout(TIMEOUTS.DEFAULT);
    this.context.setDefaultNavigationTimeout(TIMEOUTS.LONG);

    this.page = await this.context.newPage();

    // Create screenshots directory if it doesn't exist
    if (!fs.existsSync(PATHS.SCREENSHOTS)) {
      fs.mkdirSync(PATHS.SCREENSHOTS, { recursive: true });
    }
  } catch (error) {
    console.error('Error in Before hook:', error);
    throw error;
  }
});

After(async function (this: CustomWorld, scenario) {
  try {
    // Take screenshot on failure
    if (scenario.result?.status === Status.FAILED) {
      const screenshotPath = `${PATHS.SCREENSHOTS}/${scenario.pickle.name}.png`;
      await this.page?.screenshot({ path: screenshotPath });
      console.log(`Screenshot saved: ${screenshotPath}`);
    }

    // Close browser context and browser
    if (this.context) {
      await this.context.close();
    }
    if (this.browser) {
      await this.browser.close();
    }
  } catch (error) {
    console.error('Error in After hook:', error);
  }
});
