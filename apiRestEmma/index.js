var express = require("express");
const port = process.env.PORT || 8080;
var app = express();
var bodyParser = require("body-parser");


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
{
    country:"Angola",
    year:"1990",
    totalpopulation:"12171441",
    urbanpopulation:"4225990",
    accesstoelectricity:"11.4"
},
{
    country:"Andora",
    year:"1990",
    totalpopulation:"52448",
    urbanpopulation:"51627",
    accesstoelectricity:"93.36"
},
    ];
    if (popstats.totalSize==0){
    popstats.insertMany(totalpopulationInitial);
    res.sendStatus(200);
    }else {res.sendStatus(409);}
});

// GET /populationstats/
app.get("/populationstats", (req,res)=>{
    
    popstats.find({}).toArray((err,popstatsArray)=>{
        
        if(err)
            console.log("Error: "+err);
        
        res.send(popstatsArray);        
    });

});


// POST /populationstats/
app.post("/populationstats", (req,res)=>{
    
    var newPopstat = req.body;
    
    popstats.insertOne(newPopstat);
    
    res.sendStatus(201);
});


// DELETE /populationstats/
app.delete("/populationstats", (req,res)=>{
    
    popstats.deleteMany();
    
    res.sendStatus(200);
});


//PUT /populationstats/
app.put("/populationstats", (req,res)=>{
   
    res.sendStatus(405);
});



// GET /populationstats/country/year
app.get("/populationstats/:country/:year", (req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    popstats.find({country: country,
                    year: year
    }).toArray((err,popstatsArray)=>{
        
        if(err)
            console.log("Error: "+err);
        
        res.send(popstatsArray);        
    });

});



// PUT /populationstats/:country/:year
app.put("/populationstats/:country/:year", (req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    popstats.findOneAndUpdate({country: country,
                    year: year
    },req.body).toArray((err,popstatsArray)=>{
        
        if(err)
            console.log("Error: "+err);
        
        res.sendStatus(200);        
    });

});


// DELETE /contacts/peter



app.listen(port,()=>{
    console.log("server ready!");
});