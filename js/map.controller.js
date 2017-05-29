(function() {
  'use strict';

var app = angular.module('web').controller('MapController', MapController);

// The controller
function MapController($scope, $rootScope, $log, $timeout, leafletMapEvents, leafletData)
{
	var self = this;

    // Problem: tiles aren't loaded until window is resized/refreshed
    // Also reported here: https://github.com/tombatossals/angular-leaflet-directive/issues/49
    // Solution: force an invalidateSize after the page loading
    leafletData.getMap("mymap").then(function(map) {
      $timeout(function() {
        console.log("Map tiles refreshed");
        map.invalidateSize();
      }, 1000);
    });

    angular.extend($scope, {
        defaults: {
            scrollWheelZoom: true
        },
        events: {
            map: {
                enable: ['moveend'],
                logic: 'emit'
            }
        },
        markers: {
            Rome: {
                lat: 41.9,
                lng: 12.45,
                message: "This is Rome!",
                focus: false,
                draggable: false
            },
            Bologna: {
                lat: 44.5,
                lng: 11.35,
                message: "This is Bologna!",
                focus: false,
                draggable: false
            }
        }
    });


    $scope.center  = {
        lat: 41.9,
        lng: 12.45,
        zoom: 5
    };

    $scope.$on('leafletDirectiveMap.mymap.moveend', function(event){
		leafletData.getMap().then(function(map) {
		    var bounds = map.getBounds();
		    $scope.a = bounds._northEast.lat
		    $scope.b = bounds._northEast.lng
		    $scope.c = bounds._southWest.lat
		    $scope.d = bounds._southWest.lng
		});
    });

}


})();