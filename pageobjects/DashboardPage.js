class DashboardPage {
    constructor(page) {
        this.page = page;
        this.products = page.locator(".card-body");
        this.productsText = page.locator(".card-body b");
        this.cart = page.locator("[routerlink*='cart']");
        this.orders = page.locator("button[routerlink*='myorders']");
    }

async searchProductAddCart(productName)
{
    await this.products.first().waitFor({
        state: "visible",
        timeout: 60000
    });

    const titles = await this.productsText.allTextContents();
    console.log("Products:", titles);

    const count = await this.products.count();

    for (let i = 0; i < count; ++i)
    {
        if ((await this.products.nth(i).locator("b").textContent()).trim() === productName)
        {
       await this.products
    .nth(i)
    .getByRole("button", { name: "Add To Cart" })
    .click();

await this.page.locator("#toast-container").waitFor({
    state: "visible",
    timeout: 10000
});

            break;
        }
    }
}

    async navigateToOrders() {
        await this.orders.waitFor({ state: "visible" });
        await this.orders.click();
    }

    async navigateToCart()
{
    await this.cart.waitFor({
    state: "attached",
    timeout: 60000
});

await this.cart.click();
}
}

module.exports = { DashboardPage };