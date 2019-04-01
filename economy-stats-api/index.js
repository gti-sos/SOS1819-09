var api = require("./v1");
module.exports =  {
    checkALL : function(app, BASE_PATH, economy_stats){
        api(app, BASE_PATH+"/v1/economy-stats", economy_stats);
    }
};