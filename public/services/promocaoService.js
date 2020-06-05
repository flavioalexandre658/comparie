angular.module('services')
.factory('PromocaoServ', ['$http', function ($http,$httpProvider) {

    //var baseUrl = "http://localhost:3000";     // Para desenvolvimento - uso local
    var baseUrl = "https://comparie.com.br";// Para LINK externo - mandar sempre esse para develop

    return {
        cadastrarPromocao: function (data) {
            return $http.post(baseUrl + '/cadastrarPromocao', data).then(function (response) {
                return response.data;
            });
        },
        getPromocoes: function () {
            return $http.get(baseUrl + '/getPromocoes/').then(function (response) {
                return response.data;
            });
        },
        cadastrarPromocaoLoja: function (data) {
            return $http.post(baseUrl + '/cadastrarPromocaoLoja', data).then(function (response) {
                return response.data;
            });
        },
        getLojas: function () {
            return $http.get(baseUrl + '/getLojas/').then(function (response) {
                return response.data;
            });
        },
        editarPromocao: function (data) {
            return $http.get(baseUrl + '/editarPromocao/' + data['idPromocao']).then(function (response) {
                return response.data;
            });
        },
        removerPromocao: function (data) {
            return $http.get(baseUrl + '/removerPromocao/' + data['idPromocao']).then(function (response) {
                return response.data;
            });
        },
        getPromocaoLojas: function () {
            return $http.get(baseUrl + '/getPromocaoLojas/').then(function (response) {
                return response.data;
            });
        }

    };
}]);