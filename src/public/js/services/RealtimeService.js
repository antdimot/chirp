(function() {
    'use strict';

    angular.module('appChirp')
        .factory("RealtimeService", ['$http', '$log', 'config',
        function ($http, $log, config)
        {
            var socket = io();

            return {
                postMessage: function (username)
                {
                  $log.debug('Emit <postmessage> event');

                  socket.emit('postmessage', username);
                },
                onMessage: function (callBack) {
                  socket.on('postmessage', function(data){
                    $log.debug('Catch <postmessage> event');
                    callBack(data);
                  });
                }
            };
        }]);

})();
