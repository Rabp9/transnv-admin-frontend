'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:RolesAddCtrl
 * @description
 * # RolesAddCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('RolesAddCtrl', function ($scope, rolesservice, $uibModalInstance, 
    controllersservice, $utilsviewservice) {
        
    $scope.rol = {};
    $scope.rol.controller_roles = [];
    
    $scope.init = function() {
        $scope.loading = true;
        controllersservice.get(function(data) {
            $scope.rol.controller_roles = [];
            angular.forEach(data.controllers, function(value, key) {
                $scope.rol.controller_roles.push({
                    controller_id: value.id,
                    controller: value,
                    permiso: false
                });
            });
            $scope.loading = false;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveRol = function(rol, boton) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
        
        rol.estado_id = 1;
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