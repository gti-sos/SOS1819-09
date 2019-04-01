module.exports =function(app, climate_stats_secure) {
 
    const KEY_CLIMATE = "123456";
 
    // GET /api/v1/secure/climate-stats/docs/
    
    app.get("/api/v1/secure/climate-stats/docs", (req,res)=>{
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
            
                    climate_stats_secure.find({},{fields : {_id : 0}}).toArray((err, climateArray)=>{
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
                    
                    climate_stats_secure.find({"country":country},{fields : {_id : 0}}).toArray((err, climateArray)=>{
                        if(err)
                            console.log("Error: "+err);
                        
                        res.send(climateArray);
                    });
            
                }else if(!country){
                    
                    climate_stats_secure.find({"year":parseInt(year,10)},{fields : {_id : 0}}).toArray((err, climateArray)=>{
                        if(err)
                            console.log("Error: "+err);
                        
                        res.send(climateArray);
                    });
            
                }else{
                    
                   climate_stats_secure.find({"country":country, "year":parseInt(year,10)},{fields : {_id : 0}}).toArray((err, climateArray)=>{
                        if(err)
                            console.log("Error: "+err);
                        
                        res.send(climateArray);
                    }); 
                }
                
            // ?offset= &limit=
            }else if(limit){
                
                climate_stats_secure.find({},{fields : {_id : 0}}).limit(parseInt(limit,10)).skip(parseInt(req.query.offset,10)).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(climateArray);
                });
                
                
            //from to
            }else if(from){
                
                climate_stats_secure.find({ "year" : { $gte : parseInt(from,10), $lte : parseInt(req.query.to,10) }},{fields : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                        
                    res.send(climateArray);
                 });    
            
            // Without query
            }else{
                
                climate_stats_secure.find({},{fields : {_id : 0}}).toArray((err, climateArray)=>{
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
            
            climate_stats_secure.find({"country":country,},{fields : {_id : 0}}).toArray((err, climateArray)=>{
                if(err)
                    console.log(err);
                    
                if (climateArray==0){
                    res.sendStatus(404);
                }else{
                        
                     if(from){
                
                        climate_stats_secure.find({"country":country,"year" : { $gte : parseInt(from,10), $lte : parseInt(req.query.to,10) }},{fields : {_id : 0}}).toArray((err, climateArray)=>{
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
            
                climate_stats_secure.find({"country":country,"year":parseInt(year,10)},{fields : {_id : 0}}).toArray((err, climateArray)=>{
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
    
};