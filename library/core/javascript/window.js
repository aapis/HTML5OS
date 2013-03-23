/*
 * --------------------------------------------------
 * Class: rOS Window Manager
 * Create, modify and destroy app windows
 * --------------------------------------------------
 */

 var Window = function(evt){
	this.init(evt);
 };

 Window.prototype = {
	constructor: Window,
	_context: 'window',

	init: function(evt){
		this._draw(evt);

		this.Stack = new Stack(this._context);
		console.log(this.Stack.trace());
	},

	
	
	_draw: function(evt){
		console.log(evt);
	},
 }