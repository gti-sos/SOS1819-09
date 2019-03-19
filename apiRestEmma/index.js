var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var totalpopulation=[{}];
var port = process.env.PORT || 8080;
    
app.use(bodyParser.json());

app.listen(port, () => {
    console.log("Super server ready on port" +port);
});

// /api/v1/populationstat/loadInitialData
app.get("/api/v1/populationstat/loadInitialData",(req,res)=>{
    var totalpopulationInitial = [{
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
    totalpopulation = totalpopulationInitial;
    res.send(totalpopulation);
});

//GET /populationstat/
app.get("/api/v1/populationstat",(req,res)=>{
    res.send(totalpopulation);
});

//POST /populationstat/
app.post("/api/v1/populationstat",(req,res)=>{
    var newtotpop = req.body;
    totalpopulation.push(newtotpop);
    res.sendStatus(201);
});

//PUT /populationstat/
app.put("/api/v1/populationstat",(req,res)=>{
    res.sendStatus(405);
});

//DELETE /populationstat/
app.delete("/api/v1/populationstat",(req,res)=>{
    totalpopulation = [];
    res.sendStatus(200);
});

//GET /populationstat/country/year
app.get("/api/v1/populationstat/:country/:year",(req,res)=>{
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

//POST /populationstat/country/year
app.post("/api/v1/populationstat/:country/:year",(req,res)=>{
    res.sendStatus(405);
});

//PUT /populationstat/country/year
app.put("/api/v1/populationstat/:country/:year",(req,res)=>{
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

//DELETE /populationstat/country/year
app.delete("/api/v1/populationstat/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var found = false;
    
    var updatedpops = totalpopulation.filter((t)=>{
            if(t.country==country && t.year==year){
                found=true;
            }
            return (t.country != country || t.year != year);
       
    });
    
    if(found==false){
        res.sendStatus(404);
    }else {
        totalpopulation=updatedpops;
        res.sendStatus(200);
    }
});