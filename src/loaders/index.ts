var express = require('express');
var path = require('path');
var compression = require('compression');
var routes = require('../routes/index.route');
//var cookieParser = require('cookie-parser');
require('dotenv').config();
export class ExpressLoader {
    constructor() {
        const app = express();
        // Serve static content
        app.use(express.static(path.join(__dirname, "uploads")));
        // Set up middleware
        app.set('port', process.env.PORT || 8000);
        // app.use(cors());
        app.use(compression());
        app.use(express.json({ limit: '100mb' }));
        app.use(express.urlencoded({ extended: true, limit: '100mb', }));
        //app.use(cookieParser());
        app.use(express.static(path.join(__dirname, 'build')));
        // Pass app to routes
      //  routes(app);
        // Start application
        app.listen(app.get('port'), function () {
            console.log('Express server listening on port ' + app.get('port'));
        });
        

    }

}