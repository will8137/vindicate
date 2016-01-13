var ctx; //audio context 

function soundManager() {}

soundManager.prototype.init = function() { 
    console.log("soundManager:init");
    try { 
        ctx = new AudioContext(); //is there a better API for this?
        console.log("soundManager:loaded");
    } catch(e) { 
        console.log('You need webaudio support'); 
    } 
};

soundManager.prototype.loadTrack = function(filePath, callback) {

    var req = new XMLHttpRequest(); 
    req.open("GET", filePath ,true); 
    req.responseType = "arraybuffer"; 
    req.onload = function() { 
        //decode the loaded data 
        ctx.decodeAudioData(req.response, function(buffer) {
            callback(buffer)
            return;
        });
    };
    req.send();
};

soundManager.prototype.play = function(buffer, volume) {
    //create a source node from the buffer 
    var src = ctx.createBufferSource();
    src.buffer = buffer;
    //connect to the final output node (the speakers) 
    var gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    src.connect(gainNode);
    gainNode.connect(ctx.destination); 
    //play immediately 
    src.start(0); 
};

soundManager.prototype.stop = function() {
    ctx.stop();
};


    