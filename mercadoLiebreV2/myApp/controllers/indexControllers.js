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
              index: function (req, res, next) {
                let ofertas = products.filter(function(element) {
                  return element.category == "in-sale";
                  })
                  let visitados = products.filter(function(element) {
                  return element.category == "visited";
                  })
                    res.render("index", {
                      title : "Mercado Liebre Argentina",
                      visitados: visitados,
                      ofertas: ofertas,
                      aMiles: toThousand
                    })
                  }
              }


module.exports = controller

