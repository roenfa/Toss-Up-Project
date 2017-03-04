'use strict';

angular.module('app').controller('Controller', function ($scope, appStorage) {

    $scope.appStorage = appStorage;

    $scope.$watch('appStorage.data', function() {
        $scope.todoList = $scope.appStorage.data;
    });

    $scope.appStorage.findAll(function(data){
        $scope.list = data;
        $scope.$apply();
    });

    $scope.add = function() {
        appStorage.add($scope.newContent);
        $scope.newContent = '';
    }

    $scope.remove = function(item) {
        appStorage.remove(item);
    }

    $scope.removeAll = function() {
        appStorage.removeAll();
    }

    $scope.toggleCompleted = function() {
        appStorage.sync();
    }
});