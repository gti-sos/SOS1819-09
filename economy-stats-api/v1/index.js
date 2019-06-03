module.exports = function(app, BASE_PATH, economy_stats) {

var path = "";

// GET /api/v1/economy-stats/docs/

path = BASE_PATH + "/docs/";

app.get(path, (req,res)=>{
    res.redirect('https://documenter.getpostman.com/view/6893446/S1LzwRii');
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
    }, {
        country : "South Africa",
        year : 1970,
        gdp_growth_stats : 5.248674135,
        industry_gdp_stats : 36.14320462,
        gross_sav_gdp_stats : 25.72970582
    }, {
        country : "Colombia",
        year : 1970,
        gdp_growth_stats : 6.207796963,
        industry_gdp_stats : 27.63994336,
        gross_sav_gdp_stats : 17.04502207
    }, {
        country : "Venezuela",
        year : 1970,
        gdp_growth_stats : 7.711914381,
        industry_gdp_stats : 41.62614128,
        gross_sav_gdp_stats : 24.40365209
    }, {
       country: "Italy",
       year: 1970,
       gdp_growth_stats: 5.268692965,
       industry_gdp_stats: 27.9871498,
       gross_sav_gdp_stats: 26.86443817
    }, {
       country: "India",
       year: 1970,
       gdp_growth_stats: 5.157229736,
       industry_gdp_stats: 21.78022951,
       gross_sav_gdp_stats: 13.23451613
    }, {
       country: "Spain",
       year: 1970,
       gdp_growth_stats: 4.290639388,
       industry_gdp_stats: 28.36305371,
       gross_sav_gdp_stats: 25.47194228
    }, {
       country: "USA",
       year: 1970,
       gdp_growth_stats: 0.1860456364,
       industry_gdp_stats: 23.13808336,
       gross_sav_gdp_stats: 21.50689108
    }, {
       country: "France",
       year: 1970,
       gdp_growth_stats: 5.558249635,
       industry_gdp_stats: 29.04501265,
       gross_sav_gdp_stats: 25.76056269
    }, {
       country: "Germany",
       year: 1970,
       gdp_growth_stats: 3.132699754,
       industry_gdp_stats: 33.56380555,
       gross_sav_gdp_stats: 26.47876255
    }, {
       country: "Iran",
       year: 1970,
       gdp_growth_stats: 11.12258869,
       industry_gdp_stats: 40.58258388,
       gross_sav_gdp_stats: 40.67242893
    }, {
        country : "Netherlands",
        year : 2012,
        gdp_growth_stats : -1.057037404,
        industry_gdp_stats : 20.03862584,
        gross_sav_gdp_stats : 29.44247574
    }, {
        country : "South Africa",
        year : 2012,
        gdp_growth_stats : 2.213354808,
        industry_gdp_stats : 26.68106047,
        gross_sav_gdp_stats : 15.10443603
    }, {
        country : "Colombia",
        year : 2012,
        gdp_growth_stats : 3.903054219,
        industry_gdp_stats : 33.35718075,
        gross_sav_gdp_stats : 18.26091867
    }, {
        country : "Venezuela",
        year : 2012,
        gdp_growth_stats : 5.625956975,
        industry_gdp_stats : 45.16019843,
        gross_sav_gdp_stats : 25.62897701
    }, {
       country: "Italy",
       year: 2012,
       gdp_growth_stats: -2.819013779,
       industry_gdp_stats: 21.42657282,
       gross_sav_gdp_stats: 17.49589194
    }, {
       country: "India",
       year: 2012,
       gdp_growth_stats: 5.456387552,
       industry_gdp_stats: 29.3985277,
       gross_sav_gdp_stats: 35.26129075
    }, {
       country: "Spain",
       year: 2012,
       gdp_growth_stats: -2.927750507,
       industry_gdp_stats: 22.03170756,
       gross_sav_gdp_stats: 19.65773882
    }, {
       country: "USA",
       year: 2012,
       gdp_growth_stats: 2.249545852,
       industry_gdp_stats: 19.86025676,
       gross_sav_gdp_stats: 18.83656036
    }, {
       country: "France",
       year: 2012,
       gdp_growth_stats: 0.3131347444,
       industry_gdp_stats: 17.86855062,
       gross_sav_gdp_stats: 21.45516329
    }, {
       country: "Germany",
       year: 2012,
       gdp_growth_stats: 0.4919928291,
       industry_gdp_stats: 27.59250397,
       gross_sav_gdp_stats: 26.32637875
    }, {
       country: "Iran",
       year: 2012,
       gdp_growth_stats: -7.44455703,
       industry_gdp_stats: 43.34185294,
       gross_sav_gdp_stats: 37.65796579
    }, {
       country: "Netherlands",
       year: 2013,
       gdp_growth_stats: -0.1301752395,
       industry_gdp_stats: 19.33416406,
       gross_sav_gdp_stats: 28.06072932
    }, {
       country: "South Africa",
       year: 2013,
       gdp_growth_stats: 2.4852005,
       industry_gdp_stats: 26.66809154,
       gross_sav_gdp_stats: 19.02767037
    }, {
       country: "Colombia",
       year: 2013,
       gdp_growth_stats: 4.566869773,
       industry_gdp_stats: 32.72222772,
       gross_sav_gdp_stats: 18.2279525
    }, {
       country: "Venezuela",
       year: 2013,
       gdp_growth_stats: 1.343094036,
       industry_gdp_stats: 44.72616122,
       gross_sav_gdp_stats: 15.36172757
    }, {
       country: "Italy",
       year: 2013,
       gdp_growth_stats: -1.728160802,
       industry_gdp_stats: 21.32794416,
       gross_sav_gdp_stats: 17.92019665
    }, {
       country: "India",
       year: 2013,
       gdp_growth_stats: 6.386106401,
       industry_gdp_stats: 28.40489956,
       gross_sav_gdp_stats: 34.30465633
    }, {
       country: "Spain",
       year: 2013,
       gdp_growth_stats: -1.705705,
       industry_gdp_stats: 21.24339349,
       gross_sav_gdp_stats: 20.19361317
    }, {
       country: "USA",
       year: 2013,
       gdp_growth_stats: 1.842081071,
       industry_gdp_stats: 19.95404993,
       gross_sav_gdp_stats: 19.26164254
    }, {
       country: "France",
       year: 2013,
       gdp_growth_stats: 0.5763266792,
       industry_gdp_stats: 17.97180129,
       gross_sav_gdp_stats: 21.38921233
    }, {
       country: "Germany",
       year: 2013,
       gdp_growth_stats: 0.4919928291,
       industry_gdp_stats: 27.08669469,
       gross_sav_gdp_stats: 26.18672763
    }, {
       country: "Iran",
       year: 2013,
       gdp_growth_stats: -7.44455703,
       industry_gdp_stats: 42.88103081,
       gross_sav_gdp_stats: 35.7380595
    }, {
        country : "Netherlands",
        year : 2017,
        gdp_growth_stats : 2.868832199,
        industry_gdp_stats : 17.41582638,
        gross_sav_gdp_stats : 31.15410876
    }, {
        country : "South Africa",
        year : 2017,
        gdp_growth_stats : 1.31674486,
        industry_gdp_stats : 25.89866891,
        gross_sav_gdp_stats : 15.8155558
    }, {
        country : "Colombia",
        year : 2017,
        gdp_growth_stats : 1.789192546,
        industry_gdp_stats : 26.64246119,
        gross_sav_gdp_stats : 16.42998629
    }, {
        country : "Venezuela",
        year : 2017,
        gdp_growth_stats : 1.545621452,
        industry_gdp_stats : 22.32156541,
        gross_sav_gdp_stats : 13.16924382
    }, {
       country: "Italy",
       year: 2017,
       gdp_growth_stats: 1.145512822,
       industry_gdp_stats: 21.56525868,
       gross_sav_gdp_stats: 20.34206903
    }, {
       country: "India",
       year: 2017,
       gdp_growth_stats: 7.167888861,
       industry_gdp_stats: 26.49817453,
       gross_sav_gdp_stats: 29.29807265
    }, {
       country: "Spain",
       year: 2017,
       gdp_growth_stats: 2.979182401,
       industry_gdp_stats: 21.87446145,
       gross_sav_gdp_stats: 22.97782063
    }, {
       country: "USA",
       year: 2017,
       gdp_growth_stats: 2.21701033,
       industry_gdp_stats: 18.79695397,
       gross_sav_gdp_stats: 18.99358566
    }, {
       country: "France",
       year: 2017,
       gdp_growth_stats: 2.161158086,
       industry_gdp_stats: 17.36161504,
       gross_sav_gdp_stats: 22.92424318
    }, {
       country: "Germany",
       year: 2017,
       gdp_growth_stats: 2.15710947,
       industry_gdp_stats: 27.97460746,
       gross_sav_gdp_stats: 28.10854548
    }, {
       country: "Iran",
       year: 2017,
       gdp_growth_stats: 3.755187367,
       industry_gdp_stats: 34.91010692,
       gross_sav_gdp_stats: 30.17271808
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
    updatedEconomy.year = parseInt(updatedEconomy.year,10);
    updatedEconomy.gdp_growth_stats = parseFloat(updatedEconomy.gdp_growth_stats);
    updatedEconomy.industry_gdp_stats = parseFloat(updatedEconomy.industry_gdp_stats);
    updatedEconomy.gross_sav_gdp_stats = parseFloat(updatedEconomy.gross_sav_gdp_stats);

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
                    if (Object.keys(updatedEconomy).length != 5 || !updatedEconomy.country || !updatedEconomy.year || !updatedEconomy.gdp_growth_stats || !updatedEconomy.industry_gdp_stats || !updatedEconomy.gross_sav_gdp_stats)
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