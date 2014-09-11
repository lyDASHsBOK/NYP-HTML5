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
	
	this.gameOverText = new createjs.Text("GameOver", "30pt Calibri" ,"Black"); 
	this.gameOverText.x = this.stage_.dWidth_ * 0.3;
	this.gameOverText.y = this.stage_.dHeight_ * 0.2;
	
	console.log(this.red[0]);
	this.stage_.addEventListener('mousedown', Delegate.create(this,this.onMouseClick));
}
/**
 * @ tick
 * */
GameClass.prototype.tick = function(event) {
	if(this.gameOver  == false)
	{
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
};
/**
 * @ checkGameOver
 * */
GameClass.prototype.checkGameOver = function(){
	for(var i = 0; i < this.red.length; i++){
		if(this.red[i].x  >= this.stage_.dWidth_)
		{
			this.gameOver = true;
			this.stage_.addChild(this.gameOverText);
			this.gameOverText.addEventListener('mousedown', Delegate.create(this,this.restart));
			break;
		}
	}
	//By any chance if bot red and blue reach the gamve over line this check it to 
	//make sure that it will no add the gameOverText again
	if(this.gameOver == false)
	{
		for(var i = 0; i < this.blue.length; i++){
			if(this.blue[i].x > this.stage_.dWidth_)
			{
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
   
   this.stage_.addChild(this.bg);
	
	for(var i = 0; i < this.red.length; i++){
		this.stage_.addChild(this.red[i]);
	}
	
	this.stage_.addChild(this.hud);
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

	if(this.gameOver == false)
	{
		for(var i = 0; i < this.red.length; i++){
			if(collision(this.red[i].x + 32,this.red[i].y + 32,32, e.localX, e.localY) == true)
			{
				this.stage_.removeChild(this.red[i]);
				this.red.splice(i,1);
				this.hud.score += 11;
				createjs.Sound.play("pop");
				break;
			}
		}
		
		for(var i = 0; i < this.blue.length; i++){
			if(collision(this.blue[i].x + 32,this.blue[i].y + 32,32, e.localX, e.localY) == true)
			{
				this.stage_.removeChild(this.blue[i]);
				this.blue.splice(i,1);
				this.hud.score += 11;
				createjs.Sound.play("pop");
				break;
			}
		}
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
		if(this.blue.length < this.maxNumberOfBlueEnemy && this.spawn  == true){
			this.spawnEnemySprites('blueobj');
		}
	}
	//spawn the enemy
	if(this.spawn == true){
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
		this.red.push(new Creep(1+this.hud.level*0.03,RandomRange( 0 ,this.stage_.dWidth_*0.3), RandomRange(0, this.stage_.dHeight_*0.4)));
	}
	else if(type == 'blueobj'){
		this.blue.push(new BlueCreep(1.5+this.hud.level*0.02,RandomRange( 0 ,this.stage_.dWidth_*0.3), RandomRange(0, this.stage_.dHeight_*0.4)));
	}
}; 
/**
 * @ start
 * */
GameClass.prototype.start = function() {
    this.loadImage();
    //this is the proper way of monitoring system tick in createjs
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};