'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.serviciosservice
 * @description
 * # serviciosservice
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('serviciosservice', function ($resource, envservice) {
    return $resource(envservice.getHost() + 'servicios/:id.json', {}, {
        getAdmin: {
            method: 'GET',
            url: envservice.getHost() + 'servicios/getAdmin/.json'
        },
        previewPortada: {
            method: 'POST',
            url: envservice.getHost() + 'servicios/previewPortada/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        remove: {
            method: 'POST',
            url: envservice.getHost() + 'servicios/remove/.json'
        },
        upload: {
            method: 'POST',
            url: envservice.getHost() + 'servicios/upload/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }
    });
});