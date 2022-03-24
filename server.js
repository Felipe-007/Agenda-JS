require('dotenv').config();

const express = require('express');
const app = express();
const mongoose = require('mongoose');
mongoose.connect(process.env.CONNECTIONSTRING, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Conectado a base de dados MongoDB')
    app.emit('pronto');
  })
  .catch(e => console.log(e));

const routes = require('./routes');
const path = require('path');
const { middlewareGlobal } = require('./src/middlewares/middlewares');

app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.resolve(__dirname, 'public')));

app.set('views', path.resolve(__dirname, 'src', 'views'));
app.set('view engine', 'ejs');

//Meus próprios middlewares
app.use(middlewareGlobal);
app.use(routes);

app.on('pronto', () => {
  app.listen(3000, () => {
    console.log('🚀 Servidor Inicializado!');
    console.log('Executando no link: http://localhost:3000');
  });
});
