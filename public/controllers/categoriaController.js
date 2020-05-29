angular.module('myApp')
.controller('categoriaController', ['$scope', '$log','CategoriaServ','$location','$window', function ($scope, $log, CategoriaServ, $location, $window) {
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

    CategoriaServ.getTipos().then(function(data) {
        $scope.listaTipos = data;
    });

    CategoriaServ.getTipoCategorias().then(function(data) {
        $scope.listaTipoCategorias = data;
    });

    $scope.cadastrarCategoria = function() {

        let categoria = $scope.categoria;
        categoria.nomeCategoria = $scope.categoria.nomeCategoria;
        CategoriaServ.cadastrarCategoria(categoria).then(function(res) {
        if(res.status) {
            window.location.reload();
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
        CategoriaServ.cadastrarTipoCategoria(tipo).then(function(res){
            if(res.status) {
                window.location.reload();
                console.log('Cadastro na tabela relacionamento TipoCategoria realizado!');
            } else {
                console.log(res.message);
            }
            }, function(err) {
                console.log(err)
        });
    };

}])