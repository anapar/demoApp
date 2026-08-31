import type { Locator, Page } from '@playwright/test';
import BasePage from './BasePage';

type Needle = string | number;

class CartSummaryPage extends BasePage {
  constructor(page: Page) {
    super('#cart_contents_container', page);
  }

  private get checkoutButton() {
    return this.page.locator('.checkout_button');
  }

  private get continueShoppingButton() {
    return this.page.locator('.btn_secondary');
  }

  private get items() {
    return this.page.locator('.cart_item');
  }

  /**
   * Get the amount of swag items in the cart
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
   * Get the text of the cart swag text
   */
  async getSwagText(needle: Needle) {
    const item = await this.swag(needle);
    return (await item?.textContent()) ?? '';
  }

  /**
   * Remove a swag item from the cart
   */
  async removeSwag(needle: Needle) {
    const item = await this.swag(needle);
    await item?.locator('.btn_secondary.cart_button').click();
  }

  /**
   * Continue shopping
   */
  async continueShopping() {
    await this.continueShoppingButton.click();
  }

  /**
   * Go to the checkout process
   */
  async goToCheckout() {
    await this.checkoutButton.click();
  }
}

export default CartSummaryPage;
