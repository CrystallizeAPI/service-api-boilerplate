function lookup({ request, pathname }) {
  const handler = {
    "/test": ({ request }) => require("./test")({ request }),
  }[pathname];

  return handler;
}

module.exports = {
  lookup,
};
