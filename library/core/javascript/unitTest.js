/*
 * --------------------------------------------------
 * Class: rOS Unit Tests
 * Unit testing to ensure proper functionality
 * --------------------------------------------------
 */

 var UnitTest = function(){
	this.init();
 };

 UnitTest.prototype = {
	constructor: UnitTest,
	_context: 'unittest',

	init: function(){
		this.Stack = new Stack(this._context);
	},
 }