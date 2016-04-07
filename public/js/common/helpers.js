(function () {

    'use strict';

    angular.module('crmApp')

        .factory('helpers', function(){
        return {
            /**
             * @param str type {(string|array)}
             * @param char {string}
             * @returns {Array}
             */
            splitByChar: function(str, char) {
                var arr = [];
                if(Array.isArray(str)) {
                    arr = str;
                } else {
                    arr = str ? str.split(char) : [];
                }
                return arr;
            }
        }
    });


})();