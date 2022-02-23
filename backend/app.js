const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const routes = require('./routes');
const {ValidationError} = require('sequelize');

const app = express();

app.enable('trust proxy');

const {environment} = require('./config');
const isProduction = (environment === 'production');

if(!isProduction) {
    app.use(cors());
}

app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(express.json());
app.use(helmet({contentSecurityPolicy: false}));

app.use(function(req, res, next) {
    if (process.env.NODE_ENV !== 'development' && !req.secure) {
       return res.redirect("https://" + req.headers.host + req.url);
    }
    next();
})

app.use(csurf({
    cookie: {
        secure: isProduction,
        sameSite: isProduction && 'Lax',
        httpOnly: true
    }
}));

app.use(routes);

app.use((_req, _res, next) => {
    const err = new Error("The requested resource couldn't be found.");
    err.title = "Resource Not Found";
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404;
    next(err);
})

app.use((err, _req, _res, next) => {
    if(err instanceof ValidationError) {
        err.errors = err.errors.map(event => event.message);
        err.title = 'Validation error';
    }
    next(err);
});

app.use((err, _req, res, _next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        title: err.title || 'Server Error',
        message: err.message,
        errors: err.errors,
        stack: isProduction ? null : err.stack
    });
});

module.exports = app;