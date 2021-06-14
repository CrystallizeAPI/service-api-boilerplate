const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");
const { paypal: PaypalClient } = require("./init-client");
const toCrystallizeOrderModel = require("./to-crystallize-order-model");

async function confirmPaypalPayment({ checkoutModel, orderId, context }) {
  const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(orderId);
  request.requestBody({});

  const crystallize = require("../../crystallize");
  const basketService = require("../../basket-service");
  const { basketModel } = checkoutModel;
  const basket = await basketService.get({ basketModel, context });

  let order;
  try {
    const capture = await PaypalClient().execute(request);
    const orderModel = toCrystallizeOrderModel(basket, capture);

    order = await crystallize.orders.create(orderModel);
  } catch (err) {
    console.error(err);
    return {
      success: false,
      orderId: "",
    };
  }

  // return order id

  return {
    success: true,
    orderId: order.id,
  };
}

module.exports = confirmPaypalPayment;
