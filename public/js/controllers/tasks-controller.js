/*global angular*/
(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TasksCtrl',
            ['$scope', '$rootScope',
                function ($scope, $rootScope) {
                    $scope.tasks = [
                        {id: 1,
                        title: 'trett'},
                        {id: 2,
                        title: 'fsdfsdf'},
                        {id: 3,
                            title: 'fsfsdfsdf'},
                        {id: 4,
                            title: 'fdsfds'},
                        {id: 5,
                            title: 'fdsfds'}
                    ]
                }]);
})();
