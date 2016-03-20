(function () {

    'use strict';

    angular.module('crmApp')

        .controller('AddTaskCtrl',
            ['$scope', 'tasksFactory',
                function ($scope, tasksFactory) {
                    $('select').material_select();

                    var submitBtn = document.querySelectorAll('#submit');
                    submitBtn[0].addEventListener('click', checkUserData);


                    function checkUserData(){
                        var title = document.querySelectorAll('#title')[0].value;
                        var priority = document.querySelectorAll('#priority')[0].value;
                        var subject = document.querySelectorAll('#subject')[0].value;
                        var tags = document.querySelectorAll('#tags')[0].value.split(',');

                        sentToServer(title, priority, subject, tags);
                    }


                    function sentToServer(title, priority, subject, tags) {
                        tasksFactory.createTask({
                            title: title,
                            priority: priority,
                            subject: subject,
                            tags: tags
                        }).then(function(){
                            console.log('success');
                        }, function(){
                            console.log('error');
                        });
                    }

                }]);
})();
