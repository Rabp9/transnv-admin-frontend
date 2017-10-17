'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.controllersservice
 * @description
 * # controllersservice
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('controllersservice', function ($resource, envservice) {
    return $resource(envservice.getHost() + 'controllers/:id.json', {});
});