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
	Vindicate.loadTrack("assets/audio/" + randInt +".mp3");
}

Vindicate.loadTrack = function(filePath) {

	soundManager.loadTrack(filePath, function(buffer){
		$('#mount').empty();
		logo.create('#mount', "assets/images/logo.png");
		logo.visualize($('.logo'), buffer, 0.5);
	});

}

//On DOM load
$(function() {
	navigator.webkitGetUserMedia({ audio: true}, function(mediaStream){ 
		console.log(mediaStream.getAudioTracks());
	}, function(error) { console.log(error) })
	Vindicate.init();
})