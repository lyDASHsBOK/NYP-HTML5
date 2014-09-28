//this function does the inheritance
BOK.inherits(HUD, createjs.Container);

/**
 * @ constructor
 * */
function HUD() {
	//this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
	
    createjs.Container.call(this);
	
	this.FIRSTROW = 20;
	this.SECONDROW = 40;
	
	this.nameText = new createjs.Text( "MARIO", "16pt Calibri" ,"White"); 
	this.nameText.x = 20;
	this.nameText.y = this.FIRSTROW;
	
	this.worldNameText = new createjs.Text( "WORLD", "16pt Calibri" ,"White"); 
	this.worldNameText.x = 200;
	this.worldNameText.y = this.FIRSTROW;
	
	this.TimerNameText = new createjs.Text( "TIME", "16pt Calibri" ,"White"); 
	this.TimerNameText.x = 320;
	this.TimerNameText.y = this.FIRSTROW;
	
	this.scoreText = new createjs.Text( "", "16pt Calibri" ,"White"); 
	this.scoreText.x = this.FIRSTROW;
	this.scoreText.y = this.SECONDROW;
	
	this.worldText = new createjs.Text( "", "16pt Calibri" ,"White"); 
	this.worldText.x = 200;
	this.worldText.y = this.SECONDROW;
	
	this.coinText = new createjs.Text( "", "16pt Calibri" ,"White"); 
	this.coinText.x = 130;
	this.coinText.y = this.SECONDROW;
	
	this.timerText = new createjs.Text( "", "16pt Calibri" ,"White"); 
	this.timerText.x = 320;
	this.timerText.y = this.SECONDROW;
	
	this.GameOverText = new createjs.Text( "Game Over", "40pt Calibri" ,"White"); 
	this.GameOverText.x = 80;
	this.GameOverText.y = 100;
	this.GameOverText.visible = false;
	
	this.resetText = new createjs.Text( "Press r to reset", "20pt Calibri" ,"White"); 
	this.resetText.x = 120;
	this.resetText.y = 150;
	this.resetText.visible = false;

	
	this.coinDisplayData = {
		// image to use
		framerate : 5,
		images    : [imgContainer["imgs/hudcoin.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 7, height: 8 },
		animations: {    
			flash: {
				frames: [0, 1, 2],
				speed: 0.2
			}
		}
	};
	
	this.coinDisplaySpriteSheet = new createjs.SpriteSheet(this.coinDisplayData);
	this.coinDisplayAnimation = new createjs.Sprite(this.coinDisplaySpriteSheet);
	this.coinDisplayAnimation.x = 115;
	this.coinDisplayAnimation.y = this.SECONDROW;
	this.coinDisplayAnimation.scaleX = 1.8;
	this.coinDisplayAnimation.scaleY = 2;
	this.coinDisplayAnimation.gotoAndPlay("flash");
	
	this.addChild(this.coinDisplayAnimation);	
	this.addChild(this.nameText);
	this.addChild(this.worldNameText);
	this.addChild(this.TimerNameText);
	this.addChild(this.scoreText);
	this.addChild(this.worldText);
	this.addChild(this.coinText);
	this.addChild(this.timerText);
	this.addChild(this.GameOverText);
	this.addChild(this.resetText);
	
	this.world(1);
}

HUD.prototype.findLength = function( number ){
	if(number>=100000) return 6;
    if(number>=10000) return 5;
    if(number>=1000) return 4;
    if(number>=100) return 3;
    if(number>=10) return 2;
    return 1;
};

HUD.prototype.score = function( score ){
	this.scoreText.text = "";
	
	if ( this.findLength(score) < 6 ){
		for( var i = 6; i > this.findLength(score) ; i--){
			this.scoreText.text += "0";
		}
	}
	
	this.scoreText.text += Math.floor(score);
};

HUD.prototype.world = function( world ){
	this.worldText.text = "   1-1";
};

HUD.prototype.coin = function( coin ){
	this.coinText.text = "x";
	
	if ( this.findLength(coin) < 2 ){
		for( var i = 2; i > this.findLength(coin) ; i--){
			this.coinText.text += "0";
		}
	}
	
	this.coinText.text += Math.floor(coin);
};

HUD.prototype.timer = function( timer ){

	this.timerText.text = " ";
	
	if ( this.findLength(timer) < 3 ){
		for( var i = 3; i > this.findLength(timer) ; i--){
			this.timerText.text += "0";
		}
	}
	
	this.timerText.text += Math.floor(timer);
};

HUD.prototype.update = function( timer, score, coin){
	this.timer(timer);
	this.score(score);
	this.coin(coin);
};

HUD.prototype.ShowGameOver = function(){
	this.GameOverText.visible = true;
	this.resetText.visible = true;
};

HUD.prototype.reset = function(){
	this.GameOverText.visible = false;
	this.resetText.visible = false;
};

