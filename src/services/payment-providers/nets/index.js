/**
 * Nets (https://portal.dibspayment.eu/)
 */

const NETS_SECRET_KEY = process.env.NETS_SECRET_KEY;
const NETS_CHECKOUT_KEY = process.env.NETS_CHECKOUT_KEY;

module.exports = {
  enabled: Boolean(NETS_SECRET_KEY && NETS_CHECKOUT_KEY),
  frontendConfig: {},
};
