(function () {

    'use strict';

    angular.module('crmApp')

        .controller('AddTask',
            ['$scope', 'tasksFactory', 'Notification',
                function ($scope, tasksFactory, Notification) {
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
                        return { title, priority, subject, tags }
                    }


                    function sentToServer(title, priority, subject, tags) {
                        tasksFactory.create({
                            title,
                            priority,
                            subject,
                            tags
                        }).then(function() {
                            Notification.success('Successfully added');
                            clearFields();
                        }, function() {
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
