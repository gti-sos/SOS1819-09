module.exports = function(app,EB_stats){
    
    var unirest = require('unirest');
    

    app.get('/EBhotel',(req,res)=>{
    
    unirest.get("https://leejaew-hotels-in-singapore-v1.p.rapidapi.com/hotels?country=Singapore")
        .header("X-RapidAPI-Host", "leejaew-hotels-in-singapore-v1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "beb2db8f6cmsh447d365b570a9c3p105ce1jsna4b92f95e78d")
        .end(function (result) {
          res.send(result.body);
        });
        
    });
};