(function () {

    'use strict';

    angular.module('crmApp')

        .factory('tasksFactory', ['$http', 'appConfig', function ($http, appConfig) {
                return {
                    getTasks() {
                        return $http.get(appConfig.tasksUrl);
                    },
                    createTask(data) {
                        return $http.post(appConfig.tasksUrl, data);
                    }
                };
            }]);
})();