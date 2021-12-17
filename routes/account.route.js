const express = require('express');
const router = express.Router();
const AccountController = require('../controllers/account.controller');

router.get('/profile', AccountController.get);
router.put('/profile', AccountController.update);
router.delete('/profile', AccountController.delete);

module.exports = router;