'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:CabecerasEditCtrl
 * @description
 * # CabecerasEditCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('CabecerasEditCtrl', function ($scope, cabecera, $uibModalInstance, 
    cabecerasservice, $utilsviewservice, $rootScope) {
        
    var changed = false;
    $scope.tmp_path = $rootScope.path_location + 'img' + '/cabeceras'; 
    var tmp_path = $rootScope.path_location + 'tmp' + '/';

    $scope.init = function() {
        $scope.cabecera = $.extend(true, {}, cabecera);
        $scope.imagen_preview = $scope.cabecera.imagen;
        $scope.cabecera.imagen = null;
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveCabecera = function(cabecera, boton, imagen_preview) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
                
        if (changed) {
            if (imagen_preview !== null) {
                cabecera.imagen = imagen_preview;
            }
        }
        cabecerasservice.save(cabecera, function(data) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(error) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(error.data);
        });
    };
    
    $scope.preview_imagen = function(imagen, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', imagen);
        
        cabecerasservice.previewImagen(fd, function(data) {
            $scope.imagen_preview = data.filename;
            $scope.loading = false;
            $scope.tmp_path = tmp_path;
            changed = true;
        }, function(err) {
            $scope.imagen_preview = null;
            $scope.loading = false;
        });
    };
    
    $scope.init();
});