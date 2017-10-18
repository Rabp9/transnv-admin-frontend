'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:SlidesEditCtrl
 * @description
 * # SlidesEditCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('SlidesEditCtrl', function ($scope, slide, $uibModalInstance, slidesservice,
    $rootScope, $utilsviewservice) {
        
    $scope.tmp_path = $rootScope.path_location + 'img/slides'; 
    $scope.imagen_preview = slide.imagen;
    var tmp_path = $rootScope.path_location + 'tmp' + '/';
    var changed = false;
    
    $scope.init = function() {
        $scope.loading = true;
        slidesservice.get({id: slide.id}, function(data) {
            $scope.slide = data.slide;
            $scope.imagen_preview = $scope.slide.imagen;
            $scope.slide.imagen = null;
            $scope.loading = false;
        });
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveSlide = function(slide, boton, imagen_preview) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
        
        if (changed) {
            if (imagen_preview !== null) {
                slide.imagen = imagen_preview;
            }
        }
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
            $scope.tmp_path = tmp_path;
            changed = true;
        }, function(err) {
            $scope.imagen_preview = null;
            $scope.loading = false;
        });
    };
    
    $scope.init();
});