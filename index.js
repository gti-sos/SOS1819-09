var express = require("express");
var path = require("path");
var bodyParser = require("body-parser");
var request = require("request");
var cors = require("cors");
var unirest = require('unirest');
var chartkick = require('chartkick');
var chartjs = require('chart.js');


var app = express();
var port = process.env.PORT || 8080;

app.use('/',express.static( path.join(__dirname,"public")));
app.use(bodyParser.json());
app.use(cors());


// ___________________________________ climate_stats ___________________________

// REST Countries
var REST_Countries_API = require("./RESTCountries");
var GWREST;
REST_Countries_API(app,GWREST);

// REST Countries V1
var REST_Countriesv1_API = require("./RESTCountriesV1");
var GWRESTV1;
REST_Countriesv1_API(app,GWRESTV1);

//Access to G02-scorers-stats
var G02ScorersAPI = 'https://sos1819-02.herokuapp.com/api/v1/scorers-stats';

app.use('/proxyG02Scorers', function(req, res) {
  console.log('piped: '+G02ScorersAPI);
  req.pipe(request(G02ScorersAPI)).pipe(res);
});

//Access to G03-Companies
var G03CompaniesAPI = 'https://sos1819-03.herokuapp.com/api/v1/companies';

app.use('/proxyG03Companies', function(req, res) {
  console.log('piped: '+G03CompaniesAPI);
  req.pipe(request(G03CompaniesAPI)).pipe(res);
});

//Access to G04-beer-consumed-stats
var G04BeerAPI = 'https://sos1819-04.herokuapp.com/api/v1/beer-consumed-stats/';

app.use('/proxyG04Beer', function(req, res) {
  console.log('piped: '+G04BeerAPI);
  req.pipe(request(G04BeerAPI)).pipe(res);
});

//Access to G06-transfer-stats
var G06TransferAPI = 'https://sos1819-06.herokuapp.com/api/v1/transfer-stats/';

app.use('/proxyG06Transfer', function(req, res) {
  console.log('piped: '+G06TransferAPI);
  req.pipe(request(G06TransferAPI)).pipe(res);
});

//Access to G08-tourists-by-countries
var G08TouristAPI = 'https://sos1819-08.herokuapp.com/api/v1/tourists-by-countries';

app.use('/proxyG08Tourist', function(req, res) {
  console.log('piped: '+G08TouristAPI);
  req.pipe(request(G08TouristAPI)).pipe(res);
});


//Access to G10-biofuelsproduction
var G10BiofuelsAPI = 'https://sos1819-10.herokuapp.com/api/v1/biofuels-production';

app.use('/proxyG10Biofuels', function(req, res) {
  console.log('piped: '+G10BiofuelsAPI);
  req.pipe(request(G10BiofuelsAPI)).pipe(res);
});

//Access to G11-public-expenditure-educations
var G11API = 'https://sos1819-11.herokuapp.com/api/v2/public-expenditure-educations/';

app.use('/proxyG11', function(req, res) {
  console.log('piped: '+G11API);
  req.pipe(request(G11API)).pipe(res);
});

//Access to G12-youth-unemployment-stats
var G12API = 'https://sos1819-12.herokuapp.com/api/v1/youth-unemployment-stats/';

app.use('/proxyG12', function(req, res) {
  console.log('piped: '+G12API);
  req.pipe(request(G12API)).pipe(res);
});

//Access to G14-deceaseds
var G14DeceasedsAPI = 'https://sos1819-14.herokuapp.com/api/v1/deceaseds/';

