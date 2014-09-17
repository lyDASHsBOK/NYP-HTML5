function SimplePathFinding() {
	
}


SimplePathFinding.prototype.leftCheck = function( map ){
	if(Check.outOfBound(map.catTile)){
		return true;
	}
	if(map.isCellClicked(map.catTile-1) ){
		return false;
	}

    map.setCatTile(map.catTile - 1);
	return this.leftCheck( map);
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





