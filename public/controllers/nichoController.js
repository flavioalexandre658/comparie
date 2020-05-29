angular.module('myApp')
.controller('nichoController', ['$scope', '$log','NichoServ','$location','$window', function ($scope, $log, NichoServ, $location, $window) {
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

    $scope.cadastrarNicho = function() {

        let nicho = $scope.nicho;
        nicho.nomeNicho = $scope.nicho.nomeNicho;

        NichoServ.cadastrarNicho(nicho).then(function(res) {
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