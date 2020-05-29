angular.module('myApp')
.controller('marcaController', ['$scope', '$log','MarcaServ','$location','$window', function ($scope, $log, MarcaServ, $location, $window) {
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

    $scope.cadastrarMarca = function() {

        let marca = $scope.marca;
        marca.nomeMarca = $scope.marca.nomeMarca;

        MarcaServ.cadastrarMarca(marca).then(function(res) {
        if(res.status) {
            window.location.reload();
        } else {
            console.log(res.message);
        }
        }, function(err) {
            console.log(err)
        });
    };

}])