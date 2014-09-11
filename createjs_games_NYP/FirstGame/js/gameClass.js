
//TODO: Try not to leave functions on global namespace, move these to a Helper or Util class or namespace
	//circle - circle collision detition
	function collision(x,y,r,x1,y1){
        //TODO: this line can be simplified to:
        //return x1 < x + r && x1 > x - r && y1 < y + r && y1 > y - r;
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
	
	 this.Hud = new HUDClass(); 
	
	
	this.spawnEnemySprites('redobj');
	this.spawnEnemySprites('redobj');
	this.spawnEnemySprites('redobj');

		
	console.log(this.red[0]);
	this.stage_.addEventListener('mousedown', Delegate.create(this,this.onMouseClick));
	
}

GameClass.prototype.tick = function(event) {
	for(var i = 0; i < this.red.length; i++){
		this.red[i].move();
   }
   this.SpawnEnemy();

    this.Hud.update();
  // this.blue.move();
};


GameClass.prototype.loadImage = function() {
    this.stage_.addChild(this.bg);
    //this.stage_.addChild(this.blue); 
	
	
		for(var i = 0; i < this.red.length; i++){
					this.stage_.addChild(this.red[i]);
				}
	this.stage_.addChild(this.Hud);
	
	
	
	
};

GameClass.prototype.onMouseClick = function(e) {

	for(var i = 0; i < this.red.length; i++){
		if(collision(this.red[i].x + 32,this.red[i].y + 32,32, e.localX, e.localY) == true)
		{
			this.stage_.removeChild(this.red[i]);
			this.red.splice(i,1);
			this.Hud.Score += 11;
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
	}   //TODO: use ';' here to end the statement (a = function(){} counts as a statement, function a(){} is not)
	
	GameClass.prototype.spawnEnemySprites = function(type) {
		if(type == 'redobj'){
			this.red.push(new Creep(1,RandomRange( 0 ,this.stage_.dWidth_*0.5), RandomRange(0, this.stage_.dHeight_*0.4)));
		}
		else if(type == 'blueobj'){
			
		}
	}   //TODO: same here

GameClass.prototype.start = function() {
    this.loadImage();

    //this is the proper way of monitoring system tick in createjs
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};