(function () {

    'use strict';

    angular.module('crmApp')

        .factory('clientsFactory', ['$http', 'appConfig', function ($http, appConfig) {
            return {
                get() {
                    return [
                        {
                            id: '1',
                            name: 'Client One name',
                            mail: 'test@test.com',
                            phone: '880074570'
                        },
                        {
                            id: '2',
                            name: 'Client Two name',
                            mail: 'test@test2.com',
                            phone: '880074570'
                        },
                        {
                            id: '3',
                            name: 'Client Three name',
                            mail: 'test@test3.com',
                            phone: '5435345345'
                        }
                    ];
                    //return $http.get(appConfig.clientsUrl);
                }
            };
        }]);
})();