var raidReadyApp = angular.module('raidReadyApp', ['ui.router']);

raidReadyApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/home.html",
      // controller: 'YourCtrl'
    });

    $urlRouterProvider.otherwise('/');
});
