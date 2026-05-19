const express = require('express')
const router = express.Router();
const authMiddleware = require('../middlewares/authMiddleware')
const controller = require('../controllers/produtoController')

router.get('/', authMiddleware, controller.listar);
router.get('/:id', authMiddleware, controller.buscarPorId);
router.post('/', authMiddleware, controller.criar);
router.put('/:id', authMiddleware, controller.atualizar);
router.patch('/desconto/:pct', authMiddleware, controller.aplicarDesconto);
router.delete('/:id', authMiddleware, controller.deletar);

module.exports = router;