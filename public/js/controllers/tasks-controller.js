(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TasksCtrl',
            ['$scope', '$rootScope', 'tasksFactory',
                function ($scope, $rootScope, tasksFactory) {
                    $scope.tasks = tasksFactory;
                    tasksFactory.getTasks()
                        .success(function (response) {
                            $scope.tasks = response.tasks;
                        })
                        .error(function (error) {});
                }]);
})();
