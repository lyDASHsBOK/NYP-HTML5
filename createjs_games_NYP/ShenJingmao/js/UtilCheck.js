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
	return this.checkCaptured(map);
};

UtilCheck.checkLose = function(map) {
	return this.outOfBound(map.catTile);
};

/**
 * @param {Map} map
 * */
UtilCheck.checkWeiZhu = function(map, seed) {
    var seed = (seed != undefined) ? seed : map.catTile;

    if(map.isCellClicked(seed)) {
        return true;
    } else if(this.outOfBound(seed)) {
        return false;
    }
    else {
        map.markCellColored(seed);
        var surrounding = map.getSurroundingTiles(seed);
        for(var i=0; i<surrounding.length; ++i){
            var tile = surrounding[i];
            if(!map.isCellClicked(tile)){
                if(!this.checkWeiZhu(map, tile)) {
                    return false;
                }
            }
        }
    }

	return true;
};

/**
 * @param {Map} map
 * */
UtilCheck.checkCaptured = function(map) {
    var isCaptured = true;
	var surrounding = map.getSurroundingTiles(map.catTile);
    
    for(var i=0; i<surrounding.length; ++i){
        var tile = surrounding[i];
        if(!map.isCellClicked(tile)) {
            isCaptured = false;
            break;
        }
    }

	return isCaptured;
};






