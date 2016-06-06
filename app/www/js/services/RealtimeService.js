(function() {
    'use strict';

    angular.module('appChirp')
        .factory("RealtimeService", ['$http', '$log', 'config',
        function ($http, $log, config)
        {
            var socket = io();

            return {
                postMessage: function (data) {
                  //$log.debug('Emit <postmessage> event from [%s]',data);
                  socket.emit('postmessage',data);
                },
                onMessage: function (callBack) {
                  socket.on('postmessage',function(data){
                    //$log.debug('Catch <postmessage> event from [%s]',data);
                    callBack(data);
                  });
                }
            };
        }]);

})();
