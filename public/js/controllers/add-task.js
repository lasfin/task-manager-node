(function () {

    'use strict';

    angular.module('crmApp')

        .controller('AddTaskCtrl',
            ['$scope', 'tasksFactory', 'Notification',
                function ($scope, tasksFactory, Notification) {
                    $('select').material_select();

                    var submitBtn = document.querySelectorAll('#submit');
                    submitBtn[0].addEventListener('click', checkUserData);


                    function checkUserData() {
                        var nodes = getDomNodes();
                        var title = nodes.title.value;
                        var priority = nodes.priority.value;
                        var subject = nodes.subject.value;
                        var tags = nodes.tags.value.split(',');

                        sentToServer(title, priority, subject, tags, nodes);
                    }


                    function getDomNodes() {
                        var title = document.querySelectorAll('#title')[0];
                        var priority = document.querySelectorAll('#priority')[0];
                        var subject = document.querySelectorAll('#subject')[0];
                        var tags = document.querySelectorAll('#tags')[0];
                        return { title, priority, subject, tags }
                    }


                    function sentToServer(title, priority, subject, tags, nodes) {
                        tasksFactory.createTask({
                            title,
                            priority,
                            subject,
                            tags
                        }).then(function() {
                            Notification.success('Successfully added');
                            clearFields(nodes);
                        }, function() {
                            Notification.error('Something goes wrong')
                        });
                    }


                    function clearFields(nodes) {
                        for (var node in nodes) {
                            if (nodes.hasOwnProperty(node)) {
                                nodes[node].value = '';
                            }
                        }
                    }


                }]);
})();
