import { Page, expect } from '@playwright/test';

export class BasePage {
  protected readonly page: Page;

  constructor(page: Page) {
    this.page = page; 
  }
  async goto(url: string) {
    await this.page.goto(url);
  }

  async getCurrentUrl() {
    return this.page.url();
  }

  async waitForUrlContains(text: string) {
    await expect(this.page).toHaveURL(new RegExp(text));
  }

  async takeScreenshot(name: string) {
    await this.page.screenshot({ path: `screenshots/${name}.png` });
  }
}
