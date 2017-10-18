'use strict';

/**
 * @ngdoc function
 * @name transnvAdminFrontendApp.controller:SlidesCtrl
 * @description
 * # SlidesCtrl
 * Controller of the transnvAdminFrontendApp
 */
angular.module('transnvAdminFrontendApp')
.controller('SlidesCtrl', function ($scope, slidesservice, $uibModal, $utilsviewservice) {
    
    $scope.getSlides = function() {
        $scope.loading = true;
        slidesservice.getAdmin(function(data) {
            $scope.slides = data.slides;
            $scope.loading = false;
        });
    };
    
    $scope.init = function() {
        $scope.getSlides();
    };
    
    $scope.sortableOptions = {
        'ui-floating': true,
        stop: function(e, ui) {
            for (var index in $scope.slides) {
                $scope.slides[index].orden = index;
            }
        }
    };
    
    $scope.saveOrden = function(slides, event) {
        $utilsviewservice.disable(event.currentTarget);
        
        slidesservice.saveMany({slides: slides}, function (data) {
            $scope.message = data;
            $utilsviewservice.enable(event.currentTarget);
        }, function(err) {
            $scope.message = err.data;
            $utilsviewservice.enable(event.currentTarget);
        });
    };
  
    $scope.showSlidesAdd = function(event) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceAdd = $uibModal.open({
            templateUrl: 'views/slides-add.html',
            controller: 'SlidesAddCtrl',
            backdrop: false
        });
        
        $utilsviewservice.enable(event.currentTarget);
        
        modalInstanceAdd.result.then(function (data) {
            $scope.getSlides();
            $scope.message = data;
        });
    };
        
    $scope.showSlidesEdit = function(slide) {
        $utilsviewservice.disable(event.currentTarget);
        
        var modalInstanceEdit = $uibModal.open({
            templateUrl: 'views/slides-edit.html',
            controller: 'SlidesEditCtrl',
            backdrop: false,
            resolve: {
                slide: function() {
                    return slide;
                }
            }
        });
        
        $utilsviewservice.enable(event.currentTarget);
           
        modalInstanceEdit.result.then(function (data) {
            $scope.getSlides();
            $scope.message = data;
        });
    };
    
    $scope.init();
});