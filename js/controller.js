/*
	Created and maintained by Will Lytton
*/

var Vindicate = {};
var logo = new logo();
var soundManager = new soundManager();

Vindicate.init = function() {
	Event.trigger("Vindicate:init")
	soundManager.init();
	var randInt = Math.ceil(Math.random(0, 10) * 10);
	Vindicate.loadTrack("assets/audio/KS.mp3");
}

Vindicate.loadTrack = function(filePath) {

	soundManager.loadTrack(filePath, function(buffer){
		$('#mount').empty();
		logo.create('#mount', "assets/images/logo.png")
		soundManager.play(buffer, 0.5);
	});

}

//On DOM load
$(function() {
	Vindicate.init();
})