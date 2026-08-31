import type { Page } from '@playwright/test';
import BasePage from './BasePage';
import { DEFAULT_TIMEOUT } from '../config/e2eConstants';

class CheckoutCompletePage extends BasePage {
    constructor(page: Page) {
        super('#checkout_complete_container', page);
    }

    private get completeHeader() {
        return this.page.locator('.complete-header');
    }

    private get completeText() {
        return this.page.locator('.complete-text');
    }

    private get generatePdfButton() {
        return this.page.locator('[data-test="generate-pdf-order"]');
    }

    /**
     * Get the completion header text
     */
    async getHeaderText(): Promise<string> {
        return (await this.completeHeader.textContent()) ?? '';
    }

    /**
     * Get the completion body text
     */
    async getCompleteText(): Promise<string> {
        return (await this.completeText.textContent()) ?? '';
    }

    /**
     * Click the "Generate PDF order" button to download the order receipt
     */
    async generatePdfOrder(): Promise<void> {
        await this.generatePdfButton.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
        await this.generatePdfButton.click();
    }
}

export default CheckoutCompletePage;
