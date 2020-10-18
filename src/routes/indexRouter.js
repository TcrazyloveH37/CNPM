const homeRouter = require('./homeRouter');
const detailProductRouter = require('./detailProductRouter');
const cartRouter = require('./cartRouter');

function route(app) {
  app.use('/detailProduct', detailProductRouter);

  app.use('/cart', cartRouter);

  app.use('/', homeRouter);
}

module.exports = route;
