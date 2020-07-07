const mongoose = require('mongoose'),
	passLocMongo = require('passport-local-mongoose');
// mongoose.connect('mongodb://localhost:27017/campSite', {
// 	// pangalan or pag create sa imong database
// 	useNewUrlParser: true,
// 	useUnifiedTopology: true,
// 	useFindAndModify: false
// });

mongoose.connect(
	'mongodb+srv://zjeArr:alisaca1234@campgrounds.vilan.gcp.mongodb.net/campgrounds?retryWrites=true&w=majority',
	{
		// pangalan or pag create sa imong database
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false
	}
);

//purpose sa schema is for collections (tables). para sa imong database

//new schema for comment collection
const commentSchema = new mongoose.Schema({
	comments: String,
	date: String,
	isEdited: {
		type: Boolean,
		default: false
	},
	user: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users' //------------->>user nga nag comment sa post
		}
	]
});

//new schema for post collection
const postSchema = new mongoose.Schema({
	name: String,
	image: String,
	desc: String,
	loc: String,
	date: String,
	edited: Boolean,
	isEdited: {
		type: Boolean,
		default: false
	},
	comments: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'comments' //--------------------mga comments sa post
		}
	],
	user: [
		{
			type: mongoose.Schema.Types.ObjectId,
			ref: 'users' //---------------->user sa nag post
		}
	]
});

//new schema for user collection
const userSchema = new mongoose.Schema({
	username: String,
	password: String,
	name: String,
	email: String
});

// after schema, himo kag model (verbs sa HTTP.)

userSchema.plugin(passLocMongo);

const users = mongoose.model('users', userSchema);
const comments = mongoose.model('comments', commentSchema);
const posts = mongoose.model('posts', postSchema);

//module exports para matawag nimo siya if ever gamiton nimo siya.
module.exports = { users, posts, comments };
