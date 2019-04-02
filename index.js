var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 8080;

app.use('/',express.static( path.join(__dirname,"public")));
app.use(bodyParser.json());


// ___________________________________ climate_stats ___________________________

// MongoDb
var climates_stats_api = require("./climate-stats-api");

const MongoClientGauthier = require("mongodb").MongoClient;
const uriGauthier = "mongodb+srv://Gauthier:gauthier@climate-stats-2wtji.mongodb.net/sos?retryWrites=true";
const client = new MongoClientGauthier(uriGauthier, { useNewUrlParser: true });

var climate_stats;

client.connect(err => {
  climate_stats = client.db("sos1819-09").collection("climate-stats");
  console.log("Connected to climate_stats");
  
  climates_stats_api(app,climate_stats);
  
});

// ___________________________________ climate_stats_secure ___________________________

// MongoDb
var climates_stats_api_secure = require("./climate-stats-api-secure");
var climate_stats_secure;

client.connect(err => {
  climate_stats_secure = client.db("sos1819-09-secure").collection("climate-stats");
  console.log("Connection secured to climate-stats");
  
  climates_stats_api_secure(app,climate_stats_secure);
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
  console.log("connected to popstats");
});


app.use(bodyParser.json());

// GET docs
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
       popstats.find( {}, { fields: { _id: 0 }}).toArray((err,popstatsArray)=>{
        
        if(err)
            console.log("Error: "+err);
        
        res.send(popstatsArray);
    }); 
    } else if (req.query.from != undefined && req.query.to != undefined){
        var from = req.query.from;
        var to = req.query.to;
        popstats.find({year: {$gte: parseInt(from), $lte: parseInt(to) }}, { fields: { _id: 0 }}).toArray((err,popstatsArray)=>{
            if(err)
                console.log("Error: "+err);
            
            res.send(popstatsArray);        
        });
    }else if(req.query.year){
        var year = req.query.year;
        popstats.find({year: parseInt(year)}, { fields: { _id: 0 }}).toArray((err,popstatsArray)=>{
            
            if(err)
                console.log("Error: "+err);
            if(popstatsArray == 0)
                res.sendStatus(404);
            else
                res.send(popstatsArray);        
        });
    
    } else if (req.query.limit){
        var limit = req.query.limit;
        var skip = req.query.offset;
        popstats.find({}, { fields: { _id: 0 }}).limit(parseInt(limit)).skip(parseInt(skip)).toArray((err,popstatsArray)=>{
            
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
    
    if(Object.keys(req.body).length === 0 || country===undefined || year===undefined || req.body.totalpopulation===undefined || req.body.urbanpopulation===undefined || req.body.accesstoelectricity===undefined){
    res.sendStatus(400);
    } else {
        popstats.find({"country": country, "year": year}).toArray((err,popstatsArray)=>{
            if(err)
                console.log("Error: "+err);
            if(popstatsArray != 0)
                res.sendStatus(409);
            else {
                popstats.insert(newPopstat);
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
            if(popstatsArray != 0){
                res.send(popstatsArray);
                res.sendStatus(200);
            }
            else res.sendStatus(404);
        });
    }else
        popstats.find({country: country}, { fields: { _id: 0 }}).toArray((err,popstatsArray)=>{
            if(err)
                console.log("Error: "+err);
            if(popstatsArray != 0){
                res.send(popstatsArray);
                res.sendStatus(200);
            }
            else res.sendStatus(404);
        });
});

// GET /populationstats/country/year
app.get("/api/v1/populationstats/:country/:year", (req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    popstats.find({country: country, year: parseInt(year)}, { fields: { _id: 0 }}).toArray((err,popstatsArray)=>{
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
                    year: year}, { fields: { _id: 0 }});
    if(Object.keys(req.body).length === 0 || country===undefined || year===undefined || req.body.totalpopulation===undefined || req.body.urbanpopulation===undefined || req.body.accesstoelectricity===undefined){
    res.sendStatus(400);
    } else if(req.body.country==country){
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
     popstats.find({"country":country,"year":parseInt(year,10)}).toArray((err, popArray)=>{
            if(err)
                console.log(err);
            
            
            if (popArray==0){
                
                res.sendStatus(404);
                
            }else{
                
                popstats.deleteOne({"country":country,"year":parseInt(year,10)});
                res.sendStatus(200);
        
            }
        });

});

// Secure--------------------------------------------------------
/*
var popstats_secure;

clientEmma.connect(err => {
  popstats = clientEmma.db("sos181909-secure").collection("populationstats-secure");
  // perform actions on the collection object
  console.log("connected secure to popstats_secure");
});

const KEY_POP = "123";

// loadInitialData /populationstats/loadInitialData
app.get("/api/v1/secure/populationstats/loadInitialData",(req,res)=>{
    var apiKey= req.query.apikey;
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
    popstats_secure.count(function(err, count) {
    if(apiKey==KEY_POP){
    if( count == 0) {
        popstats_secure.insertMany(totalpopulationInitial);
        res.sendStatus(200);
    }
    else {
        res.sendStatus(409);
    }
    }else {
        res.sendStatus(401);
    }
});
});

// GET /populationstats/
app.get("/api/v1/secure/populationstats", (req,res)=>{
    var apiKey = req.query.apikey;
    if(apiKey==KEY_POP){
    if(Object.keys(req.query).length === 0){
       popstats_secure.find({}).toArray((err,popstats_secureArray)=>{
        
        if(err)
            console.log("Error: "+err);
        console.log('ici1');
        res.send(popstats_secureArray);
    }); 
    } else if (req.query.from != undefined && req.query.to != undefined){
        var from = req.query.from;
        var to = req.query.to;
        popstats_secure.find({year: {$gte: parseInt(from), $lte: parseInt(to) }}).toArray((err,popstats_secureArray)=>{
            if(err)
                console.log("Error: "+err);
            
            res.send(popstats_secureArray);        
        });
    }else if(req.query.year){
        var year = req.query.year;
        popstats_secure.find({year: parseInt(year)}).toArray((err,popstats_secureArray)=>{
            
            if(err)
                console.log("Error: "+err);
            
            res.send(popstats_secureArray);        
        });
    
    } else if (req.query.limit){
        
        var limit = req.query.limit;
        var skip = req.query.offset;
        popstats_secure.find({}).limit(parseInt(limit)).skip(parseInt(skip)).toArray((err,popstats_secureArray)=>{
            
            if(err)
                console.log("Error: "+err);
            
            res.send(popstats_secureArray);        
        });
    } else res.sendStatus(400);
    }else res.sendStatus(401);
});


// POST /populationstats/
app.post("/api/v1/secure/populationstats", (req,res)=>{
    var apiKey = req.query.apikey;
    var newPopstat = req.body;
    var country = req.body.country;
    var year = req.body.year;
    if(apiKey==KEY_POP){
        if(country==undefined || year==undefined){
        res.sendStatus(400);
        } else {
            popstats_secure.find({country: country, year: year}).toArray((err,popstats_secureArray)=>{
                if(err)
                    console.log("Error: "+err);
                if(popstats_secureArray != 0)
                    res.sendStatus(409);
                else {res.insert(newPopstat);
                    res.sendStatus(201);
                }
            });
        }
    }else res.sendStatus(401);
});


// DELETE /populationstats/
app.delete("/api/v1/secure/populationstats", (req,res)=>{
    var apiKey = req.query.apikey;
    if(apiKey==KEY_POP){
        popstats_secure.deleteMany();
        
        res.sendStatus(200);
    }else res.sendStatus(401);
});


//PUT /populationstats/
app.put("/api/v1/secure/populationstats", (req,res)=>{
   var apiKey = req.query.apikey;
    if(apiKey==KEY_POP){
    res.sendStatus(405);
    } else res.sendStatus(401);
});

// GET /populationstats/country/
app.get("/api/v1/secure/populationstats/:country/", (req,res)=>{
    var country = req.params.country;
    var apiKey = req.query.apikey;
    if(apiKey==KEY_POP){
    if (req.query.from != undefined && req.query.to != undefined){
        var from = req.query.from;
        var to = req.query.to;
        popstats_secure.find({country: country, year: {$gte: from, $lte: to }}).toArray((err,popstats_secureArray)=>{
            if(err)
                console.log("Error: "+err);
            if(popstats_secureArray != 0)
                res.send(popstats_secureArray);
            else res.sendStatus(404);
        });
    }else
        popstats_secure.find({country: country}).toArray((err,popstats_secureArray)=>{
            if(err)
                console.log("Error: "+err);
            if(popstats_secureArray != 0)
                res.send(popstats_secureArray);
            else res.sendStatus(404);
        });
    } else res.sendStatus(401);
});

// GET /populationstats/country/year
app.get("/api/v1/secure/populationstats/:country/:year", (req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var apiKey= req.query.apikey;
    //console.log(year);
    //var findResult=popstats_secure.find({country: country, year: parseInt(year)});
    //if (findResult.totalSize != undefined){
    if(apiKey==KEY_POP){
        popstats_secure.find({country: country,
        year: parseInt(year)}).toArray((err,popstats_secureArray)=>{
            if(err)
                console.log("Error: "+err);
            if(popstats_secureArray != 0)
            res.send(popstats_secureArray);
            else {
                res.sendStatus(404)
            }
        });
    } else res.sendStatus(401);
    /*}else
        res.sendStatus(404);
        console.log(findResult.totalSize);
});



// PUT /populationstats/:country/:year
app.put("/api/v1/secure/populationstats/:country/:year", (req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var toUpdate = popstats_secure.find({country: country,
                    year: year});
    var apiKey=req.query.apikey;
    if(apiKey==KEY_POP){
        if (toUpdate.totalSize==undefined){
        res.sendStatus(400);
        }else if(req.body.country==country){
            popstats_secure.update({country: country, year: year},req.body);
            res.sendStatus(200);
        }else
            res.sendStatus(400);
    } else res.sendStatus(401);
});

// POST /populationstats/:country/:year
app.post("/api/v1/secure/populationstats/:country/:year", (req,res)=>{
    var apiKey=req.query.apikey;
    if(apiKey==KEY_POP)
        res.sendStatus(405);
    else res.sendStatus(401);
});


// DELETE /populationstats/:country/:year
app.delete("/api/v1/secure/populationstats/:country/:year", (req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    var toDelete = popstats_secure.find({country: country,
                    year: year});
    var apiKey=req.query.apikey;
    if(apiKey==KEY_POP){
    if (toDelete.totalSize==undefined){
    res.sendStatus(404);
    }else {
        popstats_secure.deleteMany({country: country, year: year});
        res.sendStatus(200);
        console.log(toDelete.totalSize);
    }
    }else res.sendStatus(401);

});
*/

// ___________________________economy_stats_____________________________________

var economyAPI = require("./economy-stats-api");
const BASE_PATH = "/api";

//MongoDB--------------------------------------------------------------------------------------

const MongoClientGiuseppe = require("mongodb").MongoClient;
const uriGiuseppe = "mongodb+srv://Giuseppe:Giuseppe@sos-qhbyw.mongodb.net/test?retryWrites=true";
const clientGiuseppe = new MongoClientGiuseppe(uriGiuseppe, { useNewUrlParser: true });

var economy_stats = [{}];

clientGiuseppe.connect(err => {
  economy_stats = clientGiuseppe.db("sos1819-09").collection("economy-stats"); //sos1819-09 name database and sos name of the cluster
  economyAPI.checkALL(app, BASE_PATH, economy_stats);
  console.log("Connected to economy-stats");
});

/*
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
    var offset = req.query.offset;
    var from = req.query.from;
    
    // ?country= &year=
    if(country || year){
        //case errors
        if(!year) //if we don't have of the years selected
        { 
            
            economy_stats.find({"country":country}).toArray((err, economyArray)=>{ 
                if(err)
                    console.log("Error: "+err);
                
                res.send(economyArray);
            });
    
        }else if(!country)
        { //if we don't have of the years selected
            
            economy_stats.find({"year":year}).toArray((err, economyArray)=>{ 
                if(err)
                    console.log("Error: "+err);
                
                res.send(economyArray);
            });
        
        }
        else //good case we have both data
        {
            
            economy_stats.find({"country":country, "year":year}).toArray((err, economyArray)=>{ //find all countries passed by query with that year
                if(err)
                    console.log("Error: "+err);
                
                res.send(economyArray);
            });
        }
        
    // ?offset= &limit=
    }else if(limit){
        
        economy_stats.find().limit(parseInt(limit,10)).skip(parseInt(offset,10)).toArray((err, economyArray)=>{
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
        
        if (economyArray==0) //case that you can create
        {
            economy_stats.insert(newEconomy);
            res.sendStatus(201); //created
            
        }
        else res.sendStatus(409); //conflict case that you can't create
    });
    
});

// GET /api/v1/economy-stats/:country

app.get("/api/v1/economy-stats/:country", (req,res)=>{

    var country = req.params.country;
    var from = req.query.from;
        
    economy_stats.find({"country":country}).toArray((err, economyArray)=>{
        if(err)
            console.log(err);
            
        if (economyArray==0) res.sendStatus(404); //not found
        else
        {
                
             if(from)
             {
                economy_stats.find({"country":country,"year" : { $gte : parseInt(from,10), $lte : parseInt(req.query.to,10) }}).toArray((err, economyArray)=>{
                    if(err)
                        console.log("Error: "+err);
                        
                    res.send(economyArray);
                });
                    
            }
            else
            {
                if (economyArray.length>1)
                    res.send(economyArray);
                else res.send(economyArray[0]);
            }
        }
    });
});

// GET /api/v1/economy-stats/:country/:year

app.get("/api/v1/economy-stats/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;

    economy_stats.find({"country":country,"year":year}).toArray((err, economyArray)=>{
        if(err) console.log(err);
        
        if (economyArray==0) res.sendStatus(404); //not found
        else res.send(economyArray[0]);
    });
});

// DELETE /api/v1/economy-stats/:country/:year

app.delete("/api/v1/economy-stats/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    
    economy_stats.find({"country":country,"year":year}).toArray((err, economyArray)=>{
        if(err)
            console.log(err);
        
        
        if (economyArray==0) res.sendStatus(404); //not found
        else
        {
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
        if(err) console.log(err);
        
        
        if (economyArray==0) res.sendStatus(400); //bad request
        else
        {
            economy_stats.find({"country":updatedEconomy.country,"year":updatedEconomy.year}).toArray((err, economyArray)=>{ //looking if there is already
                if(err) console.log(err);
                
                if (economyArray==0) res.sendStatus(400); //bad request if the array is empty
                else
                {
                    economy_stats.updateOne //to update the element
                    ( 
                        {
                            "country":country,
                            "year":year
                        },
                        {
                            $set :  updatedEconomy
                        }
                    );
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

*/

//_____________________________Listen port______________________________________



app.listen(port, () => {
    console.log('Magic is happening in port'+port);
});