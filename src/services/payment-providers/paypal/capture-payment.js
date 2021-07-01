async function capturePaypalPayment(crystallizeOrderId) {
  const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");
  
  const { paypal: PaypalClient } = require("./init-client");
  
  const crystallize = require("../../crystallize");

  try {
    const crystallizeOrder = await crystallize.orders.get(crystallizeOrderId);


    // const request = new checkoutNodeJssdk.orders.OrdersCaptureRequest(crystallizeOrder.);
    // request.requestBody({});  
    // const response = await PaypalClient().execute(request);
    
    // Todo: update Crystallize order with payment status
  } catch (err) {
    console.error(err);
    return {
      success: false
    };
  }

  return {
    success: true
  };
}

module.exports = capturePaypalPayment;
