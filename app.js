const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const database = require('./db');
const app = express();

//Importera Routes
const productRoutes = require('./api/routes/products');
const orderRoutes = require('./api/routes/orders');

//Status koder och BodyParser
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

//CORS-felhantering
app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Headers', '*');
    if(req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELETE, GET')
        return res.status(200).json({});
    }
    next();
});

//Routes
app.use(express.static('public'));
app.use('/products', productRoutes);
app.use('/orders', orderRoutes);

// Felkodshantering
app.use((req, res, next) => {
    const error = new Error('Not found!');
    error.status = 404;
    next(error);
});

app.use((error, req, res, next) => {
    res.status(error.status || 500);
    res.json({
        error: {
            message: error.message
        }
    });
});

module.exports = app;