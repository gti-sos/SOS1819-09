module.exports =function(app, GP_stats) {
    
    var unirest = require('unirest');

    app.get("/GPcocktail", (req,res)=>{
            unirest.get("https://the-cocktail-db.p.rapidapi.com/random.php")
            .header("X-RapidAPI-Host", "the-cocktail-db.p.rapidapi.com")
            .header("X-RapidAPI-Key", "236976aa2emshc9670ca87a1ae2ap160a9ajsnfbd581a072aa")
            .end(function (result) {
                console.log(result.status, result.headers, result.body);
                res.send(result.body);
            });
        });
    };