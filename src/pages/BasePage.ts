import { Page, expect } from '@playwright/test';
import { TIMEOUTS, PATHS } from '../config/constants';
import * as fs from 'fs';

/**
 * Base Page class containing common methods for all page objects
 * Provides foundational functionality for navigation, waiting, and assertions
 */
export class BasePage {
  protected readonly page: Page;
  protected readonly defaultTimeout = TIMEOUTS.DEFAULT;

  constructor(page: Page) {
    this.page = page;
  }

  /**
   * Navigate to a specific URL
   * @param url - The URL path to navigate to
   */
  async goto(url: string) {
    try {
      await this.page.goto(url);
      await this.page.waitForLoadState('networkidle');
    } catch (error) {
      throw new Error(`Failed to navigate to ${url}: ${error}`);
    }
  }

  /**
   * Get the current URL
   * @returns The current page URL
   */
  async getCurrentUrl(): Promise<string> {
    return this.page.url();
  }

  /**
   * Wait for URL to contain specific text
   * @param text - Text that should be in the URL
   */
  async waitForUrlContains(text: string) {
    try {
      await expect(this.page).toHaveURL(new RegExp(text), { timeout: this.defaultTimeout });
    } catch (error) {
      throw new Error(`URL did not contain "${text}" within ${this.defaultTimeout}ms`);
    }
  }

  /**
   * Take a screenshot and save it
   * @param name - Name of the screenshot file
   */
  async takeScreenshot(name: string) {
    try {
      // Ensure screenshots directory exists
      if (!fs.existsSync(PATHS.SCREENSHOTS)) {
        fs.mkdirSync(PATHS.SCREENSHOTS, { recursive: true });
      }

      const screenshotPath = `${PATHS.SCREENSHOTS}/${name}.png`;
      await this.page.screenshot({ path: screenshotPath });
      console.log(`Screenshot saved to: ${screenshotPath}`);
    } catch (error) {
      console.error(`Failed to take screenshot "${name}": ${error}`);
    }
  }

  /**
   * Wait for element to be visible
   * @param selector - Element selector
   * @param timeout - Optional timeout
   */
  async waitForElement(selector: string, timeout: number = this.defaultTimeout) {
    try {
      await this.page.locator(selector).waitFor({ state: 'visible', timeout });
    } catch (error) {
      throw new Error(`Element "${selector}" did not appear within ${timeout}ms`);
    }
  }

  /**
   * Generic wait function
   * @param ms - Milliseconds to wait
   */
  async wait(ms: number) {
    await this.page.waitForTimeout(ms);
  }
}
