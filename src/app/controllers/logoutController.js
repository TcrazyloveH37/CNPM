const { multipleMongooseToObject } = require('../../util/mongoose');

class LogoutController {
    // [get], /logout

    index(req, res, next) {
        res.cookie('jwt', '', { maxAge: 1 });
        res.redirect('/');
    }

}

module.exports = new LogoutController();
