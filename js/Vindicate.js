//Going to store as objects now instead

function Vindicate() {}

Vindicate.prototype.init = function() {
	Events.emit("Vindicate:init");
	soundManager.init();
	Events.emit("Vindicate:ready");
}

Vindicate.prototype.loadTrack = function(filePath) {
	soundManager.loadTrack(filePath, function(buffer){
		Events.emit('el:empty', "#mount");
	});
}
