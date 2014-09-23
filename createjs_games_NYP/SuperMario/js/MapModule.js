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
	
	this.walkableTile = [-1 ,272 ,274,273 , 375 ];
	
	
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
	
	for (var row = this.mapHeight - 3; row < this.mapHeight - 2; row++) {
		for (var col = 116; col <  118 ; col++) {
			this.firstLevel[row][col] = 375;
		}
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
	
	
	//random Block Tile
	this.firstLevel[this.mapHeight -6][16] = 24;
	
	this.firstLevel[this.mapHeight -6][20] = 1;
	this.firstLevel[this.mapHeight -6][21] = 24;
	this.firstLevel[this.mapHeight -6][22] = 1;
	this.firstLevel[this.mapHeight -6][23] = 24;
	this.firstLevel[this.mapHeight -6][24] = 1;
	this.firstLevel[this.mapHeight -10][22] = 24;
	
	
	//piple
	this.createVPiple(28 , this.mapHeight -3 , 2 );
	this.createVPiple(38 , this.mapHeight -3 , 3 );
	this.createVPiple(46 , this.mapHeight -3 , 4 );
	this.createVPiple(56 , this.mapHeight -3 , 4 );
	
	//hill
	temp = 1;
	for (var row = this.mapHeight - 4; row < this.mapHeight -2; row++) {
		for (var col = 0; col <  3 ; col++) {
			if(col  ==  3 - temp){
				this.firstLevel[row][col] = 272;
			}
		}
		temp++;
	}
	
	temp = 2;
	for (var row = this.mapHeight - 4; row < this.mapHeight -2; row++) {
		for (var col = 3; col <  6 ; col++) {
			if(col  ==  6 - temp){
				this.firstLevel[row][col] = 274;
			}
		}
		temp--;
	}
	this.firstLevel[this.mapHeight -5][3] = 273;
};

MapModule.prototype.createVPiple =  function (startX , startY , height ){

	for (var row = startY; row > startY - height; row--) {
		for (var col = startX; col <  startX + 2 ; col++) {
			if(col == startX){
				this.firstLevel[row][col] = 297;
			}
			else{
				this.firstLevel[row][col] = 298
			}
		}
	}
	
	this.firstLevel[startY - height + 1][startX] = 264;
	this.firstLevel[startY - height + 1][startX+1] = 265;
	
};


MapModule.prototype.getMapData =  function (){
	return this.firstLevel;
};

MapModule.prototype.walkable =  function (row, col) {
	
	for(var i = 0; i < this.walkableTile.length; i++){
		if (this.firstLevel[row][col] === this.walkableTile[i] ) {
			return false;
		}
	}
		return true;
};