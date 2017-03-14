import express from "express";
import md5 from "md5";
let router = express.Router();

let isAuthenticated = (req, res, next) => {
	if (req.isAuthenticated())
		return next();
	res.redirect('/');
};

module.exports = (passport, config) => {

	router.get('/', (req, res) => {
		res.render('index', { message: res.message });
	});

	router.post('/login', passport.authenticate('login', {
		failureRedirect: '/',
	}),function(req, res) {
    res.redirect(config.backendUrl + "/" + req.user.username + "/" + md5(req.user.password));
  });

	router.get('/signup', (req, res) => {
		res.render('register',{message: res.message});
	});

	router.post('/signup', passport.authenticate('signup', {
		successRedirect: config.backendUrl,
		failureRedirect: '/signup',
	}));

	/*router.get(config.backendUrl, isAuthenticated, (req, res) => {
		res.render('home', { user: req.user });
	});*/

	router.get('/signout', (req, res) => {
		req.logout();
		res.redirect('/');
	});

	return router;
}
