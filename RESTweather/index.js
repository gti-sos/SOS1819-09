module.exports = function(app,EB_stats){
    
    var unirest = require('unirest');
    

    app.get('/EBweather',(req,res)=>{
        unirest.get("https://community-open-weather-map.p.rapidapi.com/forecast?q=london%2Cuk")
            .header("X-RapidAPI-Host", "community-open-weather-map.p.rapidapi.com")
            .header("X-RapidAPI-Key", "beb2db8f6cmsh447d365b570a9c3p105ce1jsna4b92f95e78d")
            .end(function (result) {
              res.send(result.body);
        });
    });
};