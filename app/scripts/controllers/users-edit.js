'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:UsersEditCtrl
 * @description
 * # UsersEditCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('UsersEditCtrl', function ($scope, user, $uibModalInstance, usersservice, 
    rolesservice, $utilsviewservice) {
        
    $scope.init = function() {
        usersservice.get({id: user.id}, function(data) {
            $scope.user = data.user;
            rolesservice.get(function(data) {
                $scope.roles = data.roles;
            });
        });
    };
        
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveUser = function(user, boton) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
        
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