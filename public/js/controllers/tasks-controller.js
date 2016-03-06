(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TasksCtrl',
            ['$scope', 'tasksFactory',
                function ($scope, tasksFactory) {
                    $scope.tasks = [];
                    tasksFactory.getTasks()
                        .success(function (response) {
                            $scope.tasks = response.tasks;
                        })
                        .error(function (error) {});
                }]);
})();
