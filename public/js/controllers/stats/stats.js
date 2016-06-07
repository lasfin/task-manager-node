(function () {

    'use strict';

    angular.module('crmApp')

        .controller('Stats',
            ['$scope', 'statsFactory', 'Notification', function ($scope, statsFactory, Notification) {

                statsFactory.geTasksStats()
                    .success((response) => {
                        $scope.tasksData = response;
                    })
                    .error(() => {
                        Notification.error('Something goes wrong');
                    });


                $('#tasks-stats').highcharts({
                    title: {
                        text: 'Created and completed tasks',
                        x: -20 //center
                    },
                    subtitle: {
                        text: 'During the year',
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
