'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:ServiciosCtrl
 * @description
 * # ServiciosCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('ServiciosCtrl', function ($scope, serviciosservice, $uibModal, 
    $utilsviewservice) {
        
    $scope.loading = true;
    $scope.search = {};
    $scope.search.estado_id = '1';
    
    $scope.getServicios = function() {
        serviciosservice.getAdmin(function(data) {
            $scope.servicios = data.servicios;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getServicios();
    };
    
    $scope.showServiciosAdd = function(event) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/servicios-add.html',
            controller: 'ServiciosAddCtrl',
            backdrop: false,
            size: 'lg'
        });
        
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function(data) {
            $scope.getServicios();
            $scope.message = data;
        });
    };
    
    $scope.showServiciosEdit = function(servicio, event) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/servicios-edit.html',
            controller: 'ServiciosEditCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                servicio: function() {
                    return servicio;
                }
            }
        });
        
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceEdit.result.then(function(data) {
            $scope.getServicios();
            $scope.message = data;
        });
    };
    
    $scope.showServiciosDelete = function(servicio) {
        if (confirm('¿Está seguro de deshabilitar el servicio?')) {
            servicio.estado_id = 2;
            serviciosservice.save(servicio, function(data) {
                $scope.message = data;
            }, function(error) {
                servicio.estado_id = 1;
            });
        }
    };
    
    $scope.showServiciosActivate = function(servicio) {
        if (confirm('¿Está seguro de activar el servicio?')) {
            servicio.estado_id = 1;
            serviciosservice.save(servicio, function(data) {
                $scope.message = data;
            }, function(error) {
                servicio.estado_id = 2;
            });
        }
    };
    
    $scope.init();
});