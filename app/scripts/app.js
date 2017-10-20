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
    'ui.router',
    'angular-toArrayFilter'
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
    
    var nosotrosState = {
        name: 'nosotros',
        url: '/nosotros',
        templateUrl: 'views/nosotros.html',
        controller: 'NosotrosCtrl',
        controllerAs: 'nosotros',
        title: 'Nosotros'
    };
    
    var slidesState = {
        name: 'slides',
        url: '/slides',
        templateUrl: 'views/slides.html',
        controller: 'SlidesCtrl',
        controllerAs: 'slides',
        title: 'Slides'
    };
    
    var clientesState = {
        name: 'clientes',
        url: '/clientes',
        templateUrl: 'views/clientes.html',
        controller: 'ClientesCtrl',
        controllerAs: 'clientes',
        title: 'Clientes'
    };
    
    var serviciosState = {
        name: 'servicios',
        url: '/servicios',
        templateUrl: 'views/servicios.html',
        controller: 'ServiciosCtrl',
        controllerAs: 'servicios',
        title: 'Servicios'
    };
    
    var noticiasState = {
        name: 'noticias',
        url: '/noticias',
        templateUrl: 'views/noticias.html',
        controller: 'NoticiasCtrl',
        controllerAs: 'noticias',
        title: 'Noticias'
    };
    
    var rolesState = {
        name: 'roles',
        url: '/roles',
        templateUrl: 'views/roles.html',
        controller: 'RolesCtrl',
        controllerAs: 'roles',
        title: 'Roles'
    };
    
    var usersState = {
        name: 'users',
        url: '/users',
        templateUrl: 'views/users.html',
        controller: 'UsersCtrl',
        controllerAs: 'users',
        title: 'Usuarios'
    };
    
    var directorioState = {
        name: 'directorio',
        url: '/directorio',
        templateUrl: 'views/directorio.html',
        controller: 'DirectorioCtrl',
        controllerAs: 'directorio',
        title: 'Directorio'
    };
    
    var cabecerasState = {
        name: 'cabeceras',
        url: '/cabeceras',
        templateUrl: 'views/cabeceras.html',
        controller: 'CabecerasCtrl',
        controllerAs: 'cabeceras',
        title: 'Cabeceras'
    };
    
    var usersLoginState = {
        name: 'users-login',
        url: '/users-login',
        templateUrl: 'views/users-login.html',
        controller: 'UsersLoginCtrl',
        controllerAs: 'users-login',
        title: 'Login'
    };
    
    $stateProvider.state(mainState);
    $stateProvider.state(infosState);
    $stateProvider.state(nosotrosState);
    $stateProvider.state(slidesState);
    $stateProvider.state(clientesState);
    $stateProvider.state(serviciosState);
    $stateProvider.state(noticiasState);
    $stateProvider.state(directorioState);
    $stateProvider.state(cabecerasState);
    $stateProvider.state(rolesState);
    $stateProvider.state(usersState);
    $stateProvider.state(usersLoginState);
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
        if (fromState.name === '' && toState.name === 'users-login') {
            $('#topbar-wrapper').addClass('ng-hide');
            $('#wrapper').addClass('inLogin');
            if ($rootScope.user !== undefined) {
                $location.path('/');
            }
        } else if (fromState.name === ''  && toState.name !== 'users-login') {
            $('#sidebar-wrapper').css('display', 'block');
            $('#wrapper').addClass('toggled');
            if ($rootScope.user === undefined) {
                $('#sidebar-wrapper').css('display', 'none');
                $('#wrapper').removeClass('toggled');
                $location.path('/users-login');
            }
        } else if (fromState.name !== 'users-login' && toState.name === 'users-login') {
            if ($rootScope.user !== undefined) {
                $location.path('/');
            } else {
                $('#sidebar-wrapper').css('display', 'none');
                $('#wrapper').removeClass('toggled');
            }
        } else if (fromState.name === 'users-login' && toState.name !== 'users-login') {
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
                if (toState.name !== 'main' && toState.name !== 'users-login') {
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

    $rootScope.logout = function() {
        if (confirm('¿Está seguro de cerrar sesión?')) {
            $cookies.remove('transnv-user');
            $cookies.remove('transnv-token');
            $rootScope.user = undefined;
            $('#topbar-wrapper').addClass('ng-hide');
            $('#wrapper').addClass('inLogin');
            $rootScope.message_root = [];
            $location.path('/users-login');
        }
    };
});