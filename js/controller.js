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

Events.on('Vindicate:ready', function(){
	soundManager.loadTrack("assets/audio/osmosis.mp3", function(buffer){
		Events.emit('el:empty', '#mount');
		var settings = {
			visualizer: 2
		}
		Visualizer.visualize(settings, $('.mount'), buffer, 0.5);
	});
})