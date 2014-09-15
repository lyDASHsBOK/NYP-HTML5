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
	
	this.score = 0;
	this.level = 0;
	
	this.scoreText = new createjs.Text("Score:", "18pt Calibri" ,"Black"); 
	this.addChild(this.scoreText);
	
	this.LevelText = new createjs.Text("Level:", "18pt Calibri" ,"Black"); 
	this.LevelText.x = 500;
	
	this.addChild(this.LevelText);
	
}
/**
 * @ update
 * */
HUDClass.prototype.update =  function() {	
	if(this.score > 100){
			this.level = Math.floor(this.score  * 0.01);
	}
	this.scoreText.text = "Score:" + this.score;
	this.LevelText.text = "Level:" + this.level;
};

/**
 * @ reset
 * */
HUDClass.prototype.reset =  function() {	
	
	this.score = 0;
	this.level = 0;

};




