const express = require('express');

//Biblioteca para facilitar uso do Mysql
const mysqlModel = require('./db-mysql-model');
//  Add no module.exports cada objeto com as tabelas q eles manipulam
//  Obj: connection.extend({
//     tableName: "tab1,tab2"
//  }) //QuestaoResolvida
//
//

// Conexão com o banco de dados
 const connection = mysqlModel.createConnection();
 module.exports = {
    Produtos: connection.extend({
      tableName: "produtos"
    }),
    Categorias: connection.extend({
      tableName: "categorias"
    }),
    Marcas: connection.extend({
      tableName: "marcas"
    }),
    Lojas: connection.extend({
      tableName: "lojas"
    }),
    Nichos: connection.extend({
      tableName: "nichos"
    }),
    Tipos: connection.extend({
      tableName: "tipos"
    }),
    ProdutoLoja: connection.extend({
      tableName: "produtoloja"
    }),
    ProdutoCategoria: connection.extend({
      tableName: "produtocategoria"
    }),
    TipoCategoria: connection.extend({
      tableName: "tipocategoria"
    })
 }