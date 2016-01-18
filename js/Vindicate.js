//Going to store as objects now instead

function Vindicate() {}

Vindicate.prototype.init = function() {
	Events.emit("Vindicate:init");
	soundManager.init();
	var randInt = Math.ceil(Math.random(0, 10) * 10);
	//Vindicate.loadTrack("assets/audio/" + randInt +".mp3");
	Vindicate.loadTrack("assets/audio/dubfx.mp3");
	Events.emit("Vindicate:ready");
}

Vindicate.prototype.loadTrack = function(filePath) {
	soundManager.loadTrack(filePath, function(buffer){
		$('#mount').empty();
		logo.create('#mount', "assets/images/logo.png");
		Visualizer.visualize($('.logo'), buffer, 0.5);
	});
}
