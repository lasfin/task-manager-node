(function () {

    'use strict';

    angular.module('crmApp')

        .controller('AddClient',
            ['$scope', 'clientsFactory', 'Notification',
                function ($scope, clientsFactory, Notification) {
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
                        return { name, email, phone, info }
                    }

                    function sentToServer(name, email, phone, info) {
                        clientsFactory.create({
                            name,
                            email,
                            phone,
                            info
                        }).then(function() {
                            Notification.success('Successfully added');
                        }, function() {
                            Notification.error('Something goes wrong');
                        });
                    }

                }]);
})();
