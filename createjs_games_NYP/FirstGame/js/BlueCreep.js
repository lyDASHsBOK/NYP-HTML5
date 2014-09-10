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
    //in inheritance you always invoke the constructor of the base class, not any other ones.
    Creep.call(this, speed);

    this.removeChild(this.creepImg_);
    this.creepImg_ = new createjs.Bitmap(imgContainer["imgs/blue.png"]);
    this.addChild(this.creepImg_);
}

//since we handle different speed using the speed property, there is no need implement the same move function
