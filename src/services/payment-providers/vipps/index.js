/**
 * Vipps (https://vipps.no)
 *
 * Getting started:
 * https://crystallize.com/learn/open-source/payment-gateways/vipps
 */

const env = require("../../../lib/env");

const VIPPS_CLIENT_ID = env("VIPPS_CLIENT_ID");
const VIPPS_CLIENT_SECRET = env("VIPPS_CLIENT_SECRET");
const VIPPS_MERCHANT_SERIAL = env("VIPPS_MERCHANT_SERIAL");
const VIPPS_SUB_KEY = env("VIPPS_SUB_KEY");

const initiatePayment = require("./initiate-payment");
const fallback = require("./fallback");
const orderUpdate = require("./order-update");
const userConsentRemoval = require("./user-consent-removal");

module.exports = {
  _enabled: Boolean(
    VIPPS_CLIENT_ID &&
      VIPPS_CLIENT_SECRET &&
      VIPPS_MERCHANT_SERIAL &&
      VIPPS_SUB_KEY
  ),
  enabled: false,
  frontendConfig: {},
  initiatePayment,
  fallback,
  orderUpdate,
  userConsentRemoval,
};
