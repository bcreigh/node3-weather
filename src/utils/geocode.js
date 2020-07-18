const request = require('request');

const geocode = (address, callback) => {
  const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${encodeURIComponent(
    address
  )}.json?access_token=pk.eyJ1IjoiYmNyZWlnaCIsImEiOiJja2J6OWlzNXcwajhnMnlsbWdjNXh6N2lmIn0.eRSU7FE3mlNZ8sudffPoJw&limit=1`;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback('Unable to connect to geocode service', undefined);
    } else if (body.features.length === 0) {
      callback('unable to find location', undefined);
    } else {
      callback(undefined, {
        lat: body.features[0].center[1],
        lon: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
