function SmartPathFinding() {

	//six directions are lt, rt, l, r, lb, rb
	this.catOriginalTile = 0;
		this.DIRECTION = {
			
			TOP_LEFT: 1,
			TOP_RIGHT:2,
			LEFT: 3,
			RIGHT:4,
			BOTTOM_LEFT: 5,
			BOTTOM_RIGHT:6,
			NO_DIRECTION: 7
		}
	
		this.smallestValue = 0;
		this.shortestPathIndex = 0;
		
		this.NumberOfStepOfEachDirection = [];
		
		for(var i = 0 ; i < 6;i++ ){
			this.NumberOfStepOfEachDirection.push(-1);
		}
}



SmartPathFinding.prototype.findPathStep = function(map, seed , index) {
    var seed = (seed != undefined) ? seed : map.catTile;
	this.NumberOfStepOfEachDirection[index] += 1;
    if(map.isCellClicked(seed)) {
        return false;
    } else if(UtilCheck.outOfBound(seed)) {
		this.NumberOfStepOfEachDirection[index] += 1;
        return true;
    }
    else {
        map.markCellColored(seed);
        var surrounding = map.getSurroundingTiles(seed);
        for(var i=0; i<surrounding.length; ++i){
            var tile = surrounding[i];
            if(!map.isCellClicked(tile) && tile != map.catTile){
                if( this.findPathStep(map, tile , index )) {
                    return true;
                }	
            }
        }
    }
	console.log("hi");
	this.NumberOfStepOfEachDirection[index] = 0;
	return false;
};

SmartPathFinding.prototype.getSmallerStep = function(value , index) {
	if(this.smallestValue == 0 &&  value > 0){
		this.smallestValue = value;
		this.shortestPathIndex = index;
	}
	
	if(value < this.smallestValue && value > 0){
		this.smallestValue = value;
		this.shortestPathIndex = index;
	}
 };

SmartPathFinding.prototype.findPath = function(map) {
  
  if( ! UtilCheck.outOfBound(map.catTile)){
		for(var i = 0 ; i < 6;i++ ){
				this.NumberOfStepOfEachDirection[i] = 0;
			}
			
		this.smallestValue = 0;
		this.shortestPathIndex = 0;
			
	  
		var surrounding = map.getSurroundingTiles(map.catTile);
		for(var i=0; i< 6; ++i){
			var tile = surrounding[i];
			if(!map.isCellClicked(tile)){
				this.findPathStep(map.clone(),tile, i);
				this.getSmallerStep(this.NumberOfStepOfEachDirection[i] , i +1);
			}
		  }
		console.log(this.NumberOfStepOfEachDirection);
		console.log(this.NumberOfStepOfEachDirection);
		 if(this.shortestPathIndex  == this.DIRECTION.LEFT){
			return this.DIRECTION.LEFT;
		}else if( this.shortestPathIndex  == this.DIRECTION.TOP_LEFT){
			return this.DIRECTION.TOP_LEFT;
		}else if( this.shortestPathIndex  == this.DIRECTION.TOP_RIGHT){
			return this.DIRECTION.TOP_RIGHT;
		}else if(this.shortestPathIndex  == this.DIRECTION.RIGHT){
			return this.DIRECTION.RIGHT;
		}else if(this.shortestPathIndex  == this.DIRECTION.BOTTOM_RIGHT){
			return this.DIRECTION.BOTTOM_RIGHT;
		}else if(this.shortestPathIndex  == this.DIRECTION.BOTTOM_LEFT){
			return this.DIRECTION.BOTTOM_LEFT;
		}
	}
	
	return this.DIRECTION.NO_DIRECTION;
	  
};





