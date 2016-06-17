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

.controller('AppCtrl', function($scope, $ionicModal) {
  $scope.countries = {
    "us": {
      img: 'img/usp1.jpg',
      alt: 'US plane F4U Corsair',
      model: 'F4U Corsair',
      manufacturer: 'Chance Vought',
      totalBuiltNumber: '12,571',
      modal: null
    },
    "uk": {
      img: 'img/ukp1.jpg',
      alt: 'UK plane Spitfire',
      model: 'Spitfire',
      manufacturer: 'Supermarine',
      totalBuiltNumber: '20,351',
      modal: null
    },
    "ussr": {
      img: 'img/ussrp1.jpg',
      alt: 'USSR plane La-5',
      model: 'La-5',
      manufacturer: 'Lavochkin',
      totalBuiltNumber: '9,920',
      modal: null
    },
    "germany": {
      img: 'img/germanyp1.jpg',
      alt: 'Germany plane Bf 109',
      model: 'Bf 109',
      manufacturer: 'Chance Vought',
      totalBuiltNumber: '33,984',
      modal: null
    },
    "japan": {
      img: 'img/japanp1.jpg',
      alt: 'Japan plane A6M Zero',
      model: 'A6M Zero',
      manufacturer: 'Mitsubishi',
      totalBuiltNumber: '10,939',
      modal: null
    }
  };

  $ionicModal.fromTemplateUrl('us-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.countries['us'].modal = modal;
  });

  $ionicModal.fromTemplateUrl('uk-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.countries['uk'].modal = modal;
  });

  $ionicModal.fromTemplateUrl('ussr-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.countries['ussr'].modal = modal;
  });

  $ionicModal.fromTemplateUrl('germany-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.countries['germany'].modal = modal;
  });

  $ionicModal.fromTemplateUrl('japan-modal.html', {
    scope: $scope,
    animation: 'slide-in-up'
  }).then(function(modal) {
    $scope.countries['japan'].modal = modal;
  });

  $scope.openModal = function(country) {
    $scope.modal = $scope.countries[country].modal;
    $scope.modal.show();
  };
  
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
});