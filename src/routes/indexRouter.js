const homeRouter = require('./homeRouter');
const productsRouter = require('./productsRouter');

function route(app) {

  app.use('/products', productsRouter);

  app.use('/', homeRouter);
  
}

module.exports = route;
