const campAreas = require('../models/modules'); //---------------i require ang mga modules sa dabase like schema etc.

const middleWareObj = {}; //-------------pag declare ug object kay d na niya ma recognize pag imo tawagon ang mga object below.

//--------------------------------------------->>Middleware Modules
//--------------------------------------------->>author Comment authorization

//declare kag callable nga object, tan awa ang (req.isAuthenticated) kay dha nimo mahiba.an kung naka log in ang user or wala. i query nimo ang gusto nimo i ipa authorize nga data sa dabatabse.
//nya gamit kag conditionals para ma check niya ang user sa nag post ug ang current user na nakalogin is same lang ba. ug kung same sila, i authorize nimo ang previlidge niya, otherwise,
//i deny niya iyang request or permission.

middleWareObj.userCommentAuthor = function(req, res, next) {
	if (req.isAuthenticated()) {
		campAreas.comments.findById(req.params.commentId, (err, comment) => {
			if (err) {
				res.redirect('back');
			} else {
				if (comment.user[0].equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
};

//--------------------------------------------->>User Authentication
middleWareObj.isLogged = function(req, res, next) {
	if (req.isAuthenticated()) {
		return next();
	}
	res.redirect('/login');
};

//--------------------------------------------->>author Camp authorization
middleWareObj.userCampAuthor = function(req, res, next) {
	if (req.isAuthenticated()) {
		campAreas.posts.findById(req.params.id, (err, camp) => {
			if (err) {
				res.redirect('back');
			} else {
				if (camp.user[0].equals(req.user._id)) {
					next();
				} else {
					res.redirect('back');
				}
			}
		});
	} else {
		res.redirect('back');
	}
};

module.exports = middleWareObj;
