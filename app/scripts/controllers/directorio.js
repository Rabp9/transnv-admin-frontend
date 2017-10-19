'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:DirectorioCtrl
 * @description
 * # DirectorioCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('DirectorioCtrl', function ($scope, contactosservice, $uibModal, 
    $utilsviewservice) {
        
    $scope.search = {};
    $scope.search.estado_id = '1';
    
    $scope.getContactos = function() {
        $scope.loading = true;
        contactosservice.getAdmin(function(data) {
            $scope.contactos = data.contactos;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getContactos();
    };
    
    $scope.showContactosAdd = function(event) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/contactos-add.html',
            controller: 'ContactosAddCtrl',
            backdrop: false,
            size: 'lg'
        });
        
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function(data) {
            $scope.getContactos();
            $scope.message = data;
        });
    };
    
    $scope.showContactosEdit = function(contacto, event) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/contactos-edit.html',
            controller: 'ContactosEditCtrl',
            backdrop: false,
            size: 'lg',
            resolve: {
                contacto: function() {
                    return contacto;
                }
            }
        });
        
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceEdit.result.then(function(data) {
            $scope.getContactos();
            $scope.message = data;
        });
    };
    
    $scope.showContactosDelete = function(contacto) {
        if (confirm('¿Está seguro de deshabilitar el contacto?')) {
            contacto.estado_id = 2;
            contactosservice.save(contacto, function(data) {
                $scope.message = data;
            }, function(error) {
                contacto.estado_id = 1;
            });
        }
    };
    
    $scope.showContactosActivate = function(contacto) {
        if (confirm('¿Está seguro de activar el contacto?')) {
            contacto.estado_id = 1;
            contactosservice.save(contacto, function(data) {
                $scope.message = data;
            }, function(error) {
                contacto.estado_id = 2;
            });
        }
    };
    
    $scope.init();
});