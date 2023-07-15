const Router = require('express');
const router = new Router();
const userController = require('../controllers/registration.controller');

// router.get('/users',userController.getAllUsers);
router.post('/regUser',userController.regUser);

module.exports = router;