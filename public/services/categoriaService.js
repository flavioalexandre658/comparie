angular.module('services')
.factory('CategoriaServ', ['$http', function ($http,$httpProvider) {

    //var baseUrl = "http://localhost:3000";     // Para desenvolvimento - uso local
    var baseUrl = "http://comparie.com.br";// Para LINK externo - mandar sempre esse para develop

    return {
        cadastrarCategoria: function (data) {
            return $http.post(baseUrl + '/cadastrarCategoria', data).then(function (response) {
                return response.data;
            });
        },
        getTipos: function () {
            return $http.get(baseUrl + '/getTipos/').then(function (response) {
                return response.data;
            });
        },
        getTipo: function (data) {
            return $http.get(baseUrl + '/getTipo/' + data['idTipo']).then(function (response) {
                return response.data;
            });
        },
        getCategorias: function () {
            return $http.get(baseUrl + '/getCategorias/').then(function (response) {
                return response.data;
            });
        },
        getCategoria: function (data) {
            return $http.get(baseUrl + '/getCategoria/' + data['idCategoria']).then(function (response) {
                return response.data;
            });
        },
        cadastrarTipoCategoria: function (data) {
            return $http.post(baseUrl + '/cadastrarTipoCategoria', data).then(function (response) {
                return response.data;
            });
        },
        getTipoCategorias: function () {
            return $http.get(baseUrl + '/getTipoCategorias/').then(function (response) {
                return response.data;
            });
        },
        getProdutoCategorias: function () {
            return $http.get(baseUrl + '/getProdutoCategorias/').then(function (response) {
                return response.data;
            });
        }
    };
}]);