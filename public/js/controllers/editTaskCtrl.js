(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TaskEditCtrl',
            ['$scope', '$stateParams', 'tasksFactory', 'ngDialog', 'Notification', 'helpers',
                function ($scope, $stateParams, tasksFactory, ngDialog, Notification, helpers) {
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
                        var tags = helpers.splitByChar($scope.task.tags, ',');

                        tasksFactory.update($scope.task._id, {
                            _id: $scope.task._id,
                            title: $scope.task.title,
                            priority: $scope.task.priority,
                            body: $scope.task.body,
                            tags: tags,
                            completed: $scope.task.completed,
                            completedAt: $scope.task.completedAt,
                            createdAt: $scope.task.createdAt
                        }).then(() => {
                            Notification.success('Successfully edited');
                        }, () => {
                            Notification.error('Something goes wrong');
                        });
                    }
                }])
})();
