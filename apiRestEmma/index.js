var express = require("express");
const port = process.env.PORT || 8080;
var app = express();
//var queryParser = require('express-query-int');
var bodyParser = require("body-parser");
app.use(bodyParser.json());
//app.use(queryParser());

var MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://user:user@sos-1gum3.mongodb.net/test?retryWrites=true";
const client = new MongoClient(uri, { useNewUrlParser: true });

var popstats;

client.connect(err => {
  popstats = client.db("sos181909").collection("populationstats");
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
        popstats.find({year: {$gte: from, $lte: to }}).toArray((err,popstatsArray)=>{
            if(err)
                console.log("Error: "+err);
            
            res.send(popstatsArray);        
        });
    }else if(req.query.year != "undefined"){
        var year = req.query.year;
        popstats.find({year: year}).toArray((err,popstatsArray)=>{
            
            if(err)
                console.log("Error: "+err);
            
            res.send(popstatsArray);        
        });
    
    }
});


// POST /populationstats/
app.post("/api/v1/populationstats", (req,res)=>{
    
    var newPopstat = req.body;
    var country = req.body.country;
    var year = req.body.year;
    if(country==undefined || year==undefined){
    res.sendStatus(400);
    } else {
        var findResult = popstats.find({country: country, year: year});
        if(findResult.totalSize==undefined){
            popstats.insertOne(newPopstat);
            res.sendStatus(201);
        }else res.sendStatus(409);
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
            
            res.send(popstatsArray);        
        });
    }else
        popstats.find({country: country}).toArray((err,popstatsArray)=>{
            if(err)
                console.log("Error: "+err);
            res.send(popstatsArray);        
        });
});

// GET /populationstats/country/year
app.get("/api/v1/populationstats/:country/:year", (req,res)=>{
    var country = req.params.country;
    var year = parseInt(req.params.year,10);
    console.log(year);
    var findResult=popstats.find({country: "Aruba", year: 1990});
    if (findResult.totalSize != undefined){
        popstats.find({country: country,
        year: year}).toArray((err,popstatsArray)=>{
            if(err)
                console.log("Error: "+err);
            res.send(popstatsArray);        
        });
    }else
        res.sendStatus(404);
        console.log(findResult.totalSize);
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

app.listen(port,()=>{
    console.log("server ready!");
});