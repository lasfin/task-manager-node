(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TasksCtrl',
            ['$scope', 'tasksFactory', 'helpers', 'Notification',
                function ($scope, tasksFactory, helpers, Notification) {
                    $scope.tasks = [];
                    $scope.showCompleted = false;
                    $scope.showNotCompleted = true;

                    installSort();


                    $scope.sortTasks = function() {
                        switch ($scope.selected.sortName){
                            case 'date':
                                $scope.tasks.sort((a, b) => {
                                    if (a.createdAt < b.createdAt) {
                                        return 1;
                                    } else if ( a.createdAt > b.createdAt) {
                                        return -1;
                                    }
                                    return 0;
                                });
                                break;
                            case 'priority':
                                $scope.tasks.sort((a, b) => {
                                    return a.priority - b.priority;
                                });
                                break;
                        }
                        if ($scope.selected.sortDirection === 'desc') $scope.tasks.reverse();
                        $scope.tasksToShow = $scope.tasks;
                    };

                    $scope.filterTasks = function() {
                        $scope.tasksToShow = [];
                        var completed = [],
                            notCompleted = [];

                        if ($scope.showCompleted) {
                            completed = $scope.tasks.filter((task) => {
                                return task.completed;
                            })
                        }
                        if ($scope.showNotCompleted) {
                            notCompleted = $scope.tasks.filter((task) => {
                                return !task.completed;
                            })
                        }
                        $scope.tasksToShow = completed.concat(notCompleted);
                    };

                    tasksFactory.get()
                        .success((response) => {
                            $scope.tasks = response.tasks;
                            $scope.filterTasks();
                            $scope.sortTasks();
                        })
                        .error(() => {
                            Notification.error('Something goes wrong');
                        });

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

                    function installSort() {
                        $scope.items = [{
                            id: 1,
                            sortName: 'date',
                            sortDirection: 'asc',
                            label: 'Date (newest first)'
                        }, {
                            id: 2,
                            sortName: 'date',
                            sortDirection: 'desc',
                            label: 'Date (oldest first)'
                        }, {
                            id: 3,
                            sortName: 'priority',
                            sortDirection: 'desc',
                            label: 'Priority (high first)'
                        }, {
                            id: 4,
                            sortName: 'priority',
                            sortDirection: 'asc',
                            label: 'Priority (low first)'
                        }];
                        $scope.selected = $scope.items[0];
                        setTimeout(() => {
                            $('select').material_select();
                        }, 0);
                    }
                }]);
})();
