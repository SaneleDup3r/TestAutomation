class LoginPage {
    constructor(page) {
        this.page = page;

        //Login elements
        this.usernameInput = this.page.locator('#user-name');
        this.passwordInput = this.page.locator('#password');
        this.loginButton = this.page.getByRole('button', {name: 'Login'});

    }
    
    async loginAsync(username, password){
        await this.usernameInput.waitFor();
        await this.usernameInput.fill(username);

        await this.passwordInput.waitFor();
        await this.passwordInput.fill(password);

        await this.loginButton.waitFor();
        await this.loginButton.click();
    }
}

module.exports = {LoginPage};