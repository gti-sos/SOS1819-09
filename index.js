var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 8080;

app.use('/',express.static( path.join(__dirname,"public")));
app.use(bodyParser.json());


// ___________________________________ climate_stats ___________________________

// MongoDb

const MongoClientGauthier = require("mongodb").MongoClient;
const uriGauthier = "mongodb+srv://Gauthier:gauthier@climate-stats-2wtji.mongodb.net/sos?retryWrites=true";
const client = new MongoClientGauthier(uriGauthier, { useNewUrlParser: true });

var climate_stats;

client.connect(err => {
  climate_stats = client.db("sos1819-09").collection("climate-stats");
  console.log("Connected to climate_stats");
});

// GET /api/v1/climate-stats/docs/

app.get("/api/v1/climate-stats/docs/", (req,res)=>{
    res.redirect('https://documenter.getpostman.com/view/6904229/S17tPT8R');
});

// GET /api/v1/climate-stats/loadInitialData

app.get("/api/v1/climate-stats/loadInitialData",(req,res)=>{
    
    var climate_stats_initial = [{
        country : "Spain",
        year : 1970,
        methane_stats : 26508.8,
        co2_stats : 3.457969859,
        nitrous_oxide_stats : 18686.862
    },{
        country : "France",
        year : 1970,
        methane_stats : 82882.3,
        co2_stats : 8.436868233,
        nitrous_oxide_stats : 64736.37
    },{
        country : "Spain",
        year : 2012,
        methane_stats : 37208.10558,
        co2_stats : 5.660938803,
        nitrous_oxide_stats : 20873.14001
    },{
        country : "France",
        year : 2012,
        methane_stats : 81178.5035,
        co2_stats : 5.075063887,
        nitrous_oxide_stats : 36865.68363
    },{
        country : "Afghanistan",
        year : 2012,
        methane_stats : 13763.166,
        co2_stats : 0.3503705807,
        nitrous_oxide_stats : 3423.68712
    }];
    
    
    // Verification of the no-emptyness of the base
     climate_stats.find({}).toArray((err, climateArray)=>{
        if(err)
            console.log(err);
        
        
        if (climateArray==0){ // if empty, create the data
            
            climate_stats.insert(climate_stats_initial);
    
            climate_stats.find({}).toArray((err, climateArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(climateArray);
            });
            
        }else{ // if not empty, send an error
            
            res.sendStatus(409);
    
        }
    });
});

// GET /api/v1/climate-stats

app.get("/api/v1/climate-stats",(req,res)=>{
    
    var year = req.query.year;
    var country = req.query.country;
    var limit = req.query.limit;
    var from = req.query.from;
    
    // ?country= &year=
    if(country || year){
        if(!year){
            
            climate_stats.find({"country":country}).toArray((err, climateArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(climateArray);
            });
    
        }else if(!country){
            
            climate_stats.find({"year":parseInt(year,10)}).toArray((err, climateArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(climateArray);
            });
    
        }else{
            
            climate_stats.find({"country":country, "year":parseInt(year,10)}).toArray((err, climateArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(climateArray);
            });
        }
        
    // ?offset= &limit=
    }else if(limit){
        
        climate_stats.find().limit(parseInt(limit,10)).skip(parseInt(req.query.offset,10)).toArray((err, climateArray)=>{
            if(err)
                console.log("Error: "+err);
            
            res.send(climateArray);
        });
        
    //from to
    }else if(from){
        
        climate_stats.find({ "year" : { $gte : parseInt(from,10), $lte : parseInt(req.query.to,10) }}).toArray((err, climateArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(climateArray);
            });
    
    // Without query
    }else{
        
        climate_stats.find({}).toArray((err, climateArray)=>{
            if(err)
                console.log("Error: "+err);
            
            res.send(climateArray);
        });
        
    }
});

// POST /api/v1/climate-stats/

app.post("/api/v1/climate-stats/",(req,res)=>{
    var newClimate = req.body;
    
     climate_stats.find({"country":newClimate.country, "year":newClimate.year}).toArray((err, climateArray)=>{
        if(err)
            console.log(err);
        
        if (climateArray==0){ // if empty, create the data
            
            climate_stats.insert(newClimate);
            res.sendStatus(201);
            
        }else{ // if not empty, send an error
            
            res.sendStatus(409);
    
        }
    });
    
});

