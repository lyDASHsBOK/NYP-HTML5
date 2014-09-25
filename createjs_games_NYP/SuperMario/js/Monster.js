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
	this.x = x;
	this.y = y;
}

Monster.prototype.spawnMushroom = function() {
	this.mushroomData = {
		// image to use
		framerate : 5,
		images    : [imgContainer["imgs/monster1.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 16, height: 16},
		animations: {    
			walk: {
				frames: [0, 1],
				speed: 1
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
	createjs.SpriteSheetUtils.addFlippedFrames(this.mushroomSpriteSheet, true, false, false);
	
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
		frames    : {width: 16, height: 22},
		animations: {    
			walk: {
				frames: [0, 1],
				speed: 0.5
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
	createjs.SpriteSheetUtils.addFlippedFrames(this.turtleSpriteSheet, true, false, false);
	
	this.currentAnimation = "walk";
	this.turtleAnimation.gotoAndPlay(this.currentAnimation);
	
	this.currentSide = "Left";
	
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

Monster.prototype.dead = function(){
	this.currentAnimation = "dead";
	if(this.type_ == "mushroom"){	
		this.mushroomAnimation.gotoAndPlay(this.currentAnimation);	
	}else if(this.type_ == "turtle"){
		this.turtleAnimation.gotoAndPlay(this.currentAnimation);
	}
};