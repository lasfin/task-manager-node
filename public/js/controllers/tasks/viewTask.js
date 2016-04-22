(function () {

    'use strict';

    angular.module('crmApp')

        .controller('ViewTask',
            ['$scope', '$stateParams', 'tasksFactory', 'ngDialog',
                function ($scope, $stateParams, tasksFactory, ngDialog) {
                    tasksFactory.getById($stateParams.id)
                        .success((response) => {
                            $scope.task = response.task;
                        })
                        .error((error) => {});


                    $scope.openDeletePopup = function() {
                        ngDialog.open({
                            template: 'deleteTask',
                            className: 'ngdialog-theme-default',
                            controller: 'submitDeleteTask'
                        });
                    };
                }])


        .controller('submitDeleteTask',
            ['$scope', '$state', '$stateParams', 'tasksFactory', 'Notification', 'ngDialog',
                function ($scope, $state, $stateParams, tasksFactory, Notification, ngDialog) {
                    $scope.confirmDelete = function() {
                        tasksFactory.delete($stateParams.id)
                            .success(() => {
                                ngDialog.closeAll();
                                $state.go('tasks');
                                Notification.success('Task deleted');
                            })
                            .error(() => {
                                ngDialog.closeAll();
                                Notification.error('Can\'t delete the task');
                            })
                    };
                }]);
})();
