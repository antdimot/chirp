(function() {
    'use strict';

    angular.module('appChirp')
        .controller('FollowingController', ['$scope', '$log', '$location','DataService','AuthService',
            function ($scope, $log, $location, DataService, AuthService) {
                var ctrl = this;

                if(AuthService.isLogged()) {
                    DataService.getFollowingList(AuthService.getUser().username,
                        function (data) {
                            ctrl.users = data;
                        });
                }     
            }
        ]);

})();
