angular.module('services')
.factory('MarcaServ', ['$http', function ($http,$httpProvider) {

    //var baseUrl = "http://localhost:3000";     // Para desenvolvimento - uso local
    var baseUrl = "https://comparie.com.br";// Para LINK externo - mandar sempre esse para develop

    return {
        cadastrarMarca: function (data) {
            return $http.post(baseUrl + '/cadastrarMarca', data).then(function (response) {
                return response.data;
            });
        },
        getMarcas: function () {
            return $http.get(baseUrl + '/getMarcas/').then(function (response) {
                return response.data;
            });
        },
        getMarca: function (data) {
            return $http.get(baseUrl + '/getMarca/' + data['idMarca']).then(function (response) {
                return response.data;
            });
        }

    };
}]);