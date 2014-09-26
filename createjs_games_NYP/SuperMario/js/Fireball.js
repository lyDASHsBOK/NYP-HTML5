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
		frames    : {width: 8, height: 8, regX: 4, regY: 4},
		animations: {  
			fire: {
				frames: [0, 1, 2, 3],
				speed : 1,
			}
		}
	};
	
	this.fireBallEffectData = {
		// image to use
		framerate : 5,
		images    : [imgContainer["imgs/fireballeffect.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 16, height: 16, regX: 8, regY: 8 },
		animations: {  
			fire: {
				frames: [0, 1, 2],
				speed : 0.5,
			}
		}
	};
	this.fireBallSpriteSheet = new createjs.SpriteSheet(this.fireBallData);
	this.fireBallEffectSpriteSheet = new createjs.SpriteSheet(this.fireBallEffectData);
	
	this.fireBallAnimation = new createjs.Sprite(this.fireBallSpriteSheet);
	this.fireBallEffectAnimation = new createjs.Sprite(this.fireBallEffectSpriteSheet);
	
	// able to  reverse the sprite
	createjs.SpriteSheetUtils.addFlippedFrames(this.fireBallSpriteSheet, true, false, false);
	createjs.SpriteSheetUtils.addFlippedFrames(this.fireBallEffectSpriteSheet, true, false, false);
	
	this.currentAnimation = "fire";
	this.fireBallAnimation.gotoAndPlay(this.currentAnimation);	
	
	this.SPEED = 5;
	
	this.amplitude = 20;
	this.deltaTime = 0;
	this.updateX = 0;
	this.updateY = 0;
	this.directionX = 0;
	this.directionY = 1 * this.SPEED;
	this.distanceX = 0;
	
	this.state = "straight";		
	this.currentSide = "Right";
	
	this.visible = false;
	this.addChild(this.fireBallAnimation);
	
	this.fireBallEffectAnimation.visible = false;
	this.addChild(this.fireBallEffectAnimation);
	
	this.x = x;
	this.y = y;
	
	this.orginalX = x;
	this.orginalY = y;
	
}

FireBall.prototype.reset = function(){
	this.currentAnimation = "fire";
	this.fireBallAnimation.gotoAndPlay(this.currentAnimation);	
	
	this.SPEED = 5;
	
	this.amplitude = 20;
	this.deltaTime = 0;
	this.updateX = 0;
	this.updateY = 0;
	this.directionX = 0;
	this.directionY = 1 * this.SPEED;
	this.distanceX = 0;
	
	this.state = "straight";		
	this.currentSide = "Right";
	

	this.x = this.orginalX;
	this.y = this.orginalY;
	
	this.visible = false;
	this.setToBounce();
	
	this.fireBallAnimation.visible = false;
	this.fireBallEffectAnimation.visible = false;
	
};
 
/**
* @ shoot
* also act as reset
* */
FireBall.prototype.shoot = function( marioClone ){
	this.fireBallAnimation.visible = true;
	this.fireBallEffectAnimation.visible = false;
	this.visible = true;
	this.deltaTime = 0;
	this.x = marioClone.x-4;
	this.y = marioClone.y-8;
	this.currentSide = marioClone.currentSide;
	this.state = "straight";
	if(marioClone.currentSide == "Left"){
		this.directionX = -1 * this.SPEED;
	}else{
		this.directionX = 1 * this.SPEED;
	}
	
};

 
FireBall.prototype.getAlive = function(){
	return this.visible;
};

FireBall.prototype.setAliveFalse = function(){
	this.visible = false;
};
  
 FireBall.prototype.getHeight = function(){
	return this.fireBallData.frames.height;
};

FireBall.prototype.getWidth = function(){
	return this.fireBallData.frames.width;
};
 
FireBall.prototype.setToBounce = function(){
	if(this.state !=  "bomb"){
		this.state = "bounce";
		this.deltaTime = 0;
		this.updateY = this.y;
	}
};

FireBall.prototype.setToBomb = function(){
	if(this.state != "bomb"){
		this.state = "bomb";
		this.fireBallEffectAnimation.visible = true;
		this.fireBallAnimation.visible = false;
		this.fireBallEffectAnimation.gotoAndPlay(this.currentAnimation);
	}
};
 
/**
* @ private bounce
* */
FireBall.prototype.bounce = function( deltaTime ){
	this.deltaTime += deltaTime;
	if(this.deltaTime > 3.35){
		this.deltaTime = 0;
		this.visible = false;
	}
	
	if(this.currentSide  == "Right"){	
		this.x += 1 * this.SPEED ;
	}
	else{	
		this.x -= 1 * this.SPEED ;
	}
	this.y = this.updateY + this.amplitude * Math.sin(-this.deltaTime);
	
};	

/**
* @ private straight
* */
FireBall.prototype.straight = function(){
	this.x += this.directionX;
	this.y += this.directionY;
};	
 
FireBall.prototype.update = function(deltaTime){
	
	if(	this.state == "straight" ){	
		this.straight();
	}
	
	if(	this.state == "bounce" ){	
		this.bounce( deltaTime );
	}
	
	if( this.state == "bomb" ){
		if(this.fireBallEffectAnimation.currentFrame == 2){
			this.visible = false;
		}	
	}
};