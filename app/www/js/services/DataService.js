(function() {
    'use strict';

    angular.module('appChirp')
        .factory("DataService", ['$http', '$log', 'config',
        function ($http, $log, config)
        {
            return {
                getPublicPostList: function (callBack) {
                    $http.get(config.api + "/post/public")
                        .success(function (data) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                getHomePostList: function (username,callBack) {
                    $http.get(config.api + "/post/home/" + username)
                        .success(function (data) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                getUserByCredentials: function (username,password,callBack)
                {
                    $http.get(config.api + "/user/authenticate/" + username + "/" + password )
                        .success(function (data) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                getUserByUsername: function (username,callBack) {
                    $http.get(config.api + "/user/access/" + username)
                        .success(function (data) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                sendMessage: function(username,text,callBack){
                    $http.post(config.api + "/post",{"username":username,"text":text})
                        .success(function () {
                            callBack(true);
                        })
                        .error(function(){
                            callBack(false);
                        });
                },
                getFollowingList: function (username,callBack) {
                    $http.get(config.api + "/user/following/" + username)
                        .success(function (data) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                getFollowersList: function (username,callBack) {
                    $http.get(config.api + "/user/followers/" + username)
                        .success(function (data) {
                            callBack(data);
                        })
                        .error(function(){
                            callBack();
                        });
                },
                register: function(username,displayname,email,password,summary,callBack) {
                  var user = {
                      "username": username,
                      "password": password,
                      "displayname": displayname,
                      "email": email,
                      "summary": summary
                  };
                  $http.post(config.api + "/user",user)
                      .success(function (data) {
                          callBack(data);
                      })
                      .error(function(){
                          callBack();
                      });
                },
                getUserInfo: function(username,callBack) {
                  $http.get(config.api + "/user/info/" + username)
                      .success(function (data) {
                          callBack(data);
                      })
                      .error(function(){
                          callBack();
                      });
                },
                follow: function (username1,username2,callBack) {
                  var data = {
                    username1: username1,
                    username2: username2
                  };
                  $http.post(config.api + "/user/follow",data)
                      .success(function () {
                          callBack(true);
                      })
                      .error(function(){
                          callBack(false);
                      });
                },
                unfollow: function (username1,username2,callBack) {
                  var data = {
                    username1: username1,
                    username2: username2
                  };
                  $http.post(config.api + "/user/unfollow",data)
                      .success(function () {
                          callBack(true);
                      })
                      .error(function(){
                          callBack(false);
                      });
                },
                repost: function (username,postid,callBack) {
                  var data = {
                    username: username,
                    id: postid
                  };
                  //$log.debug(data);
                  $http.post(config.api + "/post/repost",data)
                      .success(function () {
                          callBack(true);
                      })
                      .error(function(){
                          callBack(false);
                      });
                }
            };
        }]);

})();
