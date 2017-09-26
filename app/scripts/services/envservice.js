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
                case 'admin.inexdeo.robertobocanegra.com':
                    return 'http://inexdeo.robertobocanegra.com/api/';
                case 'iedsa.com.pe':
                    return 'http://iedsa.com.pe/api/';
                case 'www.iedsa.com.pe':
                    return 'http://iedsa.com.pe/api/';
            }
        }
    };
});