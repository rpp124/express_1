var express = require('express');
var mongodb = require('mongodb').MongoClient;
var passport = require('passport');

var authRouter = express.Router();

var router = function () {
	authRouter.route('/signup')
		.post(function (req, res) {
			var url = 'mongodb://localhost:27017/libraryApp';
			mongodb.connect(url, function (err, db) {
				var collection = db.collection('users');
				var user = {
					username: req.body.username,
					password: req.body.password
				};

				collection.insert(user, function (err, results) {
					req.login(results.ops[0], function () {
						res.redirect('/auth/profile');
					});
				});
			});

			console.log(req.body);

		});
	authRouter.route('/signin')
		.post(passport.authenticate('local', {
			failureRedirect: '/'			
		}), function(req, res) {
			res.redirect('/auth/profile');
		})
	authRouter.route('/profile')
		.all(function(req, res, next) {
			if(!req.user) {
				res.redirect('/');
			}
			next();
		})
		.get(function (req, res) {
			res.send('Logged in as '+req.user.username);
		})

	return authRouter;
};

module.exports = router;
