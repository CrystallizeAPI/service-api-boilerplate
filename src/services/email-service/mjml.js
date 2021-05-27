const fetch = require("node-fetch");

const env = require("../../lib/env");

module.exports = async function (mjml) {
  const response = await fetch("https://api.mjml.io/v1/render", {
    method: "post",
    headers: {
      "content-type": "application/json",
      Authorization:
        "Basic " +
        Buffer.from(env("MJML_APP_ID") + ":" + env("MJML_SECRET_KEY")).toString(
          "base64"
        ),
    },
    body: JSON.stringify({
      mjml,
    }),
  });

  return response.json();
};
