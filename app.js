var express = require('express');
var exphbs  = require('express-handlebars');
var port = process.env.PORT || 3000

var app = express();
var bodyParser = require('body-parser')

var mp = require('./mp');

app.engine('handlebars', exphbs());
app.set('view engine', 'handlebars');
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(express.json()) // for parsing application/json

app.use(express.static('assets'));
 
app.use('/assets', express.static(__dirname + '/assets'));

app.get('/', function (req, res) {
    res.render('home');
});

app.get('/detail', function (req, res) {
    res.render('detail', req.query);
});

app.post('/pay', async function (req, res) {
    let checkoutUrl = await mp.checkoutUrl(req.body, req.get('origin'));
    res.redirect(checkoutUrl);
});

app.get('/success', function (req, res) {
    res.render('success', req.query);
});

app.get('/pending', function (req, res) {
    res.render('pending', req.query);
});

app.get('/failure', function (req, res) {
    res.render('failure', req.query);
});

app.post('/notifications', function (req, res) {
    console.log(JSON.stringify(req.body))
    res.sendStatus(200);
});

app.listen(port);