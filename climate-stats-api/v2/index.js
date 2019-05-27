module.exports =function(app, climate_stats) {
    
    
    // GET /api/v2/climate-stats/docs/
    
    app.get("/api/v2/climate-stats/docs/", (req,res)=>{
        res.redirect('https://documenter.getpostman.com/view/6904229/S17xskjc');
    });
    
    // GET /api/v2/climate-stats/loadInitialData
    
    app.get("/api/v2/climate-stats/loadInitialData",(req,res)=>{
        
        var climate_stats_initial = [{
            country : "France",
            year : 1990,
            methane_stats : 75749.5,
            co2_stats : 6.420670907,
            nitrous_oxide_stats : 73869.28
        },{
            country : "India",
            year : 1990,
            methane_stats : 513704,
            co2_stats : 0.7115627995,
            nitrous_oxide_stats : 169598.52
        },{
            country : "Spain",
            year : 1990,
            methane_stats : 32809,
            co2_stats : 5.624190007,
            nitrous_oxide_stats : 26186.661
        },{
            country : "United States",
            year : 1990,
            methane_stats : 637636,
            co2_stats : 19.32275118,
            nitrous_oxide_stats : 331851.9
        },{
            country : "France",
            year : 2000,
            methane_stats : 85646.7,
            co2_stats : 5.946665463,
            nitrous_oxide_stats : 52700
        },{
            country : "India",
            year : 2000,
            methane_stats : 561733,
            co2_stats : 0.9798704424,
            nitrous_oxide_stats : 207700
        },{
            country : "Spain",
            year : 2000,
            methane_stats : 35113.6,
            co2_stats : 7.257824346,
            nitrous_oxide_stats : 27342
        },{
            country : "United States",
            year : 2000,
            methane_stats : 556609,
            co2_stats : 20.17875051,
            nitrous_oxide_stats : 325500
        },{
            country : "France",
            year : 2012,
            methane_stats : 81178.5035,
            co2_stats : 5.075063887,
            nitrous_oxide_stats : 36865.68363
        },{
            country : "India",
            year : 2012,
            methane_stats : 636395.8272,
            co2_stats : 1.598098637,
            nitrous_oxide_stats : 239755.1309
        },{
            country : "Spain",
            year : 2012,
            methane_stats : 37208.10558,
            co2_stats : 5.660938803,
            nitrous_oxide_stats : 20873.14001
        },{
            country : "United States",
            year : 2012,
            methane_stats : 499809.345,
            co2_stats : 16.3042868,
            nitrous_oxide_stats : 288877.995
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
    
    // GET /api/v2/climate-stats
    
    app.get("/api/v2/climate-stats",(req,res)=>{
        
        var year = req.query.year;
        var country = req.query.country;
        var limit = req.query.limit;
        var from = req.query.from;
        var meth = req.query.methane_stats;
        var co2 = req.query.co2_stats;
        var no = req.query.nitrous_oxide_stats;
        
        
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
        
        
        // methane_stats
        }else if(meth){
                
                climate_stats.find({"methane_stats":parseFloat(meth)},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(climateArray);
                });
        
        // c02_stats
        
        }else if(co2){
                
                climate_stats.find({"co2_stats":parseFloat(co2)},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(climateArray);
                });
        
        // nitrous_oxide_stats
        
        }else if(no){
                
                climate_stats.find({"nitrous_oxide_stats":parseFloat(no)},{projection : {_id : 0}}).toArray((err, climateArray)=>{
                    if(err)
                        console.log("Error: "+err);
                    
                    res.send(climateArray);
                });
        
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
    
    // POST /api/v2/climate-stats/
    
    app.post("/api/v2/climate-stats/",(req,res)=>{
        var newClimate = req.body;
        
        var data = {
            country : req.body.country,
            year : Number(req.body.year),
            methane_stats : Number(req.body.methane_stats),
            co2_stats : Number(req.body.co2_stats),
            nitrous_oxide_stats : Number(req.body.nitrous_oxide_stats)
        };
        
        if( Object.keys(newClimate).length != 5 || newClimate.country === undefined || newClimate.year === undefined || 
            newClimate.methane_stats === undefined || newClimate.co2_stats === undefined || newClimate.nitrous_oxide_stats === undefined ||
            !isNaN(data["country"]) || isNaN(data["year"]) || isNaN(data["methane_stats"]) || isNaN(data["co2_stats"]) || isNaN(data["nitrous_oxide_stats"])){
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
    
    // GET /api/v2/climate-stats/:country
    
    app.get("/api/v2/climate-stats/:country", (req,res)=>{
    
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
    
    // GET /api/v2/climate-stats/:country/:year
    
    app.get("/api/v2/climate-stats/:country/:year", (req,res)=>{
    
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
    
    // DELETE /api/v2/climate-stats/:country/:year
    
    app.delete("/api/v2/climate-stats/:country/:year",(req,res)=>{
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
    
    // PUT /api/v2/climate-stats/:country/:year
    
    app.put("/api/v2/climate-stats/:country/:year", (req,res)=>{
    
        var country = req.params.country;
        var year = req.params.year;
        var updatedClimate = req.body;
        
        var data = {
            country : req.body.country,
            year : Number(req.body.year),
            methane_stats : Number(req.body.methane_stats),
            co2_stats : Number(req.body.co2_stats),
            nitrous_oxide_stats : Number(req.body.nitrous_oxide_stats)
        };
    
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
                        updatedClimate.methane_stats === undefined || updatedClimate.co2_stats === undefined || updatedClimate.nitrous_oxide_stats === undefined ||
                        !isNaN(data["country"]) || isNaN(data["year"]) || isNaN(data["methane_stats"]) || isNaN(data["co2_stats"]) || isNaN(data["nitrous_oxide_stats"])){
                        
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
    
    // POST /api/v2/climate-stats/:country/:year error
    
    app.post("/api/v2/climate-stats/:country/:year",(req,res)=>{
        res.sendStatus(405);
    });
    
    // PUT /api/v2/climate-stats/ error
    
    app.put("/api/v2/climate-stats/",(req,res)=>{
        res.sendStatus(405);
    });
    
    // DELETE /api/v2/climate-stats/
    
    app.delete("/api/v2/climate-stats/", (req,res)=>{
        climate_stats.deleteMany({}, function(){
            res.sendStatus(205);
        });
    
    });
};


