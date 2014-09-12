/**
 * @ constructor
 * */
function GameClass(stage, imgContainer){

    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.jpg"]);
	this.floorTile = [];
	
	this.tempY = 500;
	this.tempX = 10;
	for(var  i = 0; i < 9; i++ ){
		for(var  j = 0; j < 9; j++ ){
			this.floorTile.push(new circleClass( j  * 65 + this.tempX,this.tempY, (i * 9) + j ));
		}
		if( i % 2 == 0 ){
			this.tempX  = 40;
		}
		else{
			this.tempX  = 10;
		}
		
		this.tempY  += 60;
	}
	this.numberOfColorTileAtStart =   Math.floor(Util.RandomRange(5,15));
	
	 for(var i = 0; i < this.numberOfColorTileAtStart; i++){
		 this.temp =  Math.floor(Util.RandomRange(0,80));
		 if( this.temp >= 36 &&  this.temp <= 44){
			this.temp +=10;
		 }
		if(!this.floorTile[this.temp].click){
		 this.floorTile[this.temp].changeColor();
		 }
	 }
	this.stage_.addEventListener('mousedown', Delegate.create(this,this.onMouseClick));
};
/**
 * @ tick
 * */
GameClass.prototype.tick = function(event) {
};
/**
 * @ checkGameOver
 * */
GameClass.prototype.checkGameOver = function(){
};
/**
 * @ loadImage
 * */
GameClass.prototype.loadImage = function() {
    	this.stage_.addChild(this.bg);
		for(var i =0; i < this.floorTile.length; i++)
		{
			this.stage_.addChild(this.floorTile[i]);
		}
};
/**
 * @ reset
 * */
GameClass.prototype.reset = function() {
};
/**
 * @ restart
 * */
GameClass.prototype.restart = function(e) {
	
};
/**
 * @ onMouseClick
 * */
GameClass.prototype.onMouseClick = function(e) {

	if( e.localY > 500 && e.localY < 1140){
		var tempYValue = Math.floor((e.localY - 500) / 60) ;
		for(var i = tempYValue *9; i <  tempYValue *9 + 9; i++ ){
			if( Util.collision(this.floorTile[i].x + this.floorTile[i].getRadius() ,this.floorTile[i].y + this.floorTile[i].getRadius(), this.floorTile[i].getRadius() , e.localX ,e.localY) &&  !this.floorTile[i].click ){
				console.log("hi");
				this.floorTile[i].changeColor();
			}
		}
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