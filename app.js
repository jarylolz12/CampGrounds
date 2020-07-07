//-------------------------------------------->>Tools/declarations or mga dependecies(npm) na gigamit sa imong app.

const express = require('express'),
	parser = require('body-parser'),
	mongos = require('mongoose'),
	campAreas = require('./models/modules'),
	passport = require('passport'),
	passStrat = require('passport-local').Strategy,
	methOverride = require('method-override'),
	session = require('express-session');

//--------------------------------------------->>Routers/Models para sa route methods

const indexRoutes = require('./routes/campIndex'),
	campRoutes = require('./routes/campGrounds'),
	campNewRoutes = require('./routes/campGroundsNew'),
	campEditRoutes = require('./routes/campGroundsEdit'),
	campDelRoutes = require('./routes/campGroundsDelete');

//--------------------------------------------->>App settings

mongos.set('useCreateIndex', true);
app = express();
app.set('view engine', 'ejs');
app.use('/public', express.static('public'));
app.use(parser.urlencoded({ extended: true }));
app.use(methOverride('_method'));

app.use(
	session({
		secret: 'gibberish babies',
		resave: false,
		saveUninitialized: false
	})
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser(campAreas.users.serializeUser());
passport.deserializeUser(campAreas.users.deserializeUser());
passport.use(new passStrat(campAreas.users.authenticate()));

//---------------------------------------------->>setting siya para makita ang user na nakalogin globally

app.use((req, res, next) => {
	res.locals.isWhoAmI = req.user;
	return next();
});

//--------------------------------------------------------------------pag call sa mmga Routers/Models functionality sa imong website nga g decalre sa taas or module routes
app.use(indexRoutes);
app.use(campNewRoutes);
app.use(campRoutes);
app.use(campEditRoutes);
app.use(campDelRoutes);

//--------------------------------------------------------------------Others pag mali imo page na g acess, dire ka i redirect
app.get('*', (req, res) => {
	res.send('The page you try to access is not possible. What is wrong with you?');
});

//--------------------------------------------------------------------pag start sa server (localhost)

// app.listen('3000', () => {
// 	hostname = '127.0.0.1';
// 	port = 3000;
// 	console.log(`YelpCamp running at http://${hostname}:${port}/`);
// });

app.listen(process.env.PORT, process.env.IP, () => {
	console.log('Started');
});
