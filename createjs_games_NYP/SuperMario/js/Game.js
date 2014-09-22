/**
 * @ constructor
 * */
function Game(stage, imgContainer){

    this.stage_ = stage;
	
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.png"]);
	
	
	this.mapModule = new MapModule(20,45);
	this.keyBoard = new KeyBoardCode();
	this.mapView = new MapView(0,0,this.mapModule , this.bg.image.width);
	this.stage_.addEventListener('mousedown', Delegate.create(this,this.onMouseClick));
	this.mario = new Character(0+8,272+8);
	
	document.addEventListener("keydown", Delegate.create(this,this.keyBoardDown));
    document.addEventListener("keyup", Delegate.create(this,this.keyBoardUp));
};
/**
 * @ keyBoardDown
 * */
Game.prototype.keyBoardDown = function(e) {
		this.keyBoard.setKeyPress(e.keyCode,true);	
};
/**
 * @ keyBoardUp
 * */
Game.prototype.keyBoardUp = function(e) {
	this.keyBoard.setKeyPress(e.keyCode,false);
};
/**
 * @ onMouseClick
 * */
Game.prototype.onMouseClick = function(e) {

};
Game.prototype.tick = function(e) {
	/*
	if(this.keyBoard.getKeyPressThroughtName("d")){
		this.mapView.scrolLeft();
	}
	
	if(this.keyBoard.getKeyPressThroughtName("a")){
		this.mapView.scrolRight();
	}
	*/
	if(this.keyBoard.getKeyPressThroughtName(" ")){
		this.mario.jumpAnimation();
	}else if(this.keyBoard.getKeyPressThroughtName("d")){	
		this.mario.walkRightAnimation();
	}else if(this.keyBoard.getKeyPressThroughtName("a")){
		this.mario.walkLeftAnimation();
	}else{
		this.mario.idleAnimation();
	}
};
/**
 * @ loadImage
 * */
Game.prototype.loadImage = function() {
		this.stage_.addChild(this.bg);
		this.stage_.addChild(this.mapView);
		this.stage_.addChild(this.mario);
};
/**
 * @ start
 * */
Game.prototype.start = function() {
	this.loadImage();
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};


