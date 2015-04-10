(function() {
    'use strict';

    angular.module('chirp')
        .controller('AppCtrl',['$scope','$log','$location','$cookies','AuthService',
            function ($scope,$log,$location,$cookies,AuthService)
        {
            $scope.islogged = false;
            $scope.user = null;

            $scope.$on('logged', function() {
                $scope.user = AuthService.getUser();

                $scope.displayname = $scope.user.displayname;
                $scope.islogged = true;
            });

            var token = $cookies.chirp;
            if( token )
            {
                AuthService.reloadUser(token, function(data)
                {
                    if(data)
                    {
                        $scope.user = AuthService.getUser();

                        $scope.displayname = $scope.user.displayname;
                        $scope.islogged = true;
                        $scope.$emit('logged');
                    }
                });
            }

            $scope.logout = function() {
                AuthService.logout();
                $scope.user = null;
                delete $cookies.chirp;
                $scope.islogged = false;

                $location.path('/public');
                $location.replace();

                $scope.$emit('logout');
            };
        }
    ]);

})();