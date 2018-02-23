'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:NosotrosCtrl
 * @description
 * # NosotrosCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('NosotrosCtrl', function ($scope, infosservice, $utilsviewservice,
    $rootScope) {
        
    var search = ['quienes_somos', 'mision', 'vision', 'historia', 'nuestra_flota', 'nuestro_personal'];
    $scope.infos = {};
    $scope.tmp_path_pages = $rootScope.path_location + 'img' + '/infos/'; 
    
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
    
    $scope.getInfos = function() {
        $scope.loading = true;
        infosservice.getDataMany(search, function(data) {
            angular.forEach(search, function(value, key) {
                $scope.infos[value] = data.info[value];
            });
            $scope.loading = false;
        });
    };
    
    $scope.saveInfos = function(infos, boton) {
        $utilsviewservice.disable('#' + boton);
        
        infosservice.saveMany(infos, function(data) {
            $utilsviewservice.enable('#' + boton);
            $scope.message = data;
        }, function (err) {
            $utilsviewservice.enable('#' + boton);
            $scope.message = err.data;
        });
    };
    
    $scope.init = function() {
        $scope.getInfos();
    };
    
    $scope.upload = function(image, errFiles) {
        var fd = new FormData();
        fd.append('file', image);
        
        infosservice.upload(fd, function(data) {
            $scope.url = $scope.tmp_path_pages + data.filename;
            document.getElementById($scope.input).value = $scope.url;
        });
    };
    
    $scope.init();
});