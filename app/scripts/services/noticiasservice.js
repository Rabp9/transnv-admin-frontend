'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.noticiasservice
 * @description
 * # noticiasservice
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('noticiasservice', function ($resource, envservice) {
    return $resource(envservice.getHost() + 'noticias/:id.json', {}, {
        getAdmin: {
            method: 'GET',
            url: envservice.getHost() + 'noticias/getAdmin/.json'
        },
        previewPortada: {
            method: 'POST',
            url: envservice.getHost() + 'noticias/previewPortada/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        remove: {
            method: 'POST',
            url: envservice.getHost() + 'noticias/remove/.json'
        },       
        upload: {
            method: 'POST',
            url: envservice.getHost() + 'noticias/upload/.json',
            transformRequest: angular.identity,
            headers: { 'Content-Type': undefined }
        },
        
    });
});