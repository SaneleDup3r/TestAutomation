class CheckoutPage{
    constructor(page) {
        this.page = page;

        //Checkout elements
        this.firstNameInput = this.page.locator('#first-name');
        this.lastNameInput = this.page.locator('#last-name');
        this.zipCodeInput = this.page.locator('#postal-code');
        this.continueBtn = this.page.locator('#continue');
        this.finishBtn = this.page.locator('#finish');
        this.OrderCompletedText = this.page.locator('.complete-text');
    }

    async fillCheckoutDetailsAsync(firstName, lastName, zipCode) {
        await this.firstNameInput.waitFor();
        await this.firstNameInput.fill(firstName);

        await this.lastNameInput.waitFor();
        await this.lastNameInput.fill(lastName);

        await this.zipCodeInput.waitFor();
        await this.zipCodeInput.fill(zipCode);

        await this.continueBtn.waitFor();
        await this.continueBtn.click();
    }

    async finishButtonAsync(){
        await this.finishBtn.waitFor();
        await this.finishBtn.click();
    }

    async getOrderCompletedTextAsync() {
        await this.OrderCompletedText.waitFor();
        return await this.OrderCompletedText.textContent();
    }
}

module.exports = {CheckoutPage};