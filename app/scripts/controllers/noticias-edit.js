'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:NoticiasEditCtrl
 * @description
 * # NoticiasEditCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('NoticiasEditCtrl', function ($scope, noticia, $uibModalInstance, 
    noticiasservice, $rootScope, $utilsviewservice) {
        
    $scope.loading = false;
    var changed = false;
    $scope.tmp_path = $rootScope.path_location + 'img' + '/noticias'; 
    $scope.tmp_path_pages = $rootScope.path_location + 'img' + '/noticias/pages/'; 
    
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
    
    function init() {
        noticiasservice.get({id: noticia.id}, function(data) {
            $scope.noticia = data.noticia;
            $scope.portada_preview = $scope.noticia.portada;
            $scope.noticia.portada = null;
        });
    }
    
    var tmp_path = $rootScope.path_location + 'tmp' + '/';
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveNoticia = function(noticia, boton, portada_preview) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
        
        if (changed) {
            if (portada_preview !== null) {
                noticia.portada = portada_preview;
            }
        }
        noticiasservice.save(noticia, function(data) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(data);
        }, function(err) {
            $utilsviewservice.enable('#' + boton);
            $uibModalInstance.close(err.data);
        });
    };
    
    $scope.preview_portada = function(portada, errFiles) {
        $scope.loading = true;
        var fd = new FormData();
        fd.append('file', portada);
        
        noticiasservice.previewPortada(fd, function(data) {
            $scope.portada_preview = data.filename;
            $scope.loading = false;
            $scope.tmp_path = tmp_path;
            changed = true;
        }, function(err) {
            $scope.portada_preview = null;
            $scope.loading = false;
        });
    };
    
    $scope.upload = function(image, errFiles) {
        var fd = new FormData();
        fd.append('file', image);
        
        noticiasservice.upload(fd, function(data) {
            $scope.url = $scope.tmp_path_pages + data.filename;
            document.getElementById($scope.input).value = $scope.url;
        });
    };
    
    init();
});