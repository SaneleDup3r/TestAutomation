class BasePage {
    constructor (page) {
        this.page = page;
    }

    async navigateTo() {
        const url = 'https://www.saucedemo.com/';
        await this.page.goto(url);
    }
}

module.exports = {BasePage};
