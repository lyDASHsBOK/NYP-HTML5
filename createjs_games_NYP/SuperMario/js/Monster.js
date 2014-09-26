//this function does the inheritance
BOK.inherits(Monster, createjs.Container);

/**
 * @ constructor
 * */
 function Monster(x, y, type) {
    //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
    createjs.Container.call(this);
	
	if(type == "mushroom"){
		this.spawnMushroom();
	}else if(type == "turtle"){
		this.spawnTurtle();
	}
	this.type_ = type;
	this.alive = true;
	this.alive2 = true;
	
	this.currentSide = "Left";
	
	this.x = x;
	this.y = y;
	
	this.orginalX = x;
	this.orginalY = y;
}

Monster.prototype.reset = function(){
	this.x = this.orginalX;
	this.y = this.orginalY;
	this.alive = true;
	this.alive2 = true;
	this.currentSide = "Left";
	this.visible = true;
	this.alpha = 1;
	
	
	if(this.type_ == "mushroom"){
		this.currentAnimation = "walk";
		this.mushroomAnimation.gotoAndPlay(this.currentAnimation);
	}else if(this.type_ == "turtle"){
		this.currentAnimation = "walk";
		this.turtleAnimation.gotoAndPlay(this.currentAnimation);
	}
	
};

Monster.prototype.update = function() {
	if(!this.alive){
		this.alpha -= 0.05;
		if(this.alpha == 0){
			this.visible = false;
		}
	}else if(!this.alive2){
		this.y += 3;
		if(this.y > 320){
			this.visible = false;
		}
	}else{
		if(this.currentSide == "Left"){
			this.x -= 1;
		}
		else{
			this.x +=1;
		}
		if(!this.onGround){
			this.y += 3;
		}
	}
};


Monster.prototype.changeDirection = function() {
	if(this.currentSide == "Left"){
		this.currentSide = "Right";
	}
	else{
		this.currentSide = "Left";
	}
};

Monster.prototype.setDead = function() {
	this.currentAnimation = "dead";
	this.alive = false;
};

Monster.prototype.isDead = function() {
	return this.alive;
};

Monster.prototype.setDead2 = function() {
	this.currentAnimation = "walk_v";
	this.alive2 = false;
};

Monster.prototype.isDead2 = function() {
	return this.alive2;
};

Monster.prototype.spawnMushroom = function() {
	this.mushroomData = {
		// image to use
		framerate : 5,
		images    : [imgContainer["imgs/monster1.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 16, height: 16 ,regX: 8 , regY: 8},
		animations: {    
			walk: {
				frames: [0, 1],
				speed: 0.1
			},

			dead:{
				frames: [2],
				speed: 1
			}
		}
	};
	
	
	this.mushroomSpriteSheet = new createjs.SpriteSheet(this.mushroomData);
	this.mushroomAnimation = new createjs.Sprite(this.mushroomSpriteSheet);
	
	// able to  reverse the sprite
	createjs.SpriteSheetUtils.addFlippedFrames(this.mushroomSpriteSheet, true, true, false);
	
	this.currentAnimation = "walk";
	this.mushroomAnimation.gotoAndPlay(this.currentAnimation);
	
	this.currentSide = "Left";
	
    //we store the reference of creep img in a member varibale so it can be accessed later
    this.addChild(this.mushroomAnimation);
	
};

Monster.prototype.spawnTurtle = function() {
	this.turtleData = {
		// image to use
		framerate : 5,
		images    : [imgContainer["imgs/monster2.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 16, height: 22 , regX: 8 , regY:11},
		animations: {    
			walk: {
				frames: [0, 1],
				speed: 0.1
			},

			dead:{
				frames: [5],
				speed: 1
			}
		}
	};
	
	this.turtleSpriteSheet = new createjs.SpriteSheet(this.turtleData);
	this.turtleAnimation = new createjs.Sprite(this.turtleSpriteSheet);
	
	// able to  reverse the sprite
	createjs.SpriteSheetUtils.addFlippedFrames(this.turtleSpriteSheet, true, true, false);
	
	this.currentAnimation = "walk";
	this.turtleAnimation.gotoAndPlay(this.currentAnimation);
	
	this.currentSide = "Left";
	this.onGround = true;
	
    //we store the reference of creep img in a member varibale so it can be accessed later
    this.addChild(this.turtleAnimation);
	
};

Monster.prototype.getHeight = function(){
	if(this.type_ == "mushroom"){
		return this.mushroomData.frames.height;
	}else if(this.type_ == "turtle"){
		return this.turtleData.frames.height;
	}
};

Monster.prototype.getWidth = function(){

	if(this.type_ == "mushroom"){	
		return this.mushroomData.frames.width;	
	}else if(this.type_ == "turtle"){
		return this.turtleData.frames.width;	
	}
};

Monster.prototype.dead = function( value ){

	if(value == 1){	
		this.setDead();
	}else{
		this.setDead2();
	}
	
	if(this.type_ == "mushroom"){	
		this.mushroomAnimation.gotoAndPlay(this.currentAnimation);	
	}else if(this.type_ == "turtle"){
		this.turtleAnimation.gotoAndPlay(this.currentAnimation);
	}
};
