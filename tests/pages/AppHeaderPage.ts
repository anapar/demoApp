import type { Page } from '@playwright/test';

class AppHeaderPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    private get cart() {
        return this.page.locator('.shopping_cart_link');
    }

    /**
     * Get the cart amount
     */
    async getCartAmount(): Promise<string> {
        await this.page.waitForTimeout(500);

        return (await this.cart.textContent()) ?? '';
    }

    /**
     * Open the cart
     */
    async openCart() {
        await this.cart.click();
    }
}

export default AppHeaderPage;
