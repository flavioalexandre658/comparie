angular.module('directives',[])
.directive('carddeck', function() {
  return {
      restrict: 'E',
      scope: { qtditems:'=', idcard: '=', pagid: '=', listaproduto: '=', listaloja: '=', listaprodutolojas: '=' },
      templateUrl: '../directives/card-deck.html',
      controller: function($scope, TipoServ, ProdutoServ) {       
        $scope.infoProdutoLoja = function(produto){
          let produtoloja = $scope.listaprodutolojas.filter(function(arr){
            return arr.idProduto === produto.idProduto;
          });

          let produtoloja_ = {};
          for(let i=0;i<produtoloja.length;i++){
            produtoloja_.link = encodeURIComponent(produtoloja[i].link);
            produtoloja_.idProduto = produtoloja[i].idProduto;
            produtoloja_.idLoja = produtoloja[i].idLoja;
            TipoServ.getPrecoSite(produtoloja_).then(function(data) {
                for(let i=0; i < produtoloja.length;i++){
                  if(produtoloja[i].idLoja == data[0].idLoja){
                    if(data[0].preco == '' || data[0].preco == undefined || data[0].preco == null){
                      produtoloja[i].estoque = 0;
                      ProdutoServ.editarProdutoLoja(produtoloja[i]).then(function(res) {
                        console.log('Produto atualizado!');
                      });
                    }else{
                      let precoloja = data[0].preco.split('$')[1];
                          precoloja = precoloja.replace(/\s/g, '');
                      if(produtoloja[i].preco != precoloja || produtoloja[i].estoque != 1){
                          produtoloja[i].preco = precoloja;
                          produtoloja[i].estoque = 1;
                          produtoloja[i].parcelas = data[0].parcelas.split(/\s/g)[2];
                          ProdutoServ.editarProdutoLoja(produtoloja[i]).then(function(res) {
                            console.log('Produto atualizado!');
                          });
                      }
                    }
                  }
                }
            });
          }
        }
        
        $scope.houverIn = function(id){
            $("#"+id+"-cardreview").show();
            $("#"+id+"-backdrop").removeClass('card-backdrop fade');
            $("#"+id+"-backdrop").addClass('card-backdrop show');
        };
    
        $scope.houverOut = function(id){
            $("#"+id+"-cardreview").hide();
            $("#"+id+"-backdrop").removeClass('card-backdrop show');
            $("#"+id+"-backdrop").addClass('card-backdrop fade');
        };
      }
    };
})
.directive('carddeckProduto', function() {
  return {
      restrict: 'E',
      scope: { buscafilter: '=', idcard: '=', qtditems:'=', pagid: '=', col: '=', listaproduto: '=', listaloja: '=', listaprodutolojas: '=' },
      templateUrl: '../directives/card-deck-produto.html',
      controller: function($scope, TipoServ, ProdutoServ) {       
        $scope.infoProdutoLoja = function(produto){
          let produtoloja = $scope.listaprodutolojas.filter(function(arr){
            return arr.idProduto === produto.idProduto;
          });

          let produtoloja_ = {};
          for(let i=0;i<produtoloja.length;i++){
            produtoloja_.link = encodeURIComponent(produtoloja[i].link);
            produtoloja_.idProduto = produtoloja[i].idProduto;
            produtoloja_.idLoja = produtoloja[i].idLoja;
            TipoServ.getPrecoSite(produtoloja_).then(function(data) {
                for(let i=0; i < produtoloja.length;i++){
                  if(produtoloja[i].idLoja == data[0].idLoja){
                    if(data[0].preco == '' || data[0].preco == undefined || data[0].preco == null){
                      produtoloja[i].estoque = 0;
                      ProdutoServ.editarProdutoLoja(produtoloja[i]).then(function(res) {
                        console.log('Produto atualizado!');
                      });
                    }else{
                      let precoloja = data[0].preco.split('$')[1];
                          precoloja = precoloja.replace(/\s/g, '');
                      if(produtoloja[i].preco != precoloja || produtoloja[i].estoque != 1){
                          produtoloja[i].preco = precoloja;
                          produtoloja[i].estoque = 1;
                          produtoloja[i].parcelas = data[0].parcelas;
                          ProdutoServ.editarProdutoLoja(produtoloja[i]).then(function(res) {
                            console.log('Produto atualizado!');
                          });
                      }
                    }
                  }
                }
            });
          }
        }
        $scope.houverIn = function(id){
            $("#"+id+"-cardreview").show();
            $("#"+id+"-backdrop").removeClass('card-backdrop fade');
            $("#"+id+"-backdrop").addClass('card-backdrop show');
        };
    
        $scope.houverOut = function(id){
            $("#"+id+"-cardreview").hide();
            $("#"+id+"-backdrop").removeClass('card-backdrop show');
            $("#"+id+"-backdrop").addClass('card-backdrop fade');
        };
      }
    };
})
.directive('modalProduto', function(){
  return{
      restrict: 'E',
      scope:{ produto: '=', produtoid: '=', listaloja: '=', listaprodutolojas: '=' },
      templateUrl: '../directives/modal-produto.html'
  }
})
.directive('carddeckBackdrop', function(){
  return{
      restrict: 'E',
      scope:{ produto: '=', idcard: '=', listaloja: '=', listaprodutolojas: '=' },
      templateUrl: '../directives/card-deck-backdrop.html',
      controller: function($scope, TipoServ, ProdutoServ) {  

        $scope.houverIn = function(id){
          $("#"+id+"-cardreview").show();
          $("#"+id+"-backdrop").removeClass('card-backdrop fade');
          $("#"+id+"-backdrop").addClass('card-backdrop show');
      };
  
      $scope.houverOut = function(id){
          $("#"+id+"-cardreview").hide();
          $("#"+id+"-backdrop").removeClass('card-backdrop show');
          $("#"+id+"-backdrop").addClass('card-backdrop fade');
      };
      }
  }
})