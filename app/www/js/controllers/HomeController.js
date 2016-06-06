(function() {
    'use strict';

    angular.module('appChirp')
        .controller('HomeController',
        ['$scope','$log','$location','$timeout','$cookies','DataService','AuthService','RealtimeService','$sanitize',
        function ($scope,$log,$location,$timeout,$cookies,DataService,AuthService,RealtimeService,$sanitize) {
            var ctrl = this;

            ctrl.send = function ()
            {
                var message = ctrl.message;

                if(message.length===0) {
                    alert('Please specify the message!');
                    return;
                }

                if(message.lenght>=140){
                    alert('The length must be less then 140 chars!');
                    return;
                }

                // sanitize the message
                var messageSanitized = $sanitize(message);

                DataService.sendMessage(ctrl.user.username, messageSanitized, function (result)
                {
                    if( result )
                    {
                        RealtimeService.postMessage(ctrl.user.username); // emit event
                        ctrl.message = '';
                    }
                    else {
                        alert('The message has not been sent!');
                    }
                });
            };

            ctrl.loadPosts = function () {
                DataService.getHomePostList(ctrl.user.username,
                    function (data) {
                        ctrl.posts = data;
                    });
            };

            // catch event for reloading
            RealtimeService.onMessage(function () {
                ctrl.loadPosts();
            });
            
            if(AuthService.isLogged())
            {
                ctrl.user = AuthService.getUser();
                ctrl.message = '';
                ctrl.loadPosts();
            }
        }]);
})();
