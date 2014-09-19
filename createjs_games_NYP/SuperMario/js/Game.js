/**
 * @ constructor
 * */
function Game(stage, imgContainer){

    this.stage_ = stage;
	
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.png"]);
	
	
	this.mapModule = new MapModule(20,45);
	this.KeyBoard = new KeyBoardCode();
	this.MapView = new MapView(0,0,this.mapModule , this.bg.image.width);
	this.stage_.addEventListener('mousedown', Delegate.create(this,this.onMouseClick));
	
	document.addEventListener("keydown", Delegate.create(this,this.keyBoardDown));
    document.addEventListener("keyup", Delegate.create(this,this.keyBoardUp));
};
/**
 * @ keyBoardDown
 * */
Game.prototype.keyBoardDown = function(e) {
		this.KeyBoard.setKeyPress(e.keyCode,true);	
};
/**
 * @ keyBoardUp
 * */
Game.prototype.keyBoardUp = function(e) {
	this.KeyBoard.setKeyPress(e.keyCode,false);
};
/**
 * @ onMouseClick
 * */
Game.prototype.onMouseClick = function(e) {

};
Game.prototype.tick = function(e) {
	
};
/**
 * @ loadImage
 * */
Game.prototype.loadImage = function() {
		this.stage_.addChild(this.bg);
		this.stage_.addChild(this.MapView);
		
};
/**
 * @ start
 * */
Game.prototype.start = function() {
	this.loadImage();
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};


