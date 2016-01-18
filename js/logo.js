//Introduction screen shown on app start

function logo() {}

logo.prototype.create = function(mountPoint, pathToFile) {
	/*
		mountPoint: String,
		pathToFile: String
	*/
	Events.emit("introScreen:init");

	this.mountPoint = mountPoint;
	this.pathToFile = pathToFile;

	
	$(this.mountPoint).append(logo.loadImage(this.pathToFile));

	Events.emit("introScreen:ready");
};

logo.prototype.loadImage = function(pathToFile) {
	var img = new Image();
	img.src = pathToFile;
	img.setAttribute("class", "logo");
	return img;
};