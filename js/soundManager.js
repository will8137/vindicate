var ctx; //audio context

function soundManager() {}

soundManager.prototype.init = function() { 
    Events.emit('soundManager:init');
    try { 
        ctx = new AudioContext(); //is there a better API for this?
        console.log("soundManager:loaded");
    } catch(e) { 
        console.log('You need webaudio support'); 
    }
    Events.emit('soundManager:ready');
};

soundManager.prototype.loadTrack = function(filePath, callback) {
    Events.emit('soundManager:loadTrack');
    var req = new XMLHttpRequest(); 
    req.open("GET", filePath ,true); 
    req.responseType = "arraybuffer"; 
    req.onload = function() { 
        //decode the loaded data 
        ctx.decodeAudioData(req.response, function(buffer) {
            Events.emit('soundManager:trackLoaded');
            callback(buffer);
            return;
        });
    };
    req.send();
};

soundManager.prototype.play = function(src) {
    Events.emit('soundManager:play');
    //play immediately 
    src.start(0);
    Events.emit('soundManager:playing');
};

soundManager.prototype.pause = function(src) {
    Events.emit('soundManager:pause');
    src.pause();
    Events.emit('soundManager:paused');
};

soundManager.prototype.stop = function(src) {
    Events.emit('soundManager:stop');
    src.stop(0);
    Events.emit('soundManager:stopped');
};


    