const paypal = require("@paypal/checkout-server-sdk");
const { paypal: PaypalClient } = require("./init-client");

async function createPaypalPayment({ checkoutModel, context }) {
  // calculate cost using checkout model

  const basketService = require("../../basket-service");
  const { basketModel } = checkoutModel;
  const basket = await basketService.get({ basketModel, context });

  const request = new paypal.orders.OrdersCreateRequest();
  request.prefer("return=representation");
  request.requestBody({
    intent: "CAPTURE",
    purchase_units: [
      {
        amount: {
          currency_code: basket.total.currency,
          value: basket.total.gross.toString(),
        },
      },
    ],
  });

  let order;
  try {
    order = await PaypalClient().execute(request);
  } catch (err) {
    console.error(err);
    return { success: false };
  }

  return {
    success: true,
    orderId: order.result.id,
  };
}

module.exports = createPaypalPayment;
