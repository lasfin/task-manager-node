(function () {

    'use strict';

    angular.module('crmApp')

        .factory('tasksFactory', ['$http', function ($http) {
                var urlBase = '/tasks';
                var tasksFactory = {};

                tasksFactory.getTasks = function() {
                    return $http.get(urlBase);
                };

                return tasksFactory;
            }]);
})();