    module.exports =function(app, GP_stats) {
    
    var unirest = require('unirest');

    app.get("/GPnumber", (req,res)=>{
            unirest.get("https://numbersapi.p.rapidapi.com/42/trivia?fragment=true&notfound=floor&json=true")
            .header("X-RapidAPI-Host", "numbersapi.p.rapidapi.com")
            .header("X-RapidAPI-Key", "236976aa2emshc9670ca87a1ae2ap160a9ajsnfbd581a072aa")
            .end(function (result) {
              console.log(result.status, result.headers, result.body);
              res.send(result.body);
            });
        });
    };