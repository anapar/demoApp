import type { Page } from '@playwright/test';

class MenuPage {
    private page: Page;

    constructor(page: Page) {
        this.page = page;
    }

    get menu() {
        return this.page.locator('.bm-burger-button');
    }

    get inventoryListButton() {
        return this.page.locator('#inventory_sidebar_link');
    }

    get aboutButton() {
        return this.page.locator('#about_sidebar_link');
    }

    get logoutButton() {
        return this.page.locator('#logout_sidebar_link');
    }

    get resetButton() {
        return this.page.locator('#reset_sidebar_link');
    }

    /**
     * Open the menu
     */
    async open() {
        await this.menu.click();
        await this.page.waitForTimeout(500);
    }

    /**
     * Open the inventory list page
     */
    async openInventoryList() {
        await this.inventoryListButton.click();
    }

    /**
     * Open the about page
     */
    async openAboutPage() {
        await this.aboutButton.click();
    }

    /**
     * Logout
     */
    async logout() {
        await this.logoutButton.click();
    }

    /**
     * Reset the app state
     */
    async restAppState() {
        await this.resetButton.click();
    }
}

export default MenuPage;
