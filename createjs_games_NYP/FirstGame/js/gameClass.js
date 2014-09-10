
	//circle - circle collision detition
	function collision(x,y,r,x1,y1){
		if( x1 < x+r && x1 > x-r && y1 < y+r && y1 > y-r){
			return true;
		}
		return false;
	}
	
	//randomFunction
	function RandomRange(min,max){
		var range = ( max - min ) + 1;
		return (Math.random() * range ) + min;
	}


function GameClass(stage, imgContainer)
{
	
	console.log("hi!");
    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.png"]);
	this.spawn = false;
	this.red = [];
	this.maxNumberOfEnemy = 3;
	//this.blue = new BlueCreep(2,0,150);
	
	var ScoreText = new createjs.Text("Score:", "18pt Calibri" ,"Black"); 
	
	
	this.spawnEnemySprites('redobj');
	this.spawnEnemySprites('redobj');
	this.spawnEnemySprites('redobj');

	this.stage_.addEventListener('mousedown', Delegate.create(this,this.onMouseClick));
	
	
}

GameClass.prototype.tick = function(event) {
	for(var i = 0; i < this.red.length; i++){
		this.red[i].move();
   }
   this.SpawnEnemy();
  // this.blue.move();
};


GameClass.prototype.loadImage = function() {
    this.stage_.addChild(this.bg);
    //this.stage_.addChild(this.blue); 
	
	
		for(var i = 0; i < this.red.length; i++){
					this.stage_.addChild(this.red[i]);
				}
	this.stage_.addChild(this.ScoreText);
	
	
	
	
};

GameClass.prototype.onMouseClick = function(e) {

	for(var i = 0; i < this.red.length; i++){
		if(collision(this.red[i].x + 32,this.red[i].y + 32,32, e.localX, e.localY) == true)
		{
			this.stage_.removeChild(this.red[i]);
			this.red.splice(i,1);
			break;
		}
	}
};

//this function use to Spawn the Enemy
GameClass.prototype.SpawnEnemy = function(){
		
		if(this.red.length === 0 ){
			this.spawn = true;
		}
		
		if(this.spawn == true){
			if(this.red.length < this.maxNumberOfEnemy){
				this.spawnEnemySprites('redobj');
			}
			
			else{
				console.log("hi!");
				for(var i = 0; i < this.red.length; i++){
					this.stage_.addChild(this.red[i]);
				}
				
				this.spawn = false;
			}
		}
	}
	
	GameClass.prototype.spawnEnemySprites = function(type) {
		if(type == 'redobj'){
			this.red.push(new Creep(1,RandomRange( 0 ,this.stage_.dWidth_*0.5), RandomRange(0, this.stage_.dHeight_*0.4)));
		}
		else if(type == 'blueobj'){
			
		}
	}

GameClass.prototype.start = function() {
    this.loadImage();

    //this is the proper way of monitoring system tick in createjs
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};