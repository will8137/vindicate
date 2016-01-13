/*
	Created and maintained by Will Lytton
*/

var Vindicate = {};
var introScreen = new introScreen();
var soundManager = new soundManager();

Vindicate.init = function() {
	Event.trigger("Vindicate:init")
	soundManager.init();
	var randInt = Math.ceil(Math.random(0, 10) * 10);
	Vindicate.loadTrack("assets/audio/" + randInt + ".mp3");
}

Vindicate.loadTrack = function(filePath) {

	soundManager.loadTrack(filePath, function(buffer){
		$('#mount').empty();
		//soundManager.play(buffer, 0.5);
	});

}

//On DOM load
$(function() {
	Vindicate.init();
})