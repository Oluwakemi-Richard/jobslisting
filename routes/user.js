const express = require('express');
const router = express.Router();
const userController = require('../controllers/user');
const { isAuthenticated } = require('../util/authenticate');

router.get('/', userController.getUsers);
router.get('/:id', userController.getSingle);

router.post('/', userController.createUser);

router.put('/:id', isAuthenticated, userController.updateUser);

router.delete('/:id', isAuthenticated, userController.deleteUser);

module.exports = router;