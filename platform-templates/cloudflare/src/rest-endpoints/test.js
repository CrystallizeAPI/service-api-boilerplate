module.exports = function () {
  return new Response("Tenant: " + CRYSTALLIZE_TENANT_IDENTIFIER, {
    status: 200,
  });
};
