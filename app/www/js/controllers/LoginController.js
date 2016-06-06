(function() {
    'use strict';

    angular.module('appChirp')
        .controller('LoginController', ['$log', '$location', '$cookies', '$rootScope', 'AuthService',
            function ($log, $location, $cookies, $rootScope, AuthService) {
                var ctrl = this;

                ctrl.credentials = {
                    username: '',
                    password: ''
                };

                ctrl.login = function (credentials) {
                    AuthService.login(credentials, function (username) {

                        if(username!==undefined)
                        {
                            $cookies.put("chirp",username);

                            $location.path('/home');
                            $location.replace();

                            $rootScope.$broadcast('logged');
                        }
                        else {
                            alert('Wrong credentials!');
                        }
                    });
                };
            }
        ]);

})();
