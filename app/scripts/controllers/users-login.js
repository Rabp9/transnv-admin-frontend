'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:UsersLoginCtrl
 * @description
 * # UsersLoginCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('UsersLoginCtrl', function ($scope, usersservice, $cookies, $location, 
    $rootScope, $utilsviewservice) {
    
    $scope.loginUser = function(user, boton) {
        $('#' + boton).text('Login...');
        $utilsviewservice.disable('#' + boton);
        
        usersservice.login(user, function(data) {
            if (!data.user) {
                $scope.message = data.message;
            } else {
                $cookies.putObject('transnv-user', data.user);
                $cookies.put('transnv-token', data.token);
                $rootScope.user = data.user;
                $('#wrapper').removeClass('inLogin');
                $location.path('/');
            }
        }, function(error) {
            $scope.message = error.data;
        });
    };
    
});