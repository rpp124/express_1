var express = require('express');
var chalk = require('chalk');

var app = express();

const port = process.env.PORT || 5000;
var nav = [
            { link: '/books', text: 'Books' }, 
            { link: '/authors', text: 'Authors' }
        ];
var bookRouter = require('./src/routes/bookRoute')(nav);
var adminRouter = require('./src/routes/adminRoute')(nav);

app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');


app.use("/books", bookRouter);
app.use("/admin", adminRouter);

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