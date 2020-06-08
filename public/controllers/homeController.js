angular.module('myApp')
.controller('homeController', ['$scope', '$log','HomeServ','$location','$window', function ($scope, $log, HomeServ, $location, $window) {
    $scope.load = function() {
        if (screen.width < 640 || screen.height < 480) {
            // sirva a versão pra celular
            $scope.onMobile = true;
        } else if (screen.width < 1024 || screen.height < 768) {
              // talvez seja uma boa usar versão pra tablet
            $scope.onMobile = true;
        } else {
              // sirva a versão normal
            $scope.onMobile = false;
        }
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
    $scope.id_card = Math.floor(Math.random() * 65536);

    HomeServ.getNichos().then(function(data) {
        $scope.listaNichos = data;
    });

    HomeServ.getLojas().then(function(data) {
        $scope.listaLojas = data.sort(function(a,b){ // Ordena a lista de forma crescente
            return a.idLoja - b.idLoja;
        })
    });

    HomeServ.getPromocaoLojas().then(function(data) {
        if(data.length > 0){// As condições abaixo vao verificar se existe alguma loja com a promoção vencida
                            // irá deletar a promocão e as lojas ligadas a elas automaticamente.
            let loadListaPromocaoVencida = sessionStorage.getItem('listaPromocaoVencida');
            let listaPromocaoVencida = JSON.parse(loadListaPromocaoVencida);
            let listaPromocaoLojaVencida = null;
            if(listaPromocaoVencida != null && listaPromocaoVencida != undefined){
                listaPromocaoLojaVencida = data.filter(function(arr1) {//retorna a lista de lojas ligada a promocao vencida
                    return listaPromocaoVencida.some(function(arr2) {
                        return arr1.idPromocao === arr2.idPromocao;
                    })
                })
            }
            if(listaPromocaoLojaVencida != null && listaPromocaoLojaVencida != undefined && listaPromocaoLojaVencida.length > 0){
                for(let i=0;i < listaPromocaoLojaVencida.length; i++){
                    HomeServ.removerPromocaoLoja(listaPromocaoLojaVencida[i]).then(function(res) {//deleta todas lojas com a promocao vencida
                    });
                }
            }
        }
        $scope.listaPromocaoLojas = data;
    });

    HomeServ.getPromocoes().then(function(data) {
        if(data.length > 0){ // As condições abaixo vao verificar se ja chegou na data final da promocao
                            // irá deletar a promocão e as lojas ligadas a elas automaticamente.
            let listaPromocaoVencida = data.filter(function(arr) {
                const hoje = new Date(); // Data de hoje
                const fimPromocao = new Date(arr.dataFim.toString()); // Data fim promocao
                const dif = Math.abs(hoje.getTime() - fimPromocao.getTime()); // Subtrai uma data pela outra
                const dias = Math.ceil(dif / (1000 * 60 * 60 * 24)); // Divide o total pelo total de milisegundos correspondentes a 1 dia. (1000 milisegundos = 1 segundo).
                return dias === 2; // Se dias == 2 é um dia após a dataFim da promoção
            })
            sessionStorage.setItem("listaPromocaoVencida", JSON.stringify(listaPromocaoVencida));//Armazena no browser as promocoes vencidas
            if(listaPromocaoVencida != null && listaPromocaoVencida != undefined && listaPromocaoVencida.length > 0){
                for(let i=0;i < listaPromocaoVencida.length; i++){
                    HomeServ.removerPromocao(listaPromocaoVencida[i]).then(function(res) {//remove todas promocoes vencidas
                    });
                }
            }
        }
        $scope.listaPromocoes = data;
    });

    HomeServ.getProdutoLojas().then(function(data) {
        let
        listaCrescenteProdutoLojas = data;

        //Ordena os produtos de forma decrescente de acordo com o numero de cliques
        listaCrescenteProdutoLojas = listaCrescenteProdutoLojas.sort(function(a,b){
            return convertePreco(a.preco) - convertePreco(b.preco);
        })
        $scope.listaProdutoLojas = listaCrescenteProdutoLojas;

    });

    HomeServ.getProdutos().then(function(data) {

        $scope.listaProdutos = data;

        //Ordena os produtos de forma decrescente de acordo com o numero de cliques
        let listaCrescente = data.sort(function(a,b){
            return b.cliques - a.cliques;
        })

        $scope.listaPesquisados = listaCrescente.slice(0,12);;
        $scope.listaCrescenteSugestao = listaCrescente;
    });

    $scope.defineListaSugestao = function(nicho) {
        $scope.nichoClicado = nicho;
        let sugestoes = document.getElementById('sugestoesNicho');
        sugestoes.focus();
        $('#sugestoesNicho').collapse({
                toggle: true
        })

        let listaMaisClicadosSugestao = $scope.listaCrescenteSugestao.filter(function(arr) {
            return arr.idNicho == nicho.idNicho;
        })
        
        $scope.listaSugestao = listaMaisClicadosSugestao.slice(0,8);
    };

    $scope.showModal = function(id){
        $("#"+id).modal('show');
    }

    $scope.generateId = function(genId){
        console.log(genId)
        $scope.genId = genId + 1;
    };

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
}])