angular.module('services',[])
.factory('ProdutoServ', ['$http', function ($http,$httpProvider) {

    //var baseUrl = "http://localhost:3000";     // Para desenvolvimento - uso local
    var baseUrl = "https://comparie.com.br";// Para LINK externo - mandar sempre esse para develop

    return {
        cadastrarProduto: function (data) {
            return $http.post(baseUrl + '/cadastrarProduto', data).then(function (response) {
                return response.data;
            });
        },
        editarProduto: function (data) {
            return $http.put(baseUrl + '/editarProduto/' + data.idProduto, data).then(function (response) {
                return response.data;
            });
        },
        editarProdutoClique: function (data) {
            return $http.put(baseUrl + '/editarProdutoClique/' + data.idProduto, data).then(function (response) {
                return response.data;
            });
        },
        getProdutos: function () {
            return $http.get(baseUrl + '/getProdutos/').then(function (response) {
                return response.data;
            });
        },
        getProduto: function (data) {
            return $http.get(baseUrl + '/getProduto/' + data['idProduto']).then(function (response) {
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
        getLojas: function () {
            return $http.get(baseUrl + '/getLojas/').then(function (response) {
                return response.data;
            });
        },
        getLoja: function (data) {
            return $http.get(baseUrl + '/getLoja/' + data['idLoja']).then(function (response) {
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
        cadastrarProdutoLoja: function (data) {
            return $http.post(baseUrl + '/cadastrarProdutoLoja', data).then(function (response) {
                return response.data;
            });
        },
        editarProdutoLoja: function (data) {
            return $http.put(baseUrl + '/editarProdutoLoja/' + data.idProduto + '/' + data.idLoja, data).then(function (response) {
                return response.data;
            });
        },
        getProdutoLojas: function () {
            return $http.get(baseUrl + '/getProdutoLojas/').then(function (response) {
                return response.data;
            });
        },
        getProdutoLoja: function (data) {
            return $http.get(baseUrl + '/getProdutoLoja/' + data['idProduto']).then(function (response) {
                return response.data;
            });
        },
        getLojaProduto: function (data) {
            return $http.get(baseUrl + '/getLojaProduto/' + data['idLoja']).then(function (response) {
                return response.data;
            });
        },
        cadastrarProdutoCategoria: function (data) {
            return $http.post(baseUrl + '/cadastrarProdutoCategoria', data).then(function (response) {
                return response.data;
            });
        },
        editarProdutoCategoria: function (data) {
            return $http.put(baseUrl + '/editarProdutoCategoria/' + data.idProduto + '/' + data.idCategoria, data).then(function (response) {
                return response.data;
            });
        },
        getProdutoCategorias: function () {
            return $http.get(baseUrl + '/getProdutoCategorias/').then(function (response) {
                return response.data;
            });
        },
        getProdutoCategoria: function (data) {
            return $http.get(baseUrl + '/getProdutoCategoria/' + data['idProduto']).then(function (response) {
                return response.data;
            });
        },
        getCategoriaProduto: function (data) {
            return $http.get(baseUrl + '/getCategoriaProduto/' + data['idCategoria']).then(function (response) {
                return response.data;
            });
        },
        getTipoCategorias: function () {
            return $http.get(baseUrl + '/getTipoCategorias/').then(function (response) {
                return response.data;
            });
        }

    };
}]);