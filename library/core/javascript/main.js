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
		_context: 'main',

		init: function(element, options){
			//set version number
			this.Version = '0.1.0';

			//setup the stack
			this.Stack = new Stack(this._context);

			//Window manager class setup
			this.Window = new Window();

			//Error class setup
			this.Error = new Error();
			
			//Utility class setup
			this.Util = new Util(this.Version);

			//determine application context
			this.context = this.Util.UI.appContext;
		},

		load: function(path, file){
			if(!path || !file)
				this.Error.log('Invalid file or path');


		},
	};

	window.onload = function(){
		var App = new rOS();
	}