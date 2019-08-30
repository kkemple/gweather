const blacklist = require("metro").createBlacklist;

module.exports = {
  resolver: {
    blacklistRE: blacklist([/#current-cloud-backend\/function\/getweather\/.*/])
  }
};
