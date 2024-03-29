angular.module('routes',[])
.config(function ($routeProvider, $locationProvider) {
    $routeProvider.when("/home", {
        templateUrl: '../views/home.html',
        controller: 'homeController',
    })
    .when("/consoles/:param?", {
        templateUrl: "../views/consoles.html",
        controller: 'tipoController',
    })
    .when("/notebook/:param?", {
        templateUrl: "../views/notebook.html",
        controller: 'tipoController',
    })
    .when("/tv/:param?", {
        templateUrl: "../views/tv.html",
        controller: 'tipoController',
    })
    .when("/celular/:param?", {
        templateUrl: "../views/celular.html",
        controller: 'tipoController',
    })
    .when("/search", {
        templateUrl: "../views/busca.html",
        controller: 'tipoController',
    })
    .when("/cpc", {
        templateUrl: "../views/produto.html",
        controller: 'produtoController',
    })
    .when("/cpp", {
        templateUrl: "../views/promocao.html",
        controller: 'promocaoController',
    })

    .otherwise({ redirectTo: '/home' })
})