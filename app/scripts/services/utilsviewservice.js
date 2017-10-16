'use strict';

/**
 * @ngdoc service
 * @name transnvAdminFrontendApp.utilsViewService
 * @description
 * # utilsViewService
 * Factory in the transnvAdminFrontendApp.
 */
angular.module('transnvAdminFrontendApp')
.factory('$utilsviewservice', function () {
    return {
        enable: function(id) {
            $(id).removeClass('disabled');
            $(id).prop('disabled', false);
        },
        disable: function(id) {
            $(id).addClass('disabled');
            $(id).prop('disabled', true);
        }
    };
});