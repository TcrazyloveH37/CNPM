const User = require('../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');
const bcrypt = require('bcrypt');


class ProfileController {
    // [get], /:id
    index(req, res, next) {
        User.findById({ _id: req.params.id })
            .then((user) =>
                res.render('profile/id', {
                    profile: mongooseToObject(user), style: ['profile.css'], js: ['profile.js']
                }))
            .catch(next);
    }


    updateProfile = async (req, res) => {

        try {
            const salt = await bcrypt.genSalt();
            req.body.password = await bcrypt.hash(req.body.password, salt);
            const user = await User.updateOne({ _id: req.params.id }, req.body);
            res.redirect('/');
        } catch (err) {
            console.log(err);
            res.status(400).json({ err });
        }
    };
}

module.exports = new ProfileController();
