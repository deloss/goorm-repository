var express = require('express');
var app = express();


app.get("/", (req, res) => {
	res.send("Hello World!")
});

app.get("/logout", (req, res) => {
	res.send("Goodbye!")
});

app.get("/:name", (req, res) => {
	res.send(req.params["name"]);
})

app.listen(3000, () => {
	console.log('Server listening on 3000');
});