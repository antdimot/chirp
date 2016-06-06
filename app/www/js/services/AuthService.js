(function() {
    'use strict';

    angular.module('appChirp')
           .factory("AuthService", ['$http', '$log', 'config', 'DataService',
           function ($http, $log, config, DataService) {
             var _authUser = null;

            return {
                login: function (credentials,callBack)
                {
                    var username = credentials.username;
                    var password = credentials.password;

                    DataService.getUserByCredentials(username,password,
                        function(data) {
                            if(data)
                            {
                                $log.debug("[%s] Logged in user: %s",
                                            new Date().toISOString(),
                                            data.username);

                                _authUser = data;

                                callBack(_authUser.username);
                            }
                            else callBack();
                        }
                    );
                },
                logout: function () {
                    $log.debug("[%s] Logged out user: %s",new Date().toISOString(),_authUser.username);
                    _authUser = null;
                },
                getUser: function () {
                    return _authUser;
                },
                isLogged: function () {
                    return (_authUser!==null);
                },
                reloadUser: function(username,callBack) {
                    DataService.getUserByUsername(username,
                        function(data) {
                            if(data)
                            {
                                $log.debug("[%s] DataService.reloadUser > %s",new Date().toISOString(),data.username);
                                _authUser = data;
                                callBack(_authUser.username);
                            }
                            else callBack();
                        }
                    );
                },
                signin: function (profile,callBack) {
                    $log.debug("[%s] Signing a new user: %s",new Date().toISOString(),profile);

                    var username = profile.username;
                    var displayname = profile.displayname;
                    var email = profile.email;
                    var password = profile.password;
                    var summary = profile.summary;

                    DataService.register(username,displayname,email,password,summary,
                        callBack()
                    );
                }
            };
        }]);

})();
