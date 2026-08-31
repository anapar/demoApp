// @ts-check
import { test, expect } from '@playwright/test';

import { LOGIN_USERS } from '../config/e2eConstants';
import LoginPage from '../pages/LoginPage';
import SwagOverviewPage from '../pages/SwagOverviewPage';

test.describe('LoginPage', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('http://localhost:3000/');
  });

  test('should be able to test loading of login page', async ({ page }) => {
    const loginPage = new LoginPage(page);

    await expect(page.locator('#login_button_container')).toBeVisible();
    await expect(await loginPage.waitForIsShown()).toBeTruthy();
  });

  test('should be able to login with a standard user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    const swagOverviewPage = new SwagOverviewPage(page);

    await loginPage.signIn(LOGIN_USERS.STANDARD);
    expect(await swagOverviewPage.waitForIsShown()).toBeTruthy();
    await expect(page.locator('.inventory_list')).toBeVisible();
  });

  test('should not be able to login with a locked user', async ({ page }) => {
    const loginPage = new LoginPage(page);
    // It doesn't matter which error we check, all errors should be checked in a UT
    // With this UT we just check that a failure is triggered
    await loginPage.signIn(LOGIN_USERS.LOCKED);

    expect(await loginPage.isErrorMessageDisplayed()).toBeTruthy();
    expect(await loginPage.getErrorMessage()).toContain('Epic sadface: Sorry, this user has been locked out.');
  });
});
