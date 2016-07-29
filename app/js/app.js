var raidReadyApp = angular.module('raidReadyApp', ['ui.router']);

raidReadyApp.config(function($stateProvider, $urlRouterProvider) {

  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "views/home.html",
      controller: 'MainController'
    })
    .state('result', {
      url: "/result",
      templateUrl: "views/result.html",
      controller: 'MainController'
    });

    $urlRouterProvider.otherwise('/');
});
