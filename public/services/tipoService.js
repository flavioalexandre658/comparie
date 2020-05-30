angular.module('services')
.factory('TipoServ', ['$http', function ($http,$httpProvider) {

    //var baseUrl = "http://localhost:3000";     // Para desenvolvimento - uso local
    var baseUrl = "https://comparie.com.br";// Para LINK externo - mandar sempre esse para develop

    return {
        cadastrarTipo: function (data) {
            return $http.post(baseUrl + '/cadastrarTipo', data).then(function (response) {
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
        getMarcas: function () {
            return $http.get(baseUrl + '/getMarcas/').then(function (response) {
                return response.data;
            });
        },
        getMarca: function (data) {
            return $http.get(baseUrl + '/getMarca/' + data['idMarca']).then(function (response) {
                return response.data;
            });
        },
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
        getProdutoLojas: function () {
            return $http.get(baseUrl + '/getProdutoLojas/').then(function (response) {
                return response.data;
            });
        },
        getProdutoCategorias: function () {
            return $http.get(baseUrl + '/getProdutoCategorias/').then(function (response) {
                return response.data;
            });
        },
        getPrecoSite: function (data) {
            return $http.get(baseUrl + '/getPrecoSite/' + data['link'] + '/' + data['idProduto'] + '/' + data['idLoja']).then(function (response) {
                return response.data;
            });
        }

    };
}]);