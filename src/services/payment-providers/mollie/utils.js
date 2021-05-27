const invariant = require("invariant");

const env = require("../../../lib/env");

const MOLLIE_API_KEY = env("MOLLIE_API_KEY");

let client;
module.exports = {
  getClient: () => {
    invariant(MOLLIE_API_KEY, "MOLLIE_API_KEY is not defined");

    if (!client) {
      const { createMollieClient } = require("@mollie/api-client");
      client = createMollieClient({ apiKey: MOLLIE_API_KEY });
    }

    return client;
  },
};
