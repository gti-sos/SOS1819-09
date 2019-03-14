var express = require("express");

var app = express();

var port = process.env.PORT || 8080; //per usare la porta 8080

//app.use("/", express.static("/home/ubuntu/workspace/l05/public")); COSì NON VA BENE
app.use("/", express.static(__dirname + "/public")); //dirname contiene il direttorio radice dove sta il nodo

app.get("/time", (request, response) => {
    response.send(new Date());
});

//differenza tra use e get
//USE contenuto statico (per gli html, css ecc)
//GET contenuto dinamico (per i php)

app.listen(port, () => {
    console.log("Magic is happening in port" + port);
});