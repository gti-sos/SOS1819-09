var express = require("express");
var path = require("path");

var app = express();
var port = process.env.PORT || 8080;

app.use('/',express.static( path.join(__dirname,"public")));

app.get('/hello',(req,res) => {
    res.send("Hello");
});

app.listen(port, () => {
    console.log('Magic is happening in port'+port)
});