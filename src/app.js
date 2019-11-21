const path = require('path');
const express = require('express');
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express();

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partials");

// Setup handlebars engine and views location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// Setup static directory to server
app.use(express.static(publicDirectoryPath));

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: "David McCulloch"
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: "About Me",
        name: "David McCulloch"
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: "Help",
        name: "David McCulloch",
        helpText: "Sample Text",

    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: "You must provide an address"
        })
    }

    geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if (error) {
            return res.send({ error })
        }
        
        forecast(latitude, longitude, (error, forecastData) => {
            if (error) {
                return res.send({ error })
            }
            
            res.send({
                location,
                forecast: forecastData,
                address: req.query.address
            })
        })
    })

    
})

app.get('/products', (req, res) => {
    if(!req.query.search) {
        return res.send({
            error: 'You must provide a search term'
        })
    }
    
    res.send({
        products: [req.query.search]
    })
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: "404",
        errorMessage: 'Help article not found',
        name: 'David McCulloch'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: "Page not found",
        name: 'David McCulloch'
    })

})

app.listen(3000, () => {
    console.log('Server is up on port 3000!')
})






