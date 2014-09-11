/**
 * Created by Enveesoft.
 * User: winston HO
 * Date: 14-9-10
 * Time: 14:11
 * Write the description in this section.
 */
//this function does the inheritance
BOK.inherits(BlueCreep, Creep);

/**
 * @ constructor
 * */
function BlueCreep(speed,x,y) {
    //in inheritance you always invoke the constructor of the base class, not any other ones.
    Creep.call(this, speed);

    this.removeChild(this.creepImg_);
    this.creepImg_ = new createjs.Bitmap(imgContainer["imgs/blue.png"]);
	this.creepImg_.scaleX = 0.5;
	this.creepImg_.scaleY = 0.5;
    this.addChild(this.creepImg_);
	this.x = x;
	this.y = y;
}

//since we handle different speed using the speed property, there is no need implement the same move function
