const apollo = require("./handlers/apollo");
const playground = require("./handlers/playground");
const setCors = require("./utils/setCors");
const RESTEndpoints = require("./rest-endpoints");

const options = {
  // If set to `true` this will output errors in the response
  debug: true,

  // When a request's path isn't matched, forward it to the origin
  forwardUnmatchedRequestsToOrigin: false,
};

const graphQLOptions = {
  // Set the path for the GraphQL server
  baseEndpoint: "/graphql",

  // Enable KV caching for external REST data source requests
  // Note that you'll need to add a KV namespace called
  // WORKERS_GRAPHQL_CACHE in your wrangler.toml file for this to
  // work! See the project README for more information.
  kvCache: false,
};

const handleRequest = async (request) => {
  const url = new URL(request.url);
  try {
    const RESTHandler = RESTEndpoints.lookup({
      request,
      pathname: url.pathname,
    });

    if (RESTHandler) {
      return RESTHandler({ request });
    }

    if (url.pathname === graphQLOptions.baseEndpoint) {
      if (request.method === "GET") {
        return playground(request, graphQLOptions);
      }

      const response =
        request.method === "OPTIONS"
          ? new Response("", { status: 204 })
          : await apollo(request, graphQLOptions);

      setCors({ request, response });

      return response;
    } else if (graphQLOptions.forwardUnmatchedRequestsToOrigin) {
      return fetch(request);
    } else {
      return new Response("Not found", { status: 404 });
    }
  } catch (err) {
    return new Response(options.debug ? err : "Something went BOOM", {
      status: 500,
    });
  }
};

addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});
