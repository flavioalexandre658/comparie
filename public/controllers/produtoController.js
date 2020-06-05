angular.module('myApp')
.controller('produtoController', ['$scope', '$log','ProdutoServ','$location','$window', function ($scope, $log, ProdutoServ, $location, $window) {
    $scope.load = function() {
        let script1 = document.createElement('script');
        let script2 = document.createElement('script');
        script1.type = 'text/javascript';
        script2.type = 'text/javascript';
        script1.src = "lib/js/code.js";
        script2.src = "lib/js/scrollreveal.min.js";
        document.body.appendChild(script1);
        document.body.appendChild(script2);
    };
    $scope.load();

    ProdutoServ.getProdutos().then(function(data) {
        $scope.listaProdutos = data;
    });

    ProdutoServ.getCategorias().then(function(data) {
        $scope.listaCategorias = data.sort(function(a,b){ // Ordena a lista de forma crescente
            return a.idCategoria - b.idCategoria;
        })
    });

    ProdutoServ.getMarcas().then(function(data) {
        $scope.listaMarcas = data;
    });

    ProdutoServ.getLojas().then(function(data) {
        $scope.listaLojas = data;
    });

    ProdutoServ.getNichos().then(function(data) {
        $scope.listaNichos = data;
    });

    ProdutoServ.getTipos().then(function(data) {
        $scope.listaTipos = data;
    });

    ProdutoServ.getProdutoCategorias().then(function(data) {
        $scope.listaProdutoCategorias = data;
    });

    ProdutoServ.getProdutoLojas().then(function(data) {
        $scope.listaProdutoLojas = data;
    });

    ProdutoServ.getTipoCategorias().then(function(data) {
        $scope.listaTipoCategorias = data.sort(function(a,b){ // Ordena a lista de forma crescente
            return a.idCategoria - b.idCategoria;
        })
    });

    $scope.cadastrarProduto = function() {

            let produto = $scope.produto;
            produto.imagemProduto = $scope.produto.imagemProduto;
            produto.nomeProduto = $scope.produto.nomeProduto;
            produto.idTipo = $scope.produto.idTipo;
            produto.idNicho = $scope.produto.idNicho;
            produto.descricao = $scope.produto.descricao;
            produto.review = $scope.produto.review;
            produto.idMarca = $scope.produto.idMarca;

            ProdutoServ.cadastrarProduto(produto).then(function(res) {
                if(res.status) {
                    window.location.reload();
                } else {
                    console.log(res.message);
                }
                }, function(err) {
                    console.log(err)
            });
    };

    $scope.cadastrarProdutoCategoria = function() {

        let produto = {};
        produto.idProduto = $scope.produto.idProduto;
        produto.idCategoria = $scope.categoria.idCategoria;

            ProdutoServ.cadastrarProdutoCategoria(produto).then(function(res){
                if(res.status) {
                    //window.location.reload();
                    alert("Cadastro na tabela relacionamento ProdutoCategoria realizado!");
                } else {
                    console.log(res.message);
                }
                }, function(err) {
                    console.log(err)
            });

    };

    $scope.cadastrarProdutoLoja = function() {
        let produto = {};
        produto.idProduto = $scope.produto.idProduto;
        produto.idLoja = $scope.loja.idLoja;
        produto.linkAfiliado = $scope.loja.linkAfiliado;
        produto.link = $scope.loja.link;
        produto.preco = $scope.loja.preco;
        produto.parcelas = $scope.loja.parcelas;

        //Verifica na tabela se ja existe relacionamneto entra o produto e a loja e se ja existir
        //acrescendo uma quantidade
        for(let i=0;i<$scope.listaProdutoLojas.length;i++){
            if($scope.listaProdutoLojas[i].idProduto == produto.idProduto &&
                $scope.listaProdutoLojas[i].idLoja == produto.idLoja){
                produto.quantidade = $scope.listaProdutoLojas[i].quantidade;
                produto.quantidade++;
                break;
            }
        }
        // se o relacionamento ainda não existe
        if(!produto.quantidade){
            ProdutoServ.cadastrarProdutoLoja(produto).then(function(res){
                if(res.status) {
                    //window.location.reload();
                    alert('Cadastro na tabela relacionamento ProdutoLoja realizado!');
                } else {
                    console.log(res.message);
                }
                }, function(err) {
                    console.log(err)
            });
        }else{// caso exista edita, acrescentando a quantidade
            ProdutoServ.editarProdutoLoja(produto).then(function(res) {
                // alert(res.message);
                //window.sessionStorage.setItem('mensagem', res.message);
                window.location.reload();
                console.log('Atualizado tabela relacionamento ProdutoLoja!');
                
            });
        }

    };

    $scope.cadastrarMarca = function() {

        let marca = $scope.marca;
        marca.nomeMarca = $scope.marca.nomeMarca;

        ProdutoServ.cadastrarMarca(marca).then(function(res) {
        if(res.status) {
            //window.location.reload();
            alert("Marca cadastrada!")
        } else {
            console.log(res.message);
        }
        }, function(err) {
            console.log(err)
        });
    };

    $scope.cadastrarNicho = function() {

        let nicho = $scope.nicho;
        nicho.nomeNicho = $scope.nicho.nomeNicho;

        ProdutoServ.cadastrarNicho(nicho).then(function(res) {
        if(res.status) {
            //window.location.reload();
            alert("Nicho cadastrado!")
        } else {
            console.log(res.message);
        }
        }, function(err) {
            console.log(err)
        });
    };

    $scope.cadastrarLoja = function() {

        let loja = $scope.loja;
        loja.nomeLoja = $scope.loja.nomeLoja;
        loja.link = $scope.loja.link;

        ProdutoServ.cadastrarLoja(loja).then(function(res) {
        if(res.status) {
            //window.location.reload();
            alert("Loja cadastrada!")
        } else {
            console.log(res.message);
        }
        }, function(err) {
            console.log(err)
        });
    };

    $scope.cadastrarCategoria = function() {

        let categoria = $scope.categoria;
        categoria.nomeCategoria = $scope.categoria.nomeCategoria;
        ProdutoServ.cadastrarCategoria(categoria).then(function(res) {
        if(res.status) {
            //window.location.reload();
            alert("Categoria cadastrada!")
        } else {
            console.log(res.message);
        }
        }, function(err) {
            console.log(err)
        });
    };

    $scope.cadastrarTipoCategoria = function() {

        let tipo = {};
        tipo.idTipo = $scope.tipo.idTipo;
        tipo.idCategoria = $scope.categoria.idCategoria;

        // se o relacionamento ainda não existe
        ProdutoServ.cadastrarTipoCategoria(tipo).then(function(res){
            if(res.status) {
                //window.location.reload();
                alert("Cadastro na tabela relacionamento TipoCategoria realizado!")
            } else {
                console.log(res.message);
            }
            }, function(err) {
                console.log(err)
        });
    };

    $scope.acrescentarClique = function(produto){
        produto.cliques++;
        ProdutoServ.editarProdutoClique(produto).then(function(res) {
            if(res.status) {
                //console.log('Cliques atualizado!');
            } else {
                //console.log(res.message);
            }
            }, function(err) {
                //console.log(err)
        });
    };
}])