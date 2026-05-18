const Usuario = require('../models/Usuario');

exports.criar = async (req, res) => {
    const { login, senha } = req.body;

    if (!login || login.trim() === '' || !senha || senha.trim() === '') {
        return res.status(400).json({ erro: "Login e senha são obrigatórios." });
    }

    const novo = await Usuario.create({ login, senha});
    res.status(201).json({ message: "Usuario criado com sucesso" });
}