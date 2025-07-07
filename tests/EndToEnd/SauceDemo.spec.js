import {test, expect} from '@playwright/test';
const BasePage = require('./Pages/basePage.js').BasePage;
const LoginPage = require('./Pages/loginPage.js').LoginPage;
const ItemsPage = require('./Pages/itemsPage.js').ItemsPage;
const CheckoutPage = require('./Pages/checkoutPage.js').CheckoutPage;

test.describe('SauceDemo End-to-End Tests', () => {
    test.describe.configure({ mode: 'serial' });

    test('Purchase items', async ({page}) => {
        // Navigate to home page
        const basePage = new BasePage(page);
        await basePage.navigateTo();

        // Login
        const loginPage = new LoginPage(page);
        await loginPage.loginAsync("standard_user","secret_sauce");

        //Add items to cart
        const itemsPage = new ItemsPage(page);
        await itemsPage.addItemsToCartAsync('backpack');
        await itemsPage.addItemsToCartAsync('bike light');
        await itemsPage.goToCartAsync();
        await itemsPage.checkoutItemsAsync();

        //Fill checkout details
        const checkoutPage = new CheckoutPage(page);
        await checkoutPage.fillCheckoutDetailsAsync("Sanele","Gwiji","1234")
        await checkoutPage.finishButtonAsync();

        const OrderCompletedText = await checkoutPage.getOrderCompletedTextAsync();
        expect(OrderCompletedText).toContain("Your order has been dispatched, and will arrive just as fast as the pony can get there!");
    });

    test('View an item', async ({page}) => {
        // Navigate to home page
        const basePage = new BasePage(page);
        await basePage.navigateTo();

        // Login
        const loginPage = new LoginPage(page);
        await loginPage.loginAsync("standard_user","secret_sauce");

        //View an item
        const itemsPage = new ItemsPage(page);
        await itemsPage.viewItemAsync('backpack');

        const itemDescription = await itemsPage.getItemDescriptionAsync();
        expect(itemDescription).toContain("carry.allTheThings() with the sleek, streamlined Sly Pack that melds uncompromising style with unequaled laptop and tablet protection.");
    });

    test('Remove item from checkout', async ({page}) => {
        // Navigate to home page
        const basePage = new BasePage(page);
        await basePage.navigateTo();

        // Login
        const loginPage = new LoginPage(page);
        await loginPage.loginAsync("standard_user","secret_sauce");

       //Add items to cart
        const itemsPage = new ItemsPage(page);
        await itemsPage.addItemsToCartAsync('backpack');
        await itemsPage.goToCartAsync();
        await itemsPage.removeItemFromCartAsync();

    });
});
