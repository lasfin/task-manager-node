(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TasksCtrl',
            ['$scope', 'tasksFactory',
                function ($scope, tasksFactory) {
                    $scope.tasks = [];
                    tasksFactory.get()
                        .success((response) => {
                            $scope.tasks = response.tasks;
                        })
                        .error((error) => {});
                }]);
})();
