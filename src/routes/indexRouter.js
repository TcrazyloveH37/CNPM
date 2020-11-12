const homeRouter = require('./homeRouter');
const productsRouter = require('./productsRouter');
const profileRouter = require('./profileRouter');

function route(app) {

  app.use('/products', productsRouter);

  app.use('/profile', profileRouter);

  app.use('/', homeRouter);
  
}

module.exports = route;
