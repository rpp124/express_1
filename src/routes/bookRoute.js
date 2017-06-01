var express = require('express');
var mongodb = require('mongodb').MongoClient;

var bookRouter = express.Router();

var router = function (nav) {

    bookRouter.route("/")
        .get(function (req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(
                    function (err, results) {
                        res.render("bookList", {
                            title: 'Hello from Render',
                            nav: nav,
                            books: results
                        });
                    }
                );

            });
        });

    bookRouter.route("/:id")
        .get(function (req, res) {
            var id = req.params.id;
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function (err, db) {
                var collection = db.collection('books');
                collection.find({}).toArray(
                    function (err, results) {
                        res.render("bookView", {
                            title: 'Hello from Render',
                            nav: nav,
                            books: results
                        });
                    }
                );

            });
        });

    return bookRouter;
}
module.exports = router;
