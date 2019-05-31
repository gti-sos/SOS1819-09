module.exports = function(app,EB_stats){
    
    var unirest = require('unirest');
    

    app.get('/EBstad',(req,res)=>{
        
        //code from rapidapi.com
        unirest.get("https://fuel-price-france.p.rapidapi.com/stations/15800003")
            .header("X-RapidAPI-Host", "fuel-price-france.p.rapidapi.com")
            .header("X-RapidAPI-Key", "beb2db8f6cmsh447d365b570a9c3p105ce1jsna4b92f95e78d")
            .end(function (result) {
              res.send(result.body);
            });
    })
    
};