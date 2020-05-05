const fs = require('fs');
const path = require('path');
var express = require ("express");
var multer = require("multer")

const productsFilePath = path.join(__dirname, '../data/productsDataBase.json');
const products = JSON.parse(fs.readFileSync(productsFilePath, 'utf-8'));
//console.log(products)
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");

const controller = {
	// Root - Show all products
	root: (req, res) => {
		res.render("products", {
			products : products,
			aMiles: toThousand
		})
	},
	// Detail - Detail from one product
	detail: function (req, res) {
        let prod = products.find(function(element){
            return element.id == req.params.id
        })
        if(prod) {
            res.render("detail", {prod:prod,
                aMiles: toThousand,
            title: "Mercado Liebre Argentina"});
        }
    },

	// Create - Form to create
	create: (req, res) => {        
	res.render("product-create-form")
	res.redirect("products.ejs")
	},

	// Create -  Method to store
	store: function (req,res){

if(products==""){
	let id=1
}else{
	let ultimoProducto=products[products.length-1] 
	nuevoProducto.id=ultimoProducto.id+1
}
		let ultimoProducto=products[products.length-1]
		let nuevoProducto ={}
		nuevoProducto.id=ultimoProducto.id+1
		nuevoProducto.name=req.body.name
		nuevoProducto.price=req.body.price
		nuevoProducto.discount=req.body.discount
		nuevoProducto.category=req.body.category
		nuevoProducto.description=req.body.description
		products.push(nuevoProducto)

		let productosModificadosJSON = JSON.stringify(products)
		fs.writeFileSync(productsFilePath,productosModificadosJSON)
		res.send(products)
	

    },

	// Update - Form to edit
	edit: (req, res) => {   
		let prod = products.find(function(element){
		return element.id == req.params.id
	})
	if(prod)       
		res.render("product-edit-form.ejs",
		{prod:prod,
		title: "Mercado Liebre Argentina"})
		},

	// Update - Method to update
	update: (req, res) => {
		let productUpdate = []
		products.forEach(element =>{
			if(element.id==req.params.id){
			element.name = req.body.name,
			element.price=req.body.price,
			element.discount=req.body.discount,
			element.description=req.body.description
			return productUpdate = element
}
		})
	//console.log(productUpdate)
	//console.log(products)
	let productosModificadosJSON = JSON.stringify(products)
	fs.writeFileSync(productsFilePath,productosModificadosJSON)

	},

	// Delete - Delete one product from DB
	destroy: (req, res) => {   
		let productsQueQuedan = products.filter(function(element){
		return element.id != req.params.id
	})
	let productosModificadosJSON = JSON.stringify(products)
	fs.writeFileSync(productsFilePath,productosModificadosJSON)
	res.send(products)
}

}
module.exports = controller;