const fetch = require("node-fetch");

class NetsClient {
  constructor({ SECRET_KEY, ENV }) {
    this.SECRET_KEY = SECRET_KEY;
    this.ENV = ENV;
  }

  async fetch(path, options = {}) {
    const fetchOptions = {
      ...options,
      headers: {
        ...options.headers,
        "content-type": "application/*+json",
        Authorization: this.SECRET_KEY,
      },
    };

    const baseUrl =
      this.ENV === "production"
        ? "api.dibspayment.eu"
        : "dev-api.dibspayment.eu";

    try {
      const response = await fetch(`https://${baseUrl}${path}`, fetchOptions);

      if (!response.ok) {
        return {
          success: false,
          error: response,
        };
      }

      return {
        success: true,
        response: await response.json(),
      };
    } catch (error) {
      return {
        success: false,
        error,
      };
    }
  }
}

module.exports = {
  NetsClient,
};
