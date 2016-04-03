(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TaskEditCtrl',
            ['$scope', '$stateParams', 'tasksFactory', 'ngDialog', 'Notification',
                function ($scope, $stateParams, tasksFactory, ngDialog, Notification) {
                    tasksFactory.getById($stateParams.id)
                        .success((response) => {
                            $scope.task = response.task;
                            $('select').material_select();
                        })
                        .error(() => {
                            Notification.error('Can\'t find a task');
                        });
                }])
})();
