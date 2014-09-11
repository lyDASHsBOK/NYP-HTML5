/**
 * Created by Enveesoft.
 * User: Liu Xinyi
 * Date: 14-9-10
 * Time: 上午10:11
 * Write the description in this section.
 */

//this function does the inheritance
BOK.inherits(Creep, createjs.Container);

/**
 * @ constructor
 * */
function Creep(speed,x,y) {
    //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
	
    createjs.Container.call(this);
	this.speed_ = speed;

    //we store the reference of creep img in a member varibale so it can be accessed later
    this.creepImg_ = new createjs.Bitmap(imgContainer["imgs/red.png"]);
	 this.creepImg_.scaleX = 0.5;
	  this.creepImg_.scaleY = 0.5;
    this.addChild(this.creepImg_);
	
	this.x = x;
	this.y = y;
}
/**
 * @ move
 * */
Creep.prototype.move =  function() {
	this.x = this.x + this.speed_;
};
