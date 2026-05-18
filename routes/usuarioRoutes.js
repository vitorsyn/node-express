const express = require('express')
const router = express.Router();
const controller = require('../controllers/usuarioController')

router.post('/', controller.criar);

module.exports = router;