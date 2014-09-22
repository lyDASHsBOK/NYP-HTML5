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
	
	this.buildLevelOne();
	
	
}
/**
 * @ private 
 * genrate level 1 map
 * */
MapModule.prototype.buildLevelOne =  function (){
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
	
	for (var row = this.mapHeight - 2; row < this.mapHeight; row++) {
		for (var col = 68; col <  71 ; col++) {
			 this.firstLevel[row][col] = -1;
		}
	}
	
	for (var row = this.mapHeight - 2; row < this.mapHeight; row++) {
		for (var col = 84; col <  87 ; col++) {
			 this.firstLevel[row][col] = -1;
		}
	}
	
	for (var row = this.mapHeight - 2; row < this.mapHeight; row++) {
		for (var col = 132; col <  134 ; col++) {
			 this.firstLevel[row][col] = -1;
		}
	}
	
	//green block
	
	var temp = 1;
	for (var row = this.mapHeight - 6; row < this.mapHeight - 2; row++) {
		for (var col = 112; col <  116 ; col++) {
			if(col  >=  116 - temp){
				this.firstLevel[row][col] = 33;
			 }
		}
		temp++;
	}
	
	temp = 4;
	for (var row = this.mapHeight - 6; row < this.mapHeight - 2; row++) {
		for (var col = 118; col <  122 ; col++) {
			if(col + temp < 123){
				this.firstLevel[row][col] = 33;
			 }
		}
		temp--;
	}
	
	
	
	temp = 2;
	for (var row = this.mapHeight - 6; row < this.mapHeight - 2; row++) {
		for (var col = 126; col <  132 ; col++) {
			if(col  >=  132 - temp){
				this.firstLevel[row][col] = 33;
			 }
		}
		temp++;
	}
	
	
	temp = 4;
	for (var row = this.mapHeight - 6; row < this.mapHeight - 2; row++) {
		for (var col = 134; col <  138 ; col++) {
			if(col + temp < 139){
				this.firstLevel[row][col] = 33;
			 }
		}
		temp--;
	}
	
	temp = 1;
	for (var row = this.mapHeight - 10; row < this.mapHeight -2; row++) {
		for (var col = 159; col <  168 ; col++) {
			if(col  >=  168 - temp){
				this.firstLevel[row][col] = 33;
			}
		}
		temp++;
	}
	
	this.firstLevel[this.mapHeight -3][176] = 33;
};


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