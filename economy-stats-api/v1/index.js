module.exports = function(app, BASE_PATH, economy_stats) {

var path = "";

// GET /api/v1/economy-stats/docs/

path = BASE_PATH + "/docs/";

app.get(path, (req,res)=>{
    res.redirect('https://documenter.getpostman.com/view/6893446/S1EH21Qt');
});


// GET /api/v1/economy-stats/loadInitialData

path = BASE_PATH + "/loadInitialData";

app.get(path,(req,res)=>{
    
    var economy_stats_initial = [{
        country : "Netherlands",
        year : 1970,
        gdp_growth_stats : 34.14211806,
        industry_gdp_stats : 3.457969859,
        gross_sav_gdp_stats : 31.1994775
    },{
        country : "South Africa",
        year : 1970,
        gdp_growth_stats : 5.248674135,
        industry_gdp_stats : 36.14320462,
        gross_sav_gdp_stats : 25.72970582
    },{
        country : "Netherlands",
        year : 2012,
        gdp_growth_stats : -1.057037404,
        industry_gdp_stats : 20.03862584,
        gross_sav_gdp_stats : 29.44247574
    },{
        country : "Venezuela",
        year : 1970,
        gdp_growth_stats : 7.711914381,
        industry_gdp_stats : 41.62614128,
        gross_sav_gdp_stats : 24.40365209
    },{
        country : "Armenia",
        year : 2012,
        gdp_growth_stats : 7.200000003,
        industry_gdp_stats : 27.82709461,
        gross_sav_gdp_stats : 12.81248819
    }];
    
     economy_stats.find({},{projection : {_id : 0}}).toArray((err, economyArray)=>{
        if(err) console.log(err);
        if (economyArray==0)
        {
            economy_stats.insert(economy_stats_initial);
    
            economy_stats.find({},{projection : {_id : 0}}).toArray((err, economyArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(economyArray);
            });
        }
        else res.sendStatus(409); //conflict
    });
});


// GET /api/v1/economy-stats/

app.get(BASE_PATH, (req,res)=>{
    
    var country = req.query.country;
    var year = req.query.year;
    var limit = req.query.limit;
    var offset = req.query.offset;
    var from = req.query.from;
    var to = req.query.to;
    var gdpgrowth = req.query.gdp_growth_stats;
    var industrygdp = req.query.industry_gdp_stats;
    var grosssavgdp = req.query.gross_sav_gdp_stats;
    
    //indicators
    if(gdpgrowth) 
    { 
        economy_stats.find({"gdp_growth_stats":parseFloat(gdpgrowth)},{projection : {_id : 0}}).toArray((err, economyArray)=>{ 
            if(err) console.log("Error: "+err);
            if (economyArray.length == 0) res.sendStatus(404);
            else
            {
                if (economyArray.length>1)
                res.send(economyArray);
                else res.send(economyArray[0]);
            }
        });
    }
    else if (industrygdp)
    {
        economy_stats.find({"industry_gdp_stats": parseFloat(industrygdp)},{projection : {_id : 0}}).toArray((err, economyArray)=>{ 
            if(err) console.log("Error: "+err);
            if (economyArray.length == 0) res.sendStatus(404);
            else
            {
                if (economyArray.length>1)
                res.send(economyArray);
                else res.send(economyArray[0]);
            }
        });
    }
    else if (grosssavgdp)
    {
        economy_stats.find({"gross_sav_gdp_stats":parseFloat(grosssavgdp)},{projection : {_id : 0}}).toArray((err, economyArray)=>{ 
            if(err) console.log("Error: "+err);
            if (economyArray.length == 0) res.sendStatus(404);
            else
            {
                if (economyArray.length>1)
                res.send(economyArray);
                else res.send(economyArray[0]);
            }
        });
    }
    // ?country= &year=
    else if(country || year)
    {
        //case errors
        if(!year) //if we don't have of the years selected
        { 
            economy_stats.find({"country":country},{projection : {_id : 0}}).toArray((err, economyArray)=>{ 
                if(err) console.log("Error: "+err);
                if (economyArray.length == 0) res.sendStatus(404);
                else
                {
                    if (economyArray.length>1)
                    res.send(economyArray);
                    else res.send(economyArray[0]);
                }
            });
        }
        else if(!country) //if we don't have of the years selected
        { 
            economy_stats.find({"year":parseInt(year, 10)},{projection : {_id : 0}}).toArray((err, economyArray)=>{ 
                if(err) console.log("Error: "+err);
                if (economyArray.length == 0) res.sendStatus(404);
                else
                {
                    if (economyArray.length>1)
                    res.send(economyArray);
                    else res.send(economyArray[0]);
                }
            });
        }
        else //case with country & year
        {
            economy_stats.find({"country":country, "year":parseInt(year, 10)},{projection : {_id : 0}}).toArray((err, economyArray)=>{ //find all countries passed by query with that year
                if(err) console.log("Error: "+err);
                if (economyArray.length == 0) res.sendStatus(404);
                else res.send(economyArray[0]);
            });
        }
    }
    else if(limit)
    {
        
        economy_stats.find({},{projection : {_id : 0}}).limit(parseInt(limit,10)).skip(parseInt(offset,10)).toArray((err, economyArray)=>{
            if(err) console.log("Error: "+err);
            if (economyArray.length == 0) res.sendStatus(404);
            else
            {
                if (economyArray.length>1)
                res.send(economyArray);
                else res.send(economyArray[0]);
            }
        });
    }
    else if(from || to) //from to
    {
        if (from && to)
        {
            economy_stats.find({ "year" : { $gte : parseInt(from,10), $lte : parseInt(to,10) }},{projection : {_id : 0}}).toArray((err, economyArray)=>{
                    if(err) console.log("Error: "+err);
                    if (economyArray.length == 0) res.sendStatus(404);
                    else
                    {
                        if (economyArray.length>1)
                        res.send(economyArray);
                        else res.send(economyArray[0]);
                    }
                });
        }
        else if (from)
        {
            economy_stats.find({ "year" : { $gte : parseInt(from,10) }},{projection : {_id : 0}}).toArray((err, economyArray)=>{
                    if(err) console.log("Error: "+err);
                    if (economyArray.length == 0) res.sendStatus(404);
                    else
                    {
                        if (economyArray.length>1)
                        res.send(economyArray);
                        else res.send(economyArray[0]);
                    }
                });
        }
        else
        {
            economy_stats.find({ "year" : { $lte : parseInt(to,10) }},{projection : {_id : 0}}).toArray((err, economyArray)=>{
                    if(err) console.log("Error: "+err);
                    if (economyArray.length == 0) res.sendStatus(404);
                    else
                    {
                        if (economyArray.length>1)
                        res.send(economyArray);
                        else res.send(economyArray[0]);
                    }
                });
        }
    }
    else // Without query
    {
        economy_stats.find({},{projection : {_id : 0}}).toArray((err, economyArray)=>{
            if(err) console.log("Error: "+err);
            res.send(economyArray);
        });
    }
});


// POST /api/v1/economy-stats/

app.post(BASE_PATH, (req,res)=>{
    var newEconomy = req.body;
    newEconomy.year = parseInt(newEconomy.year,10);
    newEconomy.gdp_growth_stats = parseFloat(newEconomy.gdp_growth_stats);
    newEconomy.industry_gdp_stats = parseFloat(newEconomy.industry_gdp_stats);
    newEconomy.gross_sav_gdp_stats = parseFloat(newEconomy.gross_sav_gdp_stats);
    
     economy_stats.find({"country":newEconomy.country, "year":parseInt(newEconomy.year, 10)}).toArray((err, economyArray)=>{
        if(err) console.log(err);
        if (economyArray==0) //case that you can create
        {
            if (Object.keys(newEconomy).length != 5 || !newEconomy.country || !newEconomy.year || !newEconomy.gdp_growth_stats || !newEconomy.industry_gdp_stats || !newEconomy.gross_sav_gdp_stats)
                res.sendStatus(400);
            else
            {
                economy_stats.insert(newEconomy);
                res.sendStatus(201); //created
            }
                
        }
        else res.sendStatus(409); //conflict case that you can't create
    });
    
});

// GET /api/v1/economy-stats/:country

app.get(BASE_PATH + "/:country", (req,res)=>{

    var country = req.params.country;
    var from = req.query.from;
    var to = req.query.to;

    if (from || to)
    {
        if (from && to)
        {
            economy_stats.find({"country" : country, "year" : { $gte : parseInt(from,10), $lte : parseInt(to,10) }},{projection : {_id : 0}}).toArray((err, economyArray)=>{
                    if(err) console.log("Error: "+err);
                    if (economyArray==0) res.sendStatus(404);
                    else
                    {
                        if (economyArray.length>1)
                            res.send(economyArray);
                        else res.send(economyArray[0]);
                    }
                });
        }
        else if (from)
        {
            economy_stats.find({"country" : country, "year" : { $gte : parseInt(from,10) }},{projection : {_id : 0}}).toArray((err, economyArray)=>{
                    if(err) console.log("Error: "+err);
                    if (economyArray==0) res.sendStatus(404);
                    else
                    {
                        if (economyArray.length>1)
                            res.send(economyArray);
                        else res.send(economyArray[0]);
                    }
                });
        }
        else
        {
            economy_stats.find({"country" : country, "year" : { $lte : parseInt(to,10) }},{projection : {_id : 0}}).toArray((err, economyArray)=>{
                    if(err) console.log("Error: "+err);
                    if (economyArray==0) res.sendStatus(404);
                    else
                    {
                        if (economyArray.length>1)
                            res.send(economyArray);
                        else res.send(economyArray[0]);
                    }
                });
        }
        
    }
    else
    {
        economy_stats.find({"country":country},{projection : {_id : 0}}).toArray((err, economyArray)=>{
            if(err) console.log(err);
            if (economyArray==0) res.sendStatus(404); //not found
            else
            {
                        if (economyArray.length>1)
                            res.send(economyArray);
                        else res.send(economyArray[0]);
            }
        });
    }
});

// GET /api/v1/economy-stats/:country/:year

app.get(BASE_PATH + "/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;

    economy_stats.find({"country":country,"year":parseInt(year,10)},{projection : {_id : 0}}).toArray((err, economyArray)=>{
        if(err) console.log(err);
        if (economyArray==0) res.sendStatus(404); //not found
        else res.send(economyArray[0]);
    });
});

