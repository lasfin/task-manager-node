(function () {

    'use strict';

    angular.module('crmApp')

        .factory('statsFactory', ['$http', 'appConfig', function ($http, appConfig) {
            return {
                geTasksStats() {
                    return $http.get(appConfig.statsUrl + 'tasks/');
                }
            };
        }]);
})();