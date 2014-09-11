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
 * @constructor
 * */
function HUDClass() {
    //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
	
    createjs.Container.call(this);
	
	this.Score = 0;
	this.Level = 0;
	
	this.ScoreText = new createjs.Text("Score:", "18pt Calibri" ,"Black"); 
	this.addChild(this.ScoreText);
	
	this.LevelText = new createjs.Text("Level:", "18pt Calibri" ,"Black"); 
	this.LevelText.x = 500;
	
	this.addChild(this.LevelText);
	
}

HUDClass.prototype.update =  function() {	
	
	if(this.Score > 100){
			this.Level = Math.floor(this.Score  * 0.01);
		}
	this.ScoreText.text = "Score:" + this.Score;
	this.LevelText.text = "Level:" + this.Level;

};

