/**
 * Created by Enveesoft.
 * User: Liu Xinyi
 * Date: 14-9-10
 * Time: 上午10:11
 * Write the description in this section.
 */

//this function does the inheritance
BOK.inherits(BlueCreep, Creep);

/**
 * @constructor
 * */
function BlueCreep(speed) {
    //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();

	this.speed_ =speed;
		
    this.addChild(new createjs.Bitmap(imgContainer["imgs/blue.png"]));
}



BlueCreep.prototype.move =  function() {
	this.x = this.x + this.speed_;
};