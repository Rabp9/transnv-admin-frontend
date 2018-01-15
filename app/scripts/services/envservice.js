'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.envservice
 * @description
 * # envservice
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('envservice', function () {
    return {
        getHost: function() {
            switch (window.location.hostname) {
                case 'localhost':
                    return 'http://localhost:8000/transnv-backend/';
                case 'admin.transnv.robertobocanegra.com':
                    return 'http://transnv.robertobocanegra.com/api/';
                case 'www.admin.transnv.robertobocanegra.com':
                    return 'http://transnv.robertobocanegra.com/api/';
                case 'admin.transnv.com.pe':
                    return 'http://transnv.com.pe/api/';
                case 'www.admin.transnv.com.pe':
                    return 'http://transnv.com.pe/api/';
            }
        }
    };
});