// GET /api/v1/climate-stats/:country

app.get("/api/v1/climate-stats/:country", (req,res)=>{

    var country = req.params.country;
    var from = req.query.from;
        
    climate_stats.find({"country":country,}).toArray((err, climateArray)=>{
        if(err)
            console.log(err);
            
        if (climateArray==0){
            res.sendStatus(404);
        }else{
                
             if(from){
        
                climate_stats.find({"country":country,"year" : { $gte : parseInt(from,10), $lte : parseInt(req.query.to,10) }}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                        
                    res.send(climateArray);
                });
                    
            }else{
                
                res.send(climateArray);
            
            }
        }
    });
});

// GET /api/v1/climate-stats/:country/:year

app.get("/api/v1/climate-stats/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;

    climate_stats.find({"country":country,"year":parseInt(year,10)}).toArray((err, climateArray)=>{
        if(err)
            console.log(err);
        
        if (climateArray==0){
            res.sendStatus(404);
        }else{
            res.send(climateArray);
        }
    });
});

// DELETE /api/v1/climate-stats/:country/:year

app.delete("/api/v1/climate-stats/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    
    climate_stats.find({"country":country,"year":parseInt(year,10)}).toArray((err, climateArray)=>{
        if(err)
            console.log(err);
        
        
        if (climateArray==0){
            
            res.sendStatus(404);
            
        }else{
            
            climate_stats.deleteOne({"country":country,"year":parseInt(year,10)});
            res.sendStatus(205);
    
        }
    });
});

// PUT /api/v1/climate-stats/:country/:year

app.put("/api/v1/climate-stats/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;
    var updatedClimate = req.body;

    climate_stats.find({"country":country,"year":parseInt(year,10)}).toArray((err, climateArray)=>{
        if(err)
            console.log(err);
        
        
        if (climateArray==0){
            
            res.sendStatus(400);
            
        }else{
            
            climate_stats.find({"country":updatedClimate.country,"year":parseInt(updatedClimate.year,10)}).toArray((err, climateArray)=>{
                if(err)
                    console.log(err);
                
                
                if (climateArray==0){
                    
                    res.sendStatus(400);
                    
                }else{
                    
                    
                    climate_stats.updateOne(
                    {
                        "country":country,
                        "year":parseInt(year,10)
                    },
                    {
                        $set :  updatedClimate
                    });
                    res.sendStatus(200);
                    
                }
            });
        }
    });
});

// POST /api/v1/climate-stats/:country/:year error

app.post("/api/v1/climate-stats/:country/:year",(req,res)=>{
    res.sendStatus(405);
});

// PUT /api/v1/climate-stats/ error

app.put("/api/v1/climate-stats/",(req,res)=>{
    res.sendStatus(405);
});

// DELETE /api/v1/climate-stats/

app.delete("/api/v1/climate-stats/", (req,res)=>{
    climate_stats.deleteMany({});

    res.sendStatus(205);
});

// ___________________________________ climate_stats_secure ___________________________

// MongoDb

var climate_stats_secure;

client.connect(err => {
  climate_stats_secure = client.db("sos1819-09-secure").collection("climate-stats");
  console.log("Connection secured to climate-stats");
});

// GET /api/v1/climate-stats/docs/

app.get("/api/v1/climate-stats/docs", (req,res)=>{
    var apikey = req.query.apikey;
    
    if(apikey == "123456"){
        res.redirect('https://documenter.getpostman.com/view/6904229/S17tRTwb');
    }else{
        res.sendStatus(401);
    }
});

// GET /api/v1/secure/climate-stats/loadInitialData

app.get("/api/v1/secure/climate-stats/loadInitialData",(req,res)=>{
    
    var climate_stats_initial = [{
        country : "Spain",
        year : 1970,
        methane_stats : 26508.8,
        co2_stats : 3.457969859,
        nitrous_oxide_stats : 18686.862
    },{
        country : "France",
        year : 1970,
        methane_stats : 82882.3,
        co2_stats : 8.436868233,
        nitrous_oxide_stats : 64736.37
    },{
        country : "Spain",
        year : 2012,
        methane_stats : 37208.10558,
        co2_stats : 5.660938803,
        nitrous_oxide_stats : 20873.14001
    },{
        country : "France",
        year : 2012,
        methane_stats : 81178.5035,
        co2_stats : 5.075063887,
        nitrous_oxide_stats : 36865.68363
    },{
        country : "Afghanistan",
        year : 2012,
        methane_stats : 13763.166,
        co2_stats : 0.3503705807,
        nitrous_oxide_stats : 3423.68712
    }];
    
    
    var apikey = req.query.apikey;
    
    if(apikey == "123456"){
        
         // Verification of the no-emptyness of the base
         climate_stats_secure.find({}).toArray((err, climateArray)=>{
            if(err)
                console.log(err);
            
            
            if (climateArray==0){ // if empty, create the data
                
                climate_stats_secure.insert(climate_stats_initial);
        
                climate_stats_secure.find({}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(climateArray);
                });
                
            }else{ // if not empty, send an error
                
                res.sendStatus(409);
        
            }
        });
        
    }else{
        res.sendStatus(401);
    }
});


// GET /api/v1/secure/climate-stats

app.get("/api/v1/secure/climate-stats",(req,res)=>{

    var year = req.query.year;
    var country = req.query.country;
    var limit = req.query.limit;
    var from = req.query.from;
    var apikey = req.query.apikey;
    
    if(apikey == "123456"){
        
        // ?country= &year=
        if(country || year){
            if(!year){
                
                climate_stats_secure.find({"country":country}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(climateArray);
                });
        
            }else if(!country){
                
                climate_stats_secure.find({"year":parseInt(year,10)}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(climateArray);
                });
        
            }else{
                
               climate_stats_secure.find({"country":country, "year":parseInt(year,10)}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(climateArray);
                }); 
            }
            
        // ?offset= &limit=
        }else if(limit){
            
            climate_stats_secure.find().limit(parseInt(limit,10)).skip(parseInt(req.query.offset,10)).toArray((err, climateArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(climateArray);
            });
            
            
        //from to
        }else if(from){
            
            climate_stats_secure.find({ "year" : { $gte : parseInt(from,10), $lte : parseInt(req.query.to,10) }}).toArray((err, climateArray)=>{
                if(err)
                    console.log("Error: "+err);
                    
                res.send(climateArray);
             });    
        
        // Without query
        }else{
            
            climate_stats_secure.find({}).toArray((err, climateArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(climateArray);
            });
            
        }
        
    }else{
        res.sendStatus(401);
    }
    
    
});

// POST /api/v1/secure/climate-stats/

app.post("/api/v1/secure/climate-stats/",(req,res)=>{
    var newClimate = req.body;
    var apikey = req.query.apikey;
    
    if(apikey == "123456"){
        
        climate_stats_secure.find({"country":newClimate.country, "year":newClimate.year}).toArray((err, climateArray)=>{
            if(err)
                console.log(err);
            
            
            if (climateArray==0){ // if empty, create the data
                
                climate_stats_secure.insert(newClimate);
                res.sendStatus(201);
                
            }else{ // if not empty, send an error
                
                res.sendStatus(409);
        
            }
        });
        
    }else{
        res.sendStatus(401);
    }
});


// GET /api/v1/secure/climate-stats/:country

app.get("/api/v1/secure/climate-stats/:country", (req,res)=>{

    var country = req.params.country;
    var from = req.query.from;
    var apikey = req.query.apikey;
    
    if(apikey == "123456"){
        
        climate_stats_secure.find({"country":country,}).toArray((err, climateArray)=>{
            if(err)
                console.log(err);
                
            if (climateArray==0){
                res.sendStatus(404);
            }else{
                    
                 if(from){
            
                    climate_stats_secure.find({"country":country,"year" : { $gte : parseInt(from,10), $lte : parseInt(req.query.to,10) }}).toArray((err, climateArray)=>{
                        if(err)
                            console.log("Error: "+err);
                            
                        res.send(climateArray);
                    });
                        
                }else{
                    
                    res.send(climateArray);
                
                }
            }
        });
        
    }else{
        res.sendStatus(401);
    }
});

// GET /api/v1/secure/climate-stats/:country/:year

app.get("/api/v1/secure/climate-stats/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;
    var apikey = req.query.apikey;
    
    if(apikey == "123456"){
        
            climate_stats_secure.find({"country":country,"year":parseInt(year,10)}).toArray((err, climateArray)=>{
            if(err)
                console.log(err);
            
            if (climateArray==0){
                res.sendStatus(404);
            }else{
                res.send(climateArray);
            }
        });
        
    }else{
        res.sendStatus(401);
    }
});

// DELETE /api/v1/secure/climate-stats/:country/:year

app.delete("/api/v1/secure/climate-stats/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var apikey = req.query.apikey;
    
    if(apikey == "123456"){
        
        climate_stats_secure.find({"country":country,"year":parseInt(year,10)}).toArray((err, climateArray)=>{
            if(err)
                console.log(err);
            
            
            if (climateArray==0){
                
                res.sendStatus(404);
                
            }else{
                
                climate_stats_secure.deleteOne({"country":country,"year":parseInt(year,10)});
                res.sendStatus(205);
        
            }
        });
            
    }else{
        res.sendStatus(401);
    }
});

// PUT /api/v1/secure/climate-stats/:country/:year

app.put("/api/v1/secure/climate-stats/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;
    var updatedClimate = req.body;
    var apikey = req.query.apikey;
    
    if(apikey == "123456"){
        
        climate_stats_secure.find({"country":country,"year":parseInt(year,10)}).toArray((err, climateArray)=>{
            if(err)
                console.log(err);
            
            
            if (climateArray==0){
                
                res.sendStatus(400);
                
            }else{
                
                climate_stats_secure.find({"country":updatedClimate.country,"year":parseInt(updatedClimate.year,10)}).toArray((err, climateArray)=>{
                    if(err)
                        console.log(err);
                    
                    
                    if (climateArray==0){
                        
                        res.sendStatus(400);
                        
                    }else{
                        
                        
                        climate_stats_secure.updateOne(
                        {
                            "country":country,
                            "year":parseInt(year,10)
                        },
                        {
                            $set :  updatedClimate
                        });
                        res.sendStatus(200);
                        
                    }
                });
            }
        });
        
    }else{
        res.sendStatus(401);
    }
});

// POST /api/v1/secure/climate-stats/:country/:year error

app.post("/api/v1/secure/climate-stats/:country/:year",(req,res)=>{
    var apikey = req.query.apikey;
    
    if(apikey == "123456"){
        res.sendStatus(405);
    }else{
        res.sendStatus(401);
    }
});

// PUT /api/v1/secure/climate-stats/ error

app.put("/api/v1/secure/climate-stats/",(req,res)=>{
    var apikey = req.query.apikey;
    
    if(apikey == "123456"){
        res.sendStatus(405);
    }else{
        res.sendStatus(401);
    }
});

// DELETE /api/v1/secure/climate-stats/

app.delete("/api/v1/secure/climate-stats/", (req,res)=>{
    var apikey = req.query.apikey;
    
    if(apikey == "123456"){
        
        climate_stats_secure.deleteMany({});

        res.sendStatus(205);
        
    }else{
        res.sendStatus(401);
    }
});

// _______________________ populationstats ____________________________________

var MongoClientEmma = require('mongodb').MongoClient;
const uriEmma = "mongodb+srv://user:user@sos-1gum3.mongodb.net/test?retryWrites=true";
const clientEmma = new MongoClientEmma(uriEmma, { useNewUrlParser: true });

var popstats;

clientEmma.connect(err => {
  popstats = client.db("sos181909").collection("populationstats");
  // perform actions on the collection object
  console.log("connected to populationstats");
});


app.use(bodyParser.json());

// populationstats/docs
app.get("/api/v1/populationstats/docs",(req,res)=>{
    res.redirect("https://documenter.getpostman.com/view/7060843/S17tRoGf");
});

// loadInitialData /populationstats/loadInitialData
app.get("/api/v1/populationstats/loadInitialData",(req,res)=>{
    var totalpopulationInitial = [{
    country:"Aruba",
    year:1990,
    totalpopulation:"62149",
    urbanpopulation:"31273",
    accesstoelectricity:"88.44"
},
    {
    country:"Afghanistan",
    year:1990,
    totalpopulation:"12249114",
    urbanpopulation:"2593995",
    accesstoelectricity:"0.01"
},
    {
    country:"Aruba",
    year:2010,
    totalpopulation:"101669",
    urbanpopulation:"43778",
    accesstoelectricity:"93.36"
},
{
    country:"Angola",
    year:1990,
    totalpopulation:"12171441",
    urbanpopulation:"4225990",
    accesstoelectricity:"11.4"
},
{
    country:"Andora",
    year:1990,
    totalpopulation:"52448",
    urbanpopulation:"51627",
    accesstoelectricity:"93.36"
},
    ];
    popstats.count(function(err, count) {
    
    if( count == 0) {
        popstats.insertMany(totalpopulationInitial);
        res.sendStatus(200);
    }
    else {
        res.sendStatus(409);
    }
});
});

// GET /populationstats/
app.get("/api/v1/populationstats", (req,res)=>{
    if(Object.keys(req.query).length === 0){
       popstats.find({}).toArray((err,popstatsArray)=>{
        
        if(err)
            console.log("Error: "+err);
        
        res.send(popstatsArray);
    }); 
    } else if (req.query.from != undefined && req.query.to != undefined){
        var from = req.query.from;
        var to = req.query.to;
        popstats.find({year: {$gte: parseInt(from), $lte: parseInt(to) }}).toArray((err,popstatsArray)=>{
            if(err)
                console.log("Error: "+err);
            
            res.send(popstatsArray);        
        });
    }else if(req.query.year != "undefined"){
        var year = req.query.year;
        popstats.find({year: parseInt(year)}).toArray((err,popstatsArray)=>{
            
            if(err)
                console.log("Error: "+err);
            
            res.send(popstatsArray);        
        });
    
    } else if (req.query.limit != undefined && req.query.offset != undefined){
        var limit = req.query.limit;
        var skip = req.query.offset;
        popstats.find({}).skip(parseInt(skip)).limit(parseInt(limit)).toArray((err,popstatsArray)=>{
            
            if(err)
                console.log("Error: "+err);
            
            res.send(popstatsArray);        
        });
    } else res.sendStatus(400);
});


// POST /populationstats/
app.post("/api/v1/populationstats", (req,res)=>{
    
    var newPopstat = req.body;
    var country = req.body.country;
    var year = req.body.year;
    if(country==undefined || year==undefined){
    res.sendStatus(400);
    } else {
        popstats.find({country: country, year: year}).toArray((err,popstatsArray)=>{
            if(err)
                console.log("Error: "+err);
            if(popstatsArray != 0)
                res.sendStatus(409);
            else {res.insert(newPopstat);
                res.sendStatus(201);
            }
        });
    }
});


// DELETE /populationstats/
app.delete("/api/v1/populationstats", (req,res)=>{
    
    popstats.deleteMany();
    
    res.sendStatus(200);
});


//PUT /populationstats/
app.put("/api/v1/populationstats", (req,res)=>{
   
    res.sendStatus(405);
});

// GET /populationstats/country/
app.get("/api/v1/populationstats/:country/", (req,res)=>{
    var country = req.params.country;
    if (req.query.from != undefined && req.query.to != undefined){
        var from = req.query.from;
        var to = req.query.to;
        popstats.find({country: country, year: {$gte: from, $lte: to }}).toArray((err,popstatsArray)=>{
            if(err)
                console.log("Error: "+err);
            if(popstatsArray != 0)
                res.send(popstatsArray);
            else res.sendStatus(404);
        });
    }else
        popstats.find({country: country}).toArray((err,popstatsArray)=>{
            if(err)
                console.log("Error: "+err);
            if(popstatsArray != 0)
                res.send(popstatsArray);
            else res.sendStatus(404);
        });
});

// GET /populationstats/country/year
app.get("/api/v1/populationstats/:country/:year", (req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    console.log(year);
    //var findResult=popstats.find({country: country, year: parseInt(year)});
    //if (findResult.totalSize != undefined){
        popstats.find({country: country,
        year: parseInt(year)}).toArray((err,popstatsArray)=>{
            if(err)
                console.log("Error: "+err);
            if(popstatsArray != 0)
            res.send(popstatsArray);
            else {
                res.sendStatus(404);
            }
        });
    /*}else
        res.sendStatus(404);
        console.log(findResult.totalSize);*/
});



