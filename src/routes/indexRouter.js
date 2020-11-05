const homeRouter = require('./homeRouter');
const detailProductRouter = require('./detailProductRouter');
const cartRouter = require('./cartRouter');
const loginRouter = require('./loginRouter');

function route(app) {

  app.use('/login', loginRouter);

  app.use('/detailProduct', detailProductRouter);

  app.use('/cart', cartRouter);

  app.use('/', homeRouter);
}

module.exports = route;
