/**
 * Created by Enveesoft.
 * User: winstonho
 * Date: 14-9-10
 * Time: 16:08
 * Write the description in this section.
 */

//this function does the inheritance
BOK.inherits(aiClass, createjs.Container);

/**
 * @ constructor
 * */
function aiClass(x,y) {
    //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
	
    createjs.Container.call(this);
	
	
	this.staydata = {
		// image to use
		framerate : 20,
		images    : [imgContainer["imgs/stay.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 61, height: 93}, 
		animations: {    
			stay: [0, 15, "stay"]
		}
	};
	
	this.weizhudata = {
		// image to use
		framerate : 20,
		images    : [imgContainer["imgs/weizhu.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 64, height: 93}, 
		animations: {    
			weizhu: [0, 14, "weizhu"]
		}
	};
	
	
	this.staySpriteSheet = new createjs.SpriteSheet(this.staydata);
	
	this.weizhuSpriteSheet = new createjs.SpriteSheet(this.weizhudata);
	
	this.stayAnimation = new createjs.Sprite(this.staySpriteSheet);
	this.stayAnimation.gotoAndPlay("stay");
	
	this.weizhuAnimation = new createjs.Sprite(this.weizhuSpriteSheet);
	this.weizhuAnimation.gotoAndPlay("weizhu");

    //we store the reference of creep img in a member varibale so it can be accessed later
    this.addChild(this.stayAnimation);
	
	this.x = x;
	this.y = y;
}
/**
 * @ changeAnimation
 * change the animation
 * */
aiClass.prototype.changeAnimation = function(isWeiZhu){
	if(isWeiZhu){
		this.removeChild(this.stayAnimation);
		this.addChild(this.weizhuAnimation);
	}
	else{
		this.removeChild(this.weizhuAnimation);
		this.addChild(this.stayAnimation);
	}
};

