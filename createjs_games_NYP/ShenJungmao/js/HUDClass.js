/**
 * Created by Enveesoft.
 * User: WINSTON HO
 * Date: 14-9-10
 * Time: ??17:26
 * Write the description in this section.
 */

//this function does the inheritance
BOK.inherits(HUDClass, createjs.Container);

/**
 * @ constructor
 * */
function HUDClass() {
    //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
	
    createjs.Container.call(this);
	
	//this.addChild(this.LevelText);
	
}


