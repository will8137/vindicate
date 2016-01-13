var Event = function() {

    var self = this;

    self.queue = {};
    self.fired = [];

    return {

        trigger: function(event) {
            var queue = self.queue[event];

            if (typeof queue === 'undefined') {
                return;
            }

            while (queue.length) {
                (queue.shift())();
            }

            self.fired[event] = true;
        },

        on: function(event, callback) {
            if (self.fired[event] === true) {
                return callback();
            }

            if (typeof self.queue[event] === 'undefined') {
                self.queue[event] = [];
            }

            self.queue[event].push(callback);
        }

    };

}();