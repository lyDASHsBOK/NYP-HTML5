/**
 * @ outOfBound
 * check whether the cat is escaped
 * return ture if is escaped
 * else return false
 * */
 var Check = {};
 
Check.outOfBound = function(number) {
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