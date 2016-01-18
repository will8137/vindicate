function Visualizer() {};

Visualizer.prototype.visualize = function(el, buffer, volume) {
	this._prevVal = 0;
	var src = ctx.createBufferSource();
    src.buffer = buffer;
    var analyser = ctx.createAnalyser();
    analyser.fftSize = 2048;
	var bufferLength = analyser.fftSize;
	var dataArray = new Uint8Array(bufferLength);
	analyser.getByteTimeDomainData(dataArray);

	function draw() {
		drawVisual = requestAnimationFrame(draw);

    	analyser.getByteTimeDomainData(dataArray);

    	if(((dataArray[20] * 2) > this._prevVal - 1 || (dataArray[20] * 2) < this._prevVal + 1) && (dataArray[20] * 2) > 150){
    		console.log(dataArray[10] * 2)
	    	el.css({
	    		width: dataArray[10] * 2,
	    		height: dataArray[10] * 2,
	    		marginTop: -dataArray[10],
	    		marginLeft: -dataArray[10]
	    	})
	   	}

	   	this._prevVal = dataArray[20];
	}

    var gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    src.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(ctx.destination);

    draw();
    soundManager.play(src);
    setTimeout(function(){
    	soundManager.pause(src);
    	soundManager.stop(src)
    }, 10000)
}