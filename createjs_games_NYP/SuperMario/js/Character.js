//this function does the inheritance
BOK.inherits(Character, createjs.Container);

/**
 * @ constructor
 * */
 function Character(x,y) {
    //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
    createjs.Container.call(this);
	
	this.marioData = {
		// image to use
		framerate : 5,
		images    : [imgContainer["imgs/character_small.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 16, height: 16, regX: 8 , regY: 8 },
		animations: {    
			idle:{ frames: [0] },
			flag: [7, 8, "flag"],
			
			walk: {
				frames: [1, 2, 3],
				speed: 2.5
			},
			
			jump: {
				frames: [5],
				speed: 2
			},
			
			dead: { frames: [6] }
		}
	};
	this.marioSpriteSheet = new createjs.SpriteSheet(this.marioData);
	
	this.marioAnimation = new createjs.Sprite(this.marioSpriteSheet);
	
	// able to  reverse the sprite
	createjs.SpriteSheetUtils.addFlippedFrames(this.marioSpriteSheet, true, false, false);
	this.currentAnimation = "idle_h";
	this.marioAnimation.gotoAndStop(this.currentAnimation);
	
	this.currentSide = "Right";
	
	this.jumping = false;
	this.velocity = 0;
	this.maxVelocity = -10;
	this.gravityValue = +1;
	this.moveSpeed = 5;
	
    //we store the reference of creep img in a member varibale so it can be accessed later
    this.addChild(this.marioAnimation);
	
	this.x = x;
	this.y = y;
}


Character.prototype.walkRightAnimation = function(){
	if(this.currentAnimation != "walk" ){
		this.currentAnimation = "walk";
		this.currentSide = "Right";
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
	}
};

Character.prototype.walkLeftAnimation = function(){
	if(this.currentAnimation != "walk_h"){
		this.currentAnimation = "walk_h";
		this.currentSide = "Left";
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
	}
};

Character.prototype.idleRightAnimation = function(){
	if(this.currentAnimation != "idle" ){
		this.currentAnimation = "idle";
		this.currentSide = "Right";
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
	}
};

Character.prototype.idleLeftAnimation = function(){
	if(this.currentAnimation != "idle_h" ){
		this.currentAnimation = "idle_h";
		this.currentSide = "Left";
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
	}
};

/**
 * @ private jumpRight
 * */
Character.prototype.jumpRightAnimation = function(){
	if(this.currentAnimation != "jump" ){
		this.currentAnimation = "jump";
		this.currentSide = "Right";
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
	}
};

/**
 * @ private JumpLeft
 * */
Character.prototype.jumpLeftAnimation = function(){
	if(this.currentAnimation != "jump_h" ){
		this.currentAnimation = "jump_h";
		this.currentSide = "Left";
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
	}
};

/**
 * @ Jump
 * */
 Character.prototype.jump = function(){
	this.jumping = true;
	this.velocity = this.maxVelocity;
	if( this.currentSide == "Left"){		
		this.jumpLeftAnimation();	
	}else{		
		this.jumpRightAnimation();	
	}	
};

Character.prototype.gravity = function(){

	if(this.jumping){
		this.y += this.velocity;
		this.velocity += this.gravityValue;
		
		if( this.y > 272+8 ){
			this.y = 272+8;
			this.velocity = 0;
			this.jumping = false;
			this.maxVelocity = -10;
		}
	}else{
		this.velocity = 0;
		this.jumping = false;
	}
	
};

Character.prototype.moveRight = function(){
	this.x += 2;
};

Character.prototype.moveLeft = function(){
	if(this.x > 4)
	this.x -= 2;
};

Character.prototype.getHeight = function(){
	return this.marioData.frames.height;
};

Character.prototype.getWidth = function(){
	return this.marioData.frames.width;
};
