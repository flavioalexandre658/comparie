angular.module('myApp')
.controller('tipoController', ['$scope', '$rootScope','$log','TipoServ','$location','$window', 'breadcrumbs', '$routeParams', function ($rootScope, $scope, $log, TipoServ, $location, $window, breadcrumbs,$routeParams) {

    TipoServ.getCategorias().then(function(data) {
        // Bloco abaixo carrega na Session a Lista para evitar de ta requisitando o servidor
        let loadListaCategorias = sessionStorage.getItem('listaCategorias');
        if(loadListaCategorias == null || loadListaCategorias == undefined){
            $scope.listaCategorias = data;
            sessionStorage.setItem("listaCategorias", JSON.stringify(data));
        }else{
            $scope.listaCategorias = JSON.parse(loadListaCategorias);
        }
        // --- FIM CARREGA NA SESSION

        let loadListaCategoriasTipoClicado = sessionStorage.getItem('listaCategoriasTipoClicado');
        $scope.listaCategoriasTipoClicado = JSON.parse(loadListaCategoriasTipoClicado);
    });

    TipoServ.getTipos().then(function(data) {
        // Bloco abaixo carrega na Session a Lista para evitar de ta requisitando o servidor
        let loadListaTipos = sessionStorage.getItem('listaTipos');
        if(loadListaTipos == null || loadListaTipos == undefined){
            $scope.listaTipos = data;
            sessionStorage.setItem("listaTipos", JSON.stringify(data));
        }else{
            $scope.listaTipos = JSON.parse(loadListaTipos);
        }

        let nomeRota = $location.path().split('/')[1];
        if($scope.listaTipos != undefined){
            let tipoRota = $scope.listaTipos.filter(function(arr){
                return arr.nomeTipo.toLowerCase() === nomeRota;
            });

            if(tipoRota.length > 0){
                $scope.tipoClicado(tipoRota[0]);
            }
        }

    });

    TipoServ.getProdutos().then(function(data) {
        // Bloco abaixo carrega na Session a Lista para evitar de ta requisitando o servidor
        let loadListaProdutos = sessionStorage.getItem('listaProdutos');
        if(loadListaProdutos == null || loadListaProdutos == undefined){
            $scope.listaProdutos = data;
            sessionStorage.setItem("listaProdutos", JSON.stringify(data));
        }else{
            $scope.listaProdutos = JSON.parse(loadListaProdutos);
        }

        let loadListaProdutosTipoClicado = sessionStorage.getItem('listaProdutosTipoClicado');
        $scope.listaProdutosTipoClicado = JSON.parse(loadListaProdutosTipoClicado);
    });

    TipoServ.getMarcas().then(function(data) {
        // Bloco abaixo carrega na Session a Lista para evitar de ta requisitando o servidor
        let loadListaMarcas = sessionStorage.getItem('listaMarcas');
        if(loadListaMarcas == null || loadListaMarcas == undefined){
            $scope.listaMarcas = data;
            sessionStorage.setItem("listaMarcas", JSON.stringify(data));
        }else{
            $scope.listaMarcas = JSON.parse(loadListaMarcas);
        }

        let loadListaMarcasTipoClicado = sessionStorage.getItem('listaMarcasTipoClicado');
        $scope.listaMarcasTipoClicado = JSON.parse(loadListaMarcasTipoClicado);

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
        // Bloco abaixo carrega na Session a Lista para evitar de ta requisitando o servidor
        let loadListaTipoCategorias = sessionStorage.getItem('listaTipoCategorias');
        if(loadListaTipoCategorias == null || loadListaTipoCategorias == undefined){
            $scope.listaTipoCategorias = data;
            sessionStorage.setItem("listaTipoCategorias", JSON.stringify(data));
        }else{
            $scope.listaTipoCategorias = JSON.parse(loadListaTipoCategorias);
        }
    });

    TipoServ.getLojas().then(function(data) {
        $scope.listaLojas = data.sort(function(a,b){ // Ordena a lista de forma crescente
            return a.idLoja - b.idLoja;
        })
    });

    TipoServ.getProdutoLojas().then(function(data) {
        // Bloco abaixo carrega na Session a Lista para evitar de ta requisitando o servidor
        let loadListaProdutoLojas = sessionStorage.getItem('listaProdutoLojas');
        if(loadListaProdutoLojas == null || loadListaProdutoLojas == undefined){
            $scope.listaProdutoLojas = data;
            sessionStorage.setItem("listaProdutoLojas", JSON.stringify(data));
        }else{
            $scope.listaProdutoLojas = JSON.parse(loadListaProdutoLojas);
        }
        let loadFaixasPreco = sessionStorage.getItem('faixasPreco');
        $scope.faixasPreco = JSON.parse(loadFaixasPreco);
    });

    TipoServ.getProdutoCategorias().then(function(data) {
        $scope.listaProdutoCategorias = data;
    });

    $scope.tipoClicado = function(tipo) {
        if($scope.listaTipoCategorias != undefined && $scope.listaCategorias != undefined
            && $scope.listaProdutos != undefined && $scope.listaMarcas != undefined
            && $scope.listaProdutoLojas != undefined){
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
            sessionStorage.setItem("listaCategoriasTipoClicado", JSON.stringify($scope.listaCategoriasTipoClicado));
            sessionStorage.setItem("listaProdutosTipoClicado", JSON.stringify($scope.listaProdutosTipoClicado));
            sessionStorage.setItem("listaMarcasTipoClicado", JSON.stringify($scope.listaMarcasTipoClicado));
            sessionStorage.setItem("faixasPreco", JSON.stringify($scope.faixasPreco));
        }
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
    
    $scope.load = function() {

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

        $scope.faixasPreco;
        $scope.id_card = Math.floor(Math.random() * 65536);
        $scope.location = $location;
        $scope.breadcrumbs = breadcrumbs;

    };
    $scope.load();

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
            if(element.preco2 == value)
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
            if(preco > 600 && preco <= 1500 && verificaFaixaPreco(faixas, 1500) == false){
                faixas.push({preco1:600, preco2:1500});
            }else if(preco > 1500 && preco <= 2500 && verificaFaixaPreco(faixas, 2500) == false){
                faixas.push({preco1:1500, preco2:2500});
            }else if(preco > 2500 && preco <= 3500 && verificaFaixaPreco(faixas, 3500) == false){
                faixas.push({preco1:2500, preco2:3500});
            }else if(preco > 3500 && preco <= 5000 && verificaFaixaPreco(faixas, 5000) == false){
                faixas.push({preco1:3500, preco2:5000});
            }
        }
        faixas = faixas.sort(function(a,b){ // Ordena a lista de forma crescente
            return a.preco1 - b.preco1;
        })
        return faixas;
    }

    $scope.visivel = false;
    $scope.filtroRota = $routeParams.param;
}])