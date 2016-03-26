'use strict';

var crmApp = angular.module('crmApp', ['ui.router', 'ui-notification', 'angularUtils.directives.dirPagination']);

crmApp.config(($stateProvider, $urlRouterProvider, paginationTemplateProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('tasks', {
            url: '/tasks',
            templateUrl: 'partials/tasks',
            controller: 'TasksCtrl'
        })
        .state('clients', {
            url: '/clients',
            templateUrl: 'partials/clients'
        })
        .state('add_task', {
            url: '/tasks/add',
            controller: 'AddTaskCtrl',
            templateUrl: 'partials/create_task'
        });

    paginationTemplateProvider.setPath('/partials/pagination');

});

crmApp.run(() => {
    $(".button-collapse").sideNav();
});
