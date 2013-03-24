/*
 * --------------------------------------------------
 * Class: rOS Stack Manager
 * Application stack
 * --------------------------------------------------
 */

 var Stack = function(type){
	this.init(type);
 };

 Stack.prototype = {
	constructor: Stack,
	stack: [],
	type: null,

	init: function(type){
		this.type = type;

		this.stack[this.type] = [];
	},

	/**
	 * [push Add something to the stack]
	 * @param  {[type]} name [description]
	 * @return {[type]}      [description]
	 */
	push: function(name, value){
		var processed_value = value;

		if(value.indexOf('{') != 0){
			processed_value = JSON.stringify(value);
		}

		return this.stack[this.type].push({'name': name, 'value': processed_value});
	},

	/**
	 * [pop Remove something from the stack]
	 * @return {[type]} [description]
	 */
	pop: function(name){
		for(var key in this.stack[this.type]){
			var tmp = this.stack[this.type][key];

			if(name == tmp.name){
				this.stack[this.type].splice(key, 1);
			}
		}

		return this.stack;
	},

	/**
	 * [drop Drop a single stack]
	 * @param  {[type]} type [description]
	 * @return {[type]}      [description]
	 */
	drop: function(type){
		for(var key in this.stack){
			if(name == this.stack[key]){
				this.stack.splice(key, 1);
			}
		}

		return this.stack;
	},

	/**
	 * [trace Debug the stack]
	 * @return {[type]} [description]
	 */
	trace: function(){
		var StackTrace = {};

		StackTrace.context = this.type;
		StackTrace.stack = this.stack[this.type];
		
		return StackTrace;
	},
 }