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
        // tasks
        .state('tasks', {
            url: '/tasks',
            templateUrl: 'partials/tasks',
            controller: 'ViewTasks'
        })
        .state('task', {
            url: '/task/:id',
            templateUrl: 'partials/task',
            controller: 'ViewTask'
        })
        .state('add_task', {
            url: '/tasks/add',
            controller: 'AddTask',
            templateUrl: 'partials/create_task'
        })
        .state('edit_task', {
            url: '/tasks/:id/edit',
            controller: 'EditTask',
            templateUrl: 'partials/edit_task'
        })
        // clients
        .state('clients', {
            url: '/clients',
            controller: 'ViewClients',
            templateUrl: 'partials/clients'
        })
        .state('add_client', {
            url: '/clients/add',
            controller: 'AddClient',
            templateUrl: 'partials/create_client'
        })
        .state('client', {
            url: '/client/:id',
            templateUrl: 'partials/client',
            controller: 'ViewClient'
        })
        .state('edit_client', {
            url: '/clients/:id/edit',
            controller: 'EditClient',
            templateUrl: 'partials/edit_client'
        })
        //stats
        .state('stats', {
            url: '/stats',
            controller: 'Stats',
            templateUrl: 'partials/stats'
        });

    paginationTemplateProvider.setPath('/partials/pagination');

});

crmApp.run(() => {
    $(".button-collapse").sideNav();
});
