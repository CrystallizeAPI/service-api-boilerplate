const { callCatalogueApi } = require("../../../services/crystallize/utils");

async function getDefaultTenantCurrency() {
  const currency = await callCatalogueApi({
    query: `
          query {
              tenant(language: "en") {
                  defaults {
                      currency
                  }
              }
          }
          `,
  });

  return currency?.data?.tenant?.defaults?.currency || null;
}

module.exports = getDefaultTenantCurrency;
