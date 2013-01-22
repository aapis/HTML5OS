/*
 * --------------------------------------------------
 * Class: rOS Main
 * Purpose: Load and prepare the screen
 * --------------------------------------------------
 */


	/*
	 * Setup the constructor
	 */
	var rOS = function(element, options){
		this.init(element, options);
	};

	/*
	 * Application
	 */
	rOS.prototype = {
		constructor: rOS,

		init: function(element, options){
			//set version number
			this.Version = '0.1.0';
			
			//Utility class setup
			this.Util = new Util(this.Version);

			//determine application context
			this.context = this.Util.UI.appContext;
		},

		load: function(path, file){
			if(!path || !file)
				this.Error('Invalid file or path');


		},
	};

	window.onload = function(){
		var App = new rOS();
	}