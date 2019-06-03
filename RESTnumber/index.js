    module.exports =function(app, GP_stats) {
    
    var unirest = require('unirest');

    app.get("/GPnumber", (req,res)=>{
            unirest.get("https://metropolis-api-phone.p.rapidapi.com/analysis?country=US&telephone=1+(703)+259-8585")
            .header("X-RapidAPI-Host", "metropolis-api-phone.p.rapidapi.com")
            .header("X-RapidAPI-Key", "236976aa2emshc9670ca87a1ae2ap160a9ajsnfbd581a072aa")
            .end(function (result) {
              console.log(result.status, result.headers, result.body);
              res.send(result.body);
            });
        });
    };              
