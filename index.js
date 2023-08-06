const express = require('express');
const app = express();
const path = require('path');
const mongoose = require('mongoose');
const methodOverride = require('method-override');

const Product = require('./models/products');

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
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride('_method'));

// categories
const categories = ['fruit', 'vegetables', 'dairy', 'snacks'];

// get all products
app.get('/products', async (req, res) => {
	const { category } = req.query;

	let products;
	if (category) {
		products = await Product.find({ category });
	} else {
		products = await Product.find({});
	}
	res.render('products/index', { products });
});

// create product - form
app.get('/products/new', (req, res) => {
	res.render('products/new', { categories });
});

// submit product to db
app.post('/products', async (req, res) => {
	const newProduct = new Product(req.body);
	await newProduct.save();
	res.redirect(`/products/${newProduct._id}`);
});

// get single product by id
app.get('/products/:id', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	console.log(product);
	res.render('products/show', { product });
});

// update product info form
app.get('/products/:id/edit', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findById(id);
	res.render('products/edit', { product, categories });
});

// save edit
app.put('/products/:id', async (req, res) => {
	const { id } = req.params;
	const product = await Product.findByIdAndUpdate(id, req.body, {
		runValidators: true,
		new: true,
	});
	res.redirect(`/products/${product._id}`);
});

app.delete('/products/:id', async (req, res) => {
	const { id } = req.params;
	const deletedProduct = await Product.findByIdAndDelete(id);
	res.redirect('/products');
});

app.listen(3000, () => {
	console.log('APP IS LISTENING ON PORT 3000!');
});
