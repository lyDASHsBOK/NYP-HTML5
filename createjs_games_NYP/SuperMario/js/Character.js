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
			idle: [0, "idle"],
			walk: [1, 3, "walk"],
			flag: [7, 8, "flag"],
			
			dead: { frames: [6] },
			jump: {
				frames: [4,5],
				speed: 1.5
			}
		}
	};
	this.marioSpriteSheet = new createjs.SpriteSheet(this.marioData);
	
	this.marioAnimation = new createjs.Sprite(this.marioSpriteSheet);
	
	// able to  reverse the sprite
	createjs.SpriteSheetUtils.addFlippedFrames(this.marioSpriteSheet, true, false, false);
	this.currentAnimation = "idle";
	this.marioAnimation.gotoAndStop(this.currentAnimation);
	
    //we store the reference of creep img in a member varibale so it can be accessed later
    this.addChild(this.marioAnimation);
	
	this.x = x;
	this.y = y;
}

Character.prototype.walkRightAnimation = function(){
	if(this.currentAnimation != "walk" ){
		this.currentAnimation = "walk";
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
	}
};

Character.prototype.walkLeftAnimation = function(){
	if(this.currentAnimation != "walk_h" ){
		this.currentAnimation = "walk_h";
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
	}
};

Character.prototype.idleAnimation = function(){
	if(this.currentAnimation != "idle" ){
		this.currentAnimation = "idle";
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
	}
};

Character.prototype.jumpAnimation = function(){
	if(this.currentAnimation != "jump" ){
		this.currentAnimation = "jump";
		this.marioAnimation.gotoAndPlay(this.currentAnimation);
	}
};

