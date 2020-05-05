// ************ Require's ************
const express = require('express');
const router = express.Router();
var multer = require("multer")
let path =require("path")

var storage = multer.diskStorage({
	destination:(req,file,cb)=>{
		cb(null,'tmp/my-uploads');
	},
	filename:(req,file,cb)=>{
		cb(null,file.fieldname + '-' + Date.now() + path.extname(file.originalname));
	}
});
var upload = multer({storage:storage});

// ************ Controller Require ************
const productsController = require('../controllers/productsController');

router.get('/', productsController.root); /* GET - All products */
router.get('/detail/:id/', productsController.detail); /* GET - Product detail */

/*** CREATE ONE PRODUCT ***/ 
router.get('/create/', upload.any(), productsController.create); /* GET - Form to create */
router.post('/create/', productsController.store); /* POST - Store in DB */

/*** EDIT ONE PRODUCT ***/ 
router.get('/edit/:id', productsController.edit); /* GET - Form to create */
router.put('/edit/:id', productsController.update); /* PUT - Update in DB */

/*** DELETE ONE PRODUCT***/ 
router.delete('/delete/:id', productsController.destroy); /* DELETE - Delete from DB */


module.exports = router;