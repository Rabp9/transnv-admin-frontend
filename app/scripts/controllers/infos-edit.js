'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:InfosEditCtrl
 * @description
 * # InfosEditCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('InfosEditCtrl', function ($scope, info, $uibModalInstance, infosservice, $utilsViewService) {
    $scope.info = $.extend(true, {}, info);

    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveInfo = function(info, boton) {
        $('#' + boton).text('Guardando...');
        $utilsViewService.disable('#' + boton);
        
        infosservice.save(info, function(data) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(data);
            console.log(data);
        }, function(error) {
            $utilsViewService.enable('#' + boton);
            $uibModalInstance.close(error);
            console.log(error);
        });
    };
});