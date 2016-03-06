(function () {

    'use strict';

    angular.module('crmApp')

        .controller('AddTaskCtrl',
            ['$scope', 'tasksFactory',
                function ($scope, tasksFactory) {
                    $('select').material_select();
                }]);
})();
