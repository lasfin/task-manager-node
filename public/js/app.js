'use strict';

var crmApp = angular.module('crmApp', ['ui.router']);

crmApp.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('tasks', {
            url: '/tasks',
            templateUrl: 'partials/tasks'
        })
        .state('clients', {
            url: '/clients',
            templateUrl: 'partials/clients'
        });
});
