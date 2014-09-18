
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
}


SimplePathFinding.prototype.privateLeftCheck = function( map ){
	if(Check.outOfBound(map.catTile)){
		map.setCatTile(this.catOriginalTile);
		return true;
	}
	if(map.isCellClicked(map.catTile-1) ){
		map.setCatTile(this.catOriginalTile);
		return false;
	}
    map.setCatTile(map.catTile - 1);
	return this.privateLeftCheck( map);
};

 
SimplePathFinding.prototype.privateRightCheck = function( map ){
	if(Check.outOfBound(map.catTile)){
		map.setCatTile(this.catOriginalTile);
		return true;
	}
	if(map.isCellClicked(map.catTile+1) ){
		map.setCatTile(this.catOriginalTile);
		return false;
	}

    map.setCatTile(map.catTile + 1);
	return this.privateRightCheck( map);
};


SimplePathFinding.prototype.privateTopLeftCheck = function(map){
	var row = Math.floor(map.catTile / 9 );
	console.log(row);
	if(Check.outOfBound(map.catTile)){
		map.setCatTile(this.catOriginalTile);
		return true;
	}
	
	if(row % 2 == 0){	
		if(map.isCellClicked(map.catTile - 10)){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile - 10);
		return this.privateTopLeftCheck(map);
	}else{
		if(map.isCellClicked(map.catTile - 9) ){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile - 9);
		return this.privateTopLeftCheck(map);
	}
};

SimplePathFinding.prototype.privateTopRightCheck = function(map){
	var row = Math.floor(map.catTile / 9 );
	console.log(row);
	if(Check.outOfBound(map.catTile)){
		return true;
	}
	
	if(row % 2 == 0){	
		if(map.isCellClicked(map.catTile - 9)){
				return false;
		}	
		  map.setCatTile(map.catTile - 9);
		return this.privateTopRightCheck(map);
	}else{
		if(map.isCellClicked(map.catTile - 8) ){
				return false;
		}	
		  map.setCatTile(map.catTile - 8);
		return this.privateTopRightCheck(map);
	}
};


SimplePathFinding.prototype.privateBottomLeftCheck = function(map){
	var row = Math.floor(map.catTile / 9 );
	console.log(row);
	if(Check.outOfBound(map.catTile)){
		map.setCatTile(this.catOriginalTile);
		return true;
	}
	
	if(row % 2 == 0){	
		if(map.isCellClicked(map.catTile + 8)){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile + 8);
		return this.privateBottomLeftCheck(map);
	}else{
		if(map.isCellClicked(map.catTile + 9) ){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile + 9);
		return this.privateBottomLeftCheck(map);
	}
};



SimplePathFinding.prototype.privateBottomRightCheck = function(map){
	var row = Math.floor(map.catTile / 9 );
	console.log(row);
	if(Check.outOfBound(map.catTile)){
		map.setCatTile(this.catOriginalTile);
		return true;
	}
	
	if(row % 2 == 0){	
		if(map.isCellClicked(map.catTile + 9)){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile + 9);
		return this.privateBottomRightCheck(map);
	}else{
		if(map.isCellClicked(map.catTile + 10) ){
			map.setCatTile(this.catOriginalTile);
			return false;
		}	
		  map.setCatTile(map.catTile + 10);
		return this.privateBottomRightCheck(map);
	}
};


SimplePathFinding.prototype.publicPathFinding = function(map){
	this.catOriginalTile = map.catTile;
	if(!Check.outOfBound( map.catTile)){
		if(this.privateLeftCheck(map)){
			return 1;
		}
		else if(this.privateTopLeftCheck(map)){
			return 2;
		}
		else if(this.privateTopRightCheck(map)){
			return 3;
		}
		else if(this.privateRightCheck(map)){
			return 4;
		}
		else if(this.privateBottomRightCheck(map)){
			return 5;
		}
		else if(this.privateBottomLeftCheck(map)){
			return 6;
		}
		else{
			return 0;
		}
	}
	else{
		return 0;
	}
};












