/*
 * --------------------------------------------------
 * Class: rOS UI
 * Build, control and modify the OS chrome
 * --------------------------------------------------
 */

 var Util = function(version){
	this.init(version);
 };

 Util.prototype = {
	constructor: Util,

	init: function(version){
		this.UI._render(version);
	},

	/*
	 * Class: Util.UI
	 * 
	 */
	UI: {
		contextMenu: [],
		mainMenu: [],
		App: {}, //TODO: move to main.js | currently: Util.UI.App.prop, should be App.prop
		backgroundImg: {},
		ContextMenuOptions: {},

		_resetScreen: function(){
			var elementsToClear = document.body.querySelectorAll('*:not(script)');
			
			for(var i = 0; i < elementsToClear.length; i++){
				elementsToClear[i].parentElement.removeChild(elementsToClear[i]);
			}
		},

		_draw: function(version){
			//clear the screen of all elements, then append the app wrapper
			this._resetScreen();

			this.ContextMenuOptions.height = 25;

			var w = document.createElement('canvas');
				w.classList.add('main');
				w.width = window.innerWidth;
				w.height = window.innerHeight;

			//set the canvas context - becomes global context object in main.js
			this.App.Context = w.getContext('2d');
			this.App.Object = w;
			this.App.Name = 'rOS v'+ version;

			this.backgroundImg = new Image();

			document.body.insertBefore(w, document.getElementsByTagName('script')[0]);
			
			//set the initial background image
			//TODO: store the latest chosen image so it is displayed when the user logs back in
			//TODO: this is messed up, rewrite this onload statement?
			// this.backgroundImg.onload = function(UI, canvasObj, image){
			// 	//set the initial background image
			// 	image.src = 'library/core/images/test.jpg';

			// 	UI.drawImage(image, 0, 0, canvasObj.width, canvasObj.height);
			// }(this.App.Context, w, this.backgroundImg);
			this._drawBackgroundImage(this.App.Context, w, this.backgroundImg);
			this._drawMainMenu();

			this._attachListeners();
		},

		_drawBackgroundImage: function(appContext, canvasObj, image){
			image.onload = function(UI, canvasObj, image){
				//set the initial background image
				image.src = './library/core/images/wallpapers/default.jpg';

				UI.drawImage(image, 0, 0, canvasObj.width, canvasObj.height);
			}(appContext, canvasObj, image);
		},

		_drawMainMenuMARKUP_VERSION: function(){
			var mainMenuBar = document.createElement('div');
				mainMenuBar.classList.add('MainMenuBar');

			document.body.insertBefore(mainMenuBar, this.App.Object);
		},

		_drawMainMenu: function(){
			var AC = this.App.Context;

			try {
				/*
				 * Draw the line separator
				 */
				AC.lineWidth = 1;
				AC.strokeStyle = 'rgba(0,0,0,0.4)';

				AC.beginPath();
				AC.moveTo(0, this.ContextMenuOptions.height);
				AC.lineTo(this.App.Object.width, this.ContextMenuOptions.height);
				AC.stroke();
				console.log(AC);

				/*
				 * Draw the gradient
				 */
				
				var ctxMenuBg = AC.createLinearGradient(0,this.ContextMenuOptions.height,0,0);
					ctxMenuBg.addColorStop(0, '#ebebeb');
					ctxMenuBg.addColorStop(1, 'white');

					AC.save();
						AC.shadowBlur = 7;
						AC.shadowOffsetX = 0;
						AC.shadowOffsetY = 0;
						AC.shadowColor = 'black';

						AC.fillStyle = ctxMenuBg;
						AC.fillRect(0,0,this.App.Object.width,this.ContextMenuOptions.height);
					AC.restore();

				/*
				 * Build out the menu
				 */
				AC.save();
					AC.font = '1em Helvetica, Arial, sans-serif';
					AC.shadowColor = 'white';
					AC.shadowBlur = 2;
					AC.shadowOffsetY = 0;
					AC.shadowOffsetX = 0;
					AC.fillText(this.App.Name, 5, 17);
				AC.restore();


			}catch(Exception){
				console.log(Exception);
			}
		},

		_attachListeners: function(){
			/*
			 * WINDOW.ONRESIZE event
			 */
			// window.onresize = function(contextObj){
			// 	contextObj._drawBackgroundImage();
			// }(this.App.Context);
		},

		_render: function(version){
			if(!this.App.Context){
				this._draw(version);
			}
		},
	},

	/*
	 * Class: Util.IO
	 *
	 * Save/load, file operations
	 */
	IO: {
		/*
		 * Get the data from the local client
		 */
		query: function(item){
			if(!item) return false;

			var value = null;

			if(!Component.options.useLocalStorage){
				value = this._getCookie('rOS.'+ item);
			}else {
				value = localStorage.getItem('rOS.'+ item);
			}

			//replace both the first and last double quotes
			value = value.replace('"', '');
			value = value.replace('"', '');

			return value;
		},

		/*
		 * Set data to the local client
		 */
		store: function(item, data){
			if(!item) return false;

			if(!Component.options.useLocalStorage){
				return this._setCookie('rOS.'+ item, data, expiry);
			}else {
				return localStorage.setItem('rOS.'+ item, JSON.stringify(data));
			}
		},

		/*
		 * Set data to a cookie - should not be called directly
		 * 
		 * Legacy fallback for older browsers that don't support the localStorage engine
		 */
		_setCookie: function(name, value, expiry){
			var date = new Date();
				expiry = (expiry ? expiry : 7);
				date.setDate(date.getDate() + expiry);

			var value = escape(value) + "; expires=" + date.toUTCString();

			document.cookie = name + "=" + value;

			return true;
		},

		/*
		 * Get the data from a cookie - should not be called directly
		 * 
		 * Legacy fallback for older browsers that don't support the localStorage engine
		 */
		_getCookie: function(name){
			var nameEQ = name + "=",
				ca = document.cookie.split(';');

			for(var i=0;i < ca.length;i++) {
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}

			return null;
		},
	},
 };