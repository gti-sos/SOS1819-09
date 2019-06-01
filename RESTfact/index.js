module.exports = function(app,EB_stats){
    
    var unirest = require('unirest');
    

    app.get('/EBfact',(req,res)=>{
        unirest.get("https://numbersapi.p.rapidapi.com/1492/year?fragment=true&json=true")
            .header("X-RapidAPI-Host", "numbersapi.p.rapidapi.com")
            .header("X-RapidAPI-Key", "beb2db8f6cmsh447d365b570a9c3p105ce1jsna4b92f95e78d")
            .end(function (result) {
              res.send(result.body);
        });
    });
};