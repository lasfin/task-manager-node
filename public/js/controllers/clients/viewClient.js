(function () {

    'use strict';

    angular.module('crmApp')

        .controller('ViewClient',
            ['$scope', '$stateParams', 'clientsFactory', 'ngDialog',
                function ($scope, $stateParams, clientsFactory, ngDialog) {
                    clientsFactory.getById($stateParams.id)
                        .success((response) => {
                            $scope.client = response.client;
                        })
                        .error((error) => {});

                    $scope.openDeletePopup = function() {
                        console.log(1);
                        ngDialog.open({
                            template: 'deleteClient',
                            className: 'ngdialog-theme-default',
                            controller: 'submitDeleteClient'
                        });
                    };
                }])

        .controller('submitDeleteClient',
            ['$scope', '$state', '$stateParams', 'clientsFactory', 'Notification', 'ngDialog',
                function ($scope, $state, $stateParams, clientsFactory, Notification, ngDialog) {
                    $scope.confirmDelete = function() {
                        clientsFactory.delete($stateParams.id)
                            .success(() => {
                                ngDialog.closeAll();
                                $state.go('clients');
                                Notification.success('Client removed');
                            })
                            .error(() => {
                                ngDialog.closeAll();
                                Notification.error('Can\'t remove the client');
                            })
                    };
                }]);
})();
