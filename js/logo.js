//Introduction screen shown on app start

function logo() {}

logo.prototype.create = function(mountPoint, pathToFile) {
	/*
		mountPoint: String,
		pathToFile: String
	*/
	Event.trigger("introScreen:init");

	this.mountPoint = mountPoint;
	this.pathToFile = pathToFile;

	
	$(this.mountPoint).append(logo.loadImage(this.pathToFile));

	Event.trigger("introScreen:ready");
};

logo.prototype.loadImage = function(pathToFile) {
	var img = new Image();
	img.src = pathToFile;
	img.setAttribute("class", "logo");
	return img;
};

logo.prototype.visualize = function(el, buffer, volume) {
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

    	

    	if(dataArray[10] * 2 > 150){
    		//console.log(dataArray[10] * 2)
	    	el.css({
	    		width: dataArray[10] * 2,
	    		height: dataArray[10] * 2,
	    		marginTop: -dataArray[10],
	    		marginLeft: -dataArray[10]
	    	})
	   	}
	}

    var gainNode = ctx.createGain();
    gainNode.gain.value = volume;
    src.connect(analyser);
    analyser.connect(gainNode);
    gainNode.connect(ctx.destination);

    draw();
    src.start(0);
};