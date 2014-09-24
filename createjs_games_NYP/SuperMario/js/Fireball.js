//this function does the inheritance
BOK.inherits(FireBall, createjs.Container);

/**
 * @ constructor
 * */
 function FireBall(x,y) {
	 //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
	
    createjs.Container.call(this);
	
	this.fireBallData = {
		// image to use
		framerate : 5,
		images    : [imgContainer["imgs/fireball.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 8, height: 8 },
		animations: {  
			fire: {
				frames: [0, 1, 2, 3],
				speed : 2,
			}
		}
	};
	this.fireBallSpriteSheet = new createjs.SpriteSheet(this.fireBallData);
	
	this.fireBallAnimation = new createjs.Sprite(this.fireBallSpriteSheet);
	
	// able to  reverse the sprite
	createjs.SpriteSheetUtils.addFlippedFrames(this.fireBallSpriteSheet, true, false, false);
	
	this.currentAnimation = "fire";
	this.fireBallAnimation.gotoAndPlay(this.currentAnimation);	
	
	this.amplitude = 13;
	this.deltaTime = 0;
	this.updateX = 0;
	this.updateY = 0;
		
	this.currentSide = "Right";
	
	this.addChild(this.fireBallAnimation);
	
	this.x = x;
	this.y = y;
 }
 
 FireBall.prototype.getHeight = function(){
	return this.fireBallData.frames.height;
};

FireBall.prototype.getWidth = function(){
	return this.fireBallData.frames.width;
};
 
 FireBall.prototype.update = function(deltaTime){
	//this.x 
	this.deltaTime += deltaTime;
	if(this.deltaTime > 6.28*16){
		this.deltaTime = 0;
	}
	if(this.currentSide  == "Right"){
		this.x = this.updateX + this.deltaTime;
	}
	else{
		this.x = this.updateX - this.deltaTime;
	}
	this.y = this.updateY + this.amplitude * Math.sin(0.1 * this.deltaTime);
 };