class ItemsPage {
    constructor(page) {
        this.page = page;

        //Items elements
        this.backPackBtn = this.page.locator('#add-to-cart-sauce-labs-backpack');
        this.bikeLightBtn = this.page.locator('#add-to-cart-sauce-labs-bike-light');
        this.tshirtBtn = this.page.locator('#add-to-cart-sauce-labs-bolt-t-shirt');
        this.jacketBtn = this.page.locator('#add-to-cart-sauce-labs-fleece-jacket');
        this.onesieBtn = this.page.locator('#add-to-cart-sauce-labs-onesie');
        this.redTshirtBtn = this.page.locator('#add-to-cart-test.allthethings()-t-shirt-(red)');
        this.shoppingCartBtn = this.page.locator('#shopping_cart_container');

        this.checkoutBtn = this.page.locator('#checkout');

        this.backPack = this.page.locator('#item_4_title_link');
        this.bikeLight = this.page.locator('#item_0_title_link');
        this.tshirt = this.page.locator('#item_1_title_link');
        this.jacket = this.page.locator('#item_5_title_link');
        this.onesie = this.page.locator('#item_2_title_link');
        this.redTshirt = this.page.locator('#item_3_title_link');
        this.itemDescription = this.page.locator('.inventory_details_desc');

        this.removeBtn = this.page.locator('#remove-sauce-labs-backpack');
    }

        async addItemsToCartAsync(item){
        switch(item.toLowerCase()){
            case 'backpack':
                await this.backPackBtn.waitFor();
                await this.backPackBtn.click();
                break;
            case 'bike light':
                await this.bikeLightBtn.waitFor();
                await this.bikeLightBtn.click();
                break;
            case 'bolt t-shirt':
                await this.tshirtBtn.waitFor();
                await this.tshirtBtn.click();
                break;
            case 'fleece jacket':
                await this.jacketBtn.waitFor();
                await this.jacketBtn.click();
                break;
            case 'onesie':
                await this.onesieBtn.waitFor();
                await this.onesieBtn.click();
                break;
            case 'red t-shirt':
                await this.redTshirtBtn.waitFor();
                await this.redTshirtBtn.click();
                break;
            default :
                throw new Error('Item not recognized: ' + item);
        }
    }

    async goToCartAsync(){
        await this.shoppingCartBtn.waitFor();
        await this.shoppingCartBtn.click();
    }

    async checkoutItemsAsync(){
        await this.checkoutBtn.waitFor();
        await this.checkoutBtn.click();
    }

    async removeItemFromCartAsync() {
       await this.removeBtn.waitFor();
       await this.removeBtn.click();
    }

    async viewItemAsync(item) {
        switch(item.toLowerCase()){
            case 'backpack':
                await this.backPack.waitFor();
                await this.backPack.click();
                break;
            case 'bike light':
                await this.bikeLight.waitFor();
                await this.bikeLight.click();
                break;
            case 'bolt t-shirt':
                await this.tshirt.waitFor();
                await this.tshirt.click();
                break;
            case 'fleece jacket':
                await this.jacket.waitFor();
                await this.jacket.click();
                break;
            case 'onesie':
                await this.onesieBtn.waitFor();
                await this.onesieBtn.click();
                break;
            case 'red t-shirt':
                await this.onesie.waitFor();
                await this.redTshirt.click();
                break;
        }
    }

    async getItemDescriptionAsync() {
        await this.itemDescription.waitFor();
        return await this.itemDescription.textContent();
    }
}

module.exports = {ItemsPage};