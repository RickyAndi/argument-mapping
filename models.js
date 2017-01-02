function Argumen(uuid, title, message, top, right) {
	if(uuid != '' || uuid != null) {
		this.uuid = uuid;
	} else {
		this.uuid = null;
	}
	
	this.title = title;
	this.message = message;
	this.type = null;
	this.top = top;
	this.right = right;
	this.subscribeOnMouseChange = 0;
}

Argumen.prototype.setType = function(type) {
	this.type = type;
}

Argumen.prototype.setUuid = function(uuid) {
	this.uuid = uuid;
}

Argumen.prototype.setTop = function(top) {
	this.top = top;
}

Argumen.prototype.setRight = function(right) {
	this.right = right;
}

Argumen.prototype.setSubscribeOnMouseChange = function(value) {
	this.subscribeOnMouseChange = value;
}

Argumen.prototype.getSubscribeOnMouseChange = function() {
	return this.subscribeOnMouseChange;
}

Argumen.prototype.setTitle = function(title) {
	this.title = title;
}

Argumen.prototype.setMessage = function(message) {
	this.message = message;
}

Argumen.prototype.getTitle = function() {
	return this.title;
}

Argumen.prototype.getMessage = function() {
	return this.message;
}