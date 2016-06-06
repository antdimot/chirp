(function() {
    'use strict';

    angular.module('appChirp')
        .controller('RegisterController', ['$scope', '$log', '$location', '$cookies', 'AuthService',
            function ($scope, $log, $location, $cookies, AuthService) {
                var ctrl = this;

                ctrl.signin = function (profile) {
                    $log.debug(profile);

                    if(profile.password !== profile.confirmpassword)
                    {
                        alert('Password are different!');
                    }
                    else
                    {
                        AuthService.signin(profile,function()
                        {
                            alert('User signed!');

                            $location.path('/public');
                            $location.replace();
                        });
                    }
                };
            }
        ]);

})();
