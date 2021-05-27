const { getClient } = require("./utils");
const toCrystallizeOrderModel = require("./to-crystallize-order-model");
const createPayment = require("./create-payment");
const env = require("../../../lib/env");

module.exports = {
  _enabled: Boolean(env("MOLLIE_API_KEY")),
  enabled: false,
  frontendConfig: {},
  getClient,
  toCrystallizeOrderModel,
  createPayment,
};
