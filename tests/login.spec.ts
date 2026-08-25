import {test,expect} from '@playwright/test';
test('login page is displayed',async ({page})=>{
    await page.goto('http://localhost:3000/');
    await expect(page).toHaveTitle(/Swag Labs/);

    await page.locator('#user-name').fill('standard_user');
    await page.locator('#password').fill('secret_sauce');
    await page.locator('#login-button').click();
    await expect(page.getByText('Products')).toBeVisible();


   
});