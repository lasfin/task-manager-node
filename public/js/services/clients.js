(function () {

    'use strict';

    angular.module('crmApp')

        .factory('clientsFactory', ['$http', 'appConfig', function ($http, appConfig) {
            return {
                get() {
                    return $http.get(appConfig.clientsUrl);
                },
                getById(id) {
                    return $http.get(appConfig.clientsUrl + id);
                },
                update(id, client) {
                    return $http.put(appConfig.clientsUrl + id, client);
                },
                delete(id) {
                    return $http.delete(appConfig.clientsUrl + id, {});
                },
                create(data) {
                    return $http.post(appConfig.clientsUrl, data);
                }
            };
        }]);
})();