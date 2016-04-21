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
                }])
})();
