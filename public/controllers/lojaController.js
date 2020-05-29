angular.module('myApp')
.controller('lojaController', ['$scope', '$log','LojaServ','$location','$window', function ($scope, $log, LojaServ, $location, $window) {
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

    $scope.cadastrarLoja = function() {

        let loja = $scope.loja;
        loja.nomeLoja = $scope.loja.nomeLoja;
        loja.link = $scope.loja.link;

        LojaServ.cadastrarLoja(loja).then(function(res) {
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