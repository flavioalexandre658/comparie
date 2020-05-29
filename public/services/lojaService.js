angular.module('services')
.factory('LojaServ', ['$http', function ($http,$httpProvider) {

    //var baseUrl = "http://localhost:3000";     // Para desenvolvimento - uso local
    var baseUrl = "http://comparie.com.br";// Para LINK externo - mandar sempre esse para develop

    return {
        cadastrarLoja: function (data) {
            return $http.post(baseUrl + '/cadastrarLoja', data).then(function (response) {
                return response.data;
            });
        },
        getLojas: function () {
            return $http.get(baseUrl + '/getLojas/').then(function (response) {
                return response.data;
            });
        },
        getLoja: function (data) {
            return $http.get(baseUrl + '/getLoja/' + data['idLoja']).then(function (response) {
                return response.data;
            });
        }

    };
}]);