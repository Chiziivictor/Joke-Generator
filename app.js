const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");


const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({
  extended: true
}));

app.get("/", function(req, res) {

  res.sendFile(__dirname + "/index.html");

});

app.post("/", function(req, res) {
  const query = req.body.jokeName;

  const url = "https://v2.jokeapi.dev/joke/"+query+"?type=twopart";

  https.get(url, function(response) {
    console.log(response.statusCode);

    response.on("data", function(data) {
      const jokeData = JSON.parse(data)
      const jokeSetup = jokeData.setup
      const jokeDelivery = jokeData.delivery
      res.write("<h1>Here's your " + req.body.jokeName + " joke</h1> <br>");
      res.write("<p>"+jokeSetup+"</p>");
      res.write("<p>"+jokeDelivery+"</p>");
      res.send()
    })
  })
})



app.listen(3000, function() {
  console.log("Running on port 3000.");
})
