const homeRouter = require('./homeRouter');
const cartRouter = require('./cartRouter');
const signUpRouter = require('./signUpRouter');

function route(app) {

  app.use('/signUp', signUpRouter);

  app.use('/cart', cartRouter);

  app.use('/', homeRouter);
}

module.exports = route;
