(function () {

    'use strict';

    angular.module('crmApp')

        .constant('appConfig', {
            tasksUrl: '/tasks/',
            clientsUrl: '/clients/',
            statsUrl: '/stats/'
        });
})();