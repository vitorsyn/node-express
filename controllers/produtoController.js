const Produto = require('../models/produto')

exports.listar = async (req, res) =>{
    const produtos = await Produto.findAll();
    res.json(produtos)
}

exports.buscarPorId = async (req, res)=>{
    const produto = await Produto.findByPk(req.params.id);
    if(produto) return res.json(produto);
    res.status(404).json({ erro:'Produto não encontrado'})
}

exports.criar = async (req, res) =>{
    const {nome, preco} = req.body;
        if (!nome || nome.trim() === '' || preco === undefined || isNaN(preco)) {
        return res.status(400).json({ erro: "Nome e preço são obrigatórios." });
    }

    const novo = await Produto.create({nome, preco})

    res.status(201).json(novo)

}

exports.atualizar = async (req,res) =>{
    const produto = await Produto.findByPk(req.params.id)
    if(!produto) return res.status(404).json({ erro: 'Produto não encontrado' })
    await produto.update(req.body)
    res.json(produto)
}

exports.deletar = async (req, res)=>{
    const produto = await Produto.findByPk(req.params.id)
    if(!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    await produto.destroy();
    res.sendStatus(204);
}