const setCorsHeaders = ({ request, response }) => {
  response.headers.set("Access-Control-Allow-Credentials", "true");
  response.headers.set(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  response.headers.set("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  response.headers.set(
    "Access-Control-Allow-Origin",
    (request.headers.get("Origin") || "*").replace(/\/$/, "")
  );
  response.headers.append("Vary", "Origin");
  response.headers.set("X-Content-Type-Options", "nosniff");
};

module.exports = setCorsHeaders;
