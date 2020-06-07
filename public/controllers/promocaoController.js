angular.module('myApp')
.controller('promocaoController', ['$scope', '$log','PromocaoServ','$location','$window', function ($scope, $log, PromocaoServ, $location, $window) {
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

    PromocaoServ.getPromocoes().then(function(data) {
        $scope.listaPromocoes = data;
    });

    PromocaoServ.getLojas().then(function(data) {
        $scope.listaLojas = data;
    });

    PromocaoServ.getPromocaoLojas().then(function(data) {
        $scope.listaPromocaoLojas = data;
    });

    $scope.cadastrarPromocao = function() {

        let promocao = $scope.promocao;
        promocao.nomePromocao = $scope.promocao.nomePromocao;
        promocao.dataInicio = $scope.promocao.dataInicio;
        promocao.dataFim = $scope.promocao.dataFim;
        PromocaoServ.cadastrarPromocao(promocao).then(function(res) {
            if(res.status) {
                window.location.reload();
                alert(res.message)
            } else {
                console.log(res.message);
            }
            }, function(err) {
                console.log(err)
        });
    };

    $scope.cadastrarPromocaoLoja = function() {

        let promocao = $scope.promocao;
        promocao.idLoja = $scope.loja.idLoja;
        promocao.idPromocao = $scope.promocao.idPromocao;
        promocao.bannerPromocao = $scope.promocao.bannerPromocao;
        promocao.bannerPromocaoMobile = $scope.promocao.bannerPromocaoMobile;
        promocao.linkAfiliado = $scope.promocao.linkAfiliado;

        PromocaoServ.cadastrarPromocaoLoja(promocao).then(function(res) {
            if(res.status) {
                //window.location.reload();
                alert(res.message)
            } else {
                console.log(res.message);
            }
            }, function(err) {
                console.log(err)
        });
    };

    $scope.editarPromocao = function(){
        let promocao = $scope.promocao;
        promocao.nomePromocao = $scope.promocao.nomePromocao;
        promocao.bannerPromocao = $scope.promocao.bannerPromocao;
        promocao.linkAfiliado = $scope.promocao.linkAfiliado;
        promocao.dataInicio = $scope.promocao.dataInicio;
        promocao.dataFim = $scope.promocao.dataFim;

        PromocaoServ.editarPromocao(promocao).then(function(res) {
            window.location.reload();       
            alert(res.message);     
        });
    }

    $scope.removerPromocao = function(){
        let promocao = $scope.promocao;
        promocao.idPromocao = $scope.promocao.idPromocao;

        PromocaoServ.removerPromocao(promocao).then(function(res) {        
        });
    }

}]);