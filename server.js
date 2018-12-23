const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const bodyParser = require('body-parser');
const db = require('./data/snkrus-db');
const mainroutes = require('./routes/index.js');
const paypal = require('paypal-rest-sdk');
require('dotenv').config('../.env');
const payment = require('./routes/payment');






app.use(bodyParser.urlencoded({
    extended: true
}))
// parse application/json
app.use(bodyParser.json())

app.set('view engine', 'ejs');

app.use(express.static(__dirname + '/public'));



mainroutes(app);
payment(app);

app.listen(port, () => console.log(`listening on port: ${port}`))

module.exports = app;