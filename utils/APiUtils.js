class APiUtils {
    constructor(apiContext, loginPayLoad) {
        this.apiContext = apiContext;
        this.loginPayLoad = loginPayLoad;
    }

    async getToken() {


        console.log("Login Payload:", this.loginPayLoad);
        
        const loginResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/auth/login",
            {
                data: this.loginPayLoad
            }
        );

        const loginResponseJson = await loginResponse.json();

        console.log("Login Status:", loginResponse.status());
        console.log("Login Response:", loginResponseJson);

        if (!loginResponse.ok()) {
            throw new Error(`Login Failed: ${JSON.stringify(loginResponseJson)}`);
        }

        if (!loginResponseJson.token) {
            throw new Error("Token not returned from Login API.");
        }

        return loginResponseJson.token;
    }

    async createOrder(orderPayLoad) {

        const token = await this.getToken();

        const orderResponse = await this.apiContext.post(
            "https://rahulshettyacademy.com/api/ecom/order/create-order",
            {
                data: orderPayLoad,
                headers: {
                    Authorization: token,
                    "Content-Type": "application/json"
                }
            }
        );

        const orderResponseJson = await orderResponse.json();

        console.log("Order Status:", orderResponse.status());
        console.log("Order Response:", orderResponseJson);

        if (!orderResponse.ok()) {
            throw new Error(`Order Creation Failed: ${JSON.stringify(orderResponseJson)}`);
        }

        return {
            token,
            orderId: orderResponseJson.orders[0]
        };
    }
}

module.exports = { APiUtils };