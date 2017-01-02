Vue.component('argumen-panel', {
	template: '#argumen-panel-template',
	props: ['uuid', 'title', 'message', 'type', 'index', 'right', 'top'],
	methods: {
		changePosition : function(event) {
			this.$emit('change-position', { index : this.index });
		},
		remove : function() {
			this.$emit('remove-argument', { index : this.index });
		},
		createRebuttal : function() {
			this.$emit('create-rebuttal', { index : this.index });	
		},
		createSupport : function() {
			this.$emit('create-support', { index : this.index });
		},
		viewArgument : function() {
			this.$emit('view-argument', { index : this.index });
		},
		editArgument : function() {
			this.$emit('edit-argument', { index : this.index });
		}
	},
	data : function() {
		return {
		}
	}
});

new Vue({
	el: '#app',
	data: {
		arguments: [
			new Argumen(Math.random().toString(36).slice(2), 'Lorem Ipsum', 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Accusantium in reprehenderit facere itaque voluptate consequuntur, facilis asperiores saepe, sint quia, molestias. Aperiam odit quod repellat facere ullam debitis, reiciendis praesentium.', '100', '100')
		],
		connections : [],
		argument : new Argumen('', '', ''),
		createArgumentModal : null,
		status : 'create-argument',
		indexToBeConnected : 0,
		viewedArgument : new Argumen('', '', ''),
		toBeDeletedIndex : 0,
		toBeEditedIndex : 0
	},
	methods : {
		showModal : function() {
			this.createArgumentModal.modal('show');
		},
		openModalToCreateArgument : function(event) {
			this.status = 'create-argument';
			this.showModal();
		},
		createArgument : function(event) {
			var that = this;

			if(this.status == 'create-argument') {
				var uuid = Math.random().toString(36).slice(2);
				this.argument.setUuid(uuid);
				this.argument.setTop((event.clientY).toString());
				this.argument.setRight((event.clientX).toString());
				this.argument.setType('conclussion');
				
				this.arguments.push(this.argument);
				this.cleanArgumentForm();
			}
			
			if(this.status == 'create-rebuttal') {

				var uuid = Math.random().toString(36).slice(2);
				this.argument.setUuid(uuid);
				this.argument.setTop((event.clientY).toString());
				this.argument.setRight((event.clientX).toString());
				this.argument.setType('rebuttal');

				this.arguments.push(this.argument);
				this.cleanArgumentForm();

				var index = this.indexToBeConnected
				var target =  this.arguments[index].uuid;
				var source = uuid;
				
				setTimeout(function() {
					var conn = jsPlumb.connect({
					    source: $('#' + source),
					    target: $('#' + target),
					    detachable: false,
					    connector: [ "Flowchart", { curviness:100 }, { cssClass:"labelClass" }],
					    overlays: [ 
					        ["Arrow" , { width:12, length:12, location:0.67 }],
					        [ "Label", { cssClass:"labelClass" } ]
					    ],
					    paintStyle:{ stroke:"red" },
					    deleteEndpointsOnDetach:true
					});

					that.connections.push({ source : source , target : target , connection : conn })
				}, 1000);
			}	
			
			if(this.status == 'create-support') {
				
				var uuid = Math.random().toString(36).slice(2);
				this.argument.setType('support');
				this.argument.setUuid(uuid);
				this.argument.setTop((event.clientY).toString());
				this.argument.setRight((event.clientX).toString());
				this.arguments.push(this.argument);
				this.cleanArgumentForm();

				var index = this.indexToBeConnected
				var target =  this.arguments[index].uuid;
				var source = uuid;
				
				setTimeout(function() {
					var conn = jsPlumb.connect({
					    source: $('#' + source),
					    target: $('#' + target),
					    detachable: false,
					    connector: [ "Flowchart", { curviness:100 }, { cssClass:"labelClass" }],
					    overlays: [ 
					        ["Arrow" , { width:12, length:12, location:0.67 }],
					        [ "Label", { cssClass:"labelClass" } ]
					    ],
					    paintStyle:{ stroke:"green" },
					    deleteEndpointsOnDetach: true
					});

					that.connections.push({ source : source , target : target , connection : conn })
				}, 1000);
			}

			if(this.status == 'edit-argument') {
				this.arguments[this.toBeEditedIndex].setMessage(this.argument.getMessage());
				this.arguments[this.toBeEditedIndex].setTitle(this.argument.getTitle());
			}

			this.createArgumentModal.modal('hide');
		},
		cleanArgumentForm: function() {
			this.argument = new Argumen('', '');
		},
		closeModal : function() {
			this.cleanArgumentForm();
			this.createArgumentModal.modal('hide');
		},
		openModalToCreateRebuttal : function(args) {
			this.status = 'create-rebuttal';
			this.indexToBeConnected = args.index;
			this.showModal();
		},
		openModalToCreateSupport : function(args) {
			this.status = 'create-support';
			this.indexToBeConnected = args.index;
			this.showModal();
		},
		getCountOfTotalArguments : function() {
			return this.arguments.length;
		},
		openModalToViewArgument : function(args) {
			this.viewedArgument = this.arguments[args.index];
			this.viewArgumentModal.modal('show');
		},
		openModalConfirmationToRemoveArgument : function(args) {
			this.toBeDeletedIndex = args.index;
			this.removeArgumentModalNotification.modal('show');
		},
		closeModalConfirmationToRemoveArgument : function() {
			this.removeArgumentModalNotification.modal('hide');
		},
		removeArgumentByIndex : function() {
			var index = this.getToBeDeletedIndex();
			var uuid = this.arguments[index].uuid;
			var that = this;
			
			var connectionsToBeDeleted = this.connections.filter(function(connection) {
				return connection.source == uuid || connection.target == uuid;
			})

			var connectionsToBeKeep = this.connections.filter(function(connection) {
				return connection.source != uuid && connection.target != uuid;
			})
			
			connectionsToBeDeleted.forEach(function(connection, index) {
				jsPlumb.detach(connection.connection);
			})

			this.arguments.splice(index, 1);
			
			this.connections.splice(0, this.connections.length);

			connectionsToBeKeep.forEach(function(connection) {
				that.connections.push(connection)
			});

			this.connections = connectionsToBeKeep;

			this.closeModalConfirmationToRemoveArgument();
		},
		getToBeDeletedIndex : function() {
			return this.toBeDeletedIndex;
		},
		getArguments : function() {
			return this.arguments;
		},
		changePositionByIndex : function(args) {
			var that = this;
			var index = args.index;
			if(!this.arguments[index].getSubscribeOnMouseChange()) {
				document.onmousemove = function(event) {
					that.arguments[index].setRight((event.pageX - 150).toString());
					that.arguments[index].setTop((event.pageY - 30).toString());
					
					jsPlumb.repaintEverything();
				}
				this.arguments[index].setSubscribeOnMouseChange(1);
			} else {
				document.onmousemove = null;
				this.arguments[index].setSubscribeOnMouseChange(0);
			}
		},
		openModalToEditArgument : function(args) {
			this.status = 'edit-argument';
			this.toBeEditedIndex = args.index;
			
			var oldTitle = this.arguments[args.index].getTitle();
			var oldMessage = this.arguments[args.index].getMessage();

			this.argument = new Argumen(null, oldTitle, oldMessage, null, null);

			this.showModal();
		}
	},
	mounted : function() {
		this.createArgumentModal = $('#create-argument-modal');
		this.viewArgumentModal = $('#view-argument-modal');
		this.removeArgumentModalNotification = $('#remove-argument-modal-notification');
	}
})