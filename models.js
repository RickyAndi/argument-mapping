function Argument(uuid, title, message, top, right) {
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

Argument.prototype.setType = function(type) {
	this.type = type;
}

Argument.prototype.setUuid = function(uuid) {
	this.uuid = uuid;
}

Argument.prototype.setTop = function(top) {
	this.top = top;
}

Argument.prototype.setRight = function(right) {
	this.right = right;
}

Argument.prototype.setSubscribeOnMouseChange = function(value) {
	this.subscribeOnMouseChange = value;
}

Argument.prototype.getSubscribeOnMouseChange = function() {
	return this.subscribeOnMouseChange;
}

Argument.prototype.setTitle = function(title) {
	this.title = title;
}

Argument.prototype.setMessage = function(message) {
	this.message = message;
}

Argument.prototype.getTitle = function() {
	return this.title;
}

Argument.prototype.getMessage = function() {
	return this.message;
}