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

exports.criar = async (req, res) => {
    const { nome, preco, imagem } = req.body;

    if (!nome || nome.trim() === '' || preco === undefined || isNaN(preco)) {
        return res.status(400).json({ erro: "Nome e preço são obrigatórios." });
    }

    const dados = { nome, preco };
    if (imagem && imagem.trim() !== '') {
        dados.imagem = imagem;
    }

    const novo = await Produto.create(dados);
    return res.status(201).json(novo);
}

exports.atualizar = async (req,res) =>{
    const produto = await Produto.findByPk(req.params.id)
    if(!produto) return res.status(404).json({ erro: 'Produto não encontrado' })
    await produto.update(req.body)
    res.json(produto)
}

exports.aplicarDesconto = async (req, res) => {
    const { pct } = req.params;
    const desconto = parseFloat(pct);
    
    if (isNaN(desconto) || desconto < 0 || desconto > 100) {
        return res.status(400).json({ erro: 'Informe um desconto válido.' });
    }
    const produtos = await Produto.findAll();

    for (const produto of produtos) {
        const novoPreco = produto.preco - (produto.preco * desconto / 100);

        await produto.update({ preco: novoPreco});
    }
    res.json({ mensagem: `Desconto de ${desconto}% aplicado.` });
}

exports.deletar = async (req, res)=>{
    const produto = await Produto.findByPk(req.params.id)
    if(!produto) return res.status(404).json({ erro: 'Produto não encontrado' });
    await produto.destroy();
    res.sendStatus(204);
}