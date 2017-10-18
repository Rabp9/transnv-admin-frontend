'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.slidesservice
 * @description
 * # slidesservice
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('slidesservice', function ($resource, envservice) {
    return $resource(envservice.getHost() + 'slides/:id.json', {}, {
        previewImagen: {
            method: 'POST',
            url: envservice.getHost() + 'slides/previewImagen/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        getAdmin: {
            method: 'GET',
            url: envservice.getHost() + 'slides/getAdmin/.json'
        },
        saveMany: {
            method: 'POST',
            url: envservice.getHost() + 'slides/saveMany/.json'
        }
    });
});