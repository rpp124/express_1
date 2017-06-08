var mongodb = require('mongodb').MongoClient;
var objectId = require('mongodb').ObjectID;

var bookController = function (bookService, nav) {
	var middleware = function (req, res, next) {
		if (!req.user) {
			res.redirect('/');
		} else {
			next();
		}
	};
	var getIndex = function (req, res) {
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
	};

	var getById = function (req, res) {
		var id = new objectId(req.params.id);
		var url = 'mongodb://localhost:27017/libraryApp';

		mongodb.connect(url, function (err, db) {
			var collection = db.collection('books');
			collection.findOne({ _id: id }, function (err, results) {
				bookService.getBookById(results.booKId, function (err, book) {
					results.book = book;
					res.render("bookView", {
						title: 'Hello from Render',
						nav: nav,
						book: results
					});
				});


			})


		});
	}

	return {
		getIndex: getIndex,
		getById: getById,
		middleware: middleware
	}

};

module.exports = bookController;
