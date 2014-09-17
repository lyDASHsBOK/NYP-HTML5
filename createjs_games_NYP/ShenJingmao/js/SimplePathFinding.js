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





