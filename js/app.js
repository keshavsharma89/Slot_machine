// This is our angular app
var myApp = angular.module('myApp',[]);

// the directive machine will mask the jquery plugin and bind the elment with scope
myApp.directive('machine', function() {
	var linker=function(scope, element, attr){
		scope.ele.push(element.slotMachine());
	}
	return {
		restrict: 'A',
		scope: true,
		link: linker
	};
});
