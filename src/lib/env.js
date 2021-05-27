module.exports = function getEnvVar(name) {
  if (typeof global !== "undefined" && global[name]) {
    return global[name];
  }
  if (process !== "undefined" && process.env[name]) {
    return process.env[name];
  }
  return;
};
