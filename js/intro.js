//Introduction screen shown on app start

function introScreen() {}

introScreen.prototype.create = function(selector, title, body, items) {
	Event.trigger("introScreen:init");

	this.container = document.getElementById(selector);
	this.title = title;
	this.body = body;
	this.items = items;
	
	var source = $("#intro-template").html();
	var template = Handlebars.compile(source);
	var html = template({
		title: this.title,
		items: this.items
	});

	$(this.container).append(html);

	Event.trigger("introScreen:ready");
};