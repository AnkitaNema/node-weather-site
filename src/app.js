const hbs = require('hbs')
const path = require('path')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express();
const port = process.env.PORT || 3000;

const publicDirName = path.join(__dirname, '../public')
const viewDirName = path.join(__dirname, '../templates/views');
const partialsDirName = path.join(__dirname, '../templates/partials')

app.use(express.static(publicDirName));
app.set('view engine', 'hbs');
app.set('views', viewDirName);

hbs.registerPartials(partialsDirName);

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather App',
        name: 'Ankita'
    })
})

app.get('/help', (req, res) => {
    res.render('index', {
        title: 'Help Page',
        name: 'Arpita'
    })
})

app.get('/about', (req, res) => {
    res.render('index', {
        title: 'About Page',
        name: 'Akash'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.address) {
        return res.send({
            error: 'You must enter some address'
        })
    }
    console.log(req.query.address)
    geocode(req.query.address, (error, { long, lat }) => {
        console.log(error)
        if (error) {
            debugger
            return res.send({
                error: error
            })
        }
        debugger
        forecast(lat, long, (error, response) => {
            if (error) {
                return res.send({
                    error: error
                })
            }
            res.send({
                temperature: response.temperature,
                feelslike: response.feelslike
            })
        })
    })

})

app.get('/help/*', (req, res) => {
    res.render('error',
        { error: 'Help Article not found' })
})

app.get('/*', (req, res) => {
    res.render('error', {
        error: 'My 404 Page'
    })
})

app.listen(port, () => { console.log('server is running at 3000') });