'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:UsersAddCtrl
 * @description
 * # UsersAddCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('UsersAddCtrl', function ($scope, usersservice, rolesservice, $uibModalInstance, 
    $utilsviewservice) {
    $scope.user = {};
    
    $scope.init = function() {
        $scope.loading = true;
        rolesservice.get(function(data) {
            $scope.roles = data.roles;
            $scope.loading = false;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveUser = function(user, boton) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);

        user.estado_id = 1;
        usersservice.save(user, function(data) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(err) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.init();
});