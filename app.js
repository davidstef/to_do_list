const express = require('express');
const app = express();
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser');
const path = require('path');
const VIEWS_PATH = path.join(__dirname, '/views');
const session = require('express-session');
const dashboardRoutes = require('./routes/dashboard')
const indexRoutes = require('./routes/index')
const initRoutes = require('./routes/init')
const checkAuthorization = require('./utils/authorization')
const { PORT, SESSION_SECRET } = require('./config')
const CONNECTION_STRING = "postgres://postgres:postgres@localhost:5432/todolistdb"

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: false
}))

app.engine('mustache', mustacheExpress(VIEWS_PATH + '/partials', '.mustache'));
app.set('views', VIEWS_PATH);
app.set('view engine', 'mustache');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static('public'))

app.use((req,res,next) => {
    res.locals.authenticated = req.session.user == null ? false : true
    next()
})

//setup routes:
app.use('/', initRoutes)
app.use('/', indexRoutes)
app.use('/dashboard', checkAuthorization, dashboardRoutes)

app.listen(PORT, () => {
    console.log(`server has started on ${PORT}...`)
})
