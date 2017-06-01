var express = require('express');
var mongodb = require('mongodb').MongoClient;

var adminRouter = express.Router();

    var books = [
        {
            title: "Booke One",
            genre: "Fiction",
            author: "Good Author",
            read: false
        },

        {
            title: "Booke Two",
            genre: "Fiction",
            author: "Good Author",
            read: false
        },

        {
            title: "Booke Three",
            genre: "Fiction",
            author: "Good Author",
            read: false
        }
    ];

var router = function(nav) {
    adminRouter.route('/addbooks')
        .get(function(req, res) {
            var url = 'mongodb://localhost:27017/libraryApp';

            mongodb.connect(url, function(err, db) {
                var collection = db.collection('books');
                collection.insertMany(books, function(err, results) {
                    res.send(results);
                    db.close();
                });

            });
        });

    return adminRouter;
};

module.exports = router;