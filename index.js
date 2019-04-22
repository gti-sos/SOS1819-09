var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 8080;

app.use('/',express.static( path.join(__dirname,"public")));
app.use(bodyParser.json());


// ___________________________________ climate_stats ___________________________

// MongoDb
var climates_stats_api = require("./climate-stats-api");

const MongoClientGauthier = require("mongodb").MongoClient;
const uriGauthier = "mongodb+srv://Gauthier:gauthier@climate-stats-2wtji.mongodb.net/sos?retryWrites=true";
const client = new MongoClientGauthier(uriGauthier, { useNewUrlParser: true });

var climate_stats;

client.connect(err => {
  climate_stats = client.db("sos1819-09").collection("climate-stats");
  console.log("Connected to climate_stats");
  // accès à l'api
  climates_stats_api(app,climate_stats);
  // accès au frontend
  app.use("/api/ui/v1/climate-stats", express.static(path.join(__dirname,"public/climate-stats")));
  
});

// ___________________________________ climate_stats_secure ___________________________

// MongoDb
var climates_stats_api_secure = require("./climate-stats-api-secure");
var climate_stats_secure;

client.connect(err => {
  climate_stats_secure = client.db("sos1819-09-secure").collection("climate-stats");
  console.log("Connection secured to climate-stats");
  
  climates_stats_api_secure(app,climate_stats_secure);
});

// _______________________ populationstats ____________________________________


const MongoClientEmma = require('mongodb').MongoClient;
const uriEmma = "mongodb+srv://user:user@sos-1gum3.mongodb.net/test?retryWrites=true";
const clientEmma = new MongoClientEmma(uriEmma, { useNewUrlParser: true });

var population_stats_api = require("./populationstats-api");

var popstats;

clientEmma.connect(err => {
  popstats = clientEmma.db("sos181909").collection("populationstats");
  console.log("connected to popstats");
  
  population_stats_api(app,popstats);
  
   //MiniPostman
    app.use("/api/v1/populationstats-minipostman",express.static(path.join(__dirname,"public/publicpopstats")));
});



// ___________________________economy_stats_____________________________________

var economyAPI = require("./economy-stats-api");
const BASE_PATH = "/api";

//MongoDB--------------------------------------------------------------------------------------

const MongoClientGiuseppe = require("mongodb").MongoClient;
const uriGiuseppe = "mongodb+srv://Giuseppe:Giuseppe@sos-qhbyw.mongodb.net/test?retryWrites=true";
const clientGiuseppe = new MongoClientGiuseppe(uriGiuseppe, { useNewUrlParser: true });

var economy_stats = [{}];

clientGiuseppe.connect(err => {
  economy_stats = clientGiuseppe.db("sos1819-09").collection("economy-stats"); //sos1819-09 name database and sos name of the cluster
  economyAPI.checkALL(app, BASE_PATH, economy_stats);
  console.log("Connected to economy-stats");
  app.use("/api/v1/economy-stats-minipostman", express.static(path.join(__dirname,"public/economy-stats")));
});

//_____________________________Listen port______________________________________



app.listen(port, () => {
    console.log('Magic is happening in port'+port);
});