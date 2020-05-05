const fs = require('fs');
const path = require('path');

//Parseo de productos.json
const productsFilePath = path.join(__dirname, "../data/productos.json")
const products = JSON.parse(fs.readFileSync(productsFilePath, "UTF-8"))
const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
//Chequeo si estoy trayendo bien productos.json
//console.log(products)

//Controller del Index
controller = {
    product: function (req, res, next) {
        res.render("product", {
            title: "Mercado Liebre Argentina",
            products: products,
            aMiles: toThousand
        })
    },
    detail: function (req, res, next) {
        let prod = products.find(function(element){
            return element.id == req.params.id
        })
        
        if(prod) {
            res.render("detail", {prod:prod,
                aMiles: toThousand,
            title: "Mercado Liebre Argentina"});
        }
        else{res.render("error",{
            title: "Mercado Liebre Argentina"});}
    },
  category: function (req, res, next) {
        let prod = products.find(function(element){
            return element.id == req.params.id && element.category == req.params.category
        })
        
        if(prod) {
            res.render("detail", {prod:prod,
                aMiles: toThousand,
            title: "Mercado Liebre Argentina"});
        }
        else{res.render("error",{
        title: "Mercado Liebre Argentina"});}
    
}
}




module.exports = controller

