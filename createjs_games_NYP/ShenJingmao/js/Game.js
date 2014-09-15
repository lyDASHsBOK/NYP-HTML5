/**
 * @ constructor
 * */
function Game(stage, imgContainer){

    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.jpg"]);
	this.floorTile = [];
	

	this.tempY = 500;
	this.tempX = 10;
	
	this.topRightValue = [];
	this.topLeftValue = [];	
	this.LeftValue = [];
	this.RightValue = [];
	this.bottomRightValue  = [];
	this.bottomLeftValue = [];
	
	for(var  i = 0; i < 9; i++ ){
		for(var  j = 0; j < 9; j++ ){
			this.floorTile.push(new Circle( j  * 65 + this.tempX,this.tempY, (i * 9) + j ));
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
	
	 /*for(var i = 0; i < this.numberOfColorTileAtStart; i++){
		 this.temp =  Math.floor(Util.RandomRange(0,80));
		 if( this.temp >= 36 &&  this.temp <= 44){
			this.temp +=10;
		 }
		if(!this.floorTile[this.temp].click){
		 this.floorTile[this.temp].changeColor();
		 }
	 }*/
	 
	 var startTile = 40;
	this.ai = new AI(this.floorTile[startTile].x , this.floorTile[startTile].y - this.floorTile[startTile].getRadius()*2,  startTile);
	this.stage_.addEventListener('mousedown', Delegate.create(this,this.onMouseClick));
};
/**
 * @ tick
 * */
Game.prototype.tick = function(event) {
};
/**
 * @ checkGameOver
 * */
Game.prototype.checkGameOver = function(){
};
/**
 * @ loadImage
 * */
Game.prototype.loadImage = function() {
    	this.stage_.addChild(this.bg);
		for(var i =0; i < this.floorTile.length; i++)
		{
			this.stage_.addChild(this.floorTile[i]);
		}
		this.stage_.addChild(this.ai);
};
/**
 * @ reset
 * */
Game.prototype.reset = function() {
};
/**
 * @ restart
 * */
Game.prototype.restart = function(e) {
	
};
/**
 * @ onMouseClick
 * */
Game.prototype.onMouseClick = function(e) {

	if( e.localY > 500 && e.localY < 1140){
		var tempYValue = Math.floor((e.localY - 500) / 60) ;
		for(var i = tempYValue *9; i <  tempYValue *9 + 9; i++ ){
			if( Util.collision(this.floorTile[i].x + this.floorTile[i].getRadius() ,this.floorTile[i].y + this.floorTile[i].getRadius(), this.floorTile[i].getRadius() , e.localX ,e.localY) &&  !this.floorTile[i].click ){
				
				this.floorTile[i].changeColor();
			}
		}
	}
	
	this.aiWhichRow = Math.floor((this.ai.y + this.floorTile[40].getRadius()*2 - 500) / 60) ;
	
	
	if( e.localY < 500){
		this.checkLeft();
	}
	/*
	//left movement
	if( this.ai.whichTile_ -1 >= this.aiWhichRow*9 &&  !this.floorTile[this.ai.whichTile_ -1].click ){
		this.ai.x = this.floorTile[this.ai.whichTile_ -1].x;
		this.ai.whichTile_ = this.ai.whichTile_ -1;
	}
	
	//right movement
	
	if( this.ai.whichTile_ + 1 <= this.aiWhichRow*9 + 8 && !this.floorTile[this.ai.whichTile_  + 1].click ){
		this.ai.x = this.floorTile[this.ai.whichTile_ +1].x;
		this.ai.whichTile_ = this.ai.whichTile_ +1;
	}
	
	//topLeft

	if(this.aiWhichRow % 2 == 0){
		if(  this.ai.whichTile_ -10 > 0 && this.ai.whichTile_  !=  this.aiWhichRow * 9 &&  !this.floorTile[this.ai.whichTile_  - 10 ].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ -10].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ -10].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ - 10;
		}
	}
	else{
		if( this.ai.whichTile_ -9 > 0 && !this.floorTile[this.ai.whichTile_ - 9].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ -9].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ - 9].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ -9;
		}
	}
	
	// top right
	
	
	if(this.aiWhichRow % 2 == 0){
		if(  this.ai.whichTile_ - 9 > 0 &&  !this.floorTile[this.ai.whichTile_  - 9 ].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ - 9].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ - 9].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ - 9;
		}
	}
	else{
		if( this.ai.whichTile_ -8 > 0 &&  this.ai.whichTile_  !=  this.aiWhichRow * 9 + 8 && !this.floorTile[this.ai.whichTile_ - 8].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ -8].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ - 8].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ -8;
		}
	}
	
	//left bottom
	
	if(this.aiWhichRow % 2 == 0){
		if(  this.ai.whichTile_ + 8 < 80 && this.ai.whichTile_  !=  this.aiWhichRow * 9 &&  !this.floorTile[this.ai.whichTile_  + 8 ].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ + 8].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ + 8].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ +8;
		}
	}
	else{
		if( this.ai.whichTile_ + 9 < 80 && !this.floorTile[this.ai.whichTile_ + 9].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_  + 9].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ + 9].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ +9;
		}
	}
		
	
	//right bottom
	if(this.aiWhichRow % 2 == 0){
		if(  this.ai.whichTile_ + 9 < 80 &&  !this.floorTile[this.ai.whichTile_  + 9 ].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ + 9].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ + 9].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ + 9;
		}
	}
	else{
		if( this.ai.whichTile_ + 10 < 80 &&  this.ai.whichTile_  !=  this.aiWhichRow * 9 + 8 && !this.floorTile[this.ai.whichTile_ + 10].click ){
			this.ai.x = this.floorTile[this.ai.whichTile_ + 10].x;
			this.ai.y = this.floorTile[this.ai.whichTile_ + 10].y - this.floorTile[40].getRadius()*2;
			this.ai.whichTile_ = this.ai.whichTile_ + 10;
		}
	}
	*/
};
Game.prototype.checkLeft = function(){
	

	

	
	this.aiWhichRow = Math.floor((this.ai.y + this.floorTile[40].getRadius()*2 - 500) / 60) ;
	
	this.checkLeftValue(this.ai.whichTile_);
	this.checkBottomRightValue(this.ai.whichTile_);
	this.checkBottomLeftValue(this.ai.whichTile_);
	this.checkRightValue(this.ai.whichTile_);
	this.checkTopRightValue(this.ai.whichTile_);
	this.checkTopLeftValue(this.ai.whichTile_);
	
	if(Math.floor(this.topRightValue[this.topRightValue.length-1] / 9) ==  Math.floor(this.topLeftValue[this.topLeftValue.length -1] / 9 )  ){
			for(var i = this.topLeftValue[this.topLeftValue.length-1] + 1; i < this.topRightValue[this.topRightValue.length-1]; i ++){
				if(this.floorTile[i].click){
					this.floorTile[i].DebugTextShow();
				}
			}
	}
	
		if(Math.floor(this.bottomLeftValue[this.bottomLeftValue.length-1] / 9) ==  Math.floor(this.bottomRightValue[this.bottomRightValue.length -1] / 9 )  ){
			for(var i = this.bottomLeftValue[this.topLeftValue.length-1] + 1; i < this.bottomRightValue[this.topRightValue.length-1]; i ++){
				if(this.floorTile[i].click){
					this.floorTile[i].DebugTextShow();
				}
			}
	}
	
	var tempY = Math.floor(this.LeftValue[this.LeftValue.length-1] / 9)  - Math.floor(this.topLeftValue[this.topLeftValue.length-1] / 9);
	var tempX = this.topLeftValue[this.topLeftValue.length-1] % 9 -  this.LeftValue[this.LeftValue.length] & 9;
	
	var temp = this.LeftValue[this.LeftValue.length-1];
	console.log(tempY);
	while (tempY > -1 ){
		
		if(this.floorTile[temp].click){
			this.floorTile[temp].DebugTextShow();
		}
		if(Math.floor( temp  / 9) % 2 == 0){
			temp -= 9;
		}
		else{
			temp -= 8;
		}
		
		tempY--;
	}
	
	for(var i  = temp; i < tempX; i ++){
		if(this.floorTile[i].click){
			this.floorTile[i].DebugTextShow();
		}
	}
	

};



Game.prototype.checkTopRightValue = function(temp){
	//this.topRightValue = [];	
	while (temp >  -1){
		if(this.floorTile[temp].click){
			this.floorTile[temp].DebugTextShow();
			this.topRightValue.push(temp);
		}
		if(Math.floor( temp  / 9) % 2 == 0){
			temp -= 9;
		}
		else{
			temp -= 8;
		}
	}
		
	if(this.topRightValue.length > 0){
		return true;
	}
	else{
		return false;
	}
}


Game.prototype.checkTopLeftValue = function(temp){
	//this.topLeftValue = [];	
	while (temp >  -1){
		if(this.floorTile[temp].click){
			this.floorTile[temp].DebugTextShow();
			this.topLeftValue.push(temp);
		}
		if(Math.floor( temp  / 9) % 2 == 0){
			temp -= 10;
		}
		else{
			temp -= 9;
		}
	}
		
	if(this.topLeftValue.length > 0){
		return true;
	}
	else{
		return false;
	}
}

Game.prototype.checkLeftValue = function(temp){
	//this.LeftValue = [];	
	for(var j = temp ; j > Math.floor( temp  / 9) * 9 -1 ; j--){
			if(this.floorTile[j].click){
			this.floorTile[j].DebugTextShow();
			this.LeftValue.push(j);
		}
	}
};

Game.prototype.checkRightValue = function(temp){
	//this.RightValue = [];
	
	for(var k = temp ; k <  Math.floor( temp  / 9) * 9 + 9; k++){
			if(this.floorTile[k].click){
				this.floorTile[k].DebugTextShow();
				this.RightValue.push(k);
			}
	}
};

Game.prototype.checkBottomRightValue = function(temp){
		//this.bottomRightValue = [];
		while (temp < 81){
		if(this.floorTile[temp].click){
			this.floorTile[temp].DebugTextShow();
			this.bottomRightValue.push(temp);
		}
		if(Math.floor( temp  / 9) % 2 == 0){
			temp += 9;
		}
		else{
			temp += 10;
		}
	}
};

Game.prototype.checkBottomLeftValue = function(temp){
	//this.bottomLeftValue = [];
	while (temp < 81){
		if(this.floorTile[temp].click){
			this.floorTile[temp].DebugTextShow();
			this.bottomLeftValue.push(temp);
		}
		if(Math.floor( temp  / 9) % 2 == 0){
			temp += 8;
		}
		else{
			temp += 9;
		}
	}
};



/**
 * @ start
 * */
Game.prototype.start = function() {

  
	this.loadImage();
    //this is the proper way of monitoring system tick in createjs
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};