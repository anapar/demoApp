import type { Page } from '@playwright/test';
import BasePage from './BasePage';
import { DEFAULT_TIMEOUT } from '../config/e2eConstants';

class LoginPage extends BasePage {
  constructor(page: Page) {
    super('#login_button_container', page);
  }

  get username() {
    return this.page.locator('#user-name');
  }

  get password() {
    return this.page.locator('#password');
  }

  get loginButton() {
    return this.page.locator('.btn_action');
  }

  get errorMessage() {
    return this.page.locator('[data-test="error"]');
  }

  /**
   * Sign in.
   */
  async signIn(userDetails: { username: string, password: string }) {
    const { password, username } = userDetails;

    await this.waitForIsShown();
    if (username) {
      await this.username.fill(username);
    }
    if (password) {
      await this.password.fill(password);
    }

    await this.loginButton.click();
  }

  /**
   * Get the text or the error message container
   */
  async getErrorMessage(): Promise<string> {
    await this.errorMessage.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });

    return (await this.errorMessage.textContent()) ?? '';
  }

  /**
   * Check if the error message is displayed
   */
  async isErrorMessageDisplayed(): Promise<boolean> {
    return this.errorMessage.isVisible();
  }
}

export default LoginPage;
