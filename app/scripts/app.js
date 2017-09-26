'use strict';

/**
 * @ngdoc overview
 * @name transnvAdminFrontendApp
 * @description
 * # transnvAdminFrontendApp
 *
 * Main module of the application.
 */
angular
.module('transnvAdminFrontendApp', [
    'ngAnimate',
    'ngCookies',
    'ngResource',
    'ngSanitize',
    'ngTouch',
    'ui.bootstrap',
    'ngFileUpload',
    'ui.tinymce',
    'ui.sortable',
    'thatisuday.ng-image-gallery',
    'angularValidator',
    'scrollable-table',
    'ui.router'
])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {
    $httpProvider.interceptors.push('oauthHttpInterceptor');
    var mainState = {
        name: 'main',
        url: '/',
        templateUrl: 'views/main.html',
        controller: 'MainCtrl',
        controllerAs: 'main',
        title: 'Home'
    };  
    
    var infosState = {
        name: 'infos',
        url: '/infos',
        templateUrl: 'views/infos.html',
        controller: 'InfosCtrl',
        controllerAs: 'infos',
        title: 'Información General'
    };
    
    var clientesState = {
        name: 'clientes',
        url: '/clientes',
        templateUrl: 'views/clientes.html',
        controller: 'ClientesCtrl',
        controllerAs: 'clientes',
        title: 'Clientes'
    };
    
    var directorioState = {
        name: 'directorio',
        url: '/directorio',
        templateUrl: 'views/clientes.html',
        controller: 'ClientesCtrl',
        controllerAs: 'clientes',
        title: 'Clientes'
    };
    
    var quienesSomosState = {
        name: 'quienes-somos',
        url: '/quienes-somos',
        templateUrl: 'views/quienes-somos.html',
        controller: 'QuienesSomosCtrl',
        controllerAs: 'quienes-somos',
        title: '¿Quiénes Somos?'
    };
    
    var historiaState = {
        name: 'historia',
        url: '/historia',
        templateUrl: 'views/historia.html',
        controller: 'HistoriaCtrl',
        controllerAs: 'historia',
        title: 'Historia'
    };
    
    var directorioState = {
        name: 'directorio',
        url: '/directorio',
        templateUrl: 'views/directorio.html',
        controller: 'DirectorioCtrl',
        controllerAs: 'directorio',
        title: 'Directorio Telefónico'
    };
    
    var ubicacionState = {
        name: 'ubicacion',
        url: '/ubicacion',
        templateUrl: 'views/ubicacion.html',
        controller: 'UbicacionCtrl',
        controllerAs: 'ubicacion',
        title: 'Ubicación'
    };
    
    var noticiasState = {
        name: 'noticias',
        url: '/noticias/{id}',
        templateUrl: 'views/noticias.html',
        controller: 'NoticiasCtrl',
        controllerAs: 'noticias',
        params: {
            id: {
                value: '1'
            }
        }
    };
    
    var serviciosState = {
        name: 'servicios',
        url: '/servicios/{id}',
        templateUrl: 'views/servicios.html',
        controller: 'ServiciosCtrl',
        controllerAs: 'servicios',
        params: {
            id: {
                value: '1'
            }
        }
    };
    
    $stateProvider.state(mainState);
    $stateProvider.state(infosState);
    $stateProvider.state(clientesState);
    $urlRouterProvider.when('', '/');
})
.run(function($rootScope, $state, $cookies, $location, $window, envservice) {
    angular.module('transnvAdminFrontendApp').path_location = envservice.getHost();
    $rootScope.path_location = envservice.getHost();
    
    $('#dvMessageRoot').removeClass('dvHidden');
    $rootScope.tinymceOptions = {
        toolbar: "undo redo | styleselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | table | fontsizeselect | fontselect ",
        fontsize_formats: "8pt 10pt 11pt 12pt 13pt 14pt 15pt 16pt 17pt 18pt 19pt 20pt 21pt 22pt 23pt 24pt 25pt 26pt 27pt 28pt",
        plugins: 'lists autolink textcolor colorpicker link media preview table code',
        language_url : '/scripts/langs_tinymce/es.js'
    };
    $('.nav a').on('click', function(){
        $('.navbar-toggle').click();
    });
    
    $rootScope.$state = $state;
    
    if ($cookies.get('transnv-token')) {
        $rootScope.logged = true;
        $rootScope.user = $cookies.getObject('transnv-user');
    } else {
        $rootScope.logged = false;
    }
    
    $rootScope.$on('$stateChangeStart', 
    function(event, toState, toParams, fromState, fromParams, options) {
        if (fromState.name === '' && toState.name === 'usersLogin') {
            $('#topbar-wrapper').addClass('ng-hide');
            $('#wrapper').addClass('inLogin');
            if ($rootScope.user !== undefined) {
                $location.path('/');
            }
        } else if (fromState.name === ''  && toState.name !== 'usersLogin') {
            $('#sidebar-wrapper').css('display', 'block');
            $('#wrapper').addClass('toggled');
            if ($rootScope.user === undefined) {
                $('#sidebar-wrapper').css('display', 'none');
                $('#wrapper').removeClass('toggled');
                $location.path('/users-login');
            }
        } else if (fromState.name !== 'usersLogin' && toState.name === 'usersLogin') {
            if ($rootScope.user !== undefined) {
                $location.path('/');
            } else {
                $('#sidebar-wrapper').css('display', 'none');
                $('#wrapper').removeClass('toggled');
            }
        } else if (fromState.name === 'usersLogin' && toState.name !== 'usersLogin') {
            if ($rootScope.user === undefined) {
                $location.path('/users-login');
            } else {
                $('#topbar-wrapper').removeClass('ng-hide');
                $('#sidebar-wrapper').css('display', 'block');
                $('#wrapper').addClass('toggled');
            }
        }
        if ($rootScope.user !== undefined) {
            if ($rootScope.user.rol.permisos.search(toState.name) >= 0) {
                $rootScope.message_root = null;
            } else {
                if (toState.name !== 'main' && toState.name !== 'usersLogin') {
                    event.preventDefault();
                    $rootScope.message_root = {
                        type: 'error',
                        text: 'No tiene permisos'
                    };
                }
            }
        }
    });
    
    $rootScope.$on('$stateChangeSuccess', 
    function(event, toState, toParams, fromState, fromParams){ 
        $rootScope.title = toState.title;
    });

    /*
    $rootScope.$on('$routeChangeError', function() {
    });
    
    $rootScope.logout = function() {
        if (confirm('¿Está seguro de cerrar sesión?')) {
            $cookies.remove('inexdeo-user');
            $cookies.remove('inexdeo-token');
            $rootScope.user = undefined;
            $('#topbar-wrapper').addClass('ng-hide');
            $('#wrapper').addClass('inLogin');
            $rootScope.message_root = [];
            $location.path('/users-login');
        }
    };
    */
});