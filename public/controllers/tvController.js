angular.module('myApp')
.controller('tvController', ['$scope', '$log','TvServ','$location','$window', function ($scope, $log, TvServ, $location, $window) {
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

    TvServ.getProdutos().then(function(data) {
        $scope.listaProdutos = data;
    });

    TvServ.getLojas().then(function(data) {
        $scope.listaLojas = data.sort(function(a,b){ // Ordena a lista de forma crescente
            return a.idLoja - b.idLoja;
        })
    });

    TvServ.getProdutoLojas().then(function(data) {
        $scope.listaProdutoLojas = data;
    });

    TvServ.getProdutoCategorias().then(function(data) {
        $scope.listaProdutoCategorias = data;
    });


    
}])