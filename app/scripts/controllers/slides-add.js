'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:SlidesAddCtrl
 * @description
 * # SlidesAddCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('SlidesAddCtrl', function ($scope, $uibModalInstance, slidesservice, 
    $rootScope, $utilsviewservice) {
    
    $scope.slide = {};
    $scope.tmp_path = $rootScope.path_location + 'tmp'; 
    $scope.loading = false;
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveSlide = function(slide, boton, imagen_preview) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
       
        if (imagen_preview !== null) {
            slide.imagen = imagen_preview;
        }
        slide.estado_id = 1;
        slidesservice.save(slide, function(data) {
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
        
        slidesservice.previewImagen(fd, function(data) {
            $scope.imagen_preview = data.filename;
            $scope.loading = false;
        }, function(data) {
            $scope.imagen_preview = null;
            $scope.loading = false;
        });
    };
});