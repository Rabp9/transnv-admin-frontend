'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:CabecerasCtrl
 * @description
 * # CabecerasCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('CabecerasCtrl', function ($scope, cabecerasservice, $uibModal, $utilsviewservice) {
    var search = ['quienes-somos-cabecera', 'historia-cabecera', 'servicio-cabecera', 
        'noticia-cabecera', 'directorio-cabecera', 'ubicacion-cabecera', 'quienes-somos-img', 
        'historia-img', 'directorio-img', 'ubicacion-img', 'nuestra-flota-cabecera',
        'nuestro-personal-cabecera', 'certificaciones-cabecera', 'polizas-seguros-cabecera'];
    
    $scope.getCabeceras = function() {
        $scope.loading = true;
        cabecerasservice.getDataByData(search, function(data) {
            $scope.cabeceras = data.cabeceras;
            $scope.loading = false;
        }); 
    };
    
    $scope.init = function() {
        $scope.getCabeceras();
    };
    
    $scope.showCabecerasEdit = function(cabecera, event) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/cabeceras-edit.html',
            controller: 'CabecerasEditCtrl',
            backdrop: false,
            resolve: {
                cabecera: function() {
                    return cabecera;
                }
            }
        });
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceEdit.result.then(function (data) {
            $scope.getCabeceras();
            $scope.message = data;
        });
    };
    
    $scope.init();
});