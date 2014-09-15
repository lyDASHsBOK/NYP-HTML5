/**
 * @ constructor
 * */
function Game(stage, imgContainer){

    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.jpg"]);
	this.floorTile = [];
	this.hiveCheck = [];
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
	
	//check cat path
	this.catPathArray = [];
	this.catPathAmount = 1;
	this.catPathArray.push( new Path() );
	
	//calculation of shortest path
	this.pathCalculationArray = [];
	this.pathCalculationCount = 0;
	for( var i = 0; i < 6; i ++){
		this.pathCalculationArray.push(new Hive(0,0));
	}
	this.smallestValue = 0;
	
	//hive
	for( var i = 0; i < 7; i ++){
		this.hiveCheck.push(new Hive(0,0));
	}
	
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
	for( var i = 1 ; i < this.catPathArray.length ; i ++){
		this.tempLength = this.catPathArray[i].value_.length;
		for( var j = 0 ; j < this.tempLength ; j ++){
			this.catPathArray[i].value_.pop();
		}
		this.catPathArray.pop();
	}	
	this.catPathAmount = 1;
	
	// reset calculation
	for( var i = 0 ; i < this.pathCalculationArray.length ; i ++){
		this.pathCalculationArray[i].value_ = 0;
		this.pathCalculationArray[i].row_ = 0;
		this.pathCalculationArray[i].alive = true;
	}
	
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
 * @ hiveUpdate
 * take the cat position and row
 * set the value of hive depend on the row
 * 0-origin 1-topleft 2-topright 3-left 4-right 5-botleft 6-botright
 * */
Game.prototype.hiveUpdate = function(pos){

	if(this.catWhichRow % 2 == 0){
		this.hiveCheck[1].value_ = pos-10;	
		this.hiveCheck[2].value_ = pos-9;	
		this.hiveCheck[5].value_ = pos+8;		
		this.hiveCheck[6].value_ = pos+9;
	}
	else{
		this.hiveCheck[1].value_ = pos-9;		
		this.hiveCheck[2].value_ = pos-8;		
		this.hiveCheck[5].value_ = pos+9;		
		this.hiveCheck[6].value_ = pos+10;
	}
	this.hiveCheck[0].value_ = pos;
	this.hiveCheck[3].value_ = pos-1;
	this.hiveCheck[4].value_ = pos+1;
};


/**
 * @ outOfBound
 * check whether the cat is escaped
 * return ture if is escaped
 * else return false
 * */
Game.prototype.outOfBound = function(number) {
	if( number >= 0 && number <= 8){
		return true;
	}
	if( number >= 72 && number <= 80){
		return true;
	}
	for(var i = 0; i < 9; i++){
		if( number == i*9){
			return true;
		}
	}
	for(var i = 0; i < 9; i++){
		if( number == i*9+8){
			return true;
		}
	}
		
	return false;
};


 /**
 * @ checkMovement
 * recursion function to keep looping 
 * return back when escaped
 * check the row to decide how much to minus
 * if the tile to move is colored 
 * go to next function depend on the initial direction path
 * else set the tile has moved so we wont move back again
 * push the tile into a array to keep track of the path
 * */
Game.prototype.topLeftCheck = function(number, row, dir, dir1){
	if(this.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	if(row % 2 == 0){	
		if(this.floorTile[number-10].click || this.floorTile[number-10].hasMoved){
			if(dir1 == 'topright'){
				return this.pathFinding(number, row, 'right', dir1);
			}else if(dir1 == 'left'){
				return this.pathFinding(number, row, 'botleft', dir1);
			}if(dir1 == 'right'){
				return this.pathFinding(number, row, 'botleft', dir1);
			}if(dir1 == 'botleft'){
				return this.pathFinding(number, row, 'topright', dir1);
			}if(dir1 == 'botright'){
				//stuck
				return number;
			}else{
				// 'topleft'
				return this.pathFinding(number, row, 'topright', dir1);
			}
		}	
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.topLeftCheck(number-10, row-1, dir1, dir1);
	}else{
		if(this.floorTile[number-9].click || this.floorTile[number-9].hasMoved){
			if(dir1 == 'topright'){
				return this.pathFinding(number, row, 'right', dir1);
			}else if(dir1 == 'left'){
				return this.pathFinding(number, row, 'botleft', dir1);
			}if(dir1 == 'right'){
				return this.pathFinding(number, row, 'botleft', dir1);
			}if(dir1 == 'botleft'){
				return this.pathFinding(number, row, 'topright', dir1);
			}if(dir1 == 'botright'){
				//stuck
				return number;
			}else{
				// 'topleft'
				return this.pathFinding(number, row, 'topright', dir1);
			}
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.topLeftCheck(number-9, row-1, dir1, dir1);
	}
	
};

Game.prototype.topRightCheck = function(number, row, dir, dir1){
	if(this.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	
	if(row % 2 == 0){	
		if(this.floorTile[number-9].click || this.floorTile[number-9].hasMoved ){	
			if(dir1 == 'topleft'){
				return this.pathFinding(number, row, 'left', dir1);
			}else if(dir1 == 'left'){
				return this.pathFinding(number, row, 'botright', dir1);
			}if(dir1 == 'right'){
				return this.pathFinding(number, row, 'botright', dir1);
			}if(dir1 == 'botleft'){
				// stuck
				return number; 
			}if(dir1 == 'botright'){
				return this.pathFinding(number, row, 'topleft', dir1);
			}else{
				// 'topright'
				return this.pathFinding(number, row, 'topleft', dir1);
			}
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.pathFinding(number-9, row-1, dir1, dir1);
	}else{
		if(this.floorTile[number-8].click || this.floorTile[number-8].hasMoved ){
			if(dir1 == 'topleft'){
				return this.pathFinding(number, row, 'left', dir1);
			}else if(dir1 == 'left'){
				return this.pathFinding(number, row, 'botright', dir1);
			}if(dir1 == 'right'){
				return this.pathFinding(number, row, 'botright', dir1);
			}if(dir1 == 'botleft'){
				// stuck
				return number; 
			}if(dir1 == 'botright'){
				return this.pathFinding(number, row, 'topleft', dir1);
			}else{
				// 'topright'
				return this.pathFinding(number, row, 'topleft', dir1);
			}
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.pathFinding(number-8, row-1, dir1, dir1);
	}
};

Game.prototype.leftCheck = function(number, row, dir, dir1){
	if(this.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	if(this.floorTile[number-1].click || this.floorTile[number-1].hasMoved ){
			if(dir1 == 'topleft'){
				return this.pathFinding(number, row, 'right', dir1);
			}else if(dir1 == 'topright'){
				return this.pathFinding(number, row, 'botright', dir1);
			}if(dir1 == 'right'){
				//stuck
				return number;
			}if(dir1 == 'botleft'){
				return this.pathFinding(number, row, 'right', dir1);
			}if(dir1 == 'botright'){
				return this.pathFinding(number, row, 'topright', dir1);
			}else{
				// 'left'
				return this.pathFinding(number, row, 'topleft', dir1);
			}
	}
	this.floorTile[number].hasMoved = true;
	this.catPathArray[this.catPathAmount].value_.push(number);
	return number + this.pathFinding(number-1, row, dir1, dir1);
	
};

Game.prototype.rightCheck = function(number, row, dir, dir1){
	if(this.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	if(this.floorTile[number+1].click || this.floorTile[number+1].hasMoved){
			if(dir1 == 'topleft'){
				return this.pathFinding(number, row, 'botleft', dir1);
			}else if(dir1 == 'topright'){
				return this.pathFinding(number, row, 'left', dir1);
			}if(dir1 == 'left'){
				//stuck
				return number;
			}if(dir1 == 'botleft'){
				return this.pathFinding(number, row, 'topleft', dir1);
			}if(dir1 == 'botright'){
				return this.pathFinding(number, row, 'left', dir1);
			}else{
				// 'right'
				return this.pathFinding(number, row, 'topright', dir1);
			}
	}
	this.floorTile[number].hasMoved = true;
	this.catPathArray[this.catPathAmount].value_.push(number);
	return number + this.pathFinding(number+1, row, dir1, dir1);

};

Game.prototype.botLeftCheck = function(number, row, dir, dir1){
	if(this.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	
	if(row % 2 == 0){	
		if(this.floorTile[number+8].click || this.floorTile[number+8].hasMoved){
			if(dir1 == 'topleft'){
				return this.pathFinding(number, row, 'botright', dir1);
			}else if(dir1 == 'topright'){
				//stuck
				return number
			}if(dir1 == 'left'){	
				return this.pathFinding(number, row, 'topright', dir1);
			}if(dir1 == 'right'){
				return this.pathFinding(number, row, 'left', dir1);
			}if(dir1 == 'botright'){
				return this.pathFinding(number, row, 'right', dir1);
			}else{
				// 'botleft'
				return this.pathFinding(number, row, 'botright', dir1);
			}
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.pathFinding(number+8, row+1, dir1, dir1);
	}else{
		if(this.floorTile[number+9].click || this.floorTile[number+9].hasMoved){
			if(dir1 == 'topleft'){
				return this.pathFinding(number, row, 'botright', dir1);
			}else if(dir1 == 'topright'){
				//stuck
				return number
			}if(dir1 == 'left'){	
				return this.pathFinding(number, row, 'topright', dir1);
			}if(dir1 == 'right'){
				return this.pathFinding(number, row, 'left', dir1);
			}if(dir1 == 'botright'){
				return this.pathFinding(number, row, 'right', dir1);
			}else{
				// 'botleft'
				return this.pathFinding(number, row, 'botright', dir1);
			}
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.pathFinding(number+9, row+1, dir1, dir1);
	}
};

Game.prototype.botRightCheck = function(number, row, dir, dir1){
	if(this.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	
	if(row % 2 == 0){	
		if(this.floorTile[number+9].click  || this.floorTile[number+9].hasMoved ){
			if(dir1 == 'topleft'){
				return number;
			}else if(dir1 == 'topright'){
				return this.pathFinding(number, row, 'botleft', dir1);
			}if(dir1 == 'left'){	
				return this.pathFinding(number, row, 'right', dir1);
			}if(dir1 == 'right'){
				return this.pathFinding(number, row, 'topleft', dir1);
			}if(dir1 == 'botleft'){
				return this.pathFinding(number, row, 'left', dir1);
			}else{
				// 'botright'
				return this.pathFinding(number, row, 'botleft', dir1);
			}
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.pathFinding(number+9, row+1, dir1, dir1);
	}else{
		if(this.floorTile[number+10].click || this.floorTile[number+10].hasMoved ){
			if(dir1 == 'topleft'){
				return number;
			}else if(dir1 == 'topright'){
				return this.pathFinding(number, row, 'botleft', dir1);
			}if(dir1 == 'left'){	
				return this.pathFinding(number, row, 'right', dir1);
			}if(dir1 == 'right'){
				return this.pathFinding(number, row, 'topleft', dir1);
			}if(dir1 == 'botleft'){
				return this.pathFinding(number, row, 'left', dir1);
			}else{
				// 'botright'
				return this.pathFinding(number, row, 'botleft', dir1);
			}
		}
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.pathFinding(number+10, row+1, dir1, dir1);
	}
};

/**
 * @ pathFinding
 * dir- the step moving to
 * dir1- starting path direction
 * */
Game.prototype.pathFinding = function(number, row, dir, dir1){
		
	if(dir == 'topleft'){
		this.topLeftCheck(number, row, dir, dir1);
	}else if(dir == 'topright'){
		this.topRightCheck(number, row, dir, dir1);
	}else if(dir == 'left'){
		 this.leftCheck(number, row, dir, dir1);
	}else if(dir == 'right'){
		this.rightCheck(number, row, dir, dir1);
	}else if(dir == 'botleft'){
		this.botLeftCheck(number, row, dir, dir1);
	}else if(dir == 'botright'){
		this.botRightCheck(number, row, dir, dir1);
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
 * @ resetMoveBack
 * */
 Game.prototype.resetMoveBack = function() {
	for(var i = 0; i < this.floorTile.length; i ++){
		if( this.floorTile[i].hasMoved ){
			 this.floorTile[i].hasMoved = false;
		}
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
				
				this.hiveUpdate(this.cat.whichTile_);				
				
				/**
				 * @ escape OR dead
				 * */
				if(this.outOfBound(this.cat.whichTile_)){
					this.gameOver = true;
					this.hud.addGameOver(true);
					this.stage_.addChild(this.reply);
					this.stage_.removeEventListener('click');
					this.reply.addEventListener('mousedown', Delegate.create(this,this.restart));
				}
				if(!this.isWin){
				
				if(this.hiveCheck[1].value_ >= 0 && this.hiveCheck[1].value_ < 81){
						if(this.floorTile[this.hiveCheck[1].value_].click && this.floorTile[this.hiveCheck[2].value_].click && 
						this.floorTile[this.hiveCheck[3].value_].click && this.floorTile[this.hiveCheck[4].value_].click &&
						this.floorTile[this.hiveCheck[5].value_].click && this.floorTile[this.hiveCheck[6].value_].click){
							this.isWin = true;
							this.hud.addWining(true , this.numberOfMove);
							this.stage_.addChild(this.reply);
							this.stage_.removeEventListener('click');
							this.reply.addEventListener('mousedown', Delegate.create(this,this.restart));
						}
					}
				}
				/**
				 * @ cat is trap OR Dead
				 * */
				if(!this.cat.isWeiZhu && !this.gameOver ){
				
					this.catPathArray.push( new Path(0) );
					
					this.pathFinding(this.cat.whichTile_,this.catWhichRow, 'topleft', 'topleft');
					this.resetMoveBack();
					this.catPathArray.push( new Path() );
					this.catPathAmount += 1;
					this.pathFinding(this.cat.whichTile_,this.catWhichRow, 'topright', 'topright');
					this.resetMoveBack();
					this.catPathArray.push( new Path() );
					this.catPathAmount += 1;
					this.pathFinding(this.cat.whichTile_,this.catWhichRow, 'left', 'left');
					this.resetMoveBack();
					this.catPathArray.push( new Path() );
					this.catPathAmount += 1;
					this.pathFinding(this.cat.whichTile_,this.catWhichRow, 'right', 'right');
					this.resetMoveBack();
					this.catPathArray.push( new Path() );
					this.catPathAmount += 1;
					this.pathFinding(this.cat.whichTile_,this.catWhichRow, 'botleft', 'botleft');
					this.resetMoveBack();
					this.catPathArray.push( new Path() );
					this.catPathAmount += 1;
					this.pathFinding(this.cat.whichTile_,this.catWhichRow, 'botright', 'botright');
					this.resetMoveBack();

					
					this.pathCalculationCount = 0;
					
					// find the correct path
					for( var i = 1 ; i < this.catPathArray.length ; i ++){
						for( var j = 0 ; j < this.catPathArray[i].value_.length ; j ++){
							if(this.outOfBound(this.catPathArray[i].value_[this.catPathArray[i].value_.length-1])){
								this.pathCalculationArray[this.pathCalculationCount].value_ += this.catPathArray[i].value_[j];
								if( (j == this.catPathArray[i].value_.length-1) ){		
									this.pathCalculationArray[this.pathCalculationCount].row_ = i;
									this.pathCalculationArray[this.pathCalculationCount].alive = false;	
									if( this.pathCalculationCount < 5){
										this.pathCalculationCount += 1;
									}
								}
							}
						}
					}
					
					// check if cat is weizhu
					if(this.pathCalculationCount == 0){
						this.cat.isWeiZhu = true;
						this.cat.changeAnimation();
					}

					this.smallestValue = 0;
					// compare path
					for( var i = 0 ; i < this.pathCalculationArray.length ; i ++){
						if(!this.pathCalculationArray[i].alive){
							this.getSmallerValue(this.pathCalculationArray[i].value_ );
						}
					}
					// decision to move
					for( var i = 0 ; i < this.pathCalculationArray.length ; i ++){
						if( this.smallestValue == this.pathCalculationArray[i].value_ ){
						
							this.moveDecision(this.catPathArray[this.pathCalculationArray[i].row_].value_[1]);
							break;
						}
					}
					
					// reset path
					for( var i = 1 ; i < this.catPathArray.length ; i ++){
						this.tempLength = this.catPathArray[i].value_.length;
						for( var j = 0 ; j < this.tempLength ; j ++){
							this.catPathArray[i].value_.pop();
						}
						this.catPathArray.pop();
					}	
					this.catPathAmount = 1;
					
					// reset calculation
					for( var i = 0 ; i < this.pathCalculationArray.length ; i ++){
						this.pathCalculationArray[i].value_ = 0;
						this.pathCalculationArray[i].row_ = 0;
						this.pathCalculationArray[i].alive = true;
					}
				
				}else{
					if(!this.gameOver && !this.isWin){
						if(!this.floorTile[this.hiveCheck[1].value_].click){
							this.moveTopLeft();
						}else if(!this.floorTile[this.hiveCheck[2].value_].click){
							this.moveTopRight();
						}else if(!this.floorTile[this.hiveCheck[3].value_].click){
							this.moveLeft();
						}else if(!this.floorTile[this.hiveCheck[4].value_].click){
							this.moveRight();
						}else if(!this.floorTile[this.hiveCheck[5].value_].click){
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
	if(this.hiveCheck[1].value_ == desination){
		this.moveTopLeft();
	}else if(this.hiveCheck[2].value_ == desination){
		this.moveTopRight();
	}else if(this.hiveCheck[3].value_ == desination){
		this.moveLeft();
	}else if(this.hiveCheck[4].value_ == desination){
		this.moveRight();
	}else if(this.hiveCheck[5].value_ == desination){
		this.moveBottomLeft();
	}else if(this.hiveCheck[6].value_ == desination){
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
		if(  this.cat.whichTile_ + 9 < 80  ){
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
    //this is the proper way of monitoring system tick in createjs
	//createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};