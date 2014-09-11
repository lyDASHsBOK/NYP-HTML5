/**
 * Created by Enveesoft.
 * User: winstonho
 * Date: 14-9-10
 * Time: 16:08
 * Write the description in this section.
 */

//this function does the inheritance
BOK.inherits(circleClass, createjs.Container);

/**
 * @ constructor
 * */
function circleClass(x,y ,value) {
    //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
	
    createjs.Container.call(this);

    //we store the reference of creep img in a member varibale so it can be accessed later
    this.creepImg_ = new createjs.Bitmap(imgContainer["imgs/pot1.png"]);
	this.creepImg1_ = new createjs.Bitmap(imgContainer["imgs/pot2.png"]);
	this.creepImg_.scaleX = 1.3;
	this.creepImg_.scaleY = 1.3;
	this.creepImg1_.scaleX = 1.3;
	this.creepImg1_.scaleY = 1.3;
	this.click = 0;
    this.addChild(this.creepImg_);
	
	this.value_ = value;
	
	
	this.valueText = new createjs.Text( this.value_, "20pt Calibri" ,"Black"); 
	this.valueText.x = 20;
	this.valueText.y= 20;
	this.addChild(this.valueText);
	
	this.x = x;
	this.y = y;
}

circleClass.prototype.getRadius = function()
{
	return this.creepImg_.image.width * this.creepImg_.scaleY * 0.5;
}
circleClass.prototype.changeColor = function()
{
	this.click  = 1;
	this.addChild(this.creepImg1_);
}