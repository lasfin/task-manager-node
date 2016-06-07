'use strict';

var crmApp = angular.module('crmApp', ['ui.router', 'ui-notification', 'angularUtils.directives.dirPagination', 'ngDialog']);

crmApp.config(function ($stateProvider, $urlRouterProvider, paginationTemplateProvider) {
    $urlRouterProvider.otherwise('/');

    $stateProvider
    // tasks
    .state('tasks', {
        url: '/tasks',
        templateUrl: 'partials/tasks',
        controller: 'ViewTasks'
    }).state('task', {
        url: '/task/:id',
        templateUrl: 'partials/task',
        controller: 'ViewTask'
    }).state('add_task', {
        url: '/tasks/add',
        controller: 'AddTask',
        templateUrl: 'partials/create_task'
    }).state('edit_task', {
        url: '/tasks/:id/edit',
        controller: 'EditTask',
        templateUrl: 'partials/edit_task'
    })
    // clients
    .state('clients', {
        url: '/clients',
        controller: 'ViewClients',
        templateUrl: 'partials/clients'
    }).state('add_client', {
        url: '/clients/add',
        controller: 'AddClient',
        templateUrl: 'partials/create_client'
    }).state('client', {
        url: '/client/:id',
        templateUrl: 'partials/client',
        controller: 'ViewClient'
    }).state('edit_client', {
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

crmApp.run(function () {
    $(".button-collapse").sideNav();
});

(function () {

    'use strict';

    angular.module('crmApp').constant('appConfig', {
        tasksUrl: '/tasks/',
        clientsUrl: '/clients/'
    });
})();
(function () {

    'use strict';

    angular.module('crmApp').factory('helpers', function () {
        return {
            /**
             * @param str type {(string|array)}
             * @param char {string}
             * @returns {Array}
             */
            splitByChar: function splitByChar(str, char) {
                var arr = [];
                if (Array.isArray(str)) {
                    arr = str;
                } else {
                    arr = str ? str.split(char) : [];
                }
                return arr;
            }
        };
    });
})();
(function () {

    'use strict';

    angular.module('crmApp').factory('clientsFactory', ['$http', 'appConfig', function ($http, appConfig) {
        return {
            get: function get() {
                return $http.get(appConfig.clientsUrl);
            },
            getById: function getById(id) {
                return $http.get(appConfig.clientsUrl + id);
            },
            update: function update(id, client) {
                return $http.put(appConfig.clientsUrl + id, client);
            },
            delete: function _delete(id) {
                return $http.delete(appConfig.clientsUrl + id, {});
            },
            create: function create(data) {
                return $http.post(appConfig.clientsUrl, data);
            }
        };
    }]);
})();
(function () {

    'use strict';

    angular.module('crmApp').factory('tasksFactory', ['$http', 'appConfig', function ($http, appConfig) {
        return {
            get: function get() {
                return $http.get(appConfig.tasksUrl);
            },
            getById: function getById(id) {
                return $http.get(appConfig.tasksUrl + id);
            },
            update: function update(id, task) {
                return $http.put(appConfig.tasksUrl + id, task);
            },
            delete: function _delete(id) {
                return $http.delete(appConfig.tasksUrl + id, {});
            },
            create: function create(data) {
                return $http.post(appConfig.tasksUrl, data);
            }
        };
    }]);
})();
(function () {

    'use strict';

    angular.module('crmApp').controller('AddClient', ['$scope', 'clientsFactory', 'Notification', function ($scope, clientsFactory, Notification) {
        document.querySelectorAll('#submit')[0].addEventListener('click', checkUserData);

        function checkUserData() {
            var nodes = getDomNodes();
            var name = nodes.name.value;
            var email = nodes.email.value;
            var phone = nodes.phone.value;
            var info = nodes.info.value;

            sentToServer(name, email, phone, info);
        }

        function getDomNodes() {
            var name = document.querySelectorAll('#name')[0];
            var email = document.querySelectorAll('#email')[0];
            var phone = document.querySelectorAll('#phone')[0];
            var info = document.querySelectorAll('#info')[0];
            return { name: name, email: email, phone: phone, info: info };
        }

        function sentToServer(name, email, phone, info) {
            clientsFactory.create({
                name: name,
                email: email,
                phone: phone,
                info: info
            }).then(function () {
                Notification.success('Successfully added');
                clearFields();
            }, function () {
                Notification.error('Something goes wrong');
            });
        }

        function clearFields() {
            var nodes = getDomNodes();
            for (var node in nodes) {
                if (nodes.hasOwnProperty(node)) {
                    nodes[node].value = '';
                }
            }
        }
    }]);
})();

(function () {

    'use strict';

    angular.module('crmApp').controller('EditClient', ['$scope', '$stateParams', 'clientsFactory', 'ngDialog', 'Notification', 'helpers', function ($scope, $stateParams, clientsFactory, ngDialog, Notification, helpers) {
        clientsFactory.getById($stateParams.id).success(function (response) {
            $scope.client = response.client;
        }).error(function () {
            Notification.error('Can\'t find a task');
        });

        $scope.updateClient = function () {
            clientsFactory.update($scope.client._id, {
                _id: $scope.client._id,
                name: $scope.client.name,
                phone: $scope.client.phone,
                email: $scope.client.email,
                info: $scope.client.info
            }).then(function () {
                Notification.success('Successfully edited');
            }, function () {
                Notification.error('Something goes wrong');
            });
        };
    }]);
})();

(function () {

    'use strict';

    angular.module('crmApp').controller('ViewClient', ['$scope', '$stateParams', 'clientsFactory', 'ngDialog', function ($scope, $stateParams, clientsFactory, ngDialog) {
        clientsFactory.getById($stateParams.id).success(function (response) {
            $scope.client = response.client;
        }).error(function (error) {});

        $scope.openDeletePopup = function () {
            console.log(1);
            ngDialog.open({
                template: 'deleteClient',
                className: 'ngdialog-theme-default',
                controller: 'submitDeleteClient'
            });
        };
    }]).controller('submitDeleteClient', ['$scope', '$state', '$stateParams', 'clientsFactory', 'Notification', 'ngDialog', function ($scope, $state, $stateParams, clientsFactory, Notification, ngDialog) {
        $scope.confirmDelete = function () {
            clientsFactory.delete($stateParams.id).success(function () {
                ngDialog.closeAll();
                $state.go('clients');
                Notification.success('Client removed');
            }).error(function () {
                ngDialog.closeAll();
                Notification.error('Can\'t remove the client');
            });
        };
    }]);
})();

(function () {

    'use strict';

    angular.module('crmApp').controller('ViewClients', ['$scope', 'clientsFactory', 'Notification', function ($scope, clientsFactory, Notification) {
        clientsFactory.get().success(function (response) {
            $scope.clients = response.clients;
        }).error(function () {
            Notification.error('Something goes wrong');
        });
    }]);
})();

(function () {

    'use strict';

    angular.module('crmApp').controller('Stats', ['$scope', function ($scope) {
        $('#tasks-stats').highcharts({
            title: {
                text: 'Created and completed tasks',
                x: -20 //center
            },
            subtitle: {
                text: 'In Last Month',
                x: -20
            },
            xAxis: {
                categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
            },
            yAxis: {
                title: {
                    text: 'Tasks'
                },
                plotLines: [{
                    value: 0,
                    width: 1,
                    color: '#808080'
                }]
            },
            legend: {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series: [{
                name: 'Created',
                data: [7, 6, 9, 4, 8, 1, 5, 6, 3, 8, 3, 6]
            }, {
                name: 'Completed',
                data: [2, 8, 7, 3, 7, 2, 8, 4, 2, 4, 8, 2]
            }]
        });
    }]);
})();

(function () {

    'use strict';

    angular.module('crmApp').controller('AddTask', ['$scope', 'tasksFactory', 'Notification', function ($scope, tasksFactory, Notification) {
        $('select').material_select();

        document.querySelectorAll('#submit')[0].addEventListener('click', checkUserData);
        document.querySelectorAll('#clear')[0].addEventListener('click', clearFields);

        function checkUserData() {
            var nodes = getDomNodes();
            var title = nodes.title.value;
            var priority = nodes.priority.value;
            var subject = nodes.subject.value;
            var tags = nodes.tags.value.split(',');

            sentToServer(title, priority, subject, tags);
        }

        function getDomNodes() {
            var title = document.querySelectorAll('#title')[0];
            var priority = document.querySelectorAll('#priority')[0];
            var subject = document.querySelectorAll('#subject')[0];
            var tags = document.querySelectorAll('#tags')[0];
            return { title: title, priority: priority, subject: subject, tags: tags };
        }

        function sentToServer(title, priority, subject, tags) {
            tasksFactory.create({
                title: title,
                priority: priority,
                subject: subject,
                tags: tags
            }).then(function () {
                Notification.success('Successfully added');
                clearFields();
            }, function () {
                Notification.error('Something goes wrong');
            });
        }

        function clearFields() {
            var nodes = getDomNodes();
            for (var node in nodes) {
                if (nodes.hasOwnProperty(node)) {
                    nodes[node].value = '';
                }
            }
            $('select').material_select();
        }
    }]);
})();

(function () {

    'use strict';

    angular.module('crmApp').controller('EditTask', ['$scope', '$stateParams', 'tasksFactory', 'ngDialog', 'Notification', 'helpers', function ($scope, $stateParams, tasksFactory, ngDialog, Notification, helpers) {
        $scope.priorityOptions = [1, 2, 3, 4, 5];
        $scope.doneOptions = [true, false];
        var savedTask = {};

        tasksFactory.getById($stateParams.id).success(function (response) {
            $scope.task = response.task;
            savedTask = JSON.parse(JSON.stringify($scope.task));
            setTimeout(function () {
                $('select').material_select();
                $('textarea').trigger('autoresize');
            }, 0);
        }).error(function () {
            Notification.error('Can\'t find a task');
        });

        $scope.update = function () {
            $scope.task.completed = $scope.task.completed === "true";
            if (savedTask.completed === false && $scope.task.completed === true) {
                $scope.task.completedAt = new Date();
            }

            tasksFactory.update($scope.task._id, {
                _id: $scope.task._id,
                title: $scope.task.title,
                priority: $scope.task.priority,
                body: $scope.task.body,
                tags: helpers.splitByChar($scope.task.tags, ','),
                completed: $scope.task.completed,
                completedAt: $scope.task.completedAt,
                createdAt: $scope.task.createdAt
            }).then(function () {
                Notification.success('Successfully edited');
            }, function () {
                Notification.error('Something goes wrong');
            });
        };
    }]);
})();

(function () {

    'use strict';

    angular.module('crmApp').controller('ViewTask', ['$scope', '$stateParams', 'tasksFactory', 'ngDialog', function ($scope, $stateParams, tasksFactory, ngDialog) {
        tasksFactory.getById($stateParams.id).success(function (response) {
            $scope.task = response.task;
        }).error(function (error) {});

        $scope.openDeletePopup = function () {
            ngDialog.open({
                template: 'deleteTask',
                className: 'ngdialog-theme-default',
                controller: 'submitDeleteTask'
            });
        };
    }]).controller('submitDeleteTask', ['$scope', '$state', '$stateParams', 'tasksFactory', 'Notification', 'ngDialog', function ($scope, $state, $stateParams, tasksFactory, Notification, ngDialog) {
        $scope.confirmDelete = function () {
            tasksFactory.delete($stateParams.id).success(function () {
                ngDialog.closeAll();
                $state.go('tasks');
                Notification.success('Task deleted');
            }).error(function () {
                ngDialog.closeAll();
                Notification.error('Can\'t delete the task');
            });
        };
    }]);
})();

(function () {

    'use strict';

    angular.module('crmApp').controller('ViewTasks', ['$scope', 'tasksFactory', 'helpers', 'Notification', function ($scope, tasksFactory, helpers, Notification) {
        $scope.tasks = [];
        $scope.showCompleted = false;
        $scope.showNotCompleted = true;

        installSort();

        $scope.sortTasks = function () {
            switch ($scope.selected.sortName) {
                case 'date':
                    $scope.tasks.sort(function (a, b) {
                        if (a.createdAt < b.createdAt) {
                            return 1;
                        } else if (a.createdAt > b.createdAt) {
                            return -1;
                        }
                        return 0;
                    });
                    break;
                case 'priority':
                    $scope.tasks.sort(function (a, b) {
                        return a.priority - b.priority;
                    });
                    break;
            }
            if ($scope.selected.sortDirection === 'desc') $scope.tasks.reverse();
            $scope.tasksToShow = $scope.tasks;
        };

        $scope.filterTasks = function () {
            $scope.tasksToShow = [];
            var completed = [],
                notCompleted = [];

            if ($scope.showCompleted) {
                completed = $scope.tasks.filter(function (task) {
                    return task.completed;
                });
            }
            if ($scope.showNotCompleted) {
                notCompleted = $scope.tasks.filter(function (task) {
                    return !task.completed;
                });
            }
            $scope.tasksToShow = completed.concat(notCompleted);
        };

        tasksFactory.get().success(function (response) {
            $scope.tasks = response.tasks;
            $scope.filterTasks();
            $scope.sortTasks();
        }).error(function () {
            Notification.error('Something goes wrong');
        });

        $scope.markAsDone = function (taskId) {
            var task = $scope.tasks.find(function (item) {
                return item._id === taskId;
            });

            tasksFactory.update(task._id, {
                _id: task._id,
                title: task.title,
                priority: task.priority,
                body: task.body,
                tags: helpers.splitByChar(task.tags, ','),
                completed: true,
                completedAt: new Date(),
                createdAt: task.createdAt
            }).then(function () {
                task.completed = true;
                Notification.success('Successfully updated');
            }, function () {
                Notification.error('Something goes wrong');
            });
        };

        function installSort() {
            $scope.items = [{
                id: 1,
                sortName: 'date',
                sortDirection: 'asc',
                label: 'Date (newest first)'
            }, {
                id: 2,
                sortName: 'date',
                sortDirection: 'desc',
                label: 'Date (oldest first)'
            }, {
                id: 3,
                sortName: 'priority',
                sortDirection: 'desc',
                label: 'Priority (high first)'
            }, {
                id: 4,
                sortName: 'priority',
                sortDirection: 'asc',
                label: 'Priority (low first)'
            }];
            $scope.selected = $scope.items[0];
            setTimeout(function () {
                $('select').material_select();
            }, 0);
        }
    }]);
})();