//-------------------------------------------------->>app settings/npm/declarations or mga callable na modules para mudagan ang code

const express = require('express'),
	router = express.Router(),
	campAreas = require('../models/modules'),
	middleWareObj = require('../middleware');

//---------------------------------->>Post or add ug New CampGround
//---------------------------------->>Get Route for New CampGround
router.get('/campGrounds/new', middleWareObj.isLogged, (req, res) => {
	res.render('newCamp');
});

//---------------------------------->>Post/adding Route para sa CampGround
router.post('/campGrounds/getCamp', (req, res) => {
	campAreas.posts.create(
		{
			name: req.body.campName,
			image: req.body.campImg,
			desc: req.body.campDesc,
			loc: req.body.campLoc,
			date: new Date().toDateString()
		},
		(err, camp) => {
			if (err) {
				console.log(err);
			} else {
				camp.user.push(req.user);
				camp.save((err, data) => {});
			}
			res.redirect('/campGrounds');
		}
	);
});

module.exports = router;
