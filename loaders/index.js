var express = require('express');
var path = require('path');
var logger = require('morgan');
var compression = require('compression');
var routes = require('../routes/index.route');
//var cookieParser = require('cookie-parser');
require('dotenv').config();
class ExpressLoader {
    constructor() {
        const app = express();

        // Setup error handling, this must be after all other middleware
        app.use(ExpressLoader.errorHandler);

        // Serve static content
        app.use(express.static(path.join(__dirname, "uploads")));

        // Set up middleware
        app.set('port', process.env.PORT || 8000);
        // app.use(cors());
        app.use(compression());
        app.use(logger('dev'));
        app.use(express.json({ limit: '100mb' }));
        app.use(express.urlencoded({ extended: true, limit: '100mb', }));
        //app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'build')));
        var allowCrossDomain = function (req, res, next) {
            res.header('Access-Control-Allow-Origin', '*');
            res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
            res.header(
                'Access-Control-Allow-Headers',
                'Content-Type, Authorization, Content-Length, X-Requested-With'
            );
            // intercept OPTIONS method
            if ('OPTIONS' == req.method) {
                res.sendStatus(200);
            } else {
                next();
            }
        };

        app.use(allowCrossDomain);
        // Pass app to routes
        routes(app);
        // Start application
        this.server = app.listen(app.get('port'), function () {
            console.log('Express server listening on port ' + app.get('port'));
        });
        process.on('uncaughtException', function (err) {
            console.error(err.stack);
            //console.error(err.stack());
            console.log("Node NOT Exiting...");
        });

    }
    getServer() {
        return this.server;
    }
    static errorHandler(error, req, res, next) {
        let parsedError;

        // Attempt to gracefully parse error object
        try {
            if (error && typeof error === "object") {
                parsedError = JSON.stringify(error);
            } else {
                parsedError = error;
            }
        } catch (e) {
            logger.error(e);
        }

        // Log the original error
        logger.error(parsedError);
        // If response is already sent, don't attempt to respond to client
        if (res.headersSent) {
            return next(error);
        }

        res.status(400).json({
            success: false,
            error
        });
    }
}
module.exports = ExpressLoader;