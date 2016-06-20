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
  $scope.isAllies = false;
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
        $scope.isAllies = false;
        break;
      default:
        $scope.motto = $scope.countries.allies[country].motto;
        $scope.model = $scope.countries.allies[country].model;
        $scope.manufacturer = $scope.countries.allies[country].manufacturer;
        $scope.totalBuiltNumber = $scope.countries.allies[country].totalBuiltNumber;
        $scope.modalImg = $scope.countries.allies[country].modalImg;
        $scope.alt = $scope.countries.allies[country].alt;
        $scope.isAllies = true;
        break;
    }
    $scope.modal.show();
  };
  
  $scope.closeModal = function() {
    $scope.modal.hide();
  };
})

.controller('AxisFightCtrl', function($scope, $timeout, $ionicNavBarDelegate, AxisPlaneService, AxisMatrixService) {
  // Don't show back button in fight page
  $ionicNavBarDelegate.showBackButton(false);
  
  var rowNumber = 7;
  var colNumber = 14;
  var bomberIcon = 'ion-plane';
  var fighterIcon = 'ion-android-plane';
  var disappearIcon = 'ion-android-close';
  var originalMatrix = [];
  var matrix = [];
  var planes = {};
  $scope.rowNumber = rowNumber;
  $scope.colNumber = colNumber;
  
  // Initialize original matrix model
  for(var i = 0; i < rowNumber; i++) {
    var temp = [];
    for(var j = 0; j < colNumber; j++) {
      temp.push({
        showCloud: true,
        planeIcon: undefined,
        planeDirection: undefined
      });
    }
    originalMatrix.push(temp);
  }
  
  // Get first block of planes
  planes = AxisPlaneService.getPlanes(rowNumber, colNumber);
  console.log(planes);

  // Initialize matrix DOM
  $scope.matrix = AxisMatrixService.setMatrix(originalMatrix, planes, bomberIcon, fighterIcon);
  console.log($scope.matrix);

  // Callback function for double-tap event
  var onDoubleTap = function(event) {
    for(var i = 0; i < 4; i++) {
      if(planes.fighters[i].hasBeenShotdown === false) {
        return;
      }
    }
    
    if(event.target.className.match(/ion-plane/i)) {
      $scope.matrix[planes.bomber.row][planes.bomber.col].planeIcon = disappearIcon;
      $scope.$apply();
      
      $timeout(function() {
        console.log('shoot down the bomber');
      }, 1000);
    }
  };

  // Add event listener on double-tap event
  ionic.onGesture('doubletap', onDoubleTap, document.getElementById('mainBody'), {});
  
  // Function for on-swipe-up event
  $scope.onSwipeUp = function() {
    console.log('swipe up');
    AxisMatrixService.setMatrixOnGesture($scope.matrix, planes, 'toTop', disappearIcon);
  };

  // Function for on-swipe-right event
  $scope.onSwipeRight = function() {
    console.log('swipe right');
    AxisMatrixService.setMatrixOnGesture($scope.matrix, planes, 'toRight', disappearIcon);
  };

  // Function for on-swipe-down event
  $scope.onSwipeDown = function() {
    console.log('swipe down');
    AxisMatrixService.setMatrixOnGesture($scope.matrix, planes, 'toBottom', disappearIcon);
  };

  // Function for on-swipe-left event
  $scope.onSwipeLeft = function() {
    console.log('swipe left');
    AxisMatrixService.setMatrixOnGesture($scope.matrix, planes, 'toLeft', disappearIcon);
  };
  
})

.service('AxisPlaneService', ['RandomNumberService', function(RandomNumberService) {
  return {
    createLocationForBomber: function(rowNumber, colNumber) {
      // Don't let bomber display at edge
      var maxRow = rowNumber - 2;
      var maxCol = colNumber - 2;
      var locationForBomber = {
                                row: RandomNumberService.getRandomInteger(1, maxRow),
                                col: RandomNumberService.getRandomInteger(1, maxCol),
                                hasBeenShotdown: false
                              };
      
      return locationForBomber;
    },
    calculateLocationForFighters: function(locationOfBomber) {
      // 4 fighters are around bomber. List order is top, right, bottom, left
      return [
        {
          location: {row: locationOfBomber.row - 1, col: locationOfBomber.col},
          direction: this.calculateDirectionForFighters(),
          hasBeenShotdown: false
        },
        {
          location: {row: locationOfBomber.row, col: locationOfBomber.col + 1},
          direction: this.calculateDirectionForFighters(),
          hasBeenShotdown: false
        },
        {
          location: {row: locationOfBomber.row + 1, col: locationOfBomber.col},
          direction: this.calculateDirectionForFighters(),
          hasBeenShotdown: false
        },
        {
          location: {row: locationOfBomber.row, col: locationOfBomber.col - 1},
          direction: this.calculateDirectionForFighters(),
          hasBeenShotdown: false
        }
      ];
    },
    calculateDirectionForFighters: function() {
      return ['toTop', 'toRight', 'toBottom','toLeft'][RandomNumberService.getRandomInteger(0, 3)];
    },
    getPlanes: function(rowNumber, colNumber) {
      var bomber = this.createLocationForBomber(rowNumber, colNumber);
      var fighters = this.calculateLocationForFighters(bomber);

      return {
        bomber: bomber,
        fighters: fighters
      };
    }
  };
}])

.service('AxisMatrixService', [function() {
  return {
    setMatrixForBomber: function(matrix, bomber, bomberIcon) {
      matrix[bomber.row][bomber.col].showCloud = false;
      matrix[bomber.row][bomber.col].planeIcon = bomberIcon;
      
      return matrix;
    },
    setMatrixForFighters: function(matrix, fighters, icon) {
      fighters.forEach(function(fighter) {
        matrix[fighter.location.row][fighter.location.col].showCloud = false;
        matrix[fighter.location.row][fighter.location.col].planeIcon = icon;
        matrix[fighter.location.row][fighter.location.col].planeDirection = fighter.direction;
      });

      return matrix;
    },
    setMatrixOnGesture: function(matrix, planes, gesture, disappearIcon) {
      for(var i = 0; i < 4; i++) {
        if(planes.fighters[i].direction === gesture && 
           planes.fighters[i].hasBeenShotdown === false) {
          planes.fighters[i].hasBeenShotdown = true;
          this.setMatrixForFighters(matrix, [planes.fighters[i]], disappearIcon);
          console.log('shoot down ' + gesture + ' fighter');
          break;
        }
      }
    },
    setMatrix: function(originalMatrix, planes, bomberIcon, fighterIcon) {
      var matrix = angular.copy(originalMatrix);
      
      matrix = this.setMatrixForBomber(matrix, planes.bomber, bomberIcon);
      return this.setMatrixForFighters(matrix, planes.fighters, fighterIcon);
    }
  };
}])

.service('RandomNumberService', [function() {
  return {
    getRandomInteger: function(beginNumber, endNumber) {
      return Math.floor(Math.random() * endNumber) + beginNumber;
    }
  };
}])

.config(['$ionicConfigProvider', function($ionicConfigProvider) {
  // Super weapons bar always display at bottom
  $ionicConfigProvider.tabs.position('bottom');
}])

.config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'home.html',
      controller: 'HomeCtrl'
    })
    // TODO: allies pilots should have a different fight
    .state('allies', {
      url: '/allies',
      templateUrl: 'axisFight.html',
      controller: 'AxisFightCtrl'
    })
    .state('axis', {
      url: '/axis',
      templateUrl: 'axisFight.html',
      controller: 'AxisFightCtrl'
    });
  
  $urlRouterProvider.otherwise('/');
}]);