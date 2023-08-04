const Product = require('./models/products');


// const p = new Product({
// 	name: 'Ruby Grapefruit',
// 	price: 1.99,
// 	category: 'fruit',
// });

// p.save()
// 	.then((p) => {
// 		console.log(p);
// 	})
// 	.catch((err) => {
// 		console.log(err);
// 	});

const seedProducts = [
	{ name: 'Whole Milk', price: 3.49, category: 'dairy' },
	{ name: 'Broccoli', price: 1.29, category: 'vegetables' },
	{ name: 'Manogs', price: 2.99, category: 'fruit' },
	{ name: 'Eggs', price: 5.29, category: 'dairy' },
	{ name: 'Spinach', price: 1.49, category: 'vegetables' },
];

Product.insertMany(seedProducts)
	.then((res) => {
		console.log(res);
	})
	.catch((err) => {
		console.log(err);
	});
