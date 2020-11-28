const User = require('../models/User');
const { multipleMongooseToObject, mongooseToObject } = require('../../util/mongoose');

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

    updateProfile(req, res, next) {

        // console.log(req.body);
        // User.findById({ _id: req.params.id })
        //     .then((user) => {
        //         let query = { $set: {} };
        //         for (let key in req.body)
        //             if (user[key] && req.body[key] &&user[key] !== req.body[key])
        //                 query.$set[key] = req.body[key];
        //         console.log(query);
        //         try {
        //             User.updateOne({ _id: req.params.id }, query)
        //                 .then(() => res.redirect('/profile/' + user._id));
        //         }
        //         catch (err) {
        //             console.log(err);
        //         }

        //     })
        //     .catch(next);
    }
}

module.exports = new ProfileController();
