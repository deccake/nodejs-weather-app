const request = require("request");

const forecast = (lat, long, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=eae6fef94f3148e881afccbc35a8d4bb&query=${lat},${long}&units=f`;
  request({ url, json: true }, (err, res) => {
    if (err) {
      callback("Something went wrong!");
    } else if (res.body.error) {
      callback("Unable to find loaction");
    } else {
      const data = res.body;

      callback(undefined, data.current);
    }
  });
};

module.exports = forecast;
