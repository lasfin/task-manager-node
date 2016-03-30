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
                    $scope.delete = function(id) {
                        ngDialog.open({
                            template: 'templateId',
                            className: 'ngdialog-theme-default'
                        });
                    }
                }]);
})();
