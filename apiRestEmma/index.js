var express = require("express");
var bodyParser = require("body-parser");
var app = express();


var port = process.env.PORT || 8080;

var totalpopulation = [{
    country:"Aruba",
    year:"1990",
    totalpopulation:"62149",
    urbanpopulation:"31273",
    accesstoelectricity:"88.44"
},
    {
    country:"Afghanistan",
    year:"1990",
    totalpopulation:"12249114",
    urbanpopulation:"2593995",
    accesstoelectricity:"0.01"
},
    {
    country:"Aruba",
    year:"2010",
    totalpopulation:"101669",
    urbanpopulation:"43778",
    accesstoelectricity:"93.36"
},
    ];
    
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Super server ready on port" +port);
});

//GET /totalpopulation/
app.get("/totalpopulation",(req,res)=>{
    res.send(totalpopulation);
});

//POST /totalpopulation/
app.post("/totalpopulation",(req,res)=>{
    var newtotpop = req.body;
    totalpopulation.push(newtotpop);
    res.sendStatus(201);
});

//DELETE /totalpopulation/
app.delete("/totalpopulation",(req,res)=>{
    totalpopulation = [];
    res.sendStatus(200);
});

//GET /totalpopulation/country/year
app.get("/totalpopulation/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var filteredtotpop = totalpopulation.filter((t)=>{
        return (t.country==country && t.year==year);
    });
    
    if(filteredtotpop.length>=1){
        res.send(filteredtotpop[0]);
    }else {
        res.sendStatus(404);
    }
});

//PUT /totalpopulation/country/year
app.put("/totalpopulation/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var updatedpop = req.body;
    var found = false;
    
    var updatedpops = totalpopulation.map((t)=>{
        if(t.country==country && t.year==year){
            found=true;
            return updatedpop;
        }else {
            return t;
        }
    });
    
    if(found==false){
        res.sendStatus(404);
    }else {
        totalpopulation=updatedpops;
        res.sendStatus(200);
    }
});

//DELETE /totalpopulation/country/year
app.delete("/totalpopulation/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var found = false;
    
    var updatedpops = totalpopulation.filter((t)=>{
            if(t.country==country && t.year==year){
                found=true;
            }
            return (t.country != country && t.year != year);
       
    });
    
    if(found==false){
        res.sendStatus(404);
    }else {
        totalpopulation=updatedpops;
        res.sendStatus(200);
    }
});