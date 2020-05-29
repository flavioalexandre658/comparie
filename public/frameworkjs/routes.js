angular.module('routes',[])
.config(function ($routeProvider) {
    $routeProvider.when("/home", {
        templateUrl: '../views/home.html',
        controller: 'homeController',
    })
    .when("/consoles", {
        templateUrl: "../views/consoles.html",
        controller: 'tipoController',
    })
    .when("/notebook", {
        templateUrl: "../views/notebook.html",
        controller: 'tipoController',
    })
    .when("/tv", {
        templateUrl: "../views/tv.html",
        controller: 'tipoController',
    })
    .when("/celular", {
        templateUrl: "../views/celular.html",
        controller: 'tipoController',
    })
    .when("/search", {
        templateUrl: "../views/busca.html",
        controller: 'tipoController',
    })
    .when("/rmp", {
        templateUrl: "../views/produto.html",
        controller: 'produtoController',
    })
    .when("/rmc", {
        templateUrl: "../views/categoria.html",
        controller: 'categoriaController',
    })
    .when("/rmmc", {
        templateUrl: "../views/marca.html",
        controller: 'marcaController',
    })
    .when("/rml", {
        templateUrl: "../views/loja.html",
        controller: 'lojaController',
    })
    .when("/rmn", {
        templateUrl: "../views/nicho.html",
        controller: 'nichoController',
    })

    .otherwise({ redirectTo: '/home' })
})