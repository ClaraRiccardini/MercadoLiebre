var express = require('express');
var router = express.Router();
var productsControllers =require("../controllers/productsControllers");

/* GET product page. */
router.get('/', productsControllers.product);

/* GET product id and category page. */
router.get('/detail/:id', productsControllers.detail);

/* GET product id and category page. */
router.get('/detail/:id/:category', productsControllers.category);

module.exports = router;
