var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 8080;

app.use('/',express.static( path.join(__dirname,"public")));
app.use(bodyParser.json());


// ___________________________________ climate_stats ___________________________

// GET /api/v1/climate-stats/loadInitialData 2 recursos
var climate_stats = [{}];

app.get("/api/v1/climate-stats/loadInitialData",(req,res)=>{
    
    var climate_stats_initial = [{
        country : "Spain",
        year : "1970",
        methane_stats : "26508.8",
        co2_stats : "3.457969859",
        nitrous_oxide_stats : "18686.862"
    },{
        country : "France",
        year : "1970",
        methane_stats : "82882.3",
        co2_stats : "8.436868233",
        nitrous_oxide_stats : "64736.37"
    },{
        country : "Spain",
        year : "2012",
        methane_stats : "37208.10558",
        co2_stats : "5.660938803",
        nitrous_oxide_stats : "20873.14001"
    }];
    
    climate_stats = climate_stats_initial;
    
   res.send(climate_stats);
});

// GET /api/v1/climate-stats/

app.get("/api/v1/climate-stats/",(req,res)=>{
   res.send(climate_stats);
});

// POST /api/v1/climate-stats/

app.post("/api/v1/climate-stats/",(req,res)=>{
   var newClimate = req.body;
   
   climate_stats.push(newClimate);
   
   res.sendStatus(201);
});

// GET /api/v1/climate-stats/:country/:year

app.get("/api/v1/climate-stats/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;

    var filteredClimates = climate_stats.filter((c) =>{
       return c.country == country; 
    }).filter((c) =>{
        return c.year == year;
    });
    
    if (filteredClimates.length >= 1){
        res.send(filteredClimates[0]);
    }else{
        res.sendStatus(404);
    }

});

// DELETE /api/v1/climate-stats/:country/:year

app.delete("/api/v1/climate-stats/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var found = false;
    
    var updatedClimates = climate_stats.filter((c)=>{
            if(c.country==country && c.year==year){
                found=true;
            }
            return (c.country != country || c.year != year);
       
    });
    
    if(found==false){
        res.sendStatus(404);
    }else {
        climate_stats=updatedClimates;
        res.sendStatus(200);
    }
});

// PUT /api/v1/climate-stats/:country/:year

app.put("/api/v1/climate-stats/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;
    var updatedClimates = req.body;
    var found = false;

    var updatedClimates = climate_stats.map((c) =>{
    
        if(c.country == country && c.year == year){
            found = true;
            return updatedClimates;
        }else{
            return c;            
        }
  
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        climate_stats = updatedClimates;
        res.sendStatus(200);
    }

});

// POST /api/v1/climate-stats/:country/:year error

app.post("/api/v1/climate-stats/:country/:year",(req,res)=>{
    res.sendStatus(405);
});

// PUT /api/v1/climate-stats/ error

app.post("/api/v1/climate-stats/",(req,res)=>{
    res.sendStatus(405);
})

// DELETE /api/v1/climate-stats/

app.delete("/api/v1/climate-stats/", (req,res)=>{
    climate_stats = [];
    
    res.sendStatus(200);
});



app.listen(port, () => {
    console.log('Magic is happening in port'+port)
});


// _______________________ population_stats ____________________________________

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