(function () {

    'use strict';

    angular.module('crmApp')

        .controller('ClientsView',
            ['$scope', 'clientsFactory', 'Notification',
                function ($scope, clientsFactory, Notification) {
                    $scope.clients = clientsFactory.get();
                    console.log($scope.clients);
                }]);
})();
