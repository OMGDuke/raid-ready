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

raidReadyApp.directive('errSrc', function() {
  return {
    link: function(scope, element, attrs) {
      element.bind('error', function() {
        if (attrs.src != attrs.errSrc) {
          attrs.$set('src', attrs.errSrc);
        }
      });
    }
  };
});
