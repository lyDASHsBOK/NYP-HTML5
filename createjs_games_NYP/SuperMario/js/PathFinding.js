function PathFinding() {
	this.hiveCheck = [];
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
	
	this.floorTile = [];
	
	//hive
	for( var i = 0; i < 7; i ++){
		this.hiveCheck.push(new Hive(0,0));
	}
	
	this.whichTile_ = 0;
	this.catWhichRow_ = 0;
	
}
/**
 * @ hiveUpdate
 * take the cat position and row
 * set the value of hive depend on the row
 * 0-origin 1-topleft 2-topright 3-left 4-right 5-botleft 6-botright
 * */
PathFinding.prototype.hiveUpdate = function(pos , catWhichRow){

	this.catWhichRow_ = catWhichRow;
	if(this.catWhichRow_ % 2 == 0){
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
 * @ checkMovement
 * recursion function to keep looping 
 * return back when escaped
 * check the row to decide how much to minus
 * if the tile to move is colored 
 * go to next function depend on the initial direction path
 * else set the tile has moved so we wont move back again
 * push the tile into a array to keep track of the path
 * */
PathFinding.prototype.topLeftCheck = function(number, row, dir, dir1){
	if(Check.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	
	if(row % 2 == 0){	
		if(this.floorTile[number-10].click || this.floorTile[number-10].hasMoved || this.floorTile[number-10].hasMovedClosed){
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
				for( var i = 0; i < this.floorTile.length; i ++){
					if(this.floorTile[i].hasMoved){
						this.floorTile[i].hasMoved = false;
					}
				}
				this.floorTile[number].hasMovedClosed = true;
				this.catPathArray.push( new Path() );
				this.catPathAmount += 1;
				return this.pathFinding(this.whichTile_,this.catWhichRow_, dir1, dir1);
			}else{
				// 'topleft'
				return this.pathFinding(number, row, 'topright', dir1);
			}
		}	
		this.floorTile[number].hasMoved = true;
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number + this.topLeftCheck(number-10, row-1, dir1, dir1);
	}else{
		if(this.floorTile[number-9].click || this.floorTile[number-9].hasMoved || this.floorTile[number-9].hasMovedClosed){
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
				for( var i = 0; i < this.floorTile.length; i ++){
					if(this.floorTile[i].hasMoved){
						this.floorTile[i].hasMoved = false;
					}
				}
				this.floorTile[number].hasMovedClosed = true;
				this.catPathArray.push( new Path() );
				this.catPathAmount += 1;
				return this.pathFinding(this.whichTile_,this.catWhichRow_, dir1, dir1);
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

PathFinding.prototype.topRightCheck = function(number, row, dir, dir1){
	if(Check.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	
	if(row % 2 == 0){	
		if(this.floorTile[number-9].click || this.floorTile[number-9].hasMoved || this.floorTile[number-9].hasMovedClosed){	
			if(dir1 == 'topleft'){
				return this.pathFinding(number, row, 'left', dir1);
			}else if(dir1 == 'left'){
				return this.pathFinding(number, row, 'botright', dir1);
			}if(dir1 == 'right'){
				return this.pathFinding(number, row, 'botright', dir1);
			}if(dir1 == 'botleft'){
				//stuck		
				for( var i = 0; i < this.floorTile.length; i ++){
					if(this.floorTile[i].hasMoved){
						this.floorTile[i].hasMoved = false;
					}
				}
				this.floorTile[number].hasMovedClosed = true;
				this.catPathArray.push( new Path() );
				this.catPathAmount += 1;
				return this.pathFinding(this.whichTile_,this.catWhichRow_, dir1, dir1);
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
		if(this.floorTile[number-8].click || this.floorTile[number-8].hasMoved || this.floorTile[number-8].hasMovedClosed ){
			if(dir1 == 'topleft'){
				return this.pathFinding(number, row, 'left', dir1);
			}else if(dir1 == 'left'){
				return this.pathFinding(number, row, 'botright', dir1);
			}if(dir1 == 'right'){
				return this.pathFinding(number, row, 'botright', dir1);
			}if(dir1 == 'botleft'){
				//stuck		
				for( var i = 0; i < this.floorTile.length; i ++){
					if(this.floorTile[i].hasMoved){
						this.floorTile[i].hasMoved = false;
					}
				}
				this.floorTile[number].hasMovedClosed = true;
				this.catPathArray.push( new Path() );
				this.catPathAmount += 1;
				return this.pathFinding(this.whichTile_,this.catWhichRow_, dir1, dir1);
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

PathFinding.prototype.leftCheck = function(number, row, dir, dir1){
	if(Check.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	if(this.floorTile[number-1].click || this.floorTile[number-1].hasMoved || this.floorTile[number-1].hasMovedClosed){
			if(dir1 == 'topleft'){
				return this.pathFinding(number, row, 'right', dir1);
			}else if(dir1 == 'topright'){
				return this.pathFinding(number, row, 'botright', dir1);
			}if(dir1 == 'right'){
				//stuck		
				for( var i = 0; i < this.floorTile.length; i ++){
					if(this.floorTile[i].hasMoved){
						this.floorTile[i].hasMoved = false;
					}
				}
				this.floorTile[number].hasMovedClosed = true;
				this.catPathArray.push( new Path() );
				this.catPathAmount += 1;
				return this.pathFinding(this.whichTile_,this.catWhichRow_, dir1, dir1);
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

PathFinding.prototype.rightCheck = function(number, row, dir, dir1){
	if(Check.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	if(this.floorTile[number+1].click || this.floorTile[number+1].hasMoved || this.floorTile[number+1].hasMovedClosed){
			if(dir1 == 'topleft'){
				return this.pathFinding(number, row, 'botleft', dir1);
			}else if(dir1 == 'topright'){
				return this.pathFinding(number, row, 'left', dir1);
			}if(dir1 == 'left'){
				//stuck		
				for( var i = 0; i < this.floorTile.length; i ++){
					if(this.floorTile[i].hasMoved){
						this.floorTile[i].hasMoved = false;
					}
				}
				this.floorTile[number].hasMovedClosed = true;
				this.catPathArray.push( new Path() );
				this.catPathAmount += 1;
				return this.pathFinding(this.whichTile_,this.catWhichRow_, dir1, dir1);
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

PathFinding.prototype.botLeftCheck = function(number, row, dir, dir1){
	if(Check.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	
	if(row % 2 == 0){	
		if(this.floorTile[number+8].click || this.floorTile[number+8].hasMoved || this.floorTile[number+8].hasMovedClosed){
			if(dir1 == 'topleft'){
				return this.pathFinding(number, row, 'botright', dir1);
			}else if(dir1 == 'topright'){
				//stuck		
				for( var i = 0; i < this.floorTile.length; i ++){
					if(this.floorTile[i].hasMoved){
						this.floorTile[i].hasMoved = false;
					}
				}
				this.floorTile[number].hasMovedClosed = true;
				this.catPathArray.push( new Path() );
				this.catPathAmount += 1;
				return this.pathFinding(this.whichTile_ ,this.catWhichRow_, dir1, dir1);
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
		if(this.floorTile[number+9].click || this.floorTile[number+9].hasMoved || this.floorTile[number+9].hasMovedClosed){
			if(dir1 == 'topleft'){
				return this.pathFinding(number, row, 'botright', dir1);
			}else if(dir1 == 'topright'){
				//stuck		
				for( var i = 0; i < this.floorTile.length; i ++){
					if(this.floorTile[i].hasMoved){
						this.floorTile[i].hasMoved = false;
					}
				}
				this.floorTile[number].hasMovedClosed = true;
				this.catPathArray.push( new Path() );
				this.catPathAmount += 1;
				return this.pathFinding(this.whichTile_,this.catWhichRow_, dir1, dir1);
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

PathFinding.prototype.botRightCheck = function(number, row, dir, dir1){
	if(Check.outOfBound(number)){
		this.catPathArray[this.catPathAmount].value_.push(number);
		return number;
	}
	
	if(row % 2 == 0){	
		if(this.floorTile[number+9].click  || this.floorTile[number+9].hasMoved || this.floorTile[number+9].hasMovedClosed){
			if(dir1 == 'topleft'){
				//stuck		
				for( var i = 0; i < this.floorTile.length; i ++){
					if(this.floorTile[i].hasMoved){
						this.floorTile[i].hasMoved = false;
					}
				}
				this.floorTile[number].hasMovedClosed = true;
				this.catPathArray.push( new Path() );
				this.catPathAmount += 1;
				return this.pathFinding(this.whichTile_,this.catWhichRow_, dir1, dir1);
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
		if(this.floorTile[number+10].click || this.floorTile[number+10].hasMoved || this.floorTile[number+10].hasMovedClosed){
			if(dir1 == 'topleft'){
				//stuck		
				for( var i = 0; i < this.floorTile.length; i ++){
					if(this.floorTile[i].hasMoved){
						this.floorTile[i].hasMoved = false;
					}
				}
				this.floorTile[number].hasMovedClosed = true;
				this.catPathArray.push( new Path() );
				this.catPathAmount += 1;
				return this.pathFinding(this.whichTile_,this.catWhichRow_, dir1, dir1);
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
PathFinding.prototype.pathFinding = function(number, row, dir, dir1){
	
	this.catAbleToMove = 0;
	
	for(var i = 1 ; i < 7 ; i++){
		if(this.floorTile[this.hiveCheck[i].value_].hasMovedClosed || this.floorTile[this.hiveCheck[i].value_].click){
			this.catAbleToMove += 1;
		}
	}

	if(this.catAbleToMove < 6 ){
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
	}else{
		return number;
	}	
};
 /**
 * @ resetMoveBack
 * */
 PathFinding.prototype.resetMoveBack = function() {
 	for(var i = 0; i < this.floorTile.length; i ++){
		if( this.floorTile[i].hasMoved ){
			 this.floorTile[i].hasMoved = false;
		}
		if( this.floorTile[i].hasMovedClosed ){
			 this.floorTile[i].hasMovedClosed = false;
		}
	}	
 };
 
 PathFinding.prototype.checkPathFind = function( whichTile , catWhichRow) {
	this.whichTile_ = whichTile;
	this.catPathArray.push( new Path() );
	this.pathFinding(this.whichTile_,this.catWhichRow_, 'topleft', 'topleft');
	this.resetMoveBack();
	this.catPathArray.push( new Path() );
	this.catPathAmount += 1;
	this.pathFinding(this.whichTile_,this.catWhichRow_, 'topright', 'topright');
	this.resetMoveBack();
	this.catPathArray.push( new Path() );
	this.catPathAmount += 1;
	this.pathFinding(this.whichTile_,this.catWhichRow_, 'left', 'left');
	this.resetMoveBack();
	this.catPathArray.push( new Path() );
	this.catPathAmount += 1;
	this.pathFinding(this.whichTile_,this.catWhichRow_, 'right', 'right');
	this.resetMoveBack();
	this.catPathArray.push( new Path() );
	this.catPathAmount += 1;
	this.pathFinding(this.whichTile_,this.catWhichRow_, 'botleft', 'botleft');
	this.resetMoveBack();
	this.catPathArray.push( new Path() );
	this.catPathAmount += 1;
	this.pathFinding(this.whichTile_,this.catWhichRow_, 'botright', 'botright');
	this.resetMoveBack();
	
	this.pathCalculationCount = 0;
	
	// find the correct path
	for( var i = 1 ; i < this.catPathArray.length ; i ++){
		for( var j = 0 ; j < this.catPathArray[i].value_.length ; j ++){
			if(Check.outOfBound(this.catPathArray[i].value_[this.catPathArray[i].value_.length-1])){
				//this.pathCalculationArray[this.pathCalculationCount].value_ += this.catPathArray[i].value_[j];
				this.pathCalculationArray[this.pathCalculationCount].value_ += 1;
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
};
 PathFinding.prototype.reset = function(){
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
 };