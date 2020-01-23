var express = require('express');
var app = express();
var bodyParser = require('body-parser');

var friendList = ["Santi", "Itnas", "Asnti"];

app.use(bodyParser.urlencoded({extended : true}));
app.set('view engine', 'ejs');

app.get('/home', (req, res) => {
	res.render('home');
});

app.get('/friends', (req, res) => {
	res.render('friends', {friends : friendList});
});

app.get('/addFriend', (req, res) => {
	res.send('This is the route to add a friend');
})

app.post('/addFriend', (req, res) => {
	var newFriend = req.body.friend;
	friendList.push(newFriend)
	res.redirect('/friends');
})

app.listen(3000, function() {
	console.log("Server listening on 3000");
});

