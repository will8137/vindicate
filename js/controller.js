/*
	Created and maintained by Will Lytton
*/

var Vindicate = {};
var logo = new logo();
var soundManager = new soundManager();
var Visualizer = new Visualizer();
var Events = new Events();

Vindicate.init = function() {
	Events.emit("Vindicate:init");
	soundManager.init();
	var randInt = Math.ceil(Math.random(0, 10) * 10);
	//Vindicate.loadTrack("assets/audio/" + randInt +".mp3");
	Vindicate.loadTrack("assets/audio/dubfx.mp3");
	Events.emit("Vindicate:ready");
}

Vindicate.loadTrack = function(filePath) {

	soundManager.loadTrack(filePath, function(buffer){
		$('#mount').empty();
		logo.create('#mount', "assets/images/logo.png");
		Visualizer.visualize($('.logo'), buffer, 0.5);
	});

}

//On DOM load
$(function() {
	// navigator.webkitGetUserMedia({ audio: true}, function(mediaStream){ 
	// 	console.log(mediaStream.getAudioTracks());
	// }, function(error) { console.log(error) })
	Vindicate.init();
})