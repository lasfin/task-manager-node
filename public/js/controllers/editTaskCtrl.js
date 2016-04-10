(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TaskEditCtrl',
            ['$scope', '$stateParams', 'tasksFactory', 'ngDialog', 'Notification', 'helpers',
                function ($scope, $stateParams, tasksFactory, ngDialog, Notification, helpers) {
                    $scope.priorityOptions = [1,2,3,4,5];
                    $scope.doneOptions = [true, false];
                    var savedTask = {};

                    tasksFactory.getById($stateParams.id)
                        .success((response) => {
                            $scope.task = response.task;
                            savedTask = JSON.parse(JSON.stringify($scope.task));
                            setTimeout(()=> {
                                $('select').material_select();
                                $('textarea').trigger('autoresize');
                            }, 0);
                        })
                        .error(() => {
                            Notification.error('Can\'t find a task');
                        });

                    $scope.update = function() {
                        $scope.task.completed = $scope.task.completed === "true";
                        if (savedTask.completed === false && $scope.task.completed === true) {
                            $scope.task.completedAt = new Date();
                        }
                        var tags = helpers.splitByChar($scope.task.tags, ',');


                        console.log($scope.task.completed, !!$scope.task.completed);

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
