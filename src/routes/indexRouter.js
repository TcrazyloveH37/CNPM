const homeRouter = require('./homeRouter');
const productsRouter = require('./productsRouter');
const profileRouter = require('./profileRouter');
const signupRouter = require('./signupRouter');
const loginRouter = require('./loginRouter');
const logoutRouter = require('./logoutRouter');
const trashRouter = require('./trashRouter');
const orderRouter = require('./orderRouter');
const productStatusRouter = require('./product-statusRouter');
const _404Router = require('./404');
const { checkUser, checkLoginSignup } = require('../app/middleware/authMiddleware');

function route(app) {

  app.get('*', checkUser);

  app.use('/products', productsRouter);

  app.use('/trash', trashRouter);

  app.use('/profile', profileRouter);

  app.use('/sign-up', signupRouter);

  app.use('/login', loginRouter);

  app.use('/logout', logoutRouter);

  app.use('/order', orderRouter);

  app.use('/product-status', productStatusRouter);

  app.use('/404', _404Router);

  app.use('/', homeRouter);
}

module.exports = route;
