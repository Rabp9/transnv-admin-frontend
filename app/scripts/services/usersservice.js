'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.usersservice
 * @description
 * # usersservice
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('usersservice', function ($resource, envservice) {
    return $resource(envservice.getHost() + 'users/:id.json', {}, {
        getPersonas: {
            method: 'GET',
            url: envservice.getHost() + 'users/getPersonas/.json'
        },
        login: {
            method: 'POST',
            url: envservice.getHost() + 'users/token/.json',
        },
        getAdmin: {
            method: 'GET',
            url: envservice.getHost() + 'users/getAdmin/.json',
        }
    });
});