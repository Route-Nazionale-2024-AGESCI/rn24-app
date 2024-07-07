const ModuleScopePlugin = require("react-dev-utils/ModuleScopePlugin");
module.exports = function override(config) {
  
  config.module.rules.push({
    test: /\.(js|mjs|jsx)$/,
    enforce: "pre",
    loader: require.resolve("source-map-loader"),
    resolve: {
      fullySpecified: false,
    },
  });
  return config;
};