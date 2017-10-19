'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:DirectorioEditCtrl
 * @description
 * # DirectorioEditCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('DirectorioEditCtrl', function ($scope, contacto, $uibModalInstance, 
    contactosservice, $rootScope, $utilsviewservice) {
    
    $scope.loading = false;
    var changed = false;
    $scope.tmp_path = $rootScope.path_location + 'img' + '/contactos'; 
    var tmp_path = $rootScope.path_location + 'tmp' + '/';
    
    function init() {
        contactosservice.get({id: contacto.id}, function(data) {
            $scope.contacto = data.contacto;
            $scope.imagen_preview = $scope.contacto.imagen;
            $scope.contacto.imagen = null;
        });
    }
    
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveContacto = function(contacto, boton, imagen_preview) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
        
        if (changed) {
            if (imagen_preview !== null) {
                contacto.imagen = imagen_preview;
            }
        }
        contactosservice.save(contacto, function(data) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(err) {
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
            $scope.tmp_path = tmp_path;
            changed = true;
        }, function(err) {
            $scope.imagen_preview = null;
            $scope.loading = false;
        });
    };
    
    init();
});