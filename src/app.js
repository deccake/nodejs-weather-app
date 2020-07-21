const path = require("path");
const express = require("express");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");

const app = express();

//define path for express config
const publiDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

//setup static directory to serve
app.use(express.static(publiDirectoryPath));

//setup handlelbars engine and views location
app.set("view engine", "hbs");
app.set("views", viewsPath);
hbs.registerPartials(partialsPath);

app.get("", (req, res) => {
  res.render("index", {
    title: "Weather App",
    name: "AMol Wankhade",
  });
});

app.get("/about", (req, res) => {
  res.render("about", {
    title: "About me in details",
    name: "AMol Wankhade",
  });
});

app.get("/help", (req, res) => {
  res.render("help", {
    title: "Contact For Help",
    name: "AMol Wankhade",
  });
});

app.get("/weather", (req, res) => {
  console.log(req.query);
  if (!req.query.address) {
    return res.send({
      err: "You must  provide query",
    });
  }
  geocode(req.query.address, (err, { lat, long } = {}) => {
    if (err) {
      return res.send({ err });
    }
    forecast(lat, long, (err, { temperature, precip, weather_descriptions } = {}) => {
      if (err) {
        return res.send({ err });
      }
      res.send({ temperature, precip, weather_descriptions });
    });
  });
});

app.get("*", (req, res) => {
  res.render("404-page");
});

app.listen(3000, () => {
  console.log("Server is up on port 3000");
});
