const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({extended: true}))

app.get("/", function(req, res){
  res.sendFile(__dirname+"/index.html");
});

app.post("/", function(req, res){
  const apiKey = "b0268dbde60ffcf3ed5c0afbeffe1df2";
  const city = req.body.cityName;
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+"&units=imperial&appid="+apiKey;
  https.get(url, function(response){
    console.log(response.statusCode);

    response.on("data", function(data){
      const weatherData = JSON.parse(data);
      const temp = weatherData.main.temp;
      const icon = weatherData.weather[0].icon;
      const imageURL = "https://openweathermap.org/img/wn/"+icon+"@2x.png";
      const feelsLike = weatherData.main.feels_like;
      console.log(feelsLike);
      res.write("<h1>The weather is "+temp+" degrees Farenheight</h1>");
      res.write("<p>Outside it feels like "+ feelsLike+" degress Farenheight</p>");
      res.write("<img src="+imageURL+">");
      res.send();
    });
  });
});


app.listen(3000, function(){
  console.log("server is running on port 3000");
});
