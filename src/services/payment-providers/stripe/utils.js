const invariant = require("invariant");
const qs = require("qs");

const env = require("../../../lib/env");

const STRIPE_SECRET_KEY = env("STRIPE_SECRET_KEY");

const stripe = async (path, body, method) => {
  // eslint-disable-next-line no-undef
  const resp = await fetch(`https://api.stripe.com/v1${path}`, {
    ...(method === "POST" ? { body: qs.stringify(body) } : {}),
    headers: {
      Authorization: `Bearer ${STRIPE_SECRET_KEY}`,
      "Content-type": "application/x-www-form-urlencoded",
    },
    method,
  });

  return await resp.json();
};

let client;
module.exports = {
  getClient: () => {
    invariant(STRIPE_SECRET_KEY, "STRIPE_SECRET_KEY is not defined");

    if (!client) {
      client = {
        paymentIntents: {
          create: (args) => stripe("/payment_intents", args, "POST"),
          retrieve: (id) => stripe(`/payment_intents/${id}`, null, "GET"),
        },
      };
    }

    return client;
  },
};
