const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
var cors = require("cors");
var fs = require("fs");
var https = require("https");
var mysql = require('mysql');
var path = require('path');
var helmet = require("helmet");
app.use((req, res, next) => { //Cria um middleware onde todas as requests passam por ele 
    if (req.headers["x-forwarded-proto"] == "http") //Checa se o protocolo informado nos headers é HTTP 
        res.redirect(`https://${req.headers.host}${req.url}`); //Redireciona pra HTTPS 
    else //Se a requisição já é HTTPS 
        next(); //Não precisa redirecionar, passa para os próximos middlewares que servirão com o conteúdo desejado 
});

app.use(helmet());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
//Conexao com o banco será feita no arquivo db.js
const dbfun = require('./db');

app.use(cors({
  origin: ["https://comparie.com.br:3001"],
  methods: ["GET", "POST", "PUT"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

//Permite Acesso externo na aplicação

//Pasta utilizada para o frontEnd vai ser a pasta WWW
app.use('/', express.static(__dirname + '/public'));


routes(app);
// Quando quiser rodar a aplicação sem especificar a porta use esse comando
// app.listen(process.env.PORT_APP, function() {
//     console.log('Rodando porta' + process.env.PORT_APP);
// });

var credentials = {
  key: fs.readFileSync("./my-api.key", "utf8"),
  cert: fs.readFileSync("./my-api.cert", "utf8")
};
https
  .createServer(credentials, app)
  .listen(3000, function() {
    console.log('Rodando porta 3000');
  });