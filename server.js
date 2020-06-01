const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
var mysql = require('mysql');
var path = require('path');
var helmet = require('helmet');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Conexao com o banco será feita no arquivo db.js
const dbfun = require('./db');


//Permite Acesso externo na aplicação
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://comparie.com.br/");
  res.header("Access-Control-Allow-Origin", "http://localhost:3000/");
  res.header("Access-Control-Allow-Methods", "POST, PUT, GET, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With,x-access-token, Content-Type, Accept");
  next();
});
app.use(helmet());
//Pasta utilizada para o frontEnd vai ser a pasta WWW
app.use('/', express.static(__dirname + '/public'));


routes(app);
// Quando quiser rodar a aplicação sem especificar a porta use esse comando
// app.listen(process.env.PORT_APP, function() {
//     console.log('Rodando porta' + process.env.PORT_APP);
// });


app.listen(3000, function() {
  console.log('Rodando porta 3000');
});