(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TaskViewCtrl',
            ['$scope', '$stateParams', 'tasksFactory', 'ngDialog',
                function ($scope, $stateParams, tasksFactory, ngDialog) {
                    tasksFactory.getById($stateParams.id)
                        .success((response) => {
                            $scope.task = response.task;
                        })
                        .error((error) => {});


                    $scope.openDeletePopup = function() {
                        ngDialog.open({
                            template: 'templateId',
                            className: 'ngdialog-theme-default',
                            controller: 'submitDeleteCtrl'
                        });
                    };
                }])


        .controller('submitDeleteCtrl',
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
