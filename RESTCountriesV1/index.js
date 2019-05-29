module.exports =function(app, GW_stats) {
    
    var unirest = require('unirest');

    app.get("/GWRESTV1", (req,res)=>{
       
           unirest.get("https://restcountries-v1.p.rapidapi.com/all")
                .header("X-RapidAPI-Host", "restcountries-v1.p.rapidapi.com")
                .header("X-RapidAPI-Key", "49d8713bccmsh6a155aa43ae0105p1defb9jsnfcea2849e8b6")
                .end(function (result) {
                    res.send(result.body);
            });
    });
};