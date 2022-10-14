require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');

const routes = require('./routes');
const cors = require('./services/cors.service');

const app = express();

app.use(cors);
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

app.use('/', (req, res, next) => {
    return res.status(200).send({ success:true });
});

app.set('port', (process.env.PORT || 3000));

const server = app.listen(app.get('port'), function () {
    console.log(`portfolio app is running on port ${app.get('port')} :: localhost:${app.get('port')}`);
});

module.exports = app;
