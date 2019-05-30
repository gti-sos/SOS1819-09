module.exports =function(app, GW_stats) {
    
    var unirest = require('unirest');

    app.get("/GWREST", (req,res)=>{
            
            unirest.get("https://ajayakv-rest-countries-v1.p.rapidapi.com/rest/v1/all")
            .header("X-RapidAPI-Host", "ajayakv-rest-countries-v1.p.rapidapi.com")
            .header("X-RapidAPI-Key", "49d8713bccmsh6a155aa43ae0105p1defb9jsnfcea2849e8b6")
            .end(function (result) {
                res.send(result.body);
            });

    });
};