const { ApolloServer } = require("apollo-server-cloudflare");
const {
  graphqlCloudflare,
} = require("apollo-server-cloudflare/dist/cloudflareApollo");
const cookie = require("cookie");

const KVCache = require("../kv-cache");

const createGraphQLServerConfig = require("../../api/graphql-server");

const kvCache = { cache: new KVCache() };

function normaliseRequest({ request }) {
  const { headers } = request;

  const url = new URL(request.url);

  return {
    headers,
    cookies: cookie.parse(headers.cookie || headers.Cookie || ""),
    host: url.origin,
  };
}

const createServer = (graphQLOptions) =>
  new ApolloServer({
    ...createGraphQLServerConfig({
      apiPathPrefix: "",
      normaliseRequest,
    }),
    playground: false,
    ...(graphQLOptions.kvCache ? kvCache : {}),
  });

const handler = (request, graphQLOptions) => {
  const server = createServer(graphQLOptions);

  return graphqlCloudflare(() => server.createGraphQLServerOptions(request))(
    request
  );
};

module.exports = handler;
