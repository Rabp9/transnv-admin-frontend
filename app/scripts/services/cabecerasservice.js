'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.cabecerasservice
 * @description
 * # cabecerasservice
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('cabecerasservice', function($resource, envservice) {
    return $resource(envservice.getHost() + 'cabeceras/:id.json', {}, {
        saveMany: {
            method: 'POST',
            url: envservice.getHost() + 'cabeceras/saveMany.json',
        },
        getDataMany: {
            method: 'POST',
            url: envservice.getHost() + 'cabeceras/getDataMany.json',
        },
        getDataByData: {
            method: 'POST',
            url: envservice.getHost() + 'cabeceras/getDataByData.json',
        },
        previewImagen: {
            method: 'POST',
            url: envservice.getHost() + 'cabeceras/previewImagen/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }
    });
});