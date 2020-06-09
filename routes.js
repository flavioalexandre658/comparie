fs = require('fs');
request = require('request');
cheerio = require('cheerio');


module.exports = function(app) {

  //Exemplo de módulo para cada componente da aplicação
  //var Mod1 = require('./Mod1');
  //app.use('/mod1', Mod1)

  var dbfun = require('./db');

  //Criptografia da senha
  var sha1 = require('sha1');
  
  app.get('/getPrecoSite/:link/:idProduto/:idLoja', function(req, res) {
    // Passo 2
    let
      link = req.params.link,
      idProduto = req.params.idProduto,
      idLoja = req.params.idLoja;
    const nomeloja = link.split('.');
    url = link.normalize('NFD').replace(/[\u0300-\u036f]/g, '');
    request(url, function(error, response, html) {
        if (!error) {
            let $ = cheerio.load(html);
            // Objeto que irá armazenar a tabela
            // Passo 3
            // Manipulando o seletor específico para montar nossa estrutura
            // Escolhi não selecionar a primeira linha porque faz parte do header da tabela
            let preco,parcelas;
            if(nomeloja[1] == 'magazinevoce'){
              $('.pdetailpage').each(function(i) {
                  // Obtendo as propriedades da tabela. 
                  // O método .trim() garante que irá remover espaço em branco
                    preco = $(this).find('strong').eq(0).text().trim();
                    $('.p-installment').each(function(i){
                        parcelas = $(this).find('span').eq(0).text().trim();
                    })
                  
                  // Inserindo os dados obtidos no nosso objeto
                  res.json([{preco: preco, parcelas: parcelas, idProduto: idProduto, idLoja: idLoja}]);
              });
            }else if(nomeloja[1] == 'americanas'){
              $('.main-price').each(function(i) {
                // Obtendo as propriedades da tabela. 
                // O método .trim() garante que irá remover espaço em branco
                  preco = $(this).find('span').eq(0).text().trim();
                  $('.installment-wrapper').each(function(i){
                      parcelas = $(this).find('p').eq(0).text().trim();
                  })
              });
              if(preco == '' || preco == undefined || preco == null){
                $('.price__SalesPrice-ej7lo8-2').each(function(i) {
                  // Obtendo as propriedades da tabela. 
                  // O método .trim() garante que irá remover espaço em branco
                    preco = $(this).text().trim();
                    $('.price__Installment-ej7lo8-3').each(function(i){
                        parcelas = $(this).find('span').eq(0).text().trim();
                    })
                });
              }
              // Inserindo os dados obtidos no nosso objeto
              res.json([{preco: preco, parcelas: parcelas, idProduto: idProduto, idLoja: idLoja}]);
            }else if(nomeloja[1] == 'amazon'){
              $('#price_inside_buybox').each(function(i) {
                // Obtendo as propriedades da tabela. 
                // O método .trim() garante que irá remover espaço em branco
                preco = $(this).text().trim();

                $('#installmentCalculator_feature_div').each(function(i){
                  parcelas = $(this).find('span').eq(0).text().trim();
                })
                // Inserindo os dados obtidos no nosso objeto
              });
              if(preco == '' || preco == undefined || preco == null){
                $('#olp-upd-new').each(function(i) {
                  preco = $(this).find('span').eq(0).text().trim();
                  parcelas = "1x no cartão de crédito";
                })
              }
              res.json([{preco: preco, parcelas: parcelas, idProduto: idProduto, idLoja: idLoja}]);
            }else if(nomeloja[1] == 'submarino'){
              $('.main-price').each(function(i) {
                // Obtendo as propriedades da tabela. 
                // O método .trim() garante que irá remover espaço em branco
                  preco = $(this).find('span').eq(0).text().trim();
                  $('.installment-wrapper').each(function(i){
                      parcelas = $(this).find('p').eq(0).text().trim();
                  })
              });
              if(preco == '' || preco == undefined || preco == null){
                $('.main-offer__ParagraphUI-sc-1oo1w8r-0').each(function(i) {
                  // Obtendo as propriedades da tabela. 
                  // O método .trim() garante que irá remover espaço em branco
                    preco = $(this).find('span').eq(0).text().trim();
                    $('.payment-option').each(function(i){
                        parcelas = $(this).text().trim();
                    })
                });
              }
              // Inserindo os dados obtidos no nosso objeto
              res.json([{preco: preco, parcelas: parcelas, idProduto: idProduto, idLoja: idLoja}]);
            }
        }else{
            console.log(error);
        }
    })
  })

  app.post('/cadastrarProduto', function(req, res) {  /// Cadastra um novo produto
    produtos = new dbfun.Produtos();
    produtos.query("INSERT INTO `comparie`.`produtos`(`imagemProduto`, `nomeProduto`, `idTipo`, `idNicho`, `descricao`, `review`, `idMarca`)VALUES('"
      + req.body.imagemProduto + "','"
      + req.body.nomeProduto + "','"
      + req.body.idTipo + "','"
      + req.body.idNicho + "','"
      + req.body.descricao + "','"
      + req.body.review + "','"
      + req.body.idMarca +"');",
      function(err) {
        if(err){
          res.json({
            status: false,
            message: 'Erro ao Cadastrar Produto'
          });
        }else{
          res.json({
            status: true,
            message: 'Produto Cadastrado'
          });
        }
      });

  });

  app.put('/editarProduto/:idProduto', function(req, res) { /// Edita um obra a partir de seus dados
    produto = new dbfun.Produtos(); /// Conexão com o banco
    produto.query("UPDATE `comparie`.`produtos` SET `imagemProduto` = '"+ req.body.imagemProduto
      +"',`nomeProduto` = '"+ req.body.nomeProduto
      +"',`idTipo` = '"+ req.body.idTipo
      +"',`idNicho` = '"+ req.body.idNicho
      +"',`descricao` = '"+ req.body.descricao
      +"',`review` = '"+ req.body.review
      +"',`idMarca` = '"+ req.body.idMarca
      +"'WHERE `idProduto` = '"+req.params.idProduto+"';",  /// Atualiza os dados com a query do banco a patir do id
      function(err) { // Caso ocorra um erro
        if(err)
          res.send(err);
      });
    res.json({  /// Caso ocorra com sucesso
      status: true,
      message: 'Produto Atualizado'
    });
  });

  app.put('/editarProdutoClique/:idProduto', function(req, res) { /// Edita um obra a partir de seus dados
    produto = new dbfun.Produtos(); /// Conexão com o banco
    produto.query("UPDATE `comparie`.`produtos` SET `cliques` = '"+ req.body.cliques
      +"'WHERE `idProduto` = '"+req.params.idProduto+"';",  /// Atualiza os dados com a query do banco a patir do id
      function(err) { // Caso ocorra um erro
        if(err)
          res.send(err);
      });
    res.json({  /// Caso ocorra com sucesso
      status: true,
      message: 'Produto Atualizado'
    });
  });

  app.get('/getProdutos', function(req, res) { /// Retorna do banco todos os status cadastrados
    produtos = new dbfun.Produtos();
    //console.log("ELE TA AQUI");
    // trecho.query("select t.idTrecho, e.nomeEscopo from escTrecho as es, trecho as t, escopo as e where t.idTrecho = es.idTrecho and es.idEscopo = e.idEscopo",
    produtos.query("SELECT * FROM produtos;",
    function(err, rows, fields) {
      if(err) throw err;
      
      res.json(rows);
    });
  });

  app.get('/getProduto/:id', function(req, res) { /// Retorna uma obra a partir de seu id
    produto = new dbfun.Produtos();
    produto.query("SELECT * FROM `comparie`.`produtos` WHERE idProduto=" + req.params.id + ";",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.post('/cadastrarCategoria', function(req, res) {  /// Cadastra uma nova categoria
    categorias = new dbfun.Categorias();

    categorias.query("INSERT INTO `comparie`.`categorias` (`nomeCategoria`) VALUES('"
      + req.body.nomeCategoria +"');",
      function(err) {
        if(err){
          res.json({
            status: false,
            message: 'Erro ao Cadastrar Categoria'
          });
        }else{
          res.json({
            status: true,
            message: 'Categoria Cadastrada'
          });
        }
      });

  });

  app.get('/getCategorias', function(req, res) { /// Retorna do banco todos os status cadastrados
    categorias = new dbfun.Categorias();
    categorias.query("SELECT * FROM categorias;",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.get('/getCategoria/:id', function(req, res) { /// Retorna uma obra a partir de seu id
    categoria = new dbfun.Categorias();
    categoria.query("SELECT * FROM `comparie`.`categorias` WHERE idCategoria=" + req.params.id + ";",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.post('/cadastrarMarca', function(req, res) {  /// Cadastra uma nova categoria
    marcas = new dbfun.Marcas();

    marcas.query("INSERT INTO `comparie`.`marcas` (`nomeMarca`) VALUES('"
      + req.body.nomeMarca +"');",
      function(err) {
        if(err){
          res.json({
            status: false,
            message: 'Erro ao Cadastrar Marca'
          });
        }else{
          res.json({
            status: true,
            message: 'Marca Cadastrada'
          });
        }
      });

  });

  app.get('/getMarcas', function(req, res) { /// Retorna do banco todos os status cadastrados
    marcas = new dbfun.Marcas();
    marcas.query("SELECT * FROM marcas;",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.get('/getMarca/:id', function(req, res) { /// Retorna uma obra a partir de seu id
    marca = new dbfun.Marcas();
    marca.query("SELECT * FROM `comparie`.`marcas` WHERE idMarca=" + req.params.id + ";",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.post('/cadastrarLoja', function(req, res) {  /// Cadastra uma nova loja
    lojas = new dbfun.Lojas();

    lojas.query("INSERT INTO `comparie`.`lojas` (`nomeLoja`) VALUES('"
      + req.body.nomeLoja + "');",
      function(err) {
        if(err){
          res.json({
            status: false,
            message: 'Erro ao Cadastrar Loja'
          });
        }else{
          res.json({
            status: true,
            message: 'Loja Cadastrada'
          });
        }
      });

  });

  app.get('/getLojas', function(req, res) { /// Retorna do banco todos os status cadastrados
    lojas = new dbfun.Lojas();
    lojas.query("SELECT * FROM lojas;",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.get('/getLoja/:id', function(req, res) { /// Retorna uma obra a partir de seu id
    loja = new dbfun.Lojas();
    loja.query("SELECT * FROM `comparie`.`lojas` WHERE idLoja=" + req.params.id + ";",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.post('/cadastrarNicho', function(req, res) {  /// Cadastra um novo nicho
    nichos = new dbfun.Nichos();

    nichos.query("INSERT INTO `comparie`.`nichos` (`nomeNicho`) VALUES('"
      + req.body.nomeNicho +"');",
      function(err) {
        if(err){
          res.json({
            status: false,
            message: 'Erro ao Cadastrar Nicho'
          });
        }else{
          res.json({
            status: true,
            message: 'Nicho Cadastrado'
          });
        }
      });

  });

  app.get('/getNichos', function(req, res) { /// Retorna do banco todos os status cadastrados
    nichos = new dbfun.Nichos();
    nichos.query("SELECT * FROM nichos;",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.get('/getNicho/:id', function(req, res) { /// Retorna uma obra a partir de seu id
    nicho = new dbfun.Nichos();
    nicho.query("SELECT * FROM `comparie`.`nichos` WHERE idNicho=" + req.params.id + ";",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.post('/cadastrarTipo', function(req, res) {  /// Cadastra um novo nicho
    tipos = new dbfun.Tipos();

    tipos.query("INSERT INTO `comparie`.`tipos` (`nomeTipo`) VALUES('"
      + req.body.nomeTipo +"');",
      function(err) {
        if(err){
          res.json({
            status: false,
            message: 'Erro ao Cadastrar Tipo'
          });
        }else{
          res.json({
            status: true,
            message: 'Tipo Cadastrado'
          });
        }
      });

  });

  app.get('/getTipos', function(req, res) { /// Retorna do banco todos os status cadastrados
    tipos = new dbfun.Tipos();
    tipos.query("SELECT * FROM tipos;",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.post('/cadastrarProdutoLoja', function(req, res) {  /// Cadastra um novo nicho
    produtolojas = new dbfun.ProdutoLoja();
    produtolojas.query("INSERT INTO `comparie`.`produtoloja` (`idLoja`, `idProduto`, `linkAfiliado`, `link`, `preco`, `parcelas`, `quantidade`, `dataAtualizacao`) VALUES('"
      + req.body.idLoja + "','"
      + req.body.idProduto + "','"
      + req.body.linkAfiliado + "','"
      + req.body.link + "','"
      + req.body.preco + "','"
      + req.body.parcelas + "','"
      + req.body.quantidade + "','"
      + req.body.dataAtualizacao +"');",
      function(err) {
        if(err){
          res.json({
            status: false,
            message: 'Erro ao Cadastrar relacionamento Produto Loja'
          });
        }else{
          res.json({
            status: true,
            message: 'Relacionamento Produto Loja Cadastrado'
          });
        }
      });

  });

  app.put('/editarProdutoLoja/:idProduto/:idLoja', function(req, res) { /// Edita um obra a partir de seus dados
    produtoloja = new dbfun.ProdutoLoja(); /// Conexão com o banco
    produtoloja.query("UPDATE `comparie`.`produtoloja` SET `quantidade` = '"+ req.body.quantidade
    +"',`preco` = '"+ req.body.preco
    +"',`parcelas` = '"+ req.body.parcelas
    +"',`estoque` = '"+ req.body.estoque
    +"',`dataAtualizacao` = '"+ req.body.dataAtualizacao
    +"'WHERE `idProduto` = '"+req.params.idProduto+"'AND `idLoja` = '"+req.params.idLoja+"';",  /// Atualiza os dados com a query do banco a patir do id
      function(err) { // Caso ocorra um erro
        if(err)
          res.send(err);
      });
    res.json({  /// Caso ocorra com sucesso
      status: true,
      message: 'ProdutoLoja Atualizado'
    });
  });

  app.get('/getProdutoLojas', function(req, res) { /// Retorna do banco todos os status cadastrados
    produtolojas = new dbfun.ProdutoLoja();
    produtolojas.query("SELECT * FROM produtoloja;",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.get('/getProdutoLoja/:id', function(req, res) { /// Retorna uma obra a partir de seu id
    produtoloja = new dbfun.ProdutoLoja();
    produtoloja.query("SELECT * FROM `comparie`.`produtoloja` WHERE idProduto=" + req.params.id + ";",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.get('/getLojaProduto/:id', function(req, res) { /// Retorna uma obra a partir de seu id
    produtoloja = new dbfun.ProdutoLoja();
    produtoloja.query("SELECT * FROM `comparie`.`produtoloja` WHERE idLoja=" + req.params.id + ";",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.post('/cadastrarProdutoCategoria', function(req, res) {  /// Cadastra um novo nicho
    produtocategorias = new dbfun.ProdutoCategoria();
    produtocategorias.query("INSERT INTO `comparie`.`produtocategoria` (`idCategoria`, `idProduto`, `quantidade`) VALUES('"
      + req.body.idCategoria + "','"
      + req.body.idProduto + "','"
      + req.body.quantidade +"');",
      function(err) {
        if(err){
          res.json({
            status: false,
            message: 'Erro ao Cadastrar relacionamento Produto Categoria'
          });
        }else{
          res.json({
            status: true,
            message: 'Relacionamento Produto Categoria Cadastrado'
          });
        }
      });
  });

  app.put('/editarProdutoCategoria/:idProduto/:idCategoria', function(req, res) { /// Edita um obra a partir de seus dados
    produtocategoria = new dbfun.ProdutoCategoria(); /// Conexão com o banco
    produtocategoria.query("UPDATE `comparie`.`produtocategoria` SET `quantidade` = '"+ req.body.quantidade
    +"'WHERE `idProduto` = '"+req.params.idProduto+"'AND `idCategoria` = '"+req.params.idCategoria+"';",  /// Atualiza os dados com a query do banco a patir do id
      function(err) { // Caso ocorra um erro
        if(err)
          res.send(err);
      });
    res.json({  /// Caso ocorra com sucesso
      status: true,
      message: 'ProdutoCategoria Atualizado'
    });
  });

  app.get('/getProdutoCategorias', function(req, res) { /// Retorna do banco todos os status cadastrados
    produtocategorias = new dbfun.ProdutoCategoria();
    produtocategorias.query("SELECT * FROM produtocategoria;",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.get('/getProdutoCategoria/:id', function(req, res) { /// Retorna uma obra a partir de seu id
    produtocategoria = new dbfun.ProdutoCategoria();
    produtocategoria.query("SELECT * FROM `comparie`.`produtocategoria` WHERE idProduto=" + req.params.id + ";",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.get('/getCategoriaProduto/:id', function(req, res) { /// Retorna uma obra a partir de seu id
    produtocategoria = new dbfun.ProdutoCategoria();
    produtocategoria.query("SELECT * FROM `comparie`.`produtocategoria` WHERE idCategoria=" + req.params.id + ";",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.post('/cadastrarTipoCategoria', function(req, res) {  /// Cadastra um novo nicho
    tipocategorias = new dbfun.TipoCategoria();
    tipocategorias.query("INSERT INTO `comparie`.`tipocategoria` (`idTipo`, `idCategoria`) VALUES('"
      + req.body.idTipo + "','"
      + req.body.idCategoria +"');",
      function(err) {
        if(err){
          res.json({
            status: false,
            message: 'Erro ao Cadastrar relacionamento Tipo Categoria'
          });
        }else{
          res.json({
            status: true,
            message: 'Relacionamento Tipo Categoria Cadastrado'
          });
        }
      });
  });

  app.get('/getTipoCategorias', function(req, res) { /// Retorna do banco todos os status cadastrados
    tipocategorias = new dbfun.TipoCategoria();
    tipocategorias.query("SELECT * FROM tipocategoria;",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.post('/cadastrarPromocao', function(req, res) {  /// Cadastra uma nova promocao
    promocoes = new dbfun.Promocoes();
    promocoes.query("INSERT INTO `comparie`.`promocoes` (`idPromocao`, `nomePromocao`, `dataInicio`, `dataFim`) VALUES('"
      + req.body.idPromocao + "','"
      + req.body.nomePromocao + "','"
      + req.body.dataInicio + "','"
      + req.body.dataFim +"');",
      function(err) {
        if(err){
          res.json({
            status: false,
            message: 'Erro ao Cadastrar Promocao'
          });
        }else{
          res.json({
            status: true,
            message: 'Promocao cadastrada'
          });
        }
      });

  });

  app.post('/cadastrarPromocaoLoja', function(req, res) {  /// Cadastra uma nova promocao
    promocaoloja = new dbfun.PromocaoLoja();
    promocaoloja.query("INSERT INTO `comparie`.`promocaoloja` (`idLoja`, `idPromocao`, `bannerPromocao`, `bannerPromocaoMobile`, `linkAfiliado`) VALUES('"
      + req.body.idLoja + "','"
      + req.body.idPromocao + "','"
      + req.body.bannerPromocao + "','"
      + req.body.bannerPromocaoMobile + "','"
      + req.body.linkAfiliado +"');",
      function(err) {
        if(err){
          res.json({
            status: false,
            message: 'Erro ao Cadastrar Promocao'
          });
        }else{
          res.json({
            status: true,
            message: 'Promocao cadastrada'
          });
        }
      });

  });

  app.get('/getPromocaoLojas', function(req, res) { /// Retorna do banco todos os status cadastrados
    promocaoloja = new dbfun.PromocaoLoja();
    promocaoloja.query("SELECT * FROM promocaoloja;",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.get('/getPromocoes', function(req, res) { /// Retorna do banco todos os status cadastrados
    promocoes = new dbfun.Promocoes();
    promocoes.query("SELECT * FROM promocoes;",
    function(err, rows, fields) {
      if(err) throw err;
      res.json(rows);
    });
  });

  app.put('/editarPromocao/:id', function(req, res) { /// Edita um obra a partir de seus dados
    promocoes = new dbfun.Promocoes(); /// Conexão com o banco
    promocoes.query("UPDATE `comparie`.`promocoes` SET `nomePromocao` = '"+ req.body.nomePromocao
    +"',`dataInicio` = '"+ req.body.dataInicio
    +"',`dataFim` = '"+ req.body.dataFim
    +"'WHERE `idPromocao` = '"+req.params.id+"';",  /// Atualiza os dados com a query do banco a patir do id
      function(err) { // Caso ocorra um erro
        if(err)
          res.send(err);
      });
    res.json({  /// Caso ocorra com sucesso
      status: true,
      message: 'Promocao Atualizada'
    });
  });

  app.delete('/removerPromocao/:id', function(req, res) {   /// Deleta uma determinada obra
    promocoes = new dbfun.Promocoes();  /// Conexão com o banco
    promocoes.remove('idPromocao =' + req.params.id, function(err, ret) {  /// Remove a obra a partir de seu id
      if(err)  /// Caso ocorra um erro
        res.send(err);
    });
  });

  app.delete('/removerPromocaoLoja/:id', function(req, res) {   /// Deleta uma determinada obra
    promocaoloja = new dbfun.PromocaoLoja();  /// Conexão com o banco
    promocaoloja.remove('idPromocao =' + req.params.id, function(err, ret) {  /// Remove a obra a partir de seu id
      if(err)  /// Caso ocorra um erro
        res.send(err);
    });
  });

}