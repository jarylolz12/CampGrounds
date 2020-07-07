//-------------------------------------------------->>app settings/npm/declarations or mga callable na modules para mudagan ang code
const express = require('express'),
	router = express.Router(),
	campAreas = require('../models/modules'),
	middleWareObj = require('../middleware');

//---------------------------->>Deleteing CampGrounds

router.delete('/campGrounds/:id', middleWareObj.userCampAuthor, (req, res) => {
	campAreas.posts.findByIdAndRemove(req.params.id, (err, del) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect('/campGrounds');
		}
	});
});

module.exports = router;
