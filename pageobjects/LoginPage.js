class LoginPage {

constructor(page)
{
    this.page = page;
    this.signInbutton= page.locator("[value='Login']");
    this.userName = page.locator("#userEmail");
    this.password = page.locator("#userPassword");

}

async goTo()
{
    await this.page.goto("https://rahulshettyacademy.com/client");
}

async validLogin(username, password) {
    await this.userName.fill(username);
    await this.password.fill(password);
    await this.signInbutton.click();

    // Wait until products appear
    await this.page.locator(".card-body").first().waitFor({
        state: "visible",
        timeout: 60000
    });
}

}
module.exports = {LoginPage};