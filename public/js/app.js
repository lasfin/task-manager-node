'use strict';

var crmApp = angular.module('crmApp', [
    'ui.router',
    'ui-notification',
    'angularUtils.directives.dirPagination',
    'ngDialog'
]);

crmApp.config(($stateProvider, $urlRouterProvider, paginationTemplateProvider) => {
    $urlRouterProvider.otherwise('/');

    $stateProvider
        .state('tasks', {
            url: '/tasks',
            templateUrl: 'partials/tasks',
            controller: 'TasksCtrl'
        })
        .state('task', {
            url: '/task/:id',
            templateUrl: 'partials/task',
            controller: 'TaskViewCtrl'
        })
        .state('add_task', {
            url: '/tasks/add',
            controller: 'AddTaskCtrl',
            templateUrl: 'partials/create_task'
        })
        .state('edit_task', {
            url: '/tasks/:id/edit',
            controller: 'TaskEditCtrl',
            templateUrl: 'partials/edit_task'
        })
        .state('clients', {
            url: '/clients',
            controller: 'ClientsView',
            templateUrl: 'partials/clients'
        });

    paginationTemplateProvider.setPath('/partials/pagination');

});

crmApp.run(() => {
    $(".button-collapse").sideNav();
});
