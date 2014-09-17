/**
 * @ constructor
 * */
function Game(stage, imgContainer){

    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.jpg"]);
	this.floorTile = [];

	this.gameOver = false;
	this.isWin = false;
	this.isMainMenu = true;
	this.mainMenu = new createjs.Bitmap(imgContainer["imgs/btn_start.png"]);
	this.mainMenu.scaleX = 1.65;
	this.mainMenu.scaleY = 1.65;
	this.mainMenu.y = 130;
	this.numberOfMove = 0;
	
	this.hud = new HUD();
	this.reply = new createjs.Bitmap(imgContainer["imgs/replay.png"]);
	this.reply.scaleX = this.hud.gameOver.scaleX;
	this.reply.scaleY = this.hud.gameOver.scaleY;
	this.reply.x = this.hud.x + 340;
	this.reply.y = this.hud.y + 500;
	
	this.pathFind = new PathFinding();
	
	this.tempY = 500;
	this.tempX = 10;
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
	
	 for(var i = 0; i < this.numberOfColorTileAtStart; i++){
		 this.temp =  Math.floor(Util.RandomRange(0,80));
		 if( this.temp >= 36 &&  this.temp <= 44){
			this.temp +=10;
		 }
		if(!this.floorTile[this.temp].click){
		 this.floorTile[this.temp].changeColor();
		 }
	 }
	 
	var startTile = 40;
	this.cat = new CAT(this.floorTile[startTile].x , this.floorTile[startTile].y - this.floorTile[startTile].getRadius()*2,  startTile);
	this.mainMenu.addEventListener('mousedown', Delegate.create(this,this.startGame));
	this.reset();

};
/**
 * @ tick
 * */
Game.prototype.startGame = function(e) {
	this.isMainMenu = false;
	this.stage_.removeChild(this.mainMenu);
	this.mainMenu.removeEventListener('mouseDown');
	this.stage_.addEventListener('click', Delegate.create(this,this.onMouseClick));
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
		this.stage_.addChild(this.cat);
		this.stage_.addChild(this.hud);
		this.stage_.addChild(this.mainMenu);
};
/**
 * @ reset
 * */
