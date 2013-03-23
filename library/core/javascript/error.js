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
 	types: [],
 	DEBUG: true,

 	init: function(){
 		this.types = [
 			'GENERIC',
 			'WARNING',
 			'FATAL_ERROR',
 		];
 	},

 	log: function(message, type){
		if(undefined === type)
			type = this.types[0];
		
		if(undefined === message)
			message = 'Application threw a generic error.  No more information is available.';
		
		if(this.DEBUG_MODE){
			console.warn('DEBUG: '+ '['+ type +']'+ message);
		}
 	},
 }