var express = require('express');
var app = express();
var request = require('request');
var bodyParser = require('body-parser');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended : true}));

app.listen(3000, '0.0.0.0', () => {
	console.log('Server listening on 3000');
});

app.get('/results', (req, res) => {
	var season = req.query.season
	if(!req.query.season) {
		season = 1;
		console.log("Season get parameter not found");
	}
	request(`http://omdbapi.com/?t=Game%20of%20Thrones&Season=${season}&apikey=f8ad656`, function(error, response, body) {
		if(error) {
			console.log('There was an error');
			res.send("error");
		} else {
			console.log('request successfully made');
			var resBody = JSON.parse(body);
			res.render('results', {resBody});
			//res.send("hola");
		}
	})
	
})