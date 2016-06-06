(function() {
    'use strict';

    angular.module('appChirp')
        .controller('FollowersController', ['$scope', '$log', '$location','DataService','AuthService',
            function ($scope, $log, $location, DataService, AuthService) {
                var ctrl = this;

                if(AuthService.isLogged()) {
                    DataService.getFollowersList(AuthService.getUser().username,
                        function (data) {
                            ctrl.users = data;
                        });
                }              
            }
        ]);

})();
