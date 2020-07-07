//-------------------------------------------------->>app settings/npm/declarations or mga callable na modules para mudagan ang code

const express = require('express'),
	router = express.Router(),
	campAreas = require('../models/modules'),
	passport = require('passport');

//---------------------------------->>Index/Landing Page

router.get('/', (req, res) => {
	res.render('index');
});

//------------------------------------->>Registration Route

router.get('/reg', (req, res) => {
	res.render('register');
});

router.post('/reg', (req, res) => {
	campAreas.users.register(
		campAreas.users({ name: req.body.nickName, email: req.body.useEmail, username: req.body.useName }),
		req.body.usePass,
		(err, user) => {
			if (err) {
				return res.render('register');
			}
			campAreas.users.authenticate('local')(req, res, () => {
				res.redirect('/login');
			});
		}
	);
});

//-------------------------------------->>Login Route

router.get('/login', (req, res) => {
	res.render('login');
});

router.post(
	'/login',
	passport.authenticate('local', {
		successRedirect: '/campGrounds',
		failureRedirect: '/login'
	}),
	(req, res) => {}
);

//------------------------------------->> LogOut Route
router.get('/logout', (req, res) => {
	req.logOut();
	res.redirect('/');
});

module.exports = router;
