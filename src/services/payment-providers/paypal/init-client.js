const checkoutNodeJssdk = require("@paypal/checkout-server-sdk");

function client() {
  return new checkoutNodeJssdk.core.PayPalHttpClient(environment());
}

function environment() {
  let clientId = process.env.PAYPAL_CLIENT_ID || "PAYPAL-SANDBOX-CLIENT-ID";
  let clientSecret =
    process.env.PAYPAL_CLIENT_SECRET || "PAYPAL-SANDBOX-CLIENT-SECRET";

  let clientEnv =
    process.env.NODE_ENV === "production"
      ? new checkoutNodeJssdk.core.LiveEnvironment(clientId, clientSecret)
      : new checkoutNodeJssdk.core.SandboxEnvironment(clientId, clientSecret);

  return clientEnv;
}

module.exports = { paypal: client, prettyPrint: {} };
