const createPaymentIntent = require("./create-payment-intent");
const confirmOrder = require("./confirm-order");
const env = require("../../../lib/env");

const STRIPE_SECRET_KEY = env("STRIPE_SECRET_KEY");
const STRIPE_PUBLISHABLE_KEY = env("STRIPE_PUBLISHABLE_KEY");

module.exports = {
  enabled: Boolean(STRIPE_SECRET_KEY && STRIPE_PUBLISHABLE_KEY),

  // The required frontend config
  frontendConfig: {
    publishableKey: STRIPE_PUBLISHABLE_KEY,
  },
  createPaymentIntent,
  confirmOrder,
};
