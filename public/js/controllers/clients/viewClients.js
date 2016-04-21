(function () {

    'use strict';

    angular.module('crmApp')

        .controller('ViewClients',
            ['$scope', 'clientsFactory', 'Notification',
                function ($scope, clientsFactory, Notification) {
                    clientsFactory.get()
                        .success((response) => {
                            $scope.clients = response.clients;
                        })
                        .error(() => {
                            Notification.error('Something goes wrong');
                        });
                }]);
})();
