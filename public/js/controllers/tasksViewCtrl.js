(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TasksCtrl',
            ['$scope', 'tasksFactory', 'helpers', 'Notification',
                function ($scope, tasksFactory, helpers, Notification) {
                    $scope.tasks = [];
                    tasksFactory.get()
                        .success((response) => {
                            $scope.tasks = response.tasks;
                        })
                        .error((error) => {});

                    $scope.markAsDone = function(taskId) {
                        var task = $scope.tasks.find((item) => {
                            return item._id === taskId;
                        });

                        tasksFactory.update(task._id, {
                            _id: task._id,
                            title: task.title,
                            priority: task.priority,
                            body: task.body,
                            tags: helpers.splitByChar(task.tags, ','),
                            completed: true,
                            completedAt: task.completedAt,
                            createdAt: task.createdAt
                        }).then(() => {
                            task.completed = true;
                            Notification.success('Successfully updated');
                        }, () => {
                            Notification.error('Something goes wrong');
                        });
                    };

                }]);
})();
