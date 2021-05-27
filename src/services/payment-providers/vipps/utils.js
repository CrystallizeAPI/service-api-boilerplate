const invariant = require("invariant");

const env = require("../../../lib/env");

const VIPPS_CLIENT_ID = env("VIPPS_CLIENT_ID");
const VIPPS_CLIENT_SECRET = env("VIPPS_CLIENT_SECRET");
const VIPPS_SUB_KEY = env("VIPPS_SUB_KEY");

let client;
module.exports = {
  getClient: () => {
    invariant(VIPPS_CLIENT_ID, "VIPPS_CLIENT_ID is not defined");
    invariant(VIPPS_CLIENT_SECRET, "VIPPS_CLIENT_SECRET is not defined");
    invariant(VIPPS_SUB_KEY, "VIPPS_SUB_KEY is not defined");

    if (!client) {
      const VippsClient = require("@crystallize/node-vipps");
      client = new VippsClient({
        testDrive: true,
        id: VIPPS_CLIENT_ID,
        secret: VIPPS_CLIENT_SECRET,
        subscriptionId: VIPPS_SUB_KEY,
      });
    }

    return client;
  },
};
