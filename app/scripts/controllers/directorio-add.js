'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:DirectorioAddCtrl
 * @description
 * # DirectorioAddCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('DirectorioAddCtrl', function ($scope, contactosservice, $uibModalInstance, 
    $rootScope, $utilsviewservice) {
        
    $scope.contacto = {};
    $scope.tmp_path = $rootScope.path_location + 'tmp' + '/';
    $scope.loading = false;
    $scope.contacto.imagen = false;
        
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveContacto = function(contacto, boton, imagen_preview) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
        
        if (imagen_preview !== null) {
            contacto.imagen = imagen_preview;
        }
        contacto.estado_id = 1;
        contactosservice.save(contacto, function(data) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function (err) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.preview_imagen = function(imagen, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', imagen);
        
        contactosservice.previewImagen(fd, function(data) {
            $scope.imagen_preview = data.filename;
            $scope.loading = false;
        }, function(err) {
            $scope.imagen_preview = null;
            $scope.loading = false;
        });
    };
});