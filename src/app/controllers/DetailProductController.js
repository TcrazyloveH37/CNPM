class DetailProductController {
  // [get], /detailProduct
  index(req, res) {
    res.render('detailProduct');
  }
}

module.exports = new DetailProductController();
