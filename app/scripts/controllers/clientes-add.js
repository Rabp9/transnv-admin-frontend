'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:ClientesAddCtrl
 * @description
 * # ClientesAddCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('ClientesAddCtrl', function ($scope, clientesservice, $uibModalInstance, 
    $rootScope, $utilsviewservice) {
        
    $scope.cliente = {};
    $scope.tmp_path = $rootScope.path_location + 'tmp' + '/';
    $scope.loading = false;
    $scope.cliente.imagen = false;
        
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveCliente = function(cliente, boton, imagen_preview) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
        
        if (imagen_preview !== null) {
            cliente.imagen = imagen_preview;
        }
        cliente.estado_id = 1;
        clientesservice.save(cliente, function(data) {
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
        
        clientesservice.previewImagen(fd, function(data) {
            $scope.imagen_preview = data.filename;
            $scope.loading = false;
        }, function(err) {
            $scope.imagen_preview = null;
            $scope.loading = false;
        });
    };
});