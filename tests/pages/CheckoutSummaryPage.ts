import type { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

type Needle = string | number;

class CheckoutSummaryPage extends BasePage {
  constructor(page: Page) {
    super('#checkout_summary_container', page);
  }

  async title(needle: Needle): Promise<Locator | undefined> {
    const item = await this.swag(needle);
    return item?.locator('.inventory_item_name');
  }

  async description(needle: Needle): Promise<Locator | undefined> {
    const item = await this.swag(needle);
    return item?.locator('.inventory_item_desc');
  }

  async price(needle: Needle): Promise<Locator | undefined> {
    const item = await this.swag(needle);
    return item?.locator('.inventory_item_price');
  }

  private get cancelButton() {
    return this.page.locator('.cart_cancel_link');
  }

  private get finishButton() {
    return this.page.locator('.cart_button');
  }

  private get items() {
    return this.page.locator('.cart_item');
  }

  /**
   * Get the amount of swag items listed on the page
   */
  async getSwagAmount(): Promise<number> {
    return this.items.count();
  }

  /**
   * Get a cart item based on a search string or a number of the visible items
   */
  async swag(needle: Needle): Promise<Locator | undefined> {
    if (typeof needle === 'string') {
      const count = await this.items.count();

      for (let index = 0; index < count; index += 1) {
        const item = this.items.nth(index);
        const text = await item.textContent();

        if (text?.includes(needle)) {
          return item;
        }
      }

      return undefined;
    }

    return this.items.nth(needle);
  }

  /**
   * Get the text of the cart
   */
  async getSwagText(needle: Needle) {
    const title = await this.title(needle);
    const description = await this.description(needle);
    const price = await this.price(needle);

    return `${await title?.textContent() ?? ''} ${await description?.textContent() ?? ''} ${await price?.textContent() ?? ''}`;
  }

  /**
   * Cancel checkout
   */
  async cancelCheckout() {
    await this.cancelButton.click();
  }

  /**
   * Finish checkout
   */
  async finishCheckout() {
    await this.finishButton.click();
  }
}

export default CheckoutSummaryPage;
