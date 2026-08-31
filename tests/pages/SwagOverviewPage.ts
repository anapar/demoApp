import type { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

type Needle = string | number;

class SwagOverviewPage extends BasePage {
  constructor(page: Page) {
    super('.inventory_list', page);
  }

  private get swagItems(): Locator {
    return this.page.locator('.inventory_item');
  }

  /**
   * Get the amount of swag items listed on the page
   */
  async getAmount(): Promise<number> {
    return this.swagItems.count();
  }

  /**
   * Get a swag Item based on a search string or a number of the visible items
   */
  async swag(needle: Needle): Promise<Locator | undefined> {
    if (typeof needle === 'string') {
      const count = await this.swagItems.count();

      for (let index = 0; index < count; index += 1) {
        const swagItem = this.swagItems.nth(index);
        const text = await swagItem.textContent();

        if (text?.includes(needle)) {
          return swagItem;
        }
      }

      return undefined;
    }

    return this.swagItems.nth(needle);
  }

  /**
   * Get the text of the swag swag text
   */
  async getSwagText(needle: Needle): Promise<string> {
    const item = await this.swag(needle);
    return (await item?.textContent()) ?? '';
  }

  /**
   * Add a swag items to the cart
   */
  async addSwagToCart(needle: Needle) {
    const item = await this.swag(needle);
    await item?.locator('.btn_primary.btn_inventory').click();
  }

  /**
   * Remove swag items from the cart
   */
  async removeSwagFromCart(needle: Needle) {
    const item = await this.swag(needle);
    await item?.locator('.btn_secondary.btn_inventory').click();
  }

  /**
   * Open the details of a swag swag
   */
  async openSwagDetails(needle: Needle) {
    const item = await this.swag(needle);
    await item?.locator('.inventory_item_name').click();
  }
}

export default SwagOverviewPage;
