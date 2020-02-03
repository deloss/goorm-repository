var express = require('express');
var app = express();
var mongoose = require('mongoose');
var passport = require('passport');
var LocalStrategy = require('passport-local');
var bodyParser = require('body-parser');
var passportLocalMongoose = require('passport-local-mongoose');
var User = require('./models/user')

mongoose.connect('mongodb+srv://deloss:password1234@cluster0-zimcv.mongodb.net/test?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });

passport.use(new LocalStrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(passport.initialize());
app.use(passport.session());
app.use(require('express-session')({
	secret: "Wtf is secret",
	resave: false,
	saveUninitialized: false
}))



app.get('/', (req, res) => {
	res.render('home')
})

app.get('/secret', isLoggedIn, (req, res) => {
	res.render('secret')
})

app.get('/signup', (req, res) => {
	res.render('signup')
});

app.post('/signup', (req, res) => {
	console.log(req.body)
	User.register(new User({username: req.body.username}), req.body.password, (err, user) => {
		if(err) {
			console.log(err);
			res.send('There was an error');
		} else {
			passport.authenticate('local')(req, res, () => {
				res.redirect('/secret');
			})
		}
	})
})

app.get('/login', (req, res) => {
	res.render('login')
});

app.post('/login', passport.authenticate('local', {
	successRedirect: '/secret',
	failureRedirect: '/login'
}), (req, res) => {
	res.send('Hola?')
})

app.get('/logout', (req, res) => {
	req.logout();
	res.redirect('/')
})

function isLoggedIn(req, res, next) {
	if(req.isAuthenticated())
		next();
	else
		res.redirect('/login');
}

app.listen('3000', () => {
	console.log('App has started');
})