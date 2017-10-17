'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:ClientesEditCtrl
 * @description
 * # ClientesEditCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('ClientesEditCtrl', function ($scope, cliente, $uibModalInstance, 
    clientesservice, $rootScope, $utilsviewservice) {
    
    $scope.loading = false;
    var changed = false;
    $scope.tmp_path = $rootScope.path_location + 'img' + '/clientes'; 
    
    function init() {
        clientesservice.get({id: cliente.id}, function(data) {
            $scope.cliente = data.cliente;
            $scope.imagen_preview = $scope.cliente.imagen;
            $scope.cliente.imagen = null;
        });
    }
    
    var tmp_path = $rootScope.path_location + 'tmp' + '/';
    
    $scope.cancel = function() {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.saveCliente = function(cliente, boton, imagen_preview) {
        $('#' + boton).text('Guardando...');
        $utilsviewservice.disable('#' + boton);
        
        if (changed) {
            if (imagen_preview !== null) {
                cliente.imagen = imagen_preview;
            }
        }
        clientesservice.save(cliente, function(data) {
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
        
        clientesservice.previewImagen(fd, function(data) {
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