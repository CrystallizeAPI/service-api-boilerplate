const invariant = require("invariant");

const NETS_SECRET_KEY = process.env.NETS_SECRET_KEY;
const NETS_CHECKOUT_KEY = process.env.NETS_CHECKOUT_KEY;

/**
 * Determine if we're targeting dev or prod. Set NETS_ENV to
 * production to do so.
 */
const NETS_ENV = process.env.NETS_ENV || "development";

let client;

module.exports = {
  getClient: () => {
    if (client) {
      return client;
    }

    invariant(NETS_SECRET_KEY, "process.env.NETS_SECRET_KEY is not defined");
    invariant(
      NETS_CHECKOUT_KEY,
      "process.env.NETS_CHECKOUT_KEY is not defined"
    );

    const NetsClient = require("./client");
    client = new NetsClient({
      SECRET_KEY: NETS_SECRET_KEY,
      ENV: NETS_ENV,
    });

    return client;
  },
};
