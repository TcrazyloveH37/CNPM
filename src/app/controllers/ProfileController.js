const Account = require('../models/Account');
const { multipleMongooseToObject } = require('../../util/mongoose');

class ProfileController {
    // [get], /
    index(req, res, next) {
        res.render('profile/id');
    }
}

module.exports = new ProfileController();
