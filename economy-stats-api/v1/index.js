module.exports = function(app, BASE_PATH, economy_stats) {

var path = "";

// GET /api/v1/economy-stats/docs/

path = BASE_PATH + "/docs/";

app.get(path, (req,res)=>{
    res.redirect('https://documenter.getpostman.com/view/6893446/S17tRo7m');
    //https://documenter.getpostman.com/view/6893446/S17tS8XP for personal website
});


// GET /api/v1/economy-stats/loadInitialData

path = BASE_PATH + "/loadInitialData";

app.get(path,(req,res)=>{
    
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

app.get(BASE_PATH, (req,res)=>{
    
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
                
                if (economyArray.length>1)
                    res.send(economyArray);
                else res.send(economyArray[0]);
            });
    
        }else if(!country)
        { //if we don't have of the years selected
            
            economy_stats.find({"year":year}).toArray((err, economyArray)=>{ 
                if(err)
                    console.log("Error: "+err);
                
                if (economyArray.length>1)
                    res.send(economyArray);
                else res.send(economyArray[0]);
            });
        
        }
        else //case without country & year
        {
            
            economy_stats.find({"country":country, "year":year}).toArray((err, economyArray)=>{ //find all countries passed by query with that year
                if(err)
                    console.log("Error: "+err);
                
                res.send(economyArray[0]);
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

app.post(BASE_PATH, (req,res)=>{
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

app.get(BASE_PATH + "/:country", (req,res)=>{

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

app.get(BASE_PATH + "/:country/:year", (req,res)=>{

    var country = req.params.country;
    var year = req.params.year;

    economy_stats.find({"country":country,"year":year}).toArray((err, economyArray)=>{
        if(err) console.log(err);
        
        if (economyArray==0) res.sendStatus(404); //not found
        else res.send(economyArray[0]);
    });
});

// DELETE /api/v1/economy-stats/:country/:year

app.delete(BASE_PATH + "/:country/:year",(req,res)=>{
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

app.put(BASE_PATH + "/:country/:year", (req,res)=>{

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

app.post(BASE_PATH + "/:country/:year",(req,res)=>{
    res.sendStatus(405);
});

// PUT /api/v1/economy-stats/ error method not allowed

app.put(BASE_PATH,(req,res)=>{
    res.sendStatus(405);
});

// DELETE /api/v1/economy-stats/

app.delete(BASE_PATH, (req,res)=>{
    economy_stats.deleteMany({});
    
    res.sendStatus(200);
});
    
};