(function() {
    'use strict';

    angular.module('appChirp')
        .directive("post",['$log','DataService','RealtimeService','AuthService',
        function ($log,DataService,RealtimeService,AuthService)
        {
          return {
            restrict: 'E',
            templateUrl: 'partials/templates/post-directive-template.html',
            replace: false,
            scope: {
              data: '=post',
              logged: '='
            },
            controller: function () {
              var ctrl = this;
              ctrl.repost = function (postid) {
                  alert('This feature is not yet implemented!');
              };
            },
            controllerAs: 'vm'
          };
        }]);
})();
