const router = require('express').Router()
const ProductCtrl = require('../controllers/ProductCtrl');
const multer = require("multer");
const path = require("path");
const passport = require('passport')
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "public/uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "_" + file.originalname);
  },
});
const upload = multer({ storage: storage });

router.post('/newproduct',upload.single('pImage'),passport.authenticate('jwt',{session :false}),ProductCtrl.NewProduct)
router.get('/myshop',passport.authenticate('jwt',{session :false}),ProductCtrl.myshop)
router.get('/home',ProductCtrl.Allproduct)
router.get('/location',ProductCtrl.locationSearch)
router.post('/DeleteProduct',ProductCtrl.DeleteProduct)
router.post('/product_View',ProductCtrl.getSingleProduct)
router.post('/remise',ProductCtrl.remise)
router.post('/modifierProduit/:ProduitID',ProductCtrl.updateProduct)
router.post('/likebtn',passport.authenticate('jwt',{session :false}),ProductCtrl.like)
router.post('/likeDislike',passport.authenticate('jwt',{session :false}),ProductCtrl.likeDislike)

module.exports = router