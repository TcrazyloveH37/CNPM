// Dependencies
const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const path = require('path');
// My dependencies
const route = require('./routes/indexRouter');
const db = require('./config/db/index');
//----------------------------------------------------------------
const app = express();
const port = 3000;
const hbs = exphbs.create({
  layoutsDir: path.join(__dirname, 'resources/views/layouts/'),
  partialsDir: path.join(__dirname, 'resources/views/partials/'),
  defaultLayout: 'index',
});
app.use(express.static(path.join(__dirname, '/public')));
//----------------------------------------------------------------
// HTTP logger
//app.use(morgan("combined"));
//----------------------------------------------------------------
// tìm hiểu thêm, đoạn này tự hiểu là xử lý ở đoạn payload
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
//----------------------------------------------------------------
// Template engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

// Connect DB
db.connect();

// Routes init
route(app);

// Use port
app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
