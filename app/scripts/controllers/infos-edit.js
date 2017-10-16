'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:InfosEditCtrl
 * @description
 * # InfosEditCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('InfosEditCtrl', function ($scope, info, $uibModalInstance, infosservice, $utilsviewservice) {
    $scope.info = $.extend(true, {}, info);

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveInfo = function(info, boton) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
        
        infosservice.save(info, function(data) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(error) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(error.data);
        });
    };
});