const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const Produto = require('../models/produto')


router.get('/', (req,res) => {
    res.render('login')
})

router.get('/lista', authMiddleware, async(req,res) => {
    try {
        const produtos = await Produto.findAll();
        res.render('lista', { produtos });
    } catch (error) {
        res.status(500).json({erro: "Erro ao carregar os produtos"})
        
    }
})

module.exports = router;