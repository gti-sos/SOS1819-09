module.exports = function(app,EB_stats){
    
    var unirest = require('unirest');
    

    app.get('/EBfoot',(req,res)=>{
    
    unirest.get("https://free-football-soccer-videos1.p.rapidapi.com/v1/")
        .header("X-RapidAPI-Host", "free-football-soccer-videos1.p.rapidapi.com")
        .header("X-RapidAPI-Key", "beb2db8f6cmsh447d365b570a9c3p105ce1jsna4b92f95e78d")
        .end(function (result) {
          res.send(result.body);
        });
        
    });
};