
goog.provide("root.gameClass");
goog.require("org.createjs.easeljs.SoundJS");
goog.require("bok.apps.preloader.CanvasPreloaderApp");


imgContainer = [];
function gameClass(stage) 
{
	
	console.log("hi!");
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.png"]);
	this.red = new createjs.Bitmap(imgContainer["imgs/red.png"]);
	this.blue = new createjs.Bitmap(imgContainer["imgs/blue.png"]);
	
	this.LoadImage =  function()
	 {
		 this.blue.y = 150;
		 stage.addChild(this.bg);
		 stage.addChild(this.red);
		 stage.addChild(this.blue);
	 }
	 
	 this.OnMouseclick = function(e)
	 {
		 console.log('clicked!')
	 }
}