(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TaskEditCtrl',
            ['$scope', '$stateParams', 'tasksFactory', 'ngDialog', 'Notification',
                function ($scope, $stateParams, tasksFactory, ngDialog, Notification) {
                    $scope.selectOptions = [1,2,3,4,5];

                    tasksFactory.getById($stateParams.id)
                        .success((response) => {
                            $scope.task = response.task;
                            setTimeout(()=> {
                                $('select').material_select();
                            }, 0);
                        })
                        .error(() => {
                            Notification.error('Can\'t find a task');
                        });
                    $scope.update = function() {
                        console.log($scope.task);
                        return false;
                        tasksFactory.update($scope.task._id, $scope.task);
                    }
                }])
})();
