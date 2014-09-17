function SimplePathFinding() {
	
}

SimplePathFinding.prototype.leftCheck = function( floorTile , whichTile_){
	if(Check.outOfBound(whichTile_)){
		return true;
	}
	if(floorTile[whichTile_-1].click ){
		return false;
	}
	return this.leftCheck( floorTile , whichTile_-1);
};

/*
SimplePathFinding.prototype.topLeftCheck = function(floorTile, whichTile_ ){
	
	var row = Math.floor(whichTile_ / 9 );
	
	if(Check.outOfBound(whichTile_)){
		return true;
	}
	
	if(row % 2 == 0){	
		if(this.floorTile[whichTile_-10].click ){
			return false;
		}	
		return this.topLeftCheck(floorTile , whichTile_-10);
	}else{
		if(this.floorTile[whichTile_-9].click ){
				return false;
		}
		return this.topLeftCheck(floorTile,whichTile_-9);
	}
	
};*/





