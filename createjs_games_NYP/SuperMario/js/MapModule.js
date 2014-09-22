function MapModule(mapRow , mapCol){
	
	this.mapWidth =  mapCol;
    this.mapHeight =  mapRow;
	
	this.firstLevel = [];
	
	for (var row = 0; row < this.mapHeight; row++) {
		 this.firstLevel.push( [] );
	}
	
	for (var row = 0; row < this.mapHeight; row++) {
		for (var col = 0; col <  this.mapWidth ; col++) {
			 this.firstLevel[row].push( -1 );
		}
	}
	for (var row = this.mapHeight - 2; row < this.mapHeight; row++) {
		for (var col = 0; col <  this.mapWidth ; col++) {
			 this.firstLevel[row][col] = 0;
		}
	}
	for (var row = this.mapHeight - 2; row < this.mapHeight; row++) {
		for (var col =  this.mapWidth -2; col <  this.mapWidth ; col++) {
			 this.firstLevel[row][col] = 2;
		}
	}
	
}

MapModule.prototype.getMapData =  function (){
	return this.firstLevel;
};

MapModule.prototype.walkable =  function (row, col) {
	if (this.firstLevel[row][col] === 0) {
		return false;
	} else {
		return true;
	}
};