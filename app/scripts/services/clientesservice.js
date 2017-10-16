'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.clientesservice
 * @description
 * # clientesservice
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('clientesservice', function ($resource, envservice) {
    return $resource(envservice.getHost() + 'clientes/:id.json', {}, {
        getAdmin: {
            method: 'GET',
            url: envservice.getHost() + 'clientes/getAdmin/.json'
        },
        previewImagen: {
            method: 'POST',
            url: envservice.getHost() + 'clientes/previewImagen/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        remove: {
            method: 'POST',
            url: envservice.getHost() + 'clientes/remove/.json'
        }
    });
});