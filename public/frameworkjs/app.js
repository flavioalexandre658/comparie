'use strict';
angular.module('myApp',
     [
        'ngRoute',
        'services',
        'directives',
        'routes',
        'angularUtils.directives.dirPagination',
        'services.breadcrumbs'
        
    ]).filter('filterLoja', function() {
        return function(input,idProduto) {
        let result = [], qtd = 0;
        if(input != undefined && input != null){
            for (let i = 0; i < input.length; i++) {
                if (input[i].idProduto === idProduto && qtd == 0){
                    result.push(input[i]);
                    qtd++;
                }
            }
        }
        return result;
        };
      }).run(['$rootScope', function ($rootScope) {
        $rootScope.$on("$locationChangeSuccess", function(event, next, current) { 
            let nomeRota = next.split('/')[4];
            if(event.targetScope.listaTipos != undefined){
                let tipoRota = event.targetScope.listaTipos.filter(function(arr){
                    return arr.nomeTipo.toLowerCase() === nomeRota;
                });
                $rootScope.tipoRota = tipoRota[0];
                if(tipoRota.length > 0){
                    event.targetScope.tipoClicado(tipoRota[0]);
                }
            }
        });
      }])