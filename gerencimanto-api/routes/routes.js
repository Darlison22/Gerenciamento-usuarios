var express = require("express")
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require('../controllers/UserController');
var adminAuth = require('../middleware/AdminAuth')

router.get('/', HomeController.index);
router.post('/create', UserController.create)
router.get('/users', UserController.index)
router.get('/user/:id', UserController.findUser)
router.put('/user/:id', UserController.edit)
router.delete('/user/:id', UserController.remove)
router.post('/recoverpassword', UserController.recoverPassword)
router.post('/changepassword', UserController.changePassword)
router.post('/auth', UserController.login)

module.exports = router;