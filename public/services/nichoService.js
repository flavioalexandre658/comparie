angular.module('services')
.factory('NichoServ', ['$http', function ($http,$httpProvider) {

    //var baseUrl = "http://localhost:3000";     // Para desenvolvimento - uso local
    var baseUrl = "https://comparie.com.br";// Para LINK externo - mandar sempre esse para develop

    return {
        cadastrarNicho: function (data) {
            return $http.post(baseUrl + '/cadastrarNicho', data).then(function (response) {
                return response.data;
            });
        },
        getNichos: function () {
            return $http.get(baseUrl + '/getNichos/').then(function (response) {
                return response.data;
            });
        },
        getNicho: function (data) {
            return $http.get(baseUrl + '/getNicho/' + data['idNicho']).then(function (response) {
                return response.data;
            });
        }

    };
}]);