'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:InfosCtrl
 * @description
 * # InfosCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('InfosCtrl', function ($scope, infosservice, $uibModal, $utilsviewservice) {
    var search = ['quienes_somos_mensaje', 'historia_mensaje', 'directorio_mensaje',
    'ubicacion_mensaje', 'telefono', 'email', 'facebook_link', 'transnv_resumen', 
    'enlace_1_titulo', 'enlace_2_titulo', 'enlace_3_titulo', 'enlace_1_link',
    'enlace_2_link', 'enlace_3_link', 'twitter_link', 'direccion', 'copyright',
    'quienes_somos', 'mision', 'vision', 'historia', 'ubicacion_lat_long', 
    'nuestra_flota_mensaje', 'nuestro_personal_mensaje', 'certificaciones', 'polizas_seguros'];
    
    $scope.getInfos = function() {
        $scope.loading = true;
        infosservice.getDataByData(search, function(data) {
            $scope.infos = data.infos;
            $scope.loading = false;
        }); 
    };
    
    $scope.init = function() {
        $scope.getInfos();
    };
    
    $scope.showInfosEdit = function(info, event) {
        $utilsviewservice.disable(event.currentTarget);
        
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
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceEdit.result.then(function (data) {
            $scope.getInfos();
            $scope.message = data;
        });
    };
    
    $scope.init();
});