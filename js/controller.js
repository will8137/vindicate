/*
	Created and maintained by Will Lytton
*/

var Vindicate = new Vindicate();
var logo = new logo();
var soundManager = new soundManager();
var Visualizer = new Visualizer();
var Events = new Events();

//On DOM load
$(function() {
	// navigator.webkitGetUserMedia({ audio: true}, function(mediaStream){ 
	// 	console.log(mediaStream.getAudioTracks());
	// }, function(error) { console.log(error) })
	Vindicate.init();
})