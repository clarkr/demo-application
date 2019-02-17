module.exports = {
  webpack: function(config, env) {
    config.module.rules.push({
      parser: {
        amd: false
      }
    });

    return config;
  }
}
