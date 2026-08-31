import type { Page } from '@playwright/test';
import BasePage from './BasePage';
import { DEFAULT_TIMEOUT } from '../config/e2eConstants';

type PersonalInfoType = {
  firstName?: string;
  lastName?: string;
  zip?: string;
}

class CheckoutPersonalInfoPage extends BasePage {
  constructor(page: Page) {
    super('#checkout_info_container', page);
  }

  private get cancelButton() {
    return this.page.locator('.cart_cancel_link');
  }

  private get continueCheckoutButton() {
    return this.page.locator('.cart_button');
  }

  private get firstName() {
    return this.page.locator('[data-test="firstName"]');
  }

  private get lastName() {
    return this.page.locator('[data-test="lastName"]');
  }

  private get postalCode() {
    return this.page.locator('[data-test="postalCode"]');
  }

  private get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  /**
   * Submit personal info
   */
  async submitPersonalInfo(personalInfo: PersonalInfoType) {
    const { firstName, lastName, zip } = personalInfo;

    await this.waitForIsShown();
    if (firstName) {
      await this.firstName.fill(firstName);
    }
    if (lastName) {
      await this.lastName.fill(lastName);
    }
    if (zip) {
      await this.postalCode.fill(zip);
    }
    await this.continueCheckoutButton.click();
  }

  /**
   * Get the text or the error message container
   */
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
    return (await this.errorMessage.textContent()) ?? '';
  }

  /**
   * Cancel checkout
   */
  async cancelCheckout() {
    await this.cancelButton.click();
  }
}

export default CheckoutPersonalInfoPage;
