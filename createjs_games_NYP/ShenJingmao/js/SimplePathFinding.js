
 /**
 * @ Note
 * Those with the name private mean it a private function
 *left  = 1
 *topLeft = 2 
 * topRight = 3
 * Right = 4
 * bottomRight = 5
 *bottomLeft = 6
 * */

function SimplePathFinding() {
	this.catOriginalTile = 0;
		this.DIRECTION = {
			LEFT: 1,
			TOP_LEFT: 2,
			TOP_RIGHT:3,
			RIGHT:4,
			BOTTOM_RIGHT:5,
			BOTTOM_LEFT: 6,
			NO_DIRECTION: 7,
		}
}


/**
* @ private
*  checking the left direction
*/
SimplePathFinding.prototype.LeftCheck = function( map ){
	if(UtilCheck.outOfBound(map.catTile)){
		map.setCatTile(this.catOriginalTile);
		return true;
	}
	if(map.isCellClicked(map.catTile-1) ){
		map.setCatTile(this.catOriginalTile);
		return false;
	}
    map.setCatTile(map.catTile - 1);
	return this.LeftCheck( map);
};

/**
* @ private
*  checking the right direction
*/
SimplePathFinding.prototype.RightCheck = function( map ){
	console.log(map.catTile);
	if(UtilCheck.outOfBound(map.catTile)){
		map.setCatTile(this.catOriginalTile);
		return true;
	}
	if(map.isCellClicked(map.catTile+1) ){
		map.setCatTile(this.catOriginalTile);
		return false;
	}

    map.setCatTile(map.catTile + 1);
	return this.RightCheck( map);
};


/**
* @ private
*  checking the Topleft direction
*/
SimplePathFinding.prototype.TopLeftCheck = function(map){
	var row = Math.floor(map.catTile / 9 );

	if(UtilCheck.outOfBound(map.catTile)){
		map.setCatTile(this.catOriginalTile);
		return true;
	}
	
	if(row % 2 == 0){	
		if(map.isCellClicked(map.catTile - 10)){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile - 10);
		return this.TopLeftCheck(map);
	}else{
		if(map.isCellClicked(map.catTile - 9) ){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile - 9);
		return this.TopLeftCheck(map);
	}
};

/**
* @ private
*  checking the topRight direction
*/
SimplePathFinding.prototype.TopRightCheck = function(map){
	var row = Math.floor(map.catTile / 9 );

	if(UtilCheck.outOfBound(map.catTile)){
		return true;
	}
	
	if(row % 2 == 0){	
		if(map.isCellClicked(map.catTile - 9)){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile - 9);
		return this.TopRightCheck(map);
	}else{
		if(map.isCellClicked(map.catTile - 8) ){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile - 8);
		return this.TopRightCheck(map);
	}
};
/**
* @ private
*  checking the Bottom Left direction
*/
SimplePathFinding.prototype.BottomLeftCheck = function(map){
	var row = Math.floor(map.catTile / 9 );

	if(UtilCheck.outOfBound(map.catTile)){
		map.setCatTile(this.catOriginalTile);
		return true;
	}
	
	if(row % 2 == 0){	
		if(map.isCellClicked(map.catTile + 8)){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile + 8);
		return this.BottomLeftCheck(map);
	}else{
		if(map.isCellClicked(map.catTile + 9) ){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile + 9);
		return this.BottomLeftCheck(map);
	}
};

/**
* @ private
*  checking the Bottom right direction
*/
SimplePathFinding.prototype.BottomRightCheck = function(map){
	var row = Math.floor(map.catTile / 9 );

	if(UtilCheck.outOfBound(map.catTile)){
		map.setCatTile(this.catOriginalTile);
		return true;
	}
	
	if(row % 2 == 0){	
		if(map.isCellClicked(map.catTile + 9)){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile + 9);
		return this.BottomRightCheck(map);
	}else{
		if(map.isCellClicked(map.catTile + 10) ){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile + 10);
		return this.BottomRightCheck(map);
	}
};




/**
* @ public
* to find the path
*/
SimplePathFinding.prototype.findPath = function(map){
	this.catOriginalTile = map.catTile;
	if(!UtilCheck.outOfBound( map.catTile)){
		if(this.LeftCheck(map)){
			return this.DIRECTION.LEFT;
		}
		else if(this.TopLeftCheck(map)){
			return this.DIRECTION.TOP_LEFT;
		}
		else if(this.TopRightCheck(map)){
			return this.DIRECTION.TOP_RIGHT;
		}
		else if(this.RightCheck(map)){
			return this.DIRECTION.RIGHT;
		}
		else if(this.BottomRightCheck(map)){
			return this.DIRECTION.BOTTOM_RIGHT;
		}
		else if(this.BottomLeftCheck(map)){
			return this.DIRECTION.BOTTOM_LEFT;
		}
	}

	return this.DIRECTION.NO_DIRECTION;
	
};












