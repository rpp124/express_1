var express = require('express');
var mongodb = require('mongodb').MongoClient;

var adminRouter = express.Router();

    var books = [
        {
            title: "The Way Of Kings",
            genre: "Fiction",
            author: "Brandon Sanderson",
            read: false
        },

        {
            title: "Words of Radiance",
            genre: "Fiction",
            author: "Brandon Sanderson",
            read: false
        },

        {
            title: "Warbreaker",
            genre: "Fiction",
            author: "Brandon Sanderson",
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
