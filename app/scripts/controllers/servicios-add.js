'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:ServiciosAddCtrl
 * @description
 * # ServiciosAddCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('ServiciosAddCtrl', function ($scope, serviciosservice, $uibModalInstance, 
    $rootScope, $utilsviewservice) {
        
    $scope.servicio = {};
    $scope.tmp_path = $rootScope.path_location + 'tmp' + '/';
    $scope.tmp_path_pages = $rootScope.path_location + 'img' + '/servicios/pages/'; 
    $scope.loading = false;
    $scope.servicio.portada = false;
        
    $scope.tinymcePagesOptions = {
        toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | fontsizeselect | fontselect ",
        fontsize_formats: "8pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 21pt 22pt 23pt 24pt 25pt 26pt 27pt 28pt",
        plugins: 'lists autolink textcolor colorpicker link media preview table code image',
        language_url : '/scripts/langs_tinymce/es.js',
        file_browser_callback_types: 'image',
        file_browser_callback: function(field_name, url, type, win) {
            $scope.input = field_name;
            $('#flImagen').click();
        }
    };
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveServicio = function(servicio, boton, portada_preview) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
        
        if (portada_preview !== null) {
            servicio.portada = portada_preview;
        }
        servicio.estado_id = 1;
        serviciosservice.save(servicio, function(data) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function (err) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.preview_portada = function(portada, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', portada);
        
        serviciosservice.previewPortada(fd, function(data) {
            $scope.portada_preview = data.filename;
            $scope.loading = false;
        }, function(err) {
            $scope.portada_preview = null;
            $scope.loading = false;
        });
    };
    
    $scope.upload = function(image, errFiles) {
        var fd = new FormData();
        fd.append('file', image);
        
        serviciosservice.upload(fd, function(data) {
            $scope.url = $scope.tmp_path_pages + data.filename;
            document.getElementById($scope.input).value = $scope.url;
        });
    };
});