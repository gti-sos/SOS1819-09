module.exports =function(app, climate_stats) {
    
    
    // GET /api/v1/climate-stats/docs/
    
    app.get("/api/v1/climate-stats/docs/", (req,res)=>{
        res.redirect('https://documenter.getpostman.com/view/6904229/S17xskjc');
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
                
                climate_stats.insert(climate_stats_initial, function(){
                    climate_stats.find({},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                        if(err)
                            console.log("Error: "+err);
                        
                        res.send(climateArray);
                    });
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
                
                climate_stats.find({"country":country},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(climateArray);
                });
        
            }else if(!country){
                
                climate_stats.find({"year":parseInt(year,10)},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(climateArray);
                });
        
            }else{
                
                climate_stats.find({"country":country, "year":parseInt(year,10)},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(climateArray);
                });
            }
            
        // ?offset= &limit=
        }else if(limit){
            
            climate_stats.find({},{projection : {_id : 0}}).limit(parseInt(limit,10)).skip(parseInt(req.query.offset,10)).toArray((err, climateArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(climateArray);
            });
            
        //from to
        }else if(from){
            
            climate_stats.find({ "year" : { $gte : parseInt(from,10), $lte : parseInt(req.query.to,10) }},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(climateArray);
                });
        
        // Without query
        }else{
            
            climate_stats.find({},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                if(err)
                    console.log("Error: "+err);
                
                res.send(climateArray);
            });
            
        }
    });
    
    // POST /api/v1/climate-stats/
    
    app.post("/api/v1/climate-stats/",(req,res)=>{
        var newClimate = req.body;
        
        if( Object.keys(newClimate).length != 5 || newClimate.country === undefined || newClimate.year === undefined || 
            newClimate.methane_stats === undefined || newClimate.co2_stats === undefined || newClimate.nitrous_oxide_stats === undefined){
            res.sendStatus(400);
        }else{
            
            climate_stats.find({"country":newClimate.country, "year":newClimate.year}).toArray((err, climateArray)=>{
                if(err)
                    console.log(err);
                
                if (climateArray==0){ // if empty, create the data
                    
                    climate_stats.insert(newClimate, function(){
                        res.sendStatus(201);
                    });
                    
                }else{ // if not empty, send an error
                    
                    res.sendStatus(409);
            
                }
            });
 
        }
    });
    
    // GET /api/v1/climate-stats/:country
    
    app.get("/api/v1/climate-stats/:country", (req,res)=>{
    
        var country = req.params.country;
        var from = req.query.from;
            
        climate_stats.find({"country":country,},{projection : {_id : 0}}).toArray((err, climateArray)=>{
            if(err)
                console.log(err);
                
            if (climateArray==0){
                res.sendStatus(404);
            }else{
                    
                 if(from){
            
                    climate_stats.find({"country":country,"year" : { $gte : parseInt(from,10), $lte : parseInt(req.query.to,10) }},{projection : {_id : 0}}).toArray((err, climateArray)=>{
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
    
        climate_stats.find({"country":country,"year":parseInt(year,10)},{projection : {_id : 0}}).toArray((err, climateArray)=>{
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
                
                climate_stats.deleteOne({"country":country,"year":parseInt(year,10)}, function(){
                    res.sendStatus(205);
                });
                
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
                
                res.sendStatus(404);
                
            }else{
                
                climate_stats.find({"country":updatedClimate.country,"year":parseInt(updatedClimate.year,10)}).toArray((err, climateArray)=>{
                    if(err)
                        console.log(err);
                    
                    
                    if (climateArray==0 || Object.keys(updatedClimate).length != 5 || updatedClimate.country === undefined || updatedClimate.year === undefined || 
                        updatedClimate.methane_stats === undefined || updatedClimate.co2_stats === undefined || updatedClimate.nitrous_oxide_stats === undefined){
                        
                        res.sendStatus(400);
                        
                    }else{
                        
                        
                        climate_stats.updateOne(
                        {
                            "country":country,
                            "year":parseInt(year,10)
                        },
                        {
                            $set :  updatedClimate
                        }, function(){
                            res.sendStatus(200);
                        });
                        
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
        climate_stats.deleteMany({}, function(){
            res.sendStatus(205);
        });
    
    });
};