// DELETE /api/v1/economy-stats/:country/:year

app.delete(BASE_PATH + "/:country/:year",(req,res)=>{
    var country = req.params.country;
    var year = req.params.year;
    
    economy_stats.find({"country":country,"year":parseInt(year,10)}).toArray((err, economyArray)=>{
        if(err) console.log(err);
        if (economyArray==0) res.sendStatus(404); //not found
        else
        {
            economy_stats.deleteOne({"country":country,"year":parseInt(year,10)});
            res.sendStatus(200); //delete ok
        }
    });
});

// PUT /api/v1/economy-stats/:country/:year

app.put(BASE_PATH + "/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;
    var updatedEconomy = req.body; //what we update

    economy_stats.find({"country":country,"year":parseInt(year,10)}).toArray((err, economyArray)=>{
        if(err) console.log(err);
        if (economyArray==0) res.sendStatus(404); //bad request
        else
        {
            economy_stats.find({"country":updatedEconomy.country,"year":parseInt(updatedEconomy.year,10)}).toArray((err, economyArray)=>{ //looking if there is already
                if(err) console.log(err);
                if (economyArray==0) res.sendStatus(400); //bad request if the array is empty
                else
                {
                    if (Object.keys(updatedEconomy).length != 5 || updatedEconomy.country==null || updatedEconomy.year==null || updatedEconomy.gdp_growth_stats==null || updatedEconomy.industry_gdp_stats==null || updatedEconomy.gross_sav_gdp_stats == null)
                        res.sendStatus(400);
                    else
                    {
                        economy_stats.updateOne //to update the element
                        ( 
                            {
                                "country":country,
                                "year":parseInt(year, 10)
                            },
                            {
                                $set :  updatedEconomy
                            }
                        );
                        res.sendStatus(200); //ok
                    }
                }
            });
        }
    });
});

// POST /api/v1/economy-stats/:country/:year error method not allowed WITH COUNTRY AND YEARS TOGETHER

app.post(BASE_PATH + "/:country/:year",(req,res)=>{
    res.sendStatus(405);
});

// PUT /api/v1/economy-stats/ error method not allowed

app.put(BASE_PATH,(req,res)=>{
    res.sendStatus(405);
});

// DELETE /api/v1/economy-stats/

app.delete(BASE_PATH, (req,res)=>{
    economy_stats.find({}).toArray((err, economyArray)=>{
        if(err) console.log(err);
        economy_stats.deleteMany({});
        res.send(economyArray);
    });
});
    
};