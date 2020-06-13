const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
//gzip
const compress = require('compression');

var mysql = require('mysql');
var path = require('path');
var helmet = require('helmet');
var cors = require('cors')

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(compress())
//Conexao com o banco será feita no arquivo db.js
const dbfun = require('./db');


//Permite Acesso externo na aplicação
app.use(cors())

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