var express = require('express');
var bookRouter = express.Router();

var router = function (nav) {
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
    bookRouter.route("/")
        .get(function (req, res) {
            res.render("bookList", {
                title: 'Hello from Render',
                nav: nav,
                books: books
            });
        });

    bookRouter.route("/:id")
        .get(function (req, res) {
            var id = req.params.id;
            res.render("bookView", {
                title: 'Hello from Render',
                nav: nav,
                book: books[id]
            });
        });

        return bookRouter;
}
module.exports = router;
