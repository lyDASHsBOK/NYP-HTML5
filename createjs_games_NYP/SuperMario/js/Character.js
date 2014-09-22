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
	
	this.jumpSpeed = 0;
	this.onGround = true;
	this.currentSide = "Right";
	
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

Character.prototype.jumpRightAnimation = function(){
	if(this.currentAnimation != "jump" ){
		this.currentAnimation = "jump";
		this.currentSide = "Right";
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
	}
};

Character.prototype.jumpLeftAnimation = function(){
	if(this.currentAnimation != "jump_h" ){
		this.currentAnimation = "jump_h";
		this.currentSide = "Left";
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
	}
};

Character.prototype.gravity = function(){
	if(this.y+8 < 272+16){
		this.y += 5;
	}else{
		this.y = 272 + 8;
		this.onGround = true;
	}
};

Character.prototype.jumpPower = function(){
	this.y -= 10;
	
	if( this.y < 272 - 16 * 3 ){
		this.onGround = false;
	}
};

Character.prototype.moveRight = function(){
	this.x += 2;
};

Character.prototype.moveLeft = function(){
	if(this.x > 4)
	this.x -= 2;
};
