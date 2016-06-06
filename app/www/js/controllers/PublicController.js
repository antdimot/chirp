(function() {
    'use strict';

    angular.module('appChirp')
        .controller('PublicController', ['$scope','$log','$timeout','DataService','RealtimeService',
        function ($scope,$log,$timeout,DataService,RealtimeService) {
            var ctrl = this;

            ctrl.loadPosts = function() {
                DataService.getPublicPostList(
                    function (data) {

                        const panelcolors = ['primary','default','success','info','warning','danger'];
                        const textcolors = ['white','red','blue','blue','red','blue'];

                        data.forEach((element,index)=> {
                            element.panelcolor = panelcolors[index % 6];
                            element.textcolor = textcolors[index % 6];
                        });

                        ctrl.posts = data;
                    });
            };

            // catch event for reloading
            RealtimeService.onMessage(function () {
                ctrl.loadPosts();
            });
            
            // load the public posts
            ctrl.loadPosts();
        }
    ]);

})();
