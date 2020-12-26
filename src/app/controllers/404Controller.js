class HomeController {
  // [get], /
  index(req, res, next) {
    res.render('404', { style: ['404.css'] });
  }
}

module.exports = new HomeController();
