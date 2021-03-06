var express = require("express");
const port = process.env.PORT || 8080;
var app = express();
var bodyParser = require("body-parser");

// A ajouter :
var path = require("path");

app.use(bodyParser.json());


var MongoClientEmma = require('mongodb').MongoClient;
const uriEmma = "mongodb+srv://user:user@sos-1gum3.mongodb.net/test?retryWrites=true";
const clientEmma = new MongoClientEmma(uriEmma, { useNewUrlParser: true });

var popstats;

clientEmma.connect(err => {
  popstats = clientEmma.db("sos181909").collection("populationstats");
  // perform actions on the collection object
  console.log("connected");
});


app.use(bodyParser.json());

// MiniPostman
app.use("/",express.static(path.join(__dirname,"publicpopstats")));


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
            if (popstatsArray != 0)
                res.send(popstatsArray);
            else
                res.sendStatus(404);
        });
    }else if(req.query.year){
        var year = req.query.year;
        popstats.find({year: parseInt(year)}, { fields: { _id: 0 }}).toArray((err,popstatsArray)=>{
            
            if(err)
                console.log("Error: "+err);
            if (popstatsArray != 0)
                res.send(popstatsArray);
            else
                res.sendStatus(404);
        });
    } else if(req.query.totalpopulation){
        var totalpopulation = req.query.totalpopulation;
        popstats.find({totalpopulation: totalpopulation}, { fields: { _id: 0 }}).toArray((err,popstatsArray)=>{
            
            if(err)
                console.log("Error: "+err);
            if (popstatsArray != 0)
                res.send(popstatsArray);
            else
                res.sendStatus(404);
        });
    } else if(req.query.urbanpopulation){
        var urbanpopulation = req.query.urbanpopulation;
        popstats.find({urbanpopulation: urbanpopulation}, { fields: { _id: 0 }}).toArray((err,popstatsArray)=>{
            
            if(err)
                console.log("Error: "+err);
            if (popstatsArray != 0)
                res.send(popstatsArray);
            else
                res.sendStatus(404);
        });
    } else if(req.query.accesstoelectricity){
        var accesstoelectricity = req.query.accesstoelectricity;
        popstats.find({accesstoelectricity: accesstoelectricity}, { fields: { _id: 0 }}).toArray((err,popstatsArray)=>{
            
            if(err)
                console.log("Error: "+err);
            if (popstatsArray != 0)
                res.send(popstatsArray);
            else
                res.sendStatus(404);
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
    
    popstats.deleteMany(function(){
            res.sendStatus(200);
    });
    
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
        popstats.find({country: country}, { fields: { _id: 0 }}).toArray((err,popstatsArray)=>{
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
    var year = parseInt(req.params.year);

    if(Object.keys(req.body).length === 0 || country===undefined || year===undefined || req.body.totalpopulation===undefined || req.body.urbanpopulation===undefined || req.body.accesstoelectricity===undefined){
    
        res.sendStatus(400);
    
        
    } else if(req.body.country==country){
        
        popstats.updateOne({country: country, year: parseInt(year)},{$set : req.body},function(){
           res.sendStatus(200);

        });
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
                
                popstats.deleteOne({"country":country,"year":parseInt(year,10)},function(){
                    res.sendStatus(200);
                });
                
            }
        });

});


app.listen(port,()=>{
    console.log("server ready!");
});

// Secure
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