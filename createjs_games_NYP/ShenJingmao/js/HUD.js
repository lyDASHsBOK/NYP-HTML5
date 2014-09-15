/**
 * Created by Enveesoft.
 * User: WINSTON HO
 * Date: 14-9-10
 * Time: ??17:26
 * Write the description in this section.
 */

//this function does the inheritance
BOK.inherits(HUD, createjs.Container);

/**
 * @ constructor
 * */
function HUD() {
    //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
	
    createjs.Container.call(this);
	
	this.gameOver = new createjs.Bitmap(imgContainer["imgs/failed.png"]);
	this.gameOver.scaleX = 1.35;
	this.gameOver.scaleY = 1.35;
	
	this.win = new createjs.Bitmap(imgContainer["imgs/victory.png"]);
	this.win.scaleX = 1.35;
	this.win.scaleY = 1.35;
	
	this.share = new createjs.Bitmap(imgContainer["imgs/shareBTN.png"]);
	this.share.scaleX = 1.35;
	this.share.scaleY = 1.35;
	this.share.y = 500;
	
	this.more = new createjs.Bitmap(imgContainer["imgs/more.png"]);
	this.more.scaleX = 1.2;
	this.more.scaleY = 1.2;
	this.more.y = 840;
	this.more.x = 20;
	
	this.moveNumberText = new createjs.Text( "you use :", "20pt Calibri" ,"Black"); 
	this.moveNumberText.x = 200;
	this.moveNumberText.y = 220;
	
	
	//this.addChild(this.LevelText);
	this.x = 15;
	this.y = 200;
	
}

HUD.prototype.addGameOver = function(isGameOver)
{
	if(isGameOver){
		this.addChild(this.gameOver);
		this.addChild(this.share);
		this.addChild(this.more);
		this.moveNumberText.text = "Try again" ;
		this.addChild(this.moveNumberText);
		
	}
	else{
		this.removeChild(this.gameOver);
		this.removeChild(this.share);
		this.removeChild(this.more);
		this.removeChild(this.moveNumberText);
	}
}

HUD.prototype.addWining = function(isWin,numberOfMove)
{
	if(isWin){
		this.addChild(this.win);
		this.moveNumberText.text = "you use : " + numberOfMove + " move"
		this.addChild(this.share);
		this.addChild(this.more);
		this.addChild(this.moveNumberText);
	}
	else{
		this.removeChild(this.win);
		this.removeChild(this.share);
		this.removeChild(this.more);
		this.removeChild(this.moveNumberText);
	}
}


