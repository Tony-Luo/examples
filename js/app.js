// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
      // for form inputs)
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

      // Don't remove this line unless you know what you are doing. It stops the viewport
      // from snapping when text inputs are focused. Ionic handles this internally for
      // a much nicer keyboard experience.
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
  });
})

.controller('HomeCtrl', function($scope, $ionicModal) {
  $scope.countries = {
    "allies": {
      "us": {
        img: 'img/usp1.jpg',
        modalImg: 'img/us.jpg',
        alt: 'US plane F4U Corsair',
        motto: 'Aim High ... Fly-Fight-Win',
        model: 'F4U Corsair',
        manufacturer: 'Chance Vought',
        totalBuiltNumber: '12,571',
      },
      "uk": {
        img: 'img/ukp1.jpg',
        modalImg: 'img/uk.jpg',
        alt: 'UK plane Spitfire',
        motto: 'Through Adversity to the Stars',
        model: 'Spitfire',
        manufacturer: 'Supermarine',
        totalBuiltNumber: '20,351',
      },
      "ussr": {
        img: 'img/ussrp1.jpg',
        modalImg: 'img/ussr.jpg',
        alt: 'USSR plane La-5',
        motto: 'For Mother Russia',
        model: 'La-5',
        manufacturer: 'Lavochkin',
        totalBuiltNumber: '9,920',
      }
    },
    "axis": {
      "germany": {
        img: 'img/germanyp1.jpg',
        modalImg: 'img/germany.jpg',
        alt: 'Germany plane Bf 109',
        motto: 'Sieg Heil',
        model: 'Bf 109',
        manufacturer: 'Chance Vought',
        totalBuiltNumber: '33,984',
      },
      "japan": {
        img: 'img/japanp1.jpg',
        modalImg: 'img/japan.jpg',
        alt: 'Japan plane A6M Zero',
        motto: 'Long live the Emperor',
        model: 'A6M Zero',
        manufacturer: 'Mitsubishi',
        totalBuiltNumber: '10,939',
      }
    }
  };

  // Misunderstand ionic modal before and find a new way to do what I want
  $ionicModal.fromTemplateUrl('modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.modal = modal;
  });

  $scope.openModal = function(country) {
    switch(country) {
      case 'germany':
      case 'japan':
        $scope.motto = $scope.countries.axis[country].motto;
        $scope.model = $scope.countries.axis[country].model;
        $scope.manufacturer = $scope.countries.axis[country].manufacturer;
        $scope.totalBuiltNumber = $scope.countries.axis[country].totalBuiltNumber;
        $scope.modalImg = $scope.countries.axis[country].modalImg;
        $scope.alt = $scope.countries.axis[country].alt;
        break;
      default:
        $scope.motto = $scope.countries.allies[country].motto;
        $scope.model = $scope.countries.allies[country].model;
        $scope.manufacturer = $scope.countries.allies[country].manufacturer;
        $scope.totalBuiltNumber = $scope.countries.allies[country].totalBuiltNumber;
        $scope.modalImg = $scope.countries.allies[country].modalImg;
        $scope.alt = $scope.countries.allies[country].alt;
        break;
    }
    $scope.modal.show();
  };
  
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
})

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    })
    .state('allies', {
      url: '/allies',
      templateUrl: 'allies.html'
    })
    .state('axis', {
      url: '/axis',
      templateUrl: 'axis.html'
    });
  
  $urlRouterProvider.otherwise('/');
}]);