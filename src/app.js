const path = require('path');
const express = require('express');
const { isAbsolute } = require('path');
const hbs = require('hbs');

const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');

const app = express();

// Define paths for Express config
publicPath = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialPath = path.join(__dirname, '../templates/partials');

// Setup handlebars engine and views path
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialPath);

// setup static directory
app.use(express.static(publicPath));

app.get('', (req, res) => {
  res.render('index', {
    title: 'Weather App',
    name: 'Bob Creigh',
  });
});

app.get('/about', (req, res) => {
  res.render('about', {
    title: 'About',
    name: 'Bob Creigh',
  });
});

app.get('/help', (req, res) => {
  res.render('help', {
    title: 'Help',
    message: 'What is the airspeed velocity of a laden swallow?',
    name: 'Bob Creigh',
  });
});

app.get('/weather', (req, res) => {
  if (!req.query.address) {
    return res.send({
      error: 'You must provide an address query string',
    });
  } else {
    geocode(req.query.address, (error, { lat, lon, location } = {}) => {
      if (error) {
        return res.send({ error });
      }
      forecast(lat, lon, (error, wxdata) => {
        if (error) {
          return res.send({ error });
        }
        res.send({
          forecast: wxdata,
          location,
          address: req.query.address,
        });
      });
    });
  }
});

app.get('/products', (req, res) => {
  if (!req.query.search) {
    return res.send({
      error: 'You must provide a search term',
    });
  }
  console.log(req.query.search);
  res.send({
    products: [],
  });
});

app.get('/help/*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    message: 'Help article not found',
    name: 'Bob Creigh',
  });
});

app.get('*', (req, res) => {
  res.render('404', {
    title: '404 Error',
    message: 'Page not found',
    name: 'Bob Creigh',
  });
});

app.listen(3000, () => {
  console.log('App listening on port 3000!');
});
