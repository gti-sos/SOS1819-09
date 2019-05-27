module.exports =function(app, popstats) {
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
{
    country:"France",
    year:1990,
    totalpopulation:"58512808",
    urbanpopulation:"43332245",
    accesstoelectricity:"100"
},
{
    country:"France",
    year:2010,
    totalpopulation:"65027507",
    urbanpopulation:"50961407",
    accesstoelectricity:"100"
},
{
    country:"Germany",
    year:1990,
    totalpopulation:"79433029",
    urbanpopulation:"58079842",
    accesstoelectricity:"100"
},
{
    country:"Germany",
    year:2010,
    totalpopulation:"81776930",
    urbanpopulation:"62940432",
    accesstoelectricity:"100"
},
{
    country:"Spain",
    year:1990,
    totalpopulation:"38867322",
    urbanpopulation:"29286916",
    accesstoelectricity:"100"
},
{
    country:"Spain",
    year:2010,
    totalpopulation:"46576897",
    urbanpopulation:"36535850",
    accesstoelectricity:"100"
},
{
    country:"India",
    year:1990,
    totalpopulation:"870133480",
    urbanpopulation:"222293000",
    accesstoelectricity:"43.29"
},
{
    country:"India",
    year:2010,
    totalpopulation:"1230980691",
    urbanpopulation:"380742328",
    accesstoelectricity:"76.3"
},
{
    country:"USA",
    year:1990,
    totalpopulation:"249623000",
    urbanpopulation:"187966119",
    accesstoelectricity:"100"
},
{
    country:"USA",
    year:2010,
    totalpopulation:"309338421",
    urbanpopulation:"247276259",
    accesstoelectricity:"100"
},
{
    country:"Portugal",
    year:1990,
    totalpopulation:"9983218",
    urbanpopulation:"4783459",
    accesstoelectricity:"100"
},
{
    country:"Portugal",
    year:2010,
    totalpopulation:"10573100",
    urbanpopulation:"6403809",
    accesstoelectricity:"100"
},
{
    country:"United-Kingdom",
    year:1990,
    totalpopulation:"57247586",
    urbanpopulation:"44733264",
    accesstoelectricity:"100"
},
{
    country:"United-Kingdom",
    year:2010,
    totalpopulation:"62766365",
    urbanpopulation:"51030310",
    accesstoelectricity:"100"
},
{
    country:"Pakistan",
    year:1990,
    totalpopulation:"107678614",
    urbanpopulation:"32923813",
    accesstoelectricity:"59.94"
},
{
    country:"Pakistan",
    year:2010,
    totalpopulation:"170560182",
    urbanpopulation:"59690947",
    accesstoelectricity:"89.81"
},
{
    country:"Singapore",
    year:1990,
    totalpopulation:"3047132",
    urbanpopulation:"3047132",
    accesstoelectricity:"100"
},
{
    country:"Singapore",
    year:2010,
    totalpopulation:"5076732",
    urbanpopulation:"5076732",
    accesstoelectricity:"100"
}
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

};