const homeRouter = require('./homeRouter');
const productsRouter = require('./productsRouter');
const profileRouter = require('./profileRouter');
const signupRouter = require('./signupRouter');
const loginRouter = require('./loginRouter');
const logoutRouter = require('./logoutRouter');
const { requireAuth, checkUser } = require('../app/middleware/authMiddleware');

function route(app) {

  app.get('*', checkUser);

  app.use('/products', productsRouter);

  app.use('/profile', profileRouter);

  app.use('/sign-up', signupRouter);

  app.use('/login', loginRouter);

  app.use('/logout', logoutRouter);

  app.use('/', homeRouter);
}

module.exports = route;
