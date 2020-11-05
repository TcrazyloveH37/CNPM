class LoginController {
    // [get], /detailProduct
    index(req, res) {
        res.render('login');
    }
}

module.exports = new LoginController();