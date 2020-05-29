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
            for (let i = 0; i < input.length; i++) {
                if (input[i].idProduto === idProduto && qtd == 0){
                    result.push(input[i]);
                    qtd++;
                }
            }
        return result;
        };
      });