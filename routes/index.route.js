//const config = require('../config/index')
module.exports = app => {
    app.use(function (req, res, next) {
        req.isAuthenticated = function () {
            var token = req.headers.authorization && req.headers.authorization.split(' ')[1];
            try {
           //     return jwt.verify(token, config.TOKEN_SECRET);
            } catch (err) {
                return false;
            }
        };
        var payload = req.isAuthenticated();
        if (payload) {
            req.payload = payload;
            if (payload.sub.userId) {
              
            }else{
                next();
            }
           
        } else {
            req.payload = undefined;
            next();
        }
    });
   // app.use('/api/', );
    
    

}