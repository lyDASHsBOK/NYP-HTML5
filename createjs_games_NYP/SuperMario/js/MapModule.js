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
	
	this.walkableTile = [-1 ,272 ,274,273 ,307,306,305, 375,379 ];
	
	this.orginalLevel = this.firstLevel;
	
}


//TODO: this function will keep growing when we add more levels. try to make levels into level JSON data
//and this can be a generic level generation function
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
		for (var col = 142; col <  144 ; col++) {
			 this.firstLevel[row][col] = -1;
		}
	}
	
	//green block
	
	this.createGreenBlock(122 , this.mapHeight - 6 , 4 , 4, true);
	this.createGreenBlock(128 , this.mapHeight - 6 , 4 , 4, false);
	this.createGreenBlock(144 , this.mapHeight - 6 , 4 , 4, false);
	


	this.createGreenBlock(137 , this.mapHeight - 6 , 4 , 4 , true);
	this.createGreenBlock(141 , this.mapHeight - 6 , 4 , 1 , true);
	
	this.createGreenBlock(171 , this.mapHeight - 10 , 8 , 8 , true);
	this.createGreenBlock(179 , this.mapHeight - 10 , 8 , 1, true);
	
	
	
	this.firstLevel[this.mapHeight -3][190] = 33;
	
	for(var i = this.mapHeight -13;i< this.mapHeight -3; i++){	
		this.firstLevel[i][190] = 379;
	}
	
	this.firstLevel[this.mapHeight -14][190] = 346;
	this.firstLevel[this.mapHeight -13][189] = 28;
	
	for(var i = this.mapHeight - 5; i <this.mapHeight -2 ;i++){
		this.firstLevel[i][195] = 13;
	}
	for(var i = this.mapHeight - 5; i <this.mapHeight -2 ;i++){
		this.firstLevel[i][200] = 13;
	}
	for(var i = 195; i <201 ;i++){
		this.firstLevel[this.mapHeight - 6][i] = 11;
	}
	
	for(var i = 196; i <200 ;i++){
		this.firstLevel[this.mapHeight - 6][i] = 44;
	}
	
	
	this.firstLevel[this.mapHeight - 3][198] = 46;
	this.firstLevel[this.mapHeight - 4][198] = 46;
	this.firstLevel[this.mapHeight - 5][198] = 45;
	
	for(var i = this.mapHeight - 5; i <this.mapHeight -2 ;i++){
		this.firstLevel[i][196] = 13;
	}
	for(var i = this.mapHeight - 5; i <this.mapHeight -2 ;i++){
		this.firstLevel[i][197] = 13;
	}
		
	for(var i = this.mapHeight - 5; i <this.mapHeight -2 ;i++){
		this.firstLevel[i][199] = 13;
	}
	

	this.firstLevel[this.mapHeight - 7][196] = 12;
	this.firstLevel[this.mapHeight - 7][197] = 14;
	this.firstLevel[this.mapHeight - 7][199] = 14;
	this.firstLevel[this.mapHeight - 7][198] = 12;
	
	for(var i = 196; i <200 ;i++){
		this.firstLevel[this.mapHeight - 8][i] = 11;
	}
	
	
	//random Block Tile
	this.firstLevel[this.mapHeight -6][16] = 24;
	this.firstLevel[this.mapHeight -6][20] = 1;
	this.firstLevel[this.mapHeight -6][21] = 24;
	this.firstLevel[this.mapHeight -6][22] = 1;
	this.firstLevel[this.mapHeight -10][22] = 24;
	this.firstLevel[this.mapHeight -6][23] = 24;
	this.firstLevel[this.mapHeight -6][24] = 1;
	this.firstLevel[this.mapHeight -6][77] = 1;
	this.firstLevel[this.mapHeight -6][78] = 24;
	this.firstLevel[this.mapHeight -6][79] = 1;
	
	for(var i = 80; i< 86;i++ ){
		this.firstLevel[this.mapHeight -10][i] = 1;
	}
	
	
	for(var i = 89; i< 92;i++ ){
		this.firstLevel[this.mapHeight -10][i] = 1;
	}
	
	this.firstLevel[this.mapHeight -10][92] = 24;
	this.firstLevel[this.mapHeight -6][92] = 1;
	
	for(var i = 97; i< 99;i++ ){
		this.firstLevel[this.mapHeight -6][i] = 1;
	}
	
	this.firstLevel[this.mapHeight -6][100] = 24;
	this.firstLevel[this.mapHeight -6][103] = 24;
	this.firstLevel[this.mapHeight -10][103] = 24;
	this.firstLevel[this.mapHeight -6][106] = 24;
	
	this.firstLevel[this.mapHeight -6][108] = 1;
	
	
	for(var i = 118; i< 120;i++ ){
		this.firstLevel[this.mapHeight -6][i] = 1;
	}
	
	for(var i = 110; i< 113;i++ ){
		this.firstLevel[this.mapHeight -10][i] = 1;
	}
	
	this.firstLevel[this.mapHeight -10][117] = 1;
	this.firstLevel[this.mapHeight -10][118] = 24;
	this.firstLevel[this.mapHeight -10][119] = 24;
	this.firstLevel[this.mapHeight -10][120] = 1;
	this.firstLevel[this.mapHeight -6][157] = 1;
	this.firstLevel[this.mapHeight -6][158] = 24;
	this.firstLevel[this.mapHeight -6][159] = 24;
	this.firstLevel[this.mapHeight -6][160] = 1;
	
	//piple
	this.createVPiple(28 , this.mapHeight -3 , 2 );
	this.createVPiple(38 , this.mapHeight -3 , 3 );
	this.createVPiple(46 , this.mapHeight -3 , 4 );
	this.createVPiple(56 , this.mapHeight -3 , 4 );
	this.createVPiple(153 , this.mapHeight -3 , 2 );
	this.createVPiple(169 , this.mapHeight -3 , 2 );
	
	
	for (var row = this.mapHeight - 3; row < this.mapHeight - 2; row++) {
		for (var col = 126; col <  128 ; col++) {
			this.firstLevel[row][col] = 375;
		}
	}
	
	
	//hill
	this.createHill(0,this.mapHeight - 4,2, 5);
	this.createHill(15,this.mapHeight - 3,1, 5);
	this.createHill(47,this.mapHeight - 4,2, 5);
	this.createHill(61,this.mapHeight - 3,1, 5);
	this.createHill(93,this.mapHeight - 4,2, 5);
	this.createHill(106,this.mapHeight - 3,1, 5);
	this.createHill(131,this.mapHeight - 4,2, 5);
	this.createHill(148,this.mapHeight - 3,1, 5);
	this.createHill(182,this.mapHeight - 4,2, 5);

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
	if(row < 0 || col < 0 || row > this.mapHeight -1 ||  col > this.mapWidth -1 ){
		return false;
	}
	
	for(var i = 0; i < this.walkableTile.length; i++){
		if (this.firstLevel[row][col] === this.walkableTile[i] ) {
			return false;
		}
	}
		return true;
};

MapModule.prototype.getID = function(row,col) {
	if(row < 0 || col < 0 || row > this.mapHeight -1 ||  col > this.mapWidth -1 ){
		return -100;
	}
	return this.firstLevel[row][col];
};

MapModule.prototype.reset = function() {
	this.firstLevel = this.orginalLevel;
};