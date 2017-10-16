'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.oauthHttpInterceptor
 * @description
 * # oauthHttpInterceptor
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('oauthHttpInterceptor', function ($cookies) {
    return {
        request: function (config) {
            config.headers.Authorization = 'Bearer ' + $cookies.get('transnv-token');
            return config;
        }
    };
});