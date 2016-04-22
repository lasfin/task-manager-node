(function () {

    'use strict';

    angular.module('crmApp')

        .controller('EditClient',
            ['$scope', '$stateParams', 'clientsFactory', 'ngDialog', 'Notification', 'helpers',
                function ($scope, $stateParams, clientsFactory, ngDialog, Notification, helpers) {
                    var savedClient = {};

                    clientsFactory.getById($stateParams.id)
                        .success((response) => {
                            $scope.client = response.client;
                            savedClient = JSON.parse(JSON.stringify($scope.client));
                        })
                        .error(() => {
                            Notification.error('Can\'t find a task');
                        });

                    $scope.updateClient = function() {

                    }
                }])
})();
