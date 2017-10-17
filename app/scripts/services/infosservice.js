'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.infosservice
 * @description
 * # infosservice
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('infosservice', function($resource, envservice) {
    return $resource(envservice.getHost() + 'infos/:id.json', {}, {
        saveMany: {
            method: 'POST',
            url: envservice.getHost() + 'infos/saveMany.json',
        },
        getDataMany: {
            method: 'POST',
            url: envservice.getHost() + 'infos/getDataMany.json',
        },
        getDataByData: {
            method: 'POST',
            url: envservice.getHost() + 'infos/getDataByData.json',
        },
/*        previewFondo: {
            method: 'POST',
            url: envservice.getHost() + 'infos/previewFondo.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        saveFondo: {
            method: 'POST',
            url: envservice.getHost() + 'infos/saveFondo.json',
        },*/
        upload: {
            method: 'POST',
            url: envservice.getHost() + 'infos/upload/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        }
    });
});