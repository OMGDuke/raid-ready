var raidReadyApp = angular.module('raidReadyApp', ['ui.router']);

raidReadyApp.config(function($stateProvider, $urlRouterProvider, $locationProvider) {

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
    if(window.history && window.history.pushState){
     $locationProvider.html5Mode({enabled: true});
    }
});
