'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:InfosCtrl
 * @description
 * # InfosCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('InfosCtrl', function ($scope, infosservice, $uibModal, $utilsViewService) {
    var search = ['quienes_somos_mensaje', 'historia_mensaje', 'directorio_mensaje',
    'ubicacion_mensaje', 'telefono', 'email', 'facebook_link', 'transnv_resumen', 
    'ubicacion_codigo', 'enlace_1_titulo', 'enlace_2_titulo', 'enlace_3_titulo',
    'enlace_1_link', 'enlace_2_link', 'enlace_3_link', 'twitter_link', 'direccion', 'copyright'];
    
    $scope.loading = true;
    
    infosservice.getDataByData(search, function(data) {
        $scope.infos = data.infos;
        $scope.loading = false;
    });
    
    $scope.showInfosEdit = function(info, event) {
        $utilsViewService.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/infos-edit.html',
            controller: 'InfosEditCtrl',
            backdrop: false,
            resolve: {
                info: function() {
                    return info;
                }
            }
        });
        $utilsViewService.enable(event.currentTarget);
        
        modalInstanceEdit.result.then(function (data) {
            infosservice.getDataByData(search, function(data) {
                $scope.infos = data.infos;
            });
            $scope.message = data.message;
        });
    };
});