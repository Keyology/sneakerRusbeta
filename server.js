const express = require('express');
const app = express()
const port = process.env.PORT || 5000;
const mainroutes = require('./routes/index.js');


app.use(express.static(__dirname + '/public'));

app.set('view engine', 'ejs');

require('./data/snkrus-db');

mainroutes(app);

app.listen(port, () => console.log(`listening on port: ${port}`))

module.exports = app;