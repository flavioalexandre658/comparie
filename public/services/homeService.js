angular.module('services')
  .factory('HomeServ', ['$http', function ($http, $httpProvider) {

    //var baseUrl = "http://localhost:3000";     // Para desenvolvimento - uso local
    var baseUrl = "https://comparie.com.br";// Para LINK externo - mandar sempre esse para develop

    return {
      /// Retorna o cliente que vai preencher a subtela de edição
    getProdutos: function (data) {
        return $http.get(baseUrl + '/getProdutos/').then(function (response) {
            return response.data;
        });
    },
    getLojas: function (data) {
        return $http.get(baseUrl + '/getLojas/').then(function (response) {
            return response.data;
        });
    },
    getNichos: function (data) {
        return $http.get(baseUrl + '/getNichos/').then(function (response) {
            return response.data;
        });
    },
    getProdutoLojas: function () {
        return $http.get(baseUrl + '/getProdutoLojas/').then(function (response) {
            return response.data;
        });
    },
    getPromocoes: function () {
        return $http.get(baseUrl + '/getPromocoes/').then(function (response) {
            return response.data;
        });
    },
    getPromocaoLojas: function () {
        return $http.get(baseUrl + '/getPromocaoLojas/').then(function (response) {
            return response.data;
        });
    },
    removerPromocao: function (data) {
        return $http.delete(baseUrl + '/removerPromocao/' + data['idPromocao']).then(function (response) {
            return response.data;
        });
    },
    removerPromocaoLoja: function (data) {
        return $http.delete(baseUrl + '/removerPromocaoLoja/' + data['idPromocao']).then(function (response) {
            return response.data;
        });
    }

    };

}]);