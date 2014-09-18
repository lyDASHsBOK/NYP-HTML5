/**
 * @ outOfBound
 * check whether the cat is escaped
 * return ture if is escaped
 * else return false
 * */
 var UtilCheck = {};
 
UtilCheck.outOfBound = function(number) {
	if( number >= 0 && number <= 8){
		return true;
	}
	if( number >= 72 && number <= 80){
		return true;
	}
	for(var i = 0; i < 9; i++){
		if( number == i*9){
			return true;
		}
	}
	for(var i = 0; i < 9; i++){
		if( number == i*9+8){
			return true;
		}
	}	
	return false;
};


UtilCheck.checkWin = function(map) {
	var row = Math.floor(map.catTile / 9 );
	
	if(map.isCellClicked(map.catTile + 1) && map.isCellClicked(map.catTile - 1)){
	
		if(row % 2 == 0){
			if( map.isCellClicked(map.catTile - 10) && map.isCellClicked(map.catTile - 9)
			&& map.isCellClicked(map.catTile + 8) && map.isCellClicked(map.catTile + 9)){
				return true;
			}
			
		}
		else{
			if( map.isCellClicked(map.catTile - 9) && map.isCellClicked(map.catTile - 8)
			&& map.isCellClicked(map.catTile + 9) && map.isCellClicked(map.catTile + 10)){
				return true;
			}
		}
	}
	return false;
};

UtilCheck.checkLose = function(map) {
	if(!this.outOfBound( map.catTile)){
		return false;
	}
	return true;
};

UtilCheck.checkWeiZhu = function(map) {
	if(this.checkWin(map) && this.checkLose(map)){
		return false;
	}
	return true;
};






