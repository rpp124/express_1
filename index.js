var express = require('express');
var chalk = require('chalk');
var bodyParser = require('body-parser');
var cookieParse = require('cookie-parser');
var passport = require('passport');
var session = require('express-session');

var app = express();

const port = process.env.PORT || 5000;
var nav = [
            { link: '/books', text: 'Books' }, 
            { link: '/authors', text: 'Authors' }
        ];
var bookRouter = require('./src/routes/bookRoute')(nav);
var adminRouter = require('./src/routes/adminRoute')(nav);
var authRouter = require('./src/routes/authRoutes')(nav);

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded());
app.use(cookieParse());
app.use(session({secret: 'library'}));

require('./src/config/passport')(app);

app.set('views', './src/views');

app.set('view engine', 'ejs');

app.use("/books", bookRouter);
app.use("/admin", adminRouter);
app.use("/auth", authRouter);

app.get("/", function (req, res) {
    res.render('index', {
        title: 'Hello from Render',
        nav: nav
    });
});

app.listen(port, function (err) {
    if (err) {
        console.log(chalk.red(err));
    }

    console.log(chalk.green("Server listening on port: " + port));
});
