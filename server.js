const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const app = express();
var port = process.env.PORT || 8000;

const apiKey = '41264f7eab00cbfa89eb61ebc26f703a';

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get('/', function (req, res) {
    res.render('index', {weather: null, error: null});
});

app.get('*',function (req, res) {
    res.send("Backchodi nhi chup chap bas temperature dekh !!");
});

app.post('/', function (req, res) {
    let city = req.body.city;
    let url = `http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`

    request(url, function (err, response, body) {
        if(err){
            res.render('index', {weather: null, error: 'Error, please try again'});
        } else {
            let weather = JSON.parse(body)
            if(weather.main == undefined){
                res.render('index', {weather: null, error: 'Error, please try again'});
            } else {
                let weatherText = `It's ${weather.main.temp} degrees in ${weather.name}!`;
                res.render('index', {weather: weatherText, error: null});
            }
        }
    });
});

app.listen(port, function () {
    console.log('Example app listening on port' + port);
});