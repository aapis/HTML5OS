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

	init: function(evt){
		this._draw(evt);
	},

	
	
	_draw: function(evt){
		console.log(evt);
	},
 }