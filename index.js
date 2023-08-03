const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');

const mongooseConnect = async () => {
	try {
		const db = await mongoose.connect('mongodb://localhost:27017/shopApp');
		console.log('MONGO CONNECETED');
	} catch (error) {
		console.log('ERROR >>>>>', error);
	}
};
mongooseConnect();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.get('/dog', (req, res) => {
	res.send('Woof');
});

app.listen(3000, () => {
	console.log('APP IS LISTENING ON PORT 3000!');
});
