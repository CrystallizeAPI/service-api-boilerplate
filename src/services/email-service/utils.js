const invariant = require("invariant");
const fetch = require("node-fetch");

const env = require("../../lib/env");

const SENDGRID_API_KEY = env("SENDGRID_API_KEY");
const EMAIL_FROM = env("EMAIL_FROM");

module.exports = {
  async sendEmail({ to, subject, html }) {
    invariant(SENDGRID_API_KEY, "SENDGRID_API_KEY not defined");
    invariant(EMAIL_FROM, "EMAIL_FROM is not defined");

    try {
      const response = await fetch("https://api.sendgrid.com/v3/mail/send", {
        body: JSON.stringify({
          subject,
          from: {
            email: EMAIL_FROM,
          },
          personalizations: [
            {
              to: [
                {
                  email: to,
                },
              ],
            },
          ],
          content: [
            {
              type: "text/html",
              value: html,
            },
          ],
        }),
        headers: {
          Authorization: `Bearer ${SENDGRID_API_KEY}`,
          "Content-Type": "application/json",
        },
        method: "POST",
      });

      if (!response.ok) {
        console.log("ERROR IN SENDING", response.status);
        const json = await response.json();
        console.log(json);
        console.log(JSON.stringify(json, null, 2));
      }
    } catch (error) {
      console.log("ERROR IN SENDEMAIL");
      console.error(JSON.stringify(error, null, 2));
    }
  },
};
