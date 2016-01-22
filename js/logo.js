//Introduction screen shown on app start

function logo() {}

logo.prototype.create = function(mountPoint, pathToFile) {
	/*
		mountPoint: String,
		pathToFile: String
	*/
	Events.emit("logo:init");

	this.mountPoint = mountPoint;
	this.pathToFile = pathToFile;

	
	$(this.mountPoint).append(logo.loadImage(this.pathToFile));

	Events.emit("logo:ready");
};

logo.prototype.loadImage = function(pathToFile) {
	var img = new Image();
	img.src = pathToFile;
	img.setAttribute("class", "logo");
	return img;
};