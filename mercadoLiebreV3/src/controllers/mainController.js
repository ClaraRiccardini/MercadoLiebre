const fs = require('fs');
const path = require('path');

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	root: (req, res) => {
		let visitados = products.filter(function (prod) {
			return prod.category == "visited";
		});
		let oferta = products.filter(function (prod) {
			return prod.category == "in-sale";
		});
		res.render("index", {
			visitados: visitados,
			oferta: oferta,
			aMiles: toThousand
		})
	},
	search: (req, res) => {
		//do the magic
	},
};

module.exports = controller;
