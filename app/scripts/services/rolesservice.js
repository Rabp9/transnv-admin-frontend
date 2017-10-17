'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.rolesservice
 * @description
 * # rolesservice
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('rolesservice', function ($resource, envservice) {
    return $resource(envservice.getHost() + 'roles/:id.json', {}, {
        getAdmin: {
            method: 'GET',
            url: envservice.getHost() + 'roles/getAdmin/.json'
        }
    });
});