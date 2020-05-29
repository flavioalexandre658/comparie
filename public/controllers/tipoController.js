angular.module('myApp')
.controller('tipoController', ['$scope', '$rootScope', '$log','TipoServ','$location','$window', 'breadcrumbs', function ($rootScope, $scope, $log, TipoServ, $location, $window, breadcrumbs) {
    $scope.load = function() {
        let script1 = document.createElement('script');
        let script2 = document.createElement('script');
        script1.type = 'text/javascript';
        script2.type = 'text/javascript';
        script1.src = "lib/js/code.js";
        script2.src = "lib/js/scrollreveal.min.js";
        document.body.appendChild(script1);
        document.body.appendChild(script2);
        //Ativa todos os produtos para serem exibidos no nav
        $scope.filtro = {nomeFiltro: 'todos'};
        $('#myTab a[href="#pillespecifico"]').tab('show');
        $scope.busca = sessionStorage.getItem('pesquisa');
        window.sr = ScrollReveal();
        sr.reveal('.reveall', {
            duration: 3000,
            origin: 'left',
            distance: '100px',
            afterReveal: function(el) {
                //el.removeClass('reveall');
            }
        });
    };
    $scope.load();
    $scope.faixasPreco;
    $scope.id_card = Math.floor(Math.random() * 65536);
    $scope.location = $location;
    $scope.breadcrumbs = breadcrumbs;

    TipoServ.getCategorias().then(function(data) {
        let loadListaCategorias = sessionStorage.getItem('listaCategorias');
        $scope.listaCategoriasTipoClicado = JSON.parse(loadListaCategorias);
        $scope.listaCategorias = data;
    });

    TipoServ.getTipos().then(function(data) {
        $scope.listaTipos = data;
    });

    TipoServ.getProdutos().then(function(data) {
        let loadListaProdutos = sessionStorage.getItem('listaProdutos');
        $scope.listaProdutosTipoClicado = JSON.parse(loadListaProdutos);
        $scope.listaProdutos = data;
    });

    TipoServ.getMarcas().then(function(data) {
        let loadListaMarcas = sessionStorage.getItem('listaMarcas');
        $scope.listaMarcasTipoClicado = JSON.parse(loadListaMarcas);

        //Carrega a listaMarcasSelecionada ao relogar pagina
        let listaProdutoComMesmaCategoriaTipoMarca
        if($scope.listaProdutosTipoClicado != undefined){
            listaProdutoComMesmaCategoriaTipoMarca = $scope.listaMarcasTipoClicado.filter(function(arr1) {
                return $scope.listaProdutosTipoClicado.some(function(arr2) {
                    return arr1.idMarca === arr2.idMarca;
                })
            })
        }

        $scope.listaMarcasSelecionada = listaProdutoComMesmaCategoriaTipoMarca;

        $scope.listaMarcas = data;
    });

    TipoServ.getTipoCategorias().then(function(data) {
        $scope.listaTipoCategorias = data;
    });

    TipoServ.getLojas().then(function(data) {
        $scope.listaLojas = data.sort(function(a,b){ // Ordena a lista de forma crescente
            return a.idLoja - b.idLoja;
        })
    });

    TipoServ.getProdutoLojas().then(function(data) {
        let loadFaixasPreco = sessionStorage.getItem('faixasPreco');
        $scope.faixasPreco = JSON.parse(loadFaixasPreco);
        $scope.listaProdutoLojas = data;
    });

    TipoServ.getProdutoCategorias().then(function(data) {
        $scope.listaProdutoCategorias = data;
    });

    $scope.tipoClicado = function(tipo) {

        /*
            *Percorre a listaTipoCategorias(->arr), verifica qual é o idTipo igual ao tipo.idTipo que foi clicado
        */
        let listaCategoriasTipoClicado = $scope.listaTipoCategorias.filter(function(arr){
			return arr.idTipo === tipo.idTipo;
        });

        /*
            *Percorre a listaCategorias(->arr1), verifica percorrendo listaCategoriasTipoClicado(->arr2),
            onde o arr.idCategoria é igual arr2.idCategoria
        */
        let listaCategoriaComMesmaCategoriaTipo = $scope.listaCategorias.filter(function(arr1) {
            return listaCategoriasTipoClicado.some(function(arr2) {
                return arr1.idCategoria === arr2.idCategoria;
            })
        })

        /*
            *Percorre a listaProdutos(->arr), verifica qual é o idTipo igual ao tipo.idTipo que foi clicado
        */
        let listaProdutosTipoClicado = $scope.listaProdutos.filter(function(arr){
			return arr.idTipo === tipo.idTipo;
        });
        
        /* Define a listaMarcasTipoClicado */
        let listaMarcasTipoClicado = $scope.listaMarcas.filter(function(arr1) {
            return listaProdutosTipoClicado.some(function(arr2) {
                return arr1.idMarca === arr2.idMarca;
            })
        })
        /* Define a listaProdutoLojaTipoClicado (para preencher a  faixa de preço) */
        let listaPodutoLojaTipoClicado = $scope.listaProdutoLojas.filter(function(arr1) {
            return listaProdutosTipoClicado.some(function(arr2) {
                return arr1.idProduto === arr2.idProduto;
            })
        })

        $scope.faixasPreco = defineFaixasPreco(listaPodutoLojaTipoClicado);
        $scope.listaCategoriasTipoClicado = listaCategoriaComMesmaCategoriaTipo;
        $scope.listaProdutosTipoClicado =  listaProdutosTipoClicado;
        $scope.listaMarcasTipoClicado = listaMarcasTipoClicado;
        $scope.listaProdutosSelecionada = null;
        //Armazena as variaveis para caso a página seja recarregada
        sessionStorage.setItem("listaCategorias", JSON.stringify($scope.listaCategoriasTipoClicado));
        sessionStorage.setItem("listaProdutos", JSON.stringify($scope.listaProdutosTipoClicado));
        sessionStorage.setItem("listaMarcas", JSON.stringify($scope.listaMarcasTipoClicado));
        sessionStorage.setItem("faixasPreco", JSON.stringify($scope.faixasPreco));
    }

    $scope.defineCategoria = function(categoria) {
        $scope.filtro = {nomeFiltro: categoria.nomeCategoria};
        /*
            *Percorre a listaProdutoCategorias(->arr), verifica qual é o idCategoria igual ao categora.idCategoria que foi clicado
        */
        let listaProdutoCategoriaComMesmaCategoria = $scope.listaProdutoCategorias.filter(function(arr){
			return arr.idCategoria === categoria.idCategoria;
        });

        /*
            *Percorre a listaProdutosTipoClicado(->arr1), verifica percorrendo listaProdutoCategoriaComMesmaCategoria(->arr2),
            onde o arr.idProduto é igual arr2.idProduto
        */
        let listaProdutoComMesmaCategoriaTipo= $scope.listaProdutosTipoClicado.filter(function(arr1) {
            return listaProdutoCategoriaComMesmaCategoria.some(function(arr2) {
                return arr1.idProduto === arr2.idProduto;
            })
        })
        /* Atualiza a listaMarcasSelecinada */
        let listaProdutoComMesmaCategoriaTipoMarca = $scope.listaMarcasTipoClicado.filter(function(arr1) {
            return listaProdutoComMesmaCategoriaTipo.some(function(arr2) {
                return arr1.idMarca === arr2.idMarca;
            })
        })
        /* Atualiza as faixasPreco */
        let listaPodutoLojaComMesmaCategoriaTipoMarcaPreco = $scope.listaProdutoLojas.filter(function(arr1) {
            return listaProdutoComMesmaCategoriaTipo.some(function(arr2) {
                return arr1.idProduto === arr2.idProduto;
            })
        })

        $scope.faixasPreco = defineFaixasPreco(listaPodutoLojaComMesmaCategoriaTipoMarcaPreco);
        $scope.listaMarcasSelecionada = listaProdutoComMesmaCategoriaTipoMarca;
        $scope.listaProdutosSelecionada = listaProdutoComMesmaCategoriaTipo;
    };

    let objectToArray = function(obj) {
        var _arr = [];
    
        for (var key in obj) {
            _arr.push([key, obj[key]]);
        }
        return _arr;
    }

    $scope.defineMarca = function(marca, listaProdutos){	
        $scope.filtro = { nomeFiltro: 'marcas' };

        if(marca.selecionado){
            /*
                *Percorre a listaProdutoCategorias(->arr), verifica qual é o idCategoria igual ao categora.idCategoria que foi clicado
            */
            let listaProdutoComMesmaMarca = listaProdutos.filter(function(arr){
                return arr.idMarca === marca.idMarca;
            });

            /* Atualiza as faixasPreco */
            let listaPodutoLojaComMesmoTipoMarcaPreco = $scope.listaProdutoLojas.filter(function(arr1) {
                return listaProdutoComMesmaMarca.some(function(arr2) {
                    return arr1.idProduto === arr2.idProduto;
                })
            })

            $scope.faixasPreco = defineFaixasPreco(listaPodutoLojaComMesmoTipoMarcaPreco);
            $scope.listaProdutosSelecionada = listaProdutoComMesmaMarca;
        }
    }

    $scope.buscaProduto = function(busca){
        $scope.busca = busca;
        sessionStorage.setItem("pesquisa", busca);
        $scope.listaProdutosSelecionada = $scope.listaProdutos;
    }

    $scope.definePreco = function(faixaPreco, listaProdutos){
        $scope.filtro = { nomeFiltro: 'precos' };

        if(faixaPreco.selecionado){
            /* Define os produtos dentro da faixa de preco */
            let listaProdutoLojaFaixaPreco = $scope.listaProdutoLojas.filter(function(arr) {
                let preco = convertePreco(arr.preco);
                return preco >= parseFloat(faixaPreco.preco1) && preco <= parseFloat(faixaPreco.preco2);
            })

            /* Atualiza a listaProdutoSelecionado */
            let listaProdutoFaixaPreco;
            if($scope.listaProdutosSelecionada != undefined && $scope.listaProdutosSelecionada != null){
                listaProdutoFaixaPreco = $scope.listaProdutosSelecionada.filter(function(arr1) {
                    return listaProdutoLojaFaixaPreco.some(function(arr2) {
                        return arr1.idProduto === arr2.idProduto;
                    })
                })
            }else{
                listaProdutoFaixaPreco = listaProdutos.filter(function(arr1) {
                    return listaProdutoLojaFaixaPreco.some(function(arr2) {
                        return arr1.idProduto === arr2.idProduto;
                    })
                })
            }

            /* Atualiza a listaMarcaSelecionada */
            let listaProdutoFaixaPrecoMarca = $scope.listaMarcasTipoClicado.filter(function(arr1) {
                return listaProdutoFaixaPreco.some(function(arr2) {
                    return arr1.idMarca === arr2.idMarca;
                })
            })

            $scope.listaMarcasSelecionada = listaProdutoFaixaPrecoMarca;
            $scope.listaProdutosSelecionada = listaProdutoFaixaPreco;
        }
    }
    
    // Converte preco de String para Float considerando casas decimais
    let convertePreco = function(preco){
        let preco_convertido;
        if(preco.indexOf(".") != -1){
            preco_convertido = parseFloat(preco) * 1000;
        }else{
            preco_convertido = parseFloat(preco);
        }
        return preco_convertido;
    }

    //Verifica se ja contem a faixa de preço no array (evita ter mesma faixa repetida)
    let verificaFaixaPreco = function(array,value){
        let contem = false;
        array.forEach(function(element){
            if(element.preco2 <= value)
            {
                contem = true;
            }
        });
        return contem;
    }

    //Define faixa de preco de acordo com os preços de uma lista de produtos
    let defineFaixasPreco = function(listaProdutoLoja){
        let faixas = [];
        for(let i=0;i<listaProdutoLoja.length;i++){
            let preco = convertePreco(listaProdutoLoja[i].preco);
            if(preco >= 600 && preco <= 1500 && verificaFaixaPreco(faixas, 1500) == false){
                faixas.push({preco1:600, preco2:1500});
            }else if(preco > 1500 && preco <= 2500 && verificaFaixaPreco(faixas, 2500) == false){
                faixas.push({preco1:1500, preco2:2500});
            }else if(preco > 2500 && preco <= 3500 && verificaFaixaPreco(faixas, 3500) == false){
                faixas.push({preco1:2500, preco2:3500});
            }else if(preco > 3500 && preco <= 5000 && verificaFaixaPreco(faixas, 5000) == false){
                faixas.push({preco1:3500, preco2:5000});
            }
        }
        return faixas;
    }
}])