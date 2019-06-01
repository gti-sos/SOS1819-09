module.exports = function(app,EB_stats){
    
    var unirest = require('unirest');
    

    app.get('/EBairport',(req,res)=>{
        
        //code from rapidapi.com
        unirest.get("https://airport-info.p.rapidapi.com/airport?iata=svq")
            .header("X-RapidAPI-Host", "airport-info.p.rapidapi.com")
            .header("X-RapidAPI-Key", "beb2db8f6cmsh447d365b570a9c3p105ce1jsna4b92f95e78d")
            .end(function (result) {
              res.send(result.body);
            });
    });
};