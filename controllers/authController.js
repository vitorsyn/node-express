const jwt = require('jsonwebtoken');
const Usuario = require('../models/Usuario');

//Vai pro github apenas por ser um aprendizado, mas em produção isso deve ser uma variável de ambiente
const SECRET = "segredo_super_secreto";

exports.login = async (req, res) => {
    const { login, senha } = req.body;

    if (!login || !senha) {
        return res.status(400).json({ error: "Login e senha são obrigatórios" });
    }

    try {
        const usuario = await Usuario.findOne({ where: { login, senha } });
        if (!usuario) {
            return res.status(401).json({ error: "Usuario ou senha inválidas" });
        }
        const token = jwt.sign(
            { id: usuario.id, login: usuario.login }, 
            SECRET, 
            { expiresIn: '1h' }
        );
        res.json({ token });
    } catch (error) {
        console.log(error)
        res.status(500).json({ error: "Erro ao autenticar login" });
    }
}