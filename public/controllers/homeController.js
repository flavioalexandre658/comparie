angular.module('myApp')
.controller('homeController', ['$scope', '$log','HomeServ','$location','$window', function ($scope, $log, HomeServ, $location, $window) {
    $scope.load = function() {
        let script1 = document.createElement('script');
        let script2 = document.createElement('script');
        script1.type = 'text/javascript';
        script2.type = 'text/javascript';
        script1.src = "lib/js/code.js";
        script2.src = "lib/js/scrollreveal.min.js";
        document.body.appendChild(script1);
        document.body.appendChild(script2);
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