(function () {

    'use strict';

    angular.module('crmApp')

        .factory('tasksFactory', ['$http', 'appConfig', function ($http, appConfig) {
                var tasksFactory = {};

                tasksFactory.getTasks = function() {
                    return $http.get(appConfig.tasksUrl);
                };

                tasksFactory.createTask = function(data) {
                    return $http.post(appConfig.tasksUrl, data);
                };

                return tasksFactory;
            }]);
})();