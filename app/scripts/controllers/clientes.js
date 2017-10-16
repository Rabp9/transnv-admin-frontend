'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:ClientesCtrl
 * @description
 * # ClientesCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('ClientesCtrl', function ($scope, clientesservice, $uibModal, 
    $utilsviewservice) {
        
    $scope.loading = true;
    $scope.search = {};
    $scope.search.estado_id = '1';
    
    $scope.getClientes = function() {
        clientesservice.getAdmin(function(data) {
            $scope.clientes = data.clientes;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getClientes();
    };
    
    $scope.showClientesAdd = function(event) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/Clientes-add.html',
            controller: 'ClientesAddCtrl',
            backdrop: false,
            size: 'lg'
        });
        
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function(data) {
            $scope.getClientes();
            $scope.message = data;
        });
    };
    
    $scope.showClientesEdit = function(cliente, event) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/clientes-edit.html',
            controller: 'ClientesEditCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                cliente: function() {
                    return cliente;
                }
            }
        });
        
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceEdit.result.then(function(data) {
            $scope.getClientes();
            $scope.message = data;
        });
    };
    
    $scope.showClientesDelete = function(cliente) {
        if (confirm('¿Está seguro de deshabilitar el cliente?')) {
            cliente.estado_id = 2;
            clientesservice.save(cliente, function(data) {
                $scope.message = data;
            }, function(error) {
                cliente.estado_id = 1;
            });
        }
    };
    
    $scope.showClientesActivate = function(cliente) {
        if (confirm('¿Está seguro de activar el cliente?')) {
            cliente.estado_id = 1;
            clientesservice.save(cliente, function(data) {
                $scope.message = data;
            }, function(error) {
                cliente.estado_id = 2;
            });
        }
    };
    
    $scope.init();
});