app.use('/proxyG14Deceaseds', function(req, res) {
  console.log('piped: '+G14DeceasedsAPI);
  req.pipe(request(G14DeceasedsAPI)).pipe(res);
});

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
  //app.use("/ui/v1/climate-stats", express.static(path.join(__dirname,"public/climate-stats")));
  
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
  app.use("/api/v1/populationstats-minipostman",express.static(path.join(__dirname,"public/publicpopstatspost")));
    
  //App
  app.use("/api/v1/populationstats",express.static(path.join(__dirname,"public/publicpopstatsapp")));
});

  //Integration con API emigration
  var paths='/proxyEmigration';
  var apiEmigration = 'https://sos1819-08.herokuapp.com/api/v1/emigrations-by-countries/';
  
  app.use(paths, function(req, res) {
    console.log('piped: '+apiEmigration);
    req.pipe(request(apiEmigration)).pipe(res);
  });
  
  //Integration API externa fuel
  var REST_Stadium_API = require("./RESTfuel");
  var EBfuel;
  REST_Stadium_API(app,EBfuel);
  
  //Integration API externa airport
  var REST_Airport_API = require("./RESTairport");
  var EBairport;
  REST_Airport_API(app,EBairport);
  
  //Integration API externa foot
  var REST_foot_API = require("./RESTfoot");
  var EBfoot;
  REST_foot_API(app,EBfoot);
  
  //Integration API externa hotel
  var REST_hotel_API = require("./RESThotel");
  var EBhotel;
  REST_hotel_API(app,EBhotel);
  
  //Integration API externa Numberfact
  var REST_Fact_API = require('./RESTfact');
  var EBfact;
  REST_Fact_API(app,EBfact);
  
  //Integration API externa weather
  var REST_Weather_API = require('./RESTweather');
  var EBweather;
  REST_Weather_API(app,EBweather);
  
  
  
// ___________________________economy_stats_____________________________________

var economyAPI = require("./economy-stats-api");
const BASE_PATH = "/api";

// ALL INTEGRATIONS
//-----------------------------------------------------------------------------------------------------------

//Integration API GenPubExp G11

var pathsGenPubExp='/proxyGenPubExp'; //porterà direttamente dal path del NOSTRO SITO alla API GenPubExp
var APIGenPubExp = 'https://sos1819-11.herokuapp.com/api/v1/general-public-expenses';

app.use(pathsGenPubExp, function(req, res) {
  console.log('piped: '+APIGenPubExp);
  req.pipe(request(APIGenPubExp)).pipe(res);
});

//-----------------------------------------------------------------------------------------------------------

//Integration API Country G03

var pathsCountry='/proxyCountry'; 
var APICountry = 'https://sos1819-03.herokuapp.com/api/v1/country-stats';

app.use(pathsCountry, function(req, res) {
  console.log('piped: '+APICountry);
  req.pipe(request(APICountry)).pipe(res);
});

//-----------------------------------------------------------------------------------------------------------

//Integration API movie G02

var pathsMovie='/proxyMovie'; 
var APIMovie = 'https://sos1819-02.herokuapp.com/api/v1/movies-stats';

app.use(pathsMovie, function(req, res) {
  console.log('piped: '+APIMovie);
  req.pipe(request(APIMovie)).pipe(res);
});

//-----------------------------------------------------------------------------------------------------------

//Integration API elements G14

var pathsElements='/proxyElements'; 
var APIElements = 'https://sos1819acp-feedbacks-sos1819acp.c9users.io/api/v1/elements'; //DA AGGIUSTARE

app.use(pathsElements, function(req, res) {
  console.log('piped: '+APIElements);
  req.pipe(request(APIElements)).pipe(res);
});

//-----------------------------------------------------------------------------------------------------------

//MongoDB--------------------------------------------------------------------------------------

const MongoClientGiuseppe = require("mongodb").MongoClient;
const uriGiuseppe = "mongodb+srv://Giuseppe:Giuseppe@sos-qhbyw.mongodb.net/test?retryWrites=true";
const clientGiuseppe = new MongoClientGiuseppe(uriGiuseppe, { useNewUrlParser: true });

var economy_stats = [{}];

clientGiuseppe.connect(err => {
  economy_stats = clientGiuseppe.db("sos1819-09").collection("economy-stats"); //sos1819-09 name database and sos name of the cluster
  economyAPI.checkALL(app, BASE_PATH, economy_stats);
  console.log("Connected to economy-stats");
});

//_____________________________Listen port______________________________________



app.listen(port, () => {
    console.log('Magic is happening in port'+port);
});