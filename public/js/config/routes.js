'use strict';

window.MTG.main.config(['$locationProvider', '$stateProvider', '$urlRouterProvider', function($location, $stateProvider, $urlRouterProvider) {
    $location.hashPrefix('!');
    //
    // For any unmatched url, redirect to /
    $urlRouterProvider.otherwise('/');
    //
    // Now set up the states
    $stateProvider
        .state('error', {
            url: '/error',
            templateUrl: './public/html/partials/error.html',
            controller: 'ErrorController'
        })
        .state('home', {
            url: '/',
            abstract: true,
            templateUrl: './public/html/partials/home/index.html'
        })
        .state('home.index', {
            url: '',
            templateUrl: './public/html/partials/home/index.html'
        })
}]);