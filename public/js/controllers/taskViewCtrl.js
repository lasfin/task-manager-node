(function () {

    'use strict';

    angular.module('crmApp')

        .controller('TaskViewCtrl',
            ['$scope', '$stateParams', 'tasksFactory',
                function ($scope, $stateParams, tasksFactory) {
                    var id = $stateParams.id;
                }]);
})();
