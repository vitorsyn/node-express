const express = require('express')
const router = express.Router();
const Produto = require('../models/produto')

router.get('/', async(req,res) => {
    try {
        const produtos = await Produto.findAll();
        res.render('lista', { produtos });
    } catch (error) {
        res.status(500).json({erro: "Erro ao carregar os produtos"})
        
    }
})

module.exports = router;