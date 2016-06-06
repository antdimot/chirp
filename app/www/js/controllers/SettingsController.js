(function() {
    'use strict';

    angular.module('appChirp')
        .controller('SettingsController', ['$scope','$log','$stateParams','AuthService','DataService',
            function ($scope,$log,$stateParams,AuthService,DataService) {
                var ctrl = this;
                
                if(AuthService.isLogged())
                {
                    ctrl.user = AuthService.getUser();
                }
            }
        ]);

})();