'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.contactosservice
 * @description
 * # contactosservice
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('contactosservice', function ($resource, envservice) {
    return $resource(envservice.getHost() + 'contactos/:id.json', {}, {
        getAdmin: {
            method: 'GET',
            url: envservice.getHost() + 'contactos/getAdmin/.json'
        },
        previewImagen: {
            method: 'POST',
            url: envservice.getHost() + 'contactos/previewImagen/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }
    });
});