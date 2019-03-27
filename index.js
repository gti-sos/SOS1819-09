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
            res.send(climateArray[0]);
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

const KEY_CLIMATE = "123456";
var climate_stats_secure;

client.connect(err => {
  climate_stats_secure = client.db("sos1819-09-secure").collection("climate-stats");
  console.log("Connection secured to climate-stats");
});

// GET /api/v1/climate-stats/docs/

app.get("/api/v1/climate-stats/docs", (req,res)=>{
    var apikey = req.query.apikey;
    
    if(apikey == KEY_CLIMATE){
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
    
    if(apikey == KEY_CLIMATE){
        
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
    
    if(apikey == KEY_CLIMATE){
        
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
    
    if(apikey == KEY_CLIMATE){
        
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
    
    if(apikey == KEY_CLIMATE){
        
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
    
    if(apikey == KEY_CLIMATE){
        
            climate_stats_secure.find({"country":country,"year":parseInt(year,10)}).toArray((err, climateArray)=>{
            if(err)
                console.log(err);
            
            if (climateArray==0){
                res.sendStatus(404);
            }else{
                res.send(climateArray[0]);
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
    
    if(apikey == KEY_CLIMATE){
        
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
    
    if(apikey == KEY_CLIMATE){
        
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
    
    if(apikey == KEY_CLIMATE){
        res.sendStatus(405);
    }else{
        res.sendStatus(401);
    }
});

// PUT /api/v1/secure/climate-stats/ error

app.put("/api/v1/secure/climate-stats/",(req,res)=>{
    var apikey = req.query.apikey;
    
    if(apikey == KEY_CLIMATE){
        res.sendStatus(405);
    }else{
        res.sendStatus(401);
    }
});

// DELETE /api/v1/secure/climate-stats/

app.delete("/api/v1/secure/climate-stats/", (req,res)=>{
    var apikey = req.query.apikey;
    
    if(apikey == KEY_CLIMATE){
        
        climate_stats_secure.deleteMany({});

        res.sendStatus(205);
        
    }else{
        res.sendStatus(401);
    }
});

// _______________________ populationstats ____________________________________

//var express = require("express");
//const port = process.env.PORT || 8080;
//var app = express();
//var queryParser = require('express-query-int');
//var bodyParser = require("body-parser");
//app.use(bodyParser.json());
//app.use(queryParser());

const MongoClientEmma = require('mongodb').MongoClient;
const uriEmma = "mongodb+srv://user:user@sos-1gum3.mongodb.net/test?retryWrites=true";
const clientEmma = new MongoClientEmma(uriEmma, { useNewUrlParser: true });

var popstats;

clientEmma.connect(err => {
  popstats = clientEmma.db("sos181909").collection("populationstats");
  // perform actions on the collection object
  console.log("connected");
});


app.use(bodyParser.json());

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
    }else if(req.query.year){
        var year = req.query.year;
        popstats.find({year: parseInt(year)}).toArray((err,popstatsArray)=>{
            
            if(err)
                console.log("Error: "+err);
            
            res.send(popstatsArray);        
        });
    
    } else if (req.query.limit){
        var limit = req.query.limit;
        var skip = req.query.offset;
        popstats.find({}).limit(parseInt(limit)).skip(parseInt(skip)).toArray((err,popstatsArray)=>{
            
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
            res.send(popstatsArray[0]);
            else {
                res.sendStatus(404)
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

//MongoDB--------------------------------------------------------------------------------------

const MongoClientGiuseppe = require("mongodb").MongoClient;
const uriGiuseppe = "mongodb+srv://Giuseppe:Giuseppe@sos-qhbyw.mongodb.net/test?retryWrites=true";
const clientGiuseppe = new MongoClientGiuseppe(uriGiuseppe, { useNewUrlParser: true });

var economy_stats = [{}];

clientGiuseppe.connect(err => {
  economy_stats = clientGiuseppe.db("sos1819-09").collection("economy-stats"); //sos1819-09 name database and sos name of the cluster
  console.log("Connected to economy-stats");
});

//----------------------------------------------------------------------------------------------

// GET /api/v1/economy-stats/docs/

app.get("/api/v1/economy-stats/docs/", (req,res)=>{
    res.redirect('https://documenter.getpostman.com/view/6893446/S17tRo7m');
    //https://documenter.getpostman.com/view/6893446/S17tS8XP for personal website
});


// GET /api/v1/economy-stats/loadInitialData

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
    },{
        country : "Venezuela",
        year : "1970",
        gdp_growth_stats : "7.711914381",
        industry_gdp_stats : "41.62614128",
        gross_sav_gdp_stats : "24.40365209"
    },{
        country : "Armenia",
        year : "2012",
        gdp_growth_stats : "7.200000003",
        industry_gdp_stats : "27.82709461",
        gross_sav_gdp_stats : "12.81248819"
    }];
    
     economy_stats.find({}).toArray((err, economyArray)=>{
        if(err)
            console.log(err);
        
        
        if (economyArray==0){
            
            economy_stats.insert(economy_stats_initial);
    
            economy_stats.find({}).toArray((err, economyArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(economyArray);
            });
            
        }else{
            
            res.sendStatus(409);
    
        }
    });
});

// GET /api/v1/economy-stats/

app.get("/api/v1/economy-stats",(req,res)=>{
    
    var country = req.query.country;
    var year = req.query.year;
    var limit = req.query.limit;
    var from = req.query.from;
    
    // ?country= &year=
    if(country || year){
        //case errors
        if(!year){
            
            economy_stats.find({"country":country}).toArray((err, economyArray)=>{ 
                if(err)
                    console.log("Error: "+err);
                
                res.send(economyArray);
            });
    
        }else if(!country){
            
            economy_stats.find({"year":year}).toArray((err, economyArray)=>{ 
                if(err)
                    console.log("Error: "+err);
                
                res.send(economyArray);
            });
        //good case
        }else{
            
            economy_stats.find({"country":country, "year":year}).toArray((err, economyArray)=>{ //find all countries passed by query with that year
                if(err)
                    console.log("Error: "+err);
                
                res.send(economyArray);
            });
        }
        
    // ?offset= &limit=
    }else if(limit){
        
        economy_stats.find().limit(parseInt(limit,10)).skip(parseInt(req.query.offset,10)).toArray((err, economyArray)=>{
            if(err)
                console.log("Error: "+err);
            
            res.send(economyArray);
        });
        
    //from to
    }else if(from){
        
        economy_stats.find({ "year" : { $gte : from, $lte : req.query.to }}).toArray((err, economyArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(economyArray);
            });
    
    // Without query
    }else{
        
        economy_stats.find({}).toArray((err, economyArray)=>{
            if(err)
                console.log("Error: "+err);
            
            res.send(economyArray);
        });
        
    }
});


// POST /api/v1/economy-stats/

app.post("/api/v1/economy-stats/",(req,res)=>{
    var newEconomy = req.body;
    
     economy_stats.find({"country":newEconomy.country, "year":newEconomy.year}).toArray((err, economyArray)=>{
        if(err)
            console.log(err);
        
        if (economyArray==0){ //case that you can create
            
            economy_stats.insert(newEconomy);
            res.sendStatus(201); //created
            
        }else{ //case that you can't create
            
            res.sendStatus(409); //conflict
    
        }
    });
    
});

// GET /api/v1/economy-stats/:country

app.get("/api/v1/economy-stats/:country", (req,res)=>{

    var country = req.params.country;
    var from = req.query.from;
        
    economy_stats.find({"country":country,}).toArray((err, economyArray)=>{
        if(err)
            console.log(err);
            
        if (economyArray==0){
            res.sendStatus(404); //not found
        }else{
                
             if(from){
        
                economy_stats.find({"country":country,"year" : { $gte : parseInt(from,10), $lte : parseInt(req.query.to,10) }}).toArray((err, economyArray)=>{
                    if(err)
                        console.log("Error: "+err);
                        
                    res.send(economyArray);
                });
                    
            }else{
                res.send(economyArray);
            }
        }
    });
});

// GET /api/v1/economy-stats/:country/:year

app.get("/api/v1/economy-stats/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;

    economy_stats.find({"country":country,"year":year}).toArray((err, economyArray)=>{
        if(err)
            console.log(err);
        
        if (economyArray==0){
            res.sendStatus(404); //not found
        }else{
            res.send(economyArray[0]);
        }
    });
});

// DELETE /api/v1/economy-stats/:country/:year

app.delete("/api/v1/economy-stats/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    
    economy_stats.find({"country":country,"year":year}).toArray((err, economyArray)=>{
        if(err)
            console.log(err);
        
        
        if (economyArray==0){
            
            res.sendStatus(404); //not found
            
        }else{
            
            economy_stats.deleteOne({"country":country,"year":year});
            res.sendStatus(200); //delete ok
    
        }
    });
});

// PUT /api/v1/economy-stats/:country/:year

app.put("/api/v1/economy-stats/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;
    var updatedEconomy = req.body; //what we update

    economy_stats.find({"country":country,"year":year}).toArray((err, economyArray)=>{
        if(err)
            console.log(err);
        
        
        if (economyArray==0){
            
            res.sendStatus(400); //bad request
            
        }else{
            
            economy_stats.find({"country":updatedEconomy.country,"year":updatedEconomy.year}).toArray((err, economyArray)=>{ //looking if there is already
                if(err)
                    console.log(err);
                
                
                if (economyArray==0){
                    
                    res.sendStatus(400); //bad request if the array is empty
                    
                }else{
                    
                    
                    economy_stats.updateOne( //to update the element
                    {
                        "country":country,
                        "year":year
                    },
                    {
                        $set :  updatedEconomy
                    });
                    res.sendStatus(200); //ok
                    
                }
            });
        }
    });
});

// POST /api/v1/economy-stats/:country/:year error method not allowed WITH COUNTRY AND YEARS TOGETHER

app.post("/api/v1/economy-stats/:country/:year",(req,res)=>{
    res.sendStatus(405);
});

// PUT /api/v1/economy-stats/ error method not allowed

app.put("/api/v1/economy-stats/",(req,res)=>{
    res.sendStatus(405);
});

// DELETE /api/v1/economy-stats/

app.delete("/api/v1/economy-stats/", (req,res)=>{
    economy_stats.deleteMany({});
    
    res.sendStatus(200);
});


//_____________________________Listen port______________________________________



app.listen(port, () => {
    console.log('Magic is happening in port'+port);
});