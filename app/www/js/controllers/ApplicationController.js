(function() {
    'use strict';

    angular.module('appChirp')
        .controller('AppController',['$scope','$log','$location','$cookies','AuthService',
            function ($scope,$log,$location,$cookies,AuthService) {
              var ctrl = this;

              ctrl.initAsLogged = function () {
                  ctrl.user = AuthService.getUser();
                  ctrl.islogged = true;
              };

              ctrl.logout = function () {
                  AuthService.logout();

                  ctrl.user = null;
                  $cookies.remove("chirp");
                  ctrl.islogged = false;

                  $scope.$emit('logout');
              };

              $scope.$on('logged', function () {
                  ctrl.initAsLogged();
              });

              $scope.$on('logout', function () {
                  $location.path('/public');
                  $location.replace();
              });

              if(AuthService.isLogged()) {
                  ctrl.initAsLogged();
              }
              else {
                  ctrl.islogged = false;

                  var username = $cookies.get("chirp");

                  if( username !== undefined ) {
                      AuthService.reloadUser(username, function (data) {
                          if(data) {
                              ctrl.initAsLogged();
                          }
                      });
                  }
              }
            }
    ]);

})();
