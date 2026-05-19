const express = require('express')
const sequelize = require('./config/database')
const Produto = require('./models/produto')
const rotasProduto = require('./routes/produtoRoutes')
const usuarioRoutes = require('./routes/usuarioRoutes')
const rotasAuth = require('./routes/authRoutes')
const viewRoutes = require('./routes/viewsRoutes')
const app = express()
const port = 3000

app.use(express.json());

app.set('view engine', 'ejs')

app.use('/', viewRoutes)
app.use('/usuarios', usuarioRoutes)
app.use('/produtos', rotasProduto)
app.use('/login', rotasAuth)

sequelize.sync().then(()=>{
    console.log("Banco de dados sincronizado com sucesso!");
    app.listen(port, ()=>{
       console.log("Servidor rodando em http://127.0.0.1:"+port)
    })
})