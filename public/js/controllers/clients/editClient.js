(function () {

    'use strict';

    angular.module('crmApp')

        .controller('EditClient',
            ['$scope', '$stateParams', 'clientsFactory', 'ngDialog', 'Notification', 'helpers',
                function ($scope, $stateParams, clientsFactory, ngDialog, Notification, helpers) {
                    clientsFactory.getById($stateParams.id)
                        .success((response) => {
                            $scope.client = response.client;
                        })
                        .error(() => {
                            Notification.error('Can\'t find a task');
                        });

                    $scope.updateClient = function() {
                        clientsFactory.update($scope.client._id, {
                            _id: $scope.client._id,
                            name: $scope.client.name,
                            phone: $scope.client.phone,
                            email: $scope.client.email,
                            info: $scope.client.info
                        }).then(() => {
                            Notification.success('Successfully edited');
                        }, () => {
                            Notification.error('Something goes wrong');
                        });
                    }
                }])
})();
