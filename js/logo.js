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
	return img;
};