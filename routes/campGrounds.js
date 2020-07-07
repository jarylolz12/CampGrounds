//-------------------------------------------------->>app settings/npm/declarations or mga callable na modules para mudagan ang code
const express = require('express'),
	router = express.Router(),
	campAreas = require('../models/modules'),
	middleWareObj = require('../middleware');

//-------------------------------------------------->>Get Route for CampGound Page
router.get('/campGrounds', (req, res) => {
	campAreas.posts.find({}, (err, camps) => {
		if (err) {
			console.log(err);
		} else {
			res.render('campGrounds', { camps: camps, isWhoAmI: req.user });
		}
	});
});

//-------------------------------------------------->>Get Route for Campground Details
router.get('/campGrounds/:id', (req, res) => {
	campAreas.posts
		.findById(req.params.id)
		.populate('user')
		.populate('comments')
		.populate({ path: 'comments', populate: { path: 'user' } })
		.exec((err, campRes) => {
			if (err) {
				console.log(err);
			} else {
				res.render('campDetails', { results: campRes });
			}
		});
});

//------------------------------------------------>>Post ROute for Campground Adding Comments
router.post('/campGrounds/:id/getComments', middleWareObj.isLogged, (reqs, res) => {
	campAreas.posts.findById(reqs.params.id, (err, campo) => {
		campAreas.comments.create(
			{
				comments: reqs.body.campComment,
				date: new Date().toDateString()
			},
			(err, comment) => {
				comment.user.push(reqs.user);
				comment.save((err, user) => {});

				campo.comments.push(comment);
				campo.save((err, data) => {});
				res.redirect(`/campGrounds/${reqs.params.id}`);
			}
		);
	});
});

//------------------------------------------------>>Put route/Update Campground editing Comments
router.put('/campGrounds/:id/editComments/:commentId', middleWareObj.isLogged, (req, res) => {
	const updtComment = {
		comments: req.body.campCommentUpdt,
		date: new Date().toDateString(),
		isEdited: true
	};
	campAreas.comments.findByIdAndUpdate(req.params.commentId, updtComment, { new: true }, (err, updty) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect(`/campGrounds/${req.params.id}`);
		}
	});
});

//------------------------------------------------>>Delete Route for Campground deleting Comments

router.delete('/campGrounds/:id/delComments/:commentId', middleWareObj.userCommentAuthor, (req, res) => {
	campAreas.comments.findByIdAndRemove(req.params.commentId, (err, del) => {
		if (err) {
			console.log(err);
		} else {
			res.redirect(`/campGrounds/${req.params.id}`);
		}
	});
});

module.exports = router;
