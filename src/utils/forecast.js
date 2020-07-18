const request = require('request');

const forecast = (lat, lon, callback) => {
  const url = `http://api.weatherstack.com/current?access_key=1c6a0dfd90a4fa256a87d258c7b905b0&query=${lat},${lon}&units=f`;
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to weather service', undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const temp = body.current.temperature;
      const desc = body.current.weather_descriptions[0];
      callback(undefined, `It is currently ${temp}F and ${desc}.`);
    }
  });
};

module.exports = forecast;
