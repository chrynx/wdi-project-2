const express = require('express');
const app = express();
const { port, dbURI, secret } = require('./config/environment');
const expressLayouts  = require('express-ejs-layouts');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const session = require('express-session');
const flash = require('express-flash');
const userAuth = require('./lib/userAuth');

const mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
mongoose.connect(dbURI, { useMongoClient: true });

const routes = require('./config/routes');
//settings
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
//middleware
app.use(express.static(`${__dirname}/public`));
app.use(expressLayouts);
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride(req => {
  if(req.body && typeof req.body === 'object' && '_method' in req.body) {
    const method = req.body._method;
    delete req.body._method;
    return method;
  }
}));
app.use(session({
  secret: secret,
  resave: false,
  saveUninitialized: false
}));
app.use(flash());
app.use(userAuth);
// ======================================================================
app.use(routes);

app.listen(port, () => console.log(`Express is listening on port ${port}`));
