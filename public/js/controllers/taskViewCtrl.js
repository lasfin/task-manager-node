(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TaskViewCtrl',
            ['$scope', '$stateParams', 'tasksFactory',
                function ($scope, $stateParams, tasksFactory) {
                    tasksFactory.getById($stateParams.id)
                        .success((response) => {
                            $scope.task = response.task;
                        })
                        .error((error) => {});
                }]);
})();
