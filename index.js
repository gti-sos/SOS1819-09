var express = require("express");
var bodyParser = require("body-parser");


var app = express();
app.use(bodyParser.json());
var port = process.env.PORT || 8080;

var contacts =  [{
    name: "peter",
    phone: "123456",
    email: "peter@peter.com"
},{
    name: "paul",
    phone: "3333",
    email: "paul@paul.com"
}];

//GET /contacts/

app.get("/contacts", (req,res) => {
   res.send(contacts); 
    
});

//POST /contacts/
//DELETE /contacts/
//GET /contacts/peter
//

app.listen(port, () => {
console.log("superserver ready on port " + port);
});

// https://gist.github.com/pafmon