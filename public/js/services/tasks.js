(function () {

    'use strict';

    angular.module('crmApp')

        .factory('tasksFactory', ['$http', 'appConfig', function ($http, appConfig) {
                return {
                    get() {
                        return $http.get(appConfig.tasksUrl);
                    },
                    getById(id) {
                        return $http.get(appConfig.tasksUrl + id);
                    },
                    update(id, task) {
                        return $http.put(appConfig.tasksUrl + id, task);
                    },
                    delete(id) {
                        return $http.delete(appConfig.tasksUrl + id, {});
                    },
                    create(data) {
                        return $http.post(appConfig.tasksUrl, data);
                    }
                };
            }]);
})();