const router = require('express').Router()
const passport = require('passport')
const AdminCtrl =require('../controllers/AdminCtrl')

router.get('/Gentreprise',AdminCtrl.listEnterprise)
router.get('/Guser',AdminCtrl.listeClients)
router.post('/verification',AdminCtrl.verification)
router.post('/deleteEnterprise',AdminCtrl.deleteEnterprise)
module.exports = router
