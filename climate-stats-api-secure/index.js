var api = require("./v1");

module.exports = function (app,climate_stats_secure) {
        api(app,climate_stats_secure);
    };