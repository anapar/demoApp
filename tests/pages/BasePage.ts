import type { Locator, Page } from '@playwright/test';
import { DEFAULT_TIMEOUT } from '../config/e2eConstants';

export default class BasePage {
    protected page: Page;
    protected selector: string;

    constructor(selector: string, page: Page) {
        this.selector = selector;
        this.page = page;
    }

    protected getLocator(selector?: string): Locator {
        return this.page.locator(selector ?? this.selector);
    }

    /**
     * Wait for the element to be displayed
     */
    async waitForIsShown(isShown = true): Promise<boolean> {
        const locator = this.getLocator();

        try {
            if (isShown) {
                await locator.waitFor({ state: 'visible', timeout: DEFAULT_TIMEOUT });
                return true;
            }

            await locator.waitFor({ state: 'hidden', timeout: DEFAULT_TIMEOUT });
            return true;
        } catch (e) {
            return !isShown;
        }
    }

    /**
     * Give back if the element is displayed
     */
    async isDisplayed(): Promise<boolean> {
        return this.getLocator().isVisible();
    }
}
