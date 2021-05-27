const env = require("../../../lib/env");

const KLARNA_USERNAME = env("KLARNA_USERNAME");
const KLARNA_PASSWORD = env("KLARNA_PASSWORD");

const { getClient } = require("./utils");

const renderCheckout = require("./render-checkout");
const push = require("./push");
const capture = require("./capture");

module.exports = {
  _enabled: Boolean(KLARNA_USERNAME && KLARNA_PASSWORD),
  enabled: false,
  frontendConfig: {},
  getClient,
  renderCheckout,
  push,
  capture,
};