Game.prototype.reset = function() {
	
	//reset floor tile
	for(var  i = 0; i < 81; i++ ){
		this.floorTile[i].reset();
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
	 
	 //reset AI
	var startTile = 40;
	this.cat.x = this.floorTile[startTile].x ;
	this.cat.y = this.floorTile[startTile].y - this.floorTile[startTile].getRadius()*2;
	this.cat.whichTile_ = startTile;
	this.cat.isWeiZhu = false;
	this.cat.changeAnimation();

	// reset path
	this.pathFind.reset();
	
	if(this.gameOver){
		this.hud.addGameOver(false);
	}
	if(this.isWin){
		this.hud.addWining(false , 0);
	}
	this.gameOver = false;
	this.isWin = false;
	this.numberOfMove = 0;
};
/**
 * @ restart
 * */
Game.prototype.restart = function(e) {
	this.hud.addGameOver(false);
	this.reply.removeEventListener('mousedown');
	this.stage_.removeChild(this.reply);
	this.stage_.addEventListener('click', Delegate.create(this,this.onMouseClick));
	this.reset();
};
/**
 * @ winLose
 * @ handel the wining and losing condition
 * @ escape OR dead
 * */
Game.prototype.winLose = function() {
	
	if(Check.outOfBound(this.cat.whichTile_)){
		this.gameOver = true;
		this.hud.addGameOver(true);
		this.stage_.addChild(this.reply);
		this.stage_.removeEventListener('click');
		this.reply.addEventListener('mousedown', Delegate.create(this,this.restart));
	}
	if(!this.isWin){
	if(this.pathFind.hiveCheck[1].value_ >= 0 && this.pathFind.hiveCheck[1].value_ < 81){
			if(this.floorTile[this.pathFind.hiveCheck[1].value_].click && this.floorTile[this.pathFind.hiveCheck[2].value_].click && 
			this.floorTile[this.pathFind.hiveCheck[3].value_].click && this.floorTile[this.pathFind.hiveCheck[4].value_].click &&
			this.floorTile[this.pathFind.hiveCheck[5].value_].click && this.floorTile[this.pathFind.hiveCheck[6].value_].click){
				this.isWin = true;
				this.hud.addWining(true , this.numberOfMove);
				this.stage_.addChild(this.reply);
				this.stage_.removeEventListener('click');
				this.reply.addEventListener('mousedown', Delegate.create(this,this.restart));
			}
		}
	}
 };
 /**
 * @ compare
 * */
 Game.prototype.getSmallerValue = function(value) {
	if(this.smallestValue == 0){
		this.smallestValue = value;
	}
	
	if(value < this.smallestValue){
		this.smallestValue = value;
	}
 };
/**
 * @ onMouseClick
 * */
Game.prototype.onMouseClick = function(e) {
	/**
	 * @ tile change color
	 * check the range of all the tile
	 * find the column array position 
	 * check whether it click before
	 * else change the color of the tile
	 * */
	if( e.localY > 500 && e.localY < 1140 && !this.gameOver && !this.isMainMenu && !this.isWin){
		var tempYValue = Math.floor((e.localY - 500) / 60) ;
		for(var i = tempYValue *9; i <  tempYValue *9 + 9; i++ ){
			if( Util.collision(this.floorTile[i].x + this.floorTile[i].getRadius() ,this.floorTile[i].y + this.floorTile[i].getRadius(), this.floorTile[i].getRadius() , e.localX ,e.localY) &&  !this.floorTile[i].click ){
				this.numberOfMove +=1;
				this.floorTile[i].changeColor();
		
				//find the cat which row is on
				this.catWhichRow = Math.floor((this.cat.y + this.floorTile[40].getRadius()*2 - 500) / 60) ;
				
				
				this.pathFind.hiveUpdate(this.cat.whichTile_ , this.catWhichRow);	
				
				this.winLose();
				
				 
				if(!this.cat.isWeiZhu && !this.gameOver ){
					this.pathFind.floorTile = this.floorTile.slice();
					// decision to move
					this.pathFind.checkPathFind(this.cat.whichTile_ , this.catWhichRow);
					
					// check if cat is weizhu
					if(this.pathFind.pathCalculationCount == 0){
						this.cat.isWeiZhu = true;
						this.cat.changeAnimation();
					}
					
					this.smallestValue = 0;
					// compare path
					for( var i = 0 ; i < this.pathFind.pathCalculationArray.length ; i ++){
						if(!this.pathFind.pathCalculationArray[i].alive){
							this.getSmallerValue(this.pathFind.pathCalculationArray[i].value_ );
						}
					}
					
					this.floorTile = this.pathFind.floorTile ;
					
					for( var i = 0 ; i < this.pathFind.pathCalculationArray.length ; i ++){
						if( this.smallestValue == this.pathFind.pathCalculationArray[i].value_ ){
							this.moveDecision(this.pathFind.catPathArray[this.pathFind.pathCalculationArray[i].row_].value_[1]);
							break;
						}
					}
					
					this.pathFind.reset();
					
				}else{
					if(!this.gameOver && !this.isWin){
						if(!this.floorTile[this.pathFind.hiveCheck[1].value_].click){
							this.moveTopLeft();
						}else if(!this.floorTile[this.pathFind.hiveCheck[2].value_].click){
							this.moveTopRight();
						}else if(!this.floorTile[this.pathFind.hiveCheck[3].value_].click){
							this.moveLeft();
						}else if(!this.floorTile[this.pathFind.hiveCheck[4].value_].click){
							this.moveRight();
						}else if(!this.floorTile[this.pathFind.hiveCheck[5].value_].click){
							this.moveBottomLeft();
						}else
							this.moveBottomRight();
					}
				}
			}
		}
	}
};
/**
 * @ moveDecision
 * decide which direction to move
 * base on the value pass in
 * compare it with the cat position
 * with the hive
 * */
Game.prototype.moveDecision = function(desination){
	if(this.pathFind.hiveCheck[1].value_ == desination){
		this.moveTopLeft();
	}else if(this.pathFind.hiveCheck[2].value_ == desination){
		this.moveTopRight();
	}else if(this.pathFind.hiveCheck[3].value_ == desination){
		this.moveLeft();
	}else if(this.pathFind.hiveCheck[4].value_ == desination){
		this.moveRight();
	}else if(this.pathFind.hiveCheck[5].value_ == desination){
		this.moveBottomLeft();
	}else if(this.pathFind.hiveCheck[6].value_ == desination){
		this.moveBottomRight();
	}
};
/**
 * @ movement
 * find the cat at which row,
 * decide how much to add or minus depend on row
 * moveLeft() & moveRight() does not affected
 * */
Game.prototype.moveTopLeft = function(){
	if(this.catWhichRow % 2 == 0){
		if(  this.cat.whichTile_ -10 > 0 && this.cat.whichTile_  !=  this.catWhichRow * 9 ){
			this.cat.x = this.floorTile[this.cat.whichTile_ -10].x;
			this.cat.y = this.floorTile[this.cat.whichTile_ -10].y - this.floorTile[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ - 10;
		}
	}
	else{
		if( this.cat.whichTile_ -9 > 0 ){
			this.cat.x = this.floorTile[this.cat.whichTile_ -9].x;
			this.cat.y = this.floorTile[this.cat.whichTile_ - 9].y - this.floorTile[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ -9;
		}
	}
};

Game.prototype.moveTopRight = function(){
	if(this.catWhichRow % 2 == 0){
		if(  this.cat.whichTile_ - 9 > 0 ){
			this.cat.x = this.floorTile[this.cat.whichTile_ - 9].x;
			this.cat.y = this.floorTile[this.cat.whichTile_ - 9].y - this.floorTile[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ - 9;
		}
	}
	else{
		if( this.cat.whichTile_ -8 > 0 &&  this.cat.whichTile_  !=  this.catWhichRow * 9 + 8){
			this.cat.x = this.floorTile[this.cat.whichTile_ -8].x;
			this.cat.y = this.floorTile[this.cat.whichTile_ - 8].y - this.floorTile[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ -8;
		}
	}
};

Game.prototype.moveLeft = function(){
	if( this.cat.whichTile_ -1 >= this.catWhichRow*9 ){
		this.cat.x = this.floorTile[this.cat.whichTile_ -1].x;
		this.cat.whichTile_ = this.cat.whichTile_ -1;
	}
};

Game.prototype.moveRight = function(){
	if( this.cat.whichTile_ + 1 <= this.catWhichRow*9 + 8 ){
		this.cat.x = this.floorTile[this.cat.whichTile_ +1].x;
		this.cat.whichTile_ = this.cat.whichTile_ +1;
	}
};

Game.prototype.moveBottomLeft = function(){
	if(this.catWhichRow % 2 == 0){
		if(  this.cat.whichTile_ + 8 < 80 && this.cat.whichTile_  !=  this.catWhichRow * 9 ){
			this.cat.x = this.floorTile[this.cat.whichTile_ + 8].x;
			this.cat.y = this.floorTile[this.cat.whichTile_ + 8].y - this.floorTile[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ +8;
		}
	}
	else{
		if( this.cat.whichTile_ + 9 < 80 ){
			this.cat.x = this.floorTile[this.cat.whichTile_  + 9].x;
			this.cat.y = this.floorTile[this.cat.whichTile_ + 9].y - this.floorTile[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ +9;
		}
	}
};
Game.prototype.moveBottomRight = function(){
	if(this.catWhichRow % 2 == 0){
		if( this.cat.whichTile_ + 9 < 80  ){
			this.cat.x = this.floorTile[this.cat.whichTile_ + 9].x;
			this.cat.y = this.floorTile[this.cat.whichTile_ + 9].y - this.floorTile[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ + 9;
		}
	}
	else{
		if( this.cat.whichTile_ + 10 < 80 &&  this.cat.whichTile_  !=  this.catWhichRow * 9 + 8 ){
			this.cat.x = this.floorTile[this.cat.whichTile_ + 10].x;
			this.cat.y = this.floorTile[this.cat.whichTile_ + 10].y - this.floorTile[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ + 10;
		}
	}
};
/**
 * @ start
 * */
Game.prototype.start = function() {
	this.loadImage();
};