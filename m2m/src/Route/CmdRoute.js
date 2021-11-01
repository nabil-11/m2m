const router = require('express').Router()
const CmdCtrl = require('../controllers/CmdCtrl');
const passport = require('passport')



router.post('/AddCmd',passport.authenticate('jwt',{session :false}),CmdCtrl.AddCmd)
router.get('/command/List',passport.authenticate('jwt',{session :false}),CmdCtrl.SearchCmd)
router.post('/DeleteCmd',CmdCtrl.deleteCommand)
router.get('/CmdManagement',passport.authenticate('jwt',{session :false}),CmdCtrl.CmdM)
router.post('/deletecommand',passport.authenticate('jwt',{session :false}),CmdCtrl.deleteCmd)
router.post('/acceptedcommand',passport.authenticate('jwt',{session :false}),CmdCtrl.acceptedcommand)
router.post('/refusedcommand',passport.authenticate('jwt',{session :false}),CmdCtrl.refusedcommand)
router.post('/cmdDetails/:IDC',CmdCtrl.cmdDetails)
router.post('/verifynumber',CmdCtrl.SendCode)
module.exports = router