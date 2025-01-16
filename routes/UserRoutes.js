const express = require('express');
const { register, signIn, getUserByRoles, getUserById } = require('../controllers/UserController');
const VerifyToken = require('../middleware/VerifyToken');
const router = express.Router();

router.post('/register',register);
router.post('/login',signIn);
router.get('/roles',VerifyToken,getUserById);


module.exports = router;