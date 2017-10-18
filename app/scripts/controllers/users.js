'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:UsersCtrl
 * @description
 * # UsersCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('UsersCtrl', function ($scope, usersservice, $uibModal, $utilsviewservice) {
    
    $scope.search = {};
    $scope.search.estado_id = '1';
    
    $scope.getUsers = function() {
        $scope.loading = true;
        usersservice.getAdmin(function(data) {
            $scope.users = data.users;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getUsers();
    };
    
    $scope.showUsersAdd = function(event) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/users-add.html',
            controller: 'UsersAddCtrl',
            backdrop: false
        });
        
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            $scope.getUsers();
            $scope.message = data;
        });
    };
    
    $scope.showUsersEdit = function(user, event) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/users-edit.html',
            controller: 'UsersEditCtrl',
            backdrop: false,
            resolve: {
                user: function() {
                    return user;
                }
            }
        });
        
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceEdit.result.then(function (data) {
            $scope.getUsers();
            $scope.message = data;
        });
    };
    
    $scope.showUsersDelete = function(user) {
        if (confirm('¿Está seguro de deshabilitar el usuario?')) {
            user.estado_id = 2;
            usersservice.save(user, function(data) {
                $scope.message = data;
            }, function(error) {
                user.estado_id = 1;
            });
        }
    };
    
    $scope.showUsersActivate = function(user) {
        if (confirm('¿Está seguro de activar el rol?')) {
            user.estado_id = 1;
            usersservice.save(user, function(data) {
                $scope.message = data;
            }, function(error) {
                user.estado_id = 2;
            });
        }
    };
    
    $scope.init();
});