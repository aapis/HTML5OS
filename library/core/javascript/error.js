/*
 * --------------------------------------------------
 * Class: rOS Error
 * Display and log application errors
 * --------------------------------------------------
 */

 var Error = function(){
	this.init();
 };

 Error.prototype = {
 	constructor: Error,

 	init: function(){
 		this.types = [
 			'GENERIC',
 			'WARNING',
 			'FATAL_ERROR',

 		];
 	},
 }