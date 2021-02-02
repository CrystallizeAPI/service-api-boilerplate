console.log("process.env.SENDGRID_API_KEY", process.env.SENDGRID_API_KEY);

import { ApolloServer } from "apollo-server-lambda";

import createGraphQLServerConfig from "../src/graphql-server";

const server = new ApolloServer(
  createGraphQLServerConfig({
    webhookRoutes: {
      userLoginMagicLink: "/user-login-magic-link",
    },
  })
);

export const handler = server.createHandler({
  cors: {
    origin: true,
    credentials: true,
  },
});
