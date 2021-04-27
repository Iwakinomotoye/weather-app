const path = require('path');

const express = require('express');
const hbs = require('hbs');

const forecast = require('./utils/forecast');
const geocode = require('./utils/geocode');

const app = express();
const port = process.env.PORT || 4000;

// for express to serve up the content of a directory, we give it the path to the public folder
// and it must be an absolute path from the root of our machine.

// console.log(__dirname);
// console.log(__filename);

// Define paths for express configuration.
const publicDir = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

// Setup express view engine to use handlebars and setup view location.
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup public directory to serve.
app.use(express.static(publicDir));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Omotoye Iwakin'
    });
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Omotoye Iwakin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        message: 'If you need any help, send a message to iwakinomotoye@gmail.com',
        name: 'Omotoye Iwakin'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address || req.query.address.length === 0) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, place } = {}) => {
        if (error) {
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecast) => {
            if (error) {
                return res.send({
                    error: error
                })
            }

            res.send({
                forecast,
                location: place,
                address: req.query.address
            })
        })
    });
})

app.get('/products', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    res.send({
        product: []
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Omotoye Iwakin',
        errorMessage: 'Help article not found'
    });
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        name: 'Omotoye Iwakin',
        errorMessage: 'Page not found'
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
})