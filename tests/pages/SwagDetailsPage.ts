import type { Page } from '@playwright/test';
import BasePage from './BasePage';

class SwagDetailsPage extends BasePage {
  constructor(page: Page) {
    super('.inventory_details', page);
  }

  private get title() {
    return this.page.locator('.inventory_details_name');
  }

  private get description() {
    return this.page.locator('.inventory_details_desc');
  }

  private get price() {
    return this.page.locator('.inventory_details_price');
  }

  private get addButton() {
    return this.page.locator('.btn_primary.btn_inventory');
  }

  private get removeButton() {
    return this.page.locator('.btn_secondary.btn_inventory');
  }

  private get goBackButton() {
    return this.page.locator('.inventory_details_back_button');
  }

  /**
   * Get the text of the swag item
   */
  async getText() {
    return `${await this.title.textContent() ?? ''} ${await this.description.textContent() ?? ''} ${await this.price.textContent() ?? ''}`;
  }

  /**
   * Add a swag item to the cart
   */
  async addToCart() {
    await this.addButton.click();
  }

  /**
   * Remove a swag item from the cart
   */
  async removeFromCart() {
    await this.removeButton.click();
  }

  /**
   * Go back to the inventory list
   */
  async goBack() {
    await this.goBackButton.click();
  }
}

export default SwagDetailsPage;
