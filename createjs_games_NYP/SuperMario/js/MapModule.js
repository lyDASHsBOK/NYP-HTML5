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
	
	this.walkableTile = [-1 ,272 ,274,273 ,307,306,305, 375 ];
	
	
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
	
	this.createGreenBlock(112 , this.mapHeight - 6 , 4 , 4, true);
	this.createGreenBlock(118 , this.mapHeight - 6 , 4 , 4, false);
	this.createGreenBlock(134 , this.mapHeight - 6 , 4 , 4, false);
	
	this.createGreenBlock(159 , this.mapHeight - 10 , 8 , 8 , true);
	this.createGreenBlock(167 , this.mapHeight - 10 , 8 , 1, true);
	

	this.createGreenBlock(127 , this.mapHeight - 6 , 4 , 4 , true);
	this.createGreenBlock(131 , this.mapHeight - 6 , 4 , 1 , true);
	
	
	
	
	for (var row = this.mapHeight - 3; row < this.mapHeight - 2; row++) {
		for (var col = 116; col <  118 ; col++) {
			this.firstLevel[row][col] = 375;
		}
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
	this.createHill(0,this.mapHeight - 4,2, 5);
	this.createHill(15,this.mapHeight - 3,1, 5);
	this.createHill(47,this.mapHeight - 4,2, 5);
	this.createHill(61,this.mapHeight - 3,1, 5);
	
	this.createHill(169,this.mapHeight - 4,2, 5);
};

MapModule.prototype.createHill = function(startX , startY , height,width) {
	//hill
	var middleX = Math.floor( (startX + startX + width) / 2 ) + 1;
	
	var temp = 1;
	for (var row = startY; row < startY + height; row++) {
		for (var col = startX ; col <  middleX ; col++) {
			if(col  ==  middleX - temp){
				this.firstLevel[row][col] = 272;
			}
		}
		temp++;
	}
	
	temp = 2;
	for (var row = startY; row < startY + height; row++) {
		for (var col = middleX; col <  startX + width +1 ; col++) {
			if(col  ==  startX + width +1 - temp){
				this.firstLevel[row][col] = 274;
			}
		}
		temp--;
	}
	
	for (var row = startY; row < startY + height; row++) {
		for (var col = startX + 2 ; col <  startX + width ; col++) {
			if(row == startY +1 || col  == middleX){
				this.firstLevel[row][col] = 305;
			}
			if( col  == middleX && row != startY){
				this.firstLevel[row][col] = 306;
			}
		}
	}
	this.firstLevel[startY -1][middleX] = 273;
};

MapModule.prototype.createGreenBlock = function(startX , startY , height,width, isLeft) {

	if(isLeft){
	var temp = 1;
		for (var row = startY; row < startY + height; row++) {
			for (var col = startX; col < startX + width ; col++) {
				if(col  >=  startX + width - temp){
					this.firstLevel[row][col] = 33;
				 }
			}
			temp++;
		}
	}
	else{
		var temp = 4;
		
		for (var row = startY; row < startY + height; row++) {
			for (var col = startX; col <  startX + width ; col++) {
				if(col + temp < startX + width +1){
					this.firstLevel[row][col] = 33;
				 }
			}
			temp--;
		}
			
	}
	
	
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

MapModule.prototype.getID = function(row,col) {
	return this.firstLevel[row][col];
};