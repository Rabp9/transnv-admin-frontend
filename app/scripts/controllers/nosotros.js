'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:NosotrosCtrl
 * @description
 * # NosotrosCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
  .controller('NosotrosCtrl', function ($scope, noticiasservice, $uibModal, 
    $utilsviewservice) {
        
    $scope.loading = true;
    $scope.search = {};
    $scope.search.estado_id = '1';
    
    $scope.getNoticias = function() {
        noticiasservice.getAdmin(function(data) {
            $scope.noticias = data.noticias;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getNoticias();
    };
    
    $scope.showNoticiasAdd = function(event) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/noticias-add.html',
            controller: 'NoticiasAddCtrl',
            backdrop: false,
            size: 'lg'
        });
        
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function(data) {
            $scope.getNoticias();
            $scope.message = data;
        });
    };
    
    $scope.showNoticiasEdit = function(noticia, event) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/noticias-edit.html',
            controller: 'NoticiasEditCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                noticia: function() {
                    return noticia;
                }
            }
        });
        
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceEdit.result.then(function(data) {
            $scope.getNoticias();
            $scope.message = data;
        });
    };
    
    $scope.showNoticiasDelete = function(noticia) {
        if (confirm('¿Está seguro de deshabilitar el noticia?')) {
            noticia.estado_id = 2;
            noticiasservice.save(noticia, function(data) {
                $scope.message = data;
            }, function(error) {
                noticia.estado_id = 1;
            });
        }
    };
    
    $scope.showNoticiasActivate = function(noticia) {
        if (confirm('¿Está seguro de activar el noticia?')) {
            noticia.estado_id = 1;
            noticiasservice.save(noticia, function(data) {
                $scope.message = data;
            }, function(error) {
                noticia.estado_id = 2;
            });
        }
    };
    
    $scope.init();
});