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
	
	this.largeMarioData = {
		// image to use
		framerate : 5,
		images    : [imgContainer["imgs/character_large.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 16, height: 32, regX: 8 , regY: 24 },
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
	
	this.redLargeMarioData = {
		// image to use
		framerate : 5,
		images    : [imgContainer["imgs/character_large.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 16, height: 32, regX: 8 , regY: 24 },
		animations: {    
			idle:{ frames: [0+42] },
			flag: [7+42, 8+42, "flag"],
			
			walk: {
				frames: [1+42, 2+42, 3+42],
				speed: 2.5
			},
			
			jump: {
				frames: [5+42],
				speed: 2
			},
			
			dead: { frames: [6+42] }
		}
	};
	
	this.marioSpriteSheet = new createjs.SpriteSheet(this.marioData);
	this.largeMarioSpriteSheet = new createjs.SpriteSheet(this.largeMarioData);
	this.redLargeMarioSpriteSheet = new createjs.SpriteSheet(this.redLargeMarioData);
	
	this.marioAnimation = new createjs.Sprite(this.marioSpriteSheet);
	this.largeMarioAnimation = new createjs.Sprite(this.largeMarioSpriteSheet);
	this.redLargeMarioAnimation = new createjs.Sprite(this.redLargeMarioSpriteSheet);
	
	// able to  reverse the sprite
	createjs.SpriteSheetUtils.addFlippedFrames(this.marioSpriteSheet, true, false, false);
	createjs.SpriteSheetUtils.addFlippedFrames(this.largeMarioSpriteSheet, true, false, false);
	createjs.SpriteSheetUtils.addFlippedFrames(this.redLargeMarioSpriteSheet, true, false, false);
	
	this.currentAnimation = "idle_h";
	this.marioAnimation.gotoAndStop(this.currentAnimation);
	this.largeMarioAnimation.gotoAndStop(this.currentAnimation);
	this.redLargeMarioAnimation.gotoAndStop(this.currentAnimation);
	
	this.currentSide = "Right";
	this.size = "small";
	
	this.jumping = false;
	this.velocity = 0;
	this.maxVelocity = -8;
	this.gravityValue = 1;
	this.moveSpeed = 5;
	
	this.invisibleTime = 2;
	
	this.onGround = true;
	
    //we store the reference of creep img in a member varibale so it can be accessed later
    this.addChild(this.marioAnimation);
	
	this.x = x;
	this.y = y;
}


Character.prototype.walkRightAnimation = function(){
	if(this.currentAnimation != "walk" ){
		this.currentAnimation = "walk";
		this.currentSide = "Right";
		this.playAnimation();
	}
};

Character.prototype.walkLeftAnimation = function(){
	if(this.currentAnimation != "walk_h"){
		this.currentAnimation = "walk_h";
		this.currentSide = "Left";
		this.playAnimation();
	}
};

Character.prototype.idleRightAnimation = function(){
	if(this.currentAnimation != "idle" ){
		this.currentAnimation = "idle";
		this.currentSide = "Right";
			this.playAnimation();
	}
};

Character.prototype.idleLeftAnimation = function(){
	if(this.currentAnimation != "idle_h" ){
		this.currentAnimation = "idle_h";
		this.currentSide = "Left";
		this.playAnimation();
	}
};

Character.prototype.deadAnimation = function(){
	
	if(this.size == "small"){
		if(this.currentAnimation != "dead" ){
			this.currentAnimation = "dead";
			this.playAnimation();
		}
	}else{
		if(this.size == "redlarge"){
			this.largeMarioAnimation.alpha = 0.5;
			this.removeChild(this.redLargeMarioAnimation);
			this.addChild(this.largeMarioAnimation);
			this.size = "large";
		}else{
			this.marioAnimation.alpha = 0.5;
			this.removeChild(this.largeMarioAnimation);
			this.addChild(this.marioAnimation);			
			this.size = "small";
		}
	}
};
/**
 * @ private jumpRight
 * */
Character.prototype.jumpRightAnimation = function(){
	if(this.currentAnimation != "jump" ){
		this.currentAnimation = "jump";
		this.currentSide = "Right";
		this.playAnimation();
	}
};

/**
 * @ private JumpLeft
 * */
Character.prototype.jumpLeftAnimation = function(){
	if(this.currentAnimation != "jump_h" ){
		this.currentAnimation = "jump_h";
		this.currentSide = "Left";
		this.playAnimation();
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
			//this.y = 272+8;
			//this.velocity = 0;
			//this.jumping = false;
			//this.maxVelocity = -8;
		}
	}else{
		this.velocity = 0;
		this.jumping = false;
	}
	
};
Character.prototype.playAnimation = function(){
	if(this.size == "large"){
		this.largeMarioAnimation.gotoAndPlay(this.currentAnimation);
	}else if(this.size == "redlarge"){
		this.redLargeMarioAnimation.gotoAndPlay(this.currentAnimation);
	}else{
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
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
	if( this.size == "small" ){
		return this.marioData.frames.height;
	}
	else{
		return this.largeMarioData.frames.height;
	}
};

Character.prototype.getWidth = function(){
	if( this.size == "small" ){
		return this.marioData.frames.width;
	}else{
		return this.largeMarioData.frames.width;
	}
};

Character.prototype.growth = function(){
	if( this.size == "small" ){
		this.removeChild(this.marioAnimation);
		this.addChild(this.largeMarioAnimation);
		this.size = "large";
	}else if(  this.size == "large" ){
		this.removeChild(this.largeMarioAnimation);
		this.addChild(this.redLargeMarioAnimation);
		this.size = "redlarge";
	}
};

Character.prototype.getAlpha = function(){
	if( this.size == "small" ){
		return this.marioAnimation.alpha;
	}else if(  this.size == "large" ){
		return this.largeMarioAnimation.alpha;
	}else if(  this.size == "redlarge" ){ 
		return this.redLargeMarioAnimation.alpha;
	}
};

Character.prototype.setAlpha = function(alpha){
	if( this.size == "small" ){
		this.marioAnimation.alpha = alpha;
	}else if(  this.size == "large" ){
		this.largeMarioAnimation.alpha = alpha;
	}else if(  this.size == "redlarge" ){ 
		this.redLargeMarioAnimation.alpha = alpha;
	}
};

Character.prototype.update = function(deltaTime){

		if( this.getAlpha() == 0.5 ){
			this.invisibleTime -= deltaTime;
			if(this.invisibleTime < 0){
				this.setAlpha(1);
				this.invisibleTime = 2;
			}
		}
	
};