/**
 * @ constructor
 * */
function GameClass(stage, imgContainer){

	createjs.Sound.play("bgm",0,0,0,-1,1,0);
    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.png"]);
	this.spawn = false;
	this.red = [];
	this.maxNumberOfEnemy = 3;
	this.maxNumberOfBlueEnemy = 1;
	this.blue = [];
	this.gameOver = false;
	
	this.hud = new HUDClass(); 
	
	
	this.spawnEnemySprites('redobj');
	this.spawnEnemySprites('redobj');
	this.spawnEnemySprites('redobj');
	
	this.gameOverText = new createjs.Bitmap(imgContainer["imgs/gameOver.png"]); 
	this.gameOverText.x = this.stage_.dWidth_ * 0.4;
	this.gameOverText.y = this.stage_.dHeight_ * 0.2;
	this.gameOverText.scaleX = 0.5;
	this.gameOverText.scaleY = 0.5;
	
	this.isMainMenu = true;
	
	this.mainMenuText = new createjs.Text("Click anywhere to start the game", "20pt Calibri" ,"Black"); 
	this.mainMenuText.x = this.stage_.dWidth_ * 0.2;
	this.mainMenuText.y = this.stage_.dHeight_ * 0.2;
	this.alphaText = true;
	
	console.log(this.red[0]);
	this.stage_.addEventListener('mousedown', Delegate.create(this,this.onMouseClick));
}
/**
 * @ flashText
 * */
GameClass.prototype.flashText = function(){
	
	if( this.alphaText){
		if(this.mainMenuText.alpha > 0){
			this.mainMenuText.alpha -= 0.02;
		}
		else
		{
			this.alphaText = false;
		}
	}
	else if(!this.alphaText){
		if(this.mainMenuText.alpha < 1){
			this.mainMenuText.alpha += 0.02;
		}
		else{
			this.alphaText = true;
		}
	}
	
};
/**
 * @ tick
 * */
GameClass.prototype.tick = function(event) {
	if(!this.gameOver && !this.isMainMenu){
		for(var i = 0; i < this.red.length; i++){
			this.red[i].move();
		}
		for(var i = 0; i < this.blue.length; i++){
			this.blue[i].move();
		}
		this.spawnEnemy();
		this.hud.update();
		this.checkGameOver();
	}
	else{
		this.flashText();
	}
};
/**
 * @ checkGameOver
 * */
GameClass.prototype.checkGameOver = function(){
	for(var i = 0; i < this.red.length; i++){
		if(this.red[i].x  >= this.stage_.dWidth_){
			this.gameOver = true;
			this.stage_.addChild(this.gameOverText);
			this.gameOverText.addEventListener('mousedown', Delegate.create(this,this.restart));
			break;
		}
	}
	//By any chance if bot red and blue reach the gamve over line this check it to 
	//make sure that it will no add the gameOverText again
	if(!this.gameOver){
		for(var i = 0; i < this.blue.length; i++){
			if(this.blue[i].x > this.stage_.dWidth_){
				this.gameOver = true;
				this.stage_.addChild(this.gameOverText);
				this.gameOverText.addEventListener('mousedown', Delegate.create(this,this.restart));
				break;
			}
		}
	}
	
};
/**
 * @ loadImage
 * */
GameClass.prototype.loadImage = function() {
   
	if(!this.isMainMenu){
		for(var i = 0; i < this.red.length; i++){
			this.stage_.addChild(this.red[i]);
		}
		this.stage_.addChild(this.hud);
	}
	else{
		this.stage_.addChild(this.mainMenuText);
	}
};
/**
 * @ reset
 * */
GameClass.prototype.reset = function() {

	for(var i = 0; i < this.red.length; i++){
		this.stage_.removeChild(this.red[i]);
	}
	for(var i = 0; i < this.blue.length; i++){
		this.stage_.removeChild(this.blue[i]);
	}
	
	this.spawn = false;
	this.red = [];
	this.maxNumberOfEnemy = 3;
	this.maxNumberOfBlueEnemy = 1;
	this.blue = [];
	this.gameOver = false;
	
	this.spawnEnemySprites('redobj');
	this.spawnEnemySprites('redobj');
	this.spawnEnemySprites('redobj');
	
	for(var i = 0; i < this.red.length; i++){
		this.stage_.addChild(this.red[i]);
	}
	this.hud.reset();
}
/**
 * @ restart
 * */
GameClass.prototype.restart = function(e) {
	console.log("hi!");
	this.reset();
	this.stage_.removeChild(this.gameOverText);
	
}
/**
 * @ onMouseClick
 * */
GameClass.prototype.onMouseClick = function(e) {

	console.log("click");
	if(!this.gameOver && !this.isMainMenu){
		for(var i = 0; i < this.red.length; i++){
			if(Util.collision(this.red[i].x + 32,this.red[i].y + 32,32, e.localX, e.localY)){
				this.stage_.removeChild(this.red[i]);
				this.red.splice(i,1);
				this.hud.score += 11;
				createjs.Sound.play("pop");
				break;
			}
		}
		
		for(var i = 0; i < this.blue.length; i++){
			if(Util.collision(this.blue[i].x + 32,this.blue[i].y + 32,32, e.localX, e.localY)){
				this.stage_.removeChild(this.blue[i]);
				this.blue.splice(i,1);
				this.hud.score += 11;
				createjs.Sound.play("pop");
				break;
			}
		}
	}
	else{
		this.isMainMenu = false;
		this.loadImage();
		this.stage_.removeChild(this.mainMenuText);
	}
	
};
/**
 * @ onMouseClick
 *this function use to Spawn the Enemy
 * */
//
GameClass.prototype.spawnEnemy = function(){
		
	if(this.red.length === 0 && this.blue.length ==0){
		this.spawn = true;
	}
	if(this.hud.level % 5 == 0 && this.hud.level != 0){
		if(this.blue.length < this.maxNumberOfBlueEnemy && this.spawn){
			this.spawnEnemySprites('blueobj');
		}
	}
	//spawn the enemy
	if(this.spawn){
		if(this.red.length < this.maxNumberOfEnemy){
			this.spawnEnemySprites('redobj');
		}
		else{
			for(var i = 0; i < this.red.length; i++){
				this.stage_.addChild(this.red[i]);
			}
			for(var i = 0; i < this.blue.length; i++){
				this.stage_.addChild(this.blue[i]);
			}
			this.spawn = false;
		}
	}
	//spawn one more red enemy in every five level
	if(this.hud.level % 5 == 0 && this.hud.score % 10 == 0  && this.hud.level != 0 ){
		this.maxNumberOfEnemy++;
		if(this.hud.level % 10 == 0 ){
			this.maxNumberOfBlueEnemy++;
		}
		this.hud.score++;
	}
}; 
/**
 * @ spawnEnemySprites
 * */	
GameClass.prototype.spawnEnemySprites = function(type) {
	if(type == 'redobj'){
		this.red.push(new Creep(1+this.hud.level*0.03,Util.RandomRange( 0 ,this.stage_.dWidth_*0.3), Util.RandomRange(0, this.stage_.dHeight_*0.5)));
	}
	else if(type == 'blueobj'){
		this.blue.push(new BlueCreep(1.5+this.hud.level*0.02,Util.RandomRange( 0 ,this.stage_.dWidth_*0.3), Util.RandomRange(0, this.stage_.dHeight_*0.5)));
	}
}; 
/**
 * @ start
 * */
GameClass.prototype.start = function() {

   	this.stage_.addChild(this.bg);
	this.loadImage();
    //this is the proper way of monitoring system tick in createjs
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};
