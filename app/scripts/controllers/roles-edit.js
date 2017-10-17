'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:RolesEditCtrl
 * @description
 * # RolesEditCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('RolesEditCtrl', function ($scope, rol, $uibModalInstance, rolesservice,
    $utilsviewservice) {
    
    $scope.init = function() {
        rolesservice.get({id: rol.id}, function(data) {
            $scope.rol = data.rol;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveRol = function(rol, boton) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
        
        rolesservice.save(rol, function(data) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(err) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init();
});