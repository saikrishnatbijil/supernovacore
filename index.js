const express = require("express");
const app = express();
const PORT = 8080;
// setup dotenv
require("dotenv").config();
// setup axios
const axois = require("axios");
const { default: axios } = require("axios");
// setup openweathermap
let apiKey = process.env.OPENWEATHERMAP_API_KEY;
// setup cors
const cors = require("cors");
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!, Welcome to the core");
});

app.get("/weather", (req, res) => {
  let lat = req.query.lat;
  let lon = req.query.lon;
  let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&lat=${lat}&lon=${lon}&appid=${apiKey}`;
  // let url = `https://api.openweathermap.org/data/2.5/weather?units=metric&q=kochi&appid=${apiKey}`;
  axios
    .get(url)
    .then((response) => {
      console.log(response.data);
      const sunriseDate = new Date(response.data.sys.sunrise * 1000);
      const sunsetDate = new Date(response.data.sys.sunset * 1000);
      const formattedSunriseTime = sunriseDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });
      const formattedSunsetTime = sunsetDate.toLocaleString("en-US", {
        hour: "numeric",
        minute: "numeric",
        hour12: true,
      });

      res.send({
        temp: Math.round(response.data.main.temp).toString(),
        humidity: response.data.main.humidity.toString(),
        description: response.data.weather[0].description,
        feels_like: Math.round(response.data.main.feels_like).toString(),
        sunrise: formattedSunriseTime,
        sunset: formattedSunsetTime,
        name: response.data.name,
        lowest: Math.round(response.data.main.temp_min).toString(),
        highest: Math.round(response.data.main.temp_max).toString(),
      });
    })
    .catch((error) => {
      console.log("Error while blasting ::: " + error);
      res.sendStatus(404)
    });
});

app.listen(PORT, () => {
  console.log(`Supernovacore has started spining`);
});
