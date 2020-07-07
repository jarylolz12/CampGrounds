//-------------------------------------------------->>app settings/npm/declarations or mga callable na modules para mudagan ang code
const express = require('express'),
	router = express.Router(),
	campAreas = require('../models/modules'),
	middleWareObj = require('../middleware');

//------------------------------------>>Editing Camp Grounds
//------------------------------------>>get route for editing camp grounds
router.get('/campGrounds/:id/campEdit', middleWareObj.userCampAuthor, (req, res) => {
	campAreas.posts.findById(req.params.id, (err, camp) => {
		res.render('campEdit', { edits: camp });
	});
});

//------------------------------------>>update route for editing camp grounds
router.put('/campGrounds/:id/campEdit', middleWareObj.userCampAuthor, (req, res) => {
	const updtCamp = {
		name: req.body.campName,
		image: req.body.campImg,
		desc: req.body.campDesc,
		loc: req.body.campLoc,
		date: new Date().toDateString(),
		isEdited: true
	};
	// insert nimo sa query nga findByIdAndUpdate ang Object nga g buo nimo sa taas
	campAreas.posts.findByIdAndUpdate(req.params.id, updtCamp, { new: true }, (err, updt) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect(`/campGrounds/${req.params.id}`);
		}
	});
});

module.exports = router;