// PUT /populationstats/:country/:year
app.put("/api/v1/populationstats/:country/:year", (req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var toUpdate = popstats.find({country: country,
                    year: year});
    if (toUpdate.totalSize==undefined){
    res.sendStatus(400);
    }else if(req.body.country==country){
        popstats.update({country: country, year: year},req.body);
        res.sendStatus(200);
    }else
        res.sendStatus(400);
});

// POST /populationstats/:country/:year
app.post("/api/v1/populationstats/:country/:year", (req,res)=>{
    res.sendStatus(405);
});


// DELETE /populationstats/:country/:year
app.delete("/api/v1/populationstats/:country/:year", (req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var toDelete = popstats.find({country: country,
                    year: year});
    if (toDelete.totalSize==undefined){
    res.sendStatus(404);
    }else {
        popstats.deleteMany({country: country, year: year});
        res.sendStatus(200);
        console.log(toDelete.totalSize);
    }

});

// ___________________________economy_stats_____________________________________

// GET /api/v1/economy-stats/loadInitialData
var economy_stats = [{}];

app.get("/api/v1/economy-stats/loadInitialData",(req,res)=>{
    
    var economy_stats_initial = [{
        country : "Netherlands",
        year : "1970",
        gdp_growth_stats : "34.14211806",
        industry_gdp_stats : "3.457969859",
        gross_sav_gdp_stats : "31.1994775"
    },{
        country : "South Africa",
        year : "1970",
        gdp_growth_stats : "5.248674135",
        industry_gdp_stats : "36.14320462",
        gross_sav_gdp_stats : "25.72970582"
    },{
        country : "Netherlands",
        year : "2012",
        gdp_growth_stats : "-1.057037404",
        industry_gdp_stats : "20.03862584",
        gross_sav_gdp_stats : "29.44247574"
    }];
    
    economy_stats = economy_stats_initial;
    
   res.send(economy_stats);
});

// GET /api/v1/economy-stats/

app.get("/api/v1/economy-stats/",(req,res)=>{
   res.send(economy_stats);
});

// POST /api/v1/economy-stats/

app.post("/api/v1/economy-stats/",(req,res)=>{
   var newEconomy = req.body;
   
   economy_stats.push(newEconomy);
   
   res.sendStatus(201);
});

// GET /api/v1/economy-stats/:country/:year

app.get("/api/v1/economy-stats/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;

    var filteredEconomies = economy_stats.filter((c) =>{
       return c.country == country; 
    }).filter((c) =>{
        return c.year == year;
    });
    
    if (filteredEconomies.length >= 1){
        res.send(filteredEconomies[0]);
    }else{
        res.sendStatus(404);
    }

});

// DELETE /api/v1/economy-stats/:country/:year

app.delete("/api/v1/economy-stats/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var found = false;
    
    var updatedEconomies = economy_stats.filter((c)=>{
            if(c.country==country && c.year==year){
                found=true;
            }
            return (c.country != country || c.year != year);
       
    });
    
    if(found==false){
        res.sendStatus(404);
    }else {
        economy_stats=updatedEconomies;
        res.sendStatus(204);
    }
});

// PUT /api/v1/economy-stats/:country/:year

app.put("/api/v1/economy-stats/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;
    var updatedEconomies = req.body;
    var found = false;

    updatedEconomies = economy_stats.map((c) =>{
    
        if(c.country == country && c.year == year){
            found = true;
            return updatedEconomies;
        }else{
            return c;            
        }
  
    });
    
    if (found == false){
        res.sendStatus(404);
    }else{
        economy_stats = updatedEconomies;
        res.sendStatus(200);
    }

});

// POST /api/v1/economy-stats/:country/:year error

app.post("/api/v1/economy-stats/:country/:year",(req,res)=>{
    res.sendStatus(405);
});

// PUT /api/v1/economy-stats/ error

app.post("/api/v1/economy-stats/",(req,res)=>{
    res.sendStatus(405);
});

// DELETE /api/v1/economy-stats/

app.delete("/api/v1/economy-stats/", (req,res)=>{
    economy_stats = [];
    
    res.sendStatus(204);
});


//_____________________________Listen port______________________________________

app.listen(port, () => {
    console.log('Magic is happening in port'+port);
});