const express = require('express');
const app = express();
const mongoose = require('mongoose');
require('dotenv').config();

mongoose.connect('mongodb+srv://deloss:password1234@cluster0-zimcv.mongodb.net/test?retryWrites=true&w=majority', {
	useNewUrlParser: true,
	useCreateIndex: true,
}).then(() => console.log('Conected to DB')).catch(error => Console.log("Error:", error.message))

const PostSchema = mongoose.Schema({
	title: String,
	description: String
});

const Post = mongoose.model('Post', PostSchema);

app.get('/', async (req, res) => {
	let post = await Post.create({title: 'Test titles', description: 'Test description'});
	res.send(post);
});

app.listen(3000, () => {
	console.log('Server listening on 3000');
});



