var express = require('express');
var chalk = require('chalk');

var app = express();

const port = process.env.PORT || 5000;
app.use(express.static('public'));
app.set('views', './src/views');

app.set('view engine', 'ejs');

app.get("/", function(req, res) {
    res.render('index', {title: 'Hello from Render', list:['a', 'b', 'c']});
});

app.listen(port, function(err) {
    if(err) {
        console.log(chalk.red(err));
    }

    console.log(chalk.green("Server listening on port: "+port));
});