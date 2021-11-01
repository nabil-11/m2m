const router = require('express').Router()
const userCtrl = require('../controllers/UserCtrl')
const passport = require('passport')
const multer = require("multer");
const path = require("path");
var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, "public/uploads/verify");
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + "_" + file.originalname);
    },
  });
  const upload = multer({ storage: storage });

router.post('/signup',upload.single('verifyImage'), userCtrl.register);
router.post('/signin', userCtrl.signin);
router.post('/changePassword',passport.authenticate('jwt',{session :false}),userCtrl.ChangePassword)
router.get('/profil',passport.authenticate('jwt',{session :false}),(req, res) =>{
    let token = req.header("Authorization");
    console.log(req.user)  
    res.json({
     user:req.user
    })
 
  });
  router.post('/sta',userCtrl.statistique)
  router.post('/forgotPassword',userCtrl.FPassword)
  router.post('/VerifyUser',passport.authenticate('jwt',{session :false}),userCtrl.VerifyUser)
  router.delete('/deletecompte',passport.authenticate('jwt',{session :false}),userCtrl.deleteCompte)
router.get('/test',passport.authenticate('jwt',{session :false}),(req,res,next)=>{

    return res.send({message:'auth'})
});

module.exports = router