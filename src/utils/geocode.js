const request = require("request");

const geocode = (address, callback) => {
  const url= `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=pk.eyJ1Ijoicm9ja3kxMjM0IiwiYSI6ImNrY3NzZnF2djBhMGkycXBkZG1pNGZpYzQifQ.qb4HoWBu5YSfb-DicNlZeQ&limit=1`;
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("something went wrong!");
    } else if (res.body.features.length === 0) {
      callback("Unable to find location!");
    } else {
        const data = {
            lat: res.body.features[0].center[1],
            long:res.body.features[0].center[0]
        }
      callback(undefined, data);
    }
  });
};

module.exports = geocode;
