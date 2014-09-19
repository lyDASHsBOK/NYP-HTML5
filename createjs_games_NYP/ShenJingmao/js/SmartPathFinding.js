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
		
		this.pathList = [];
		
		this.NumberOfStepOfEachDirection = [];
		
		for(var i = 0 ; i < 6;i++ ){
			this.NumberOfStepOfEachDirection.push(-1);
		}
}



SmartPathFinding.prototype.findPathStep = function(map, seed , index , start , end) {
    var seed = (seed != undefined) ? seed : map.catTile;
	this.NumberOfStepOfEachDirection[index] += 1;
    if(map.isCellClicked(seed)) {
        return false;
    } else if(UtilCheck.outOfBound(seed)) {
		this.pathList.push(new Path(this.NumberOfStepOfEachDirection[index] , index ) );
		this.NumberOfStepOfEachDirection[index] -= 1;
        return true;
    }
    else {
        map.markCellColored(seed);
        var surrounding = map.getSurroundingTiles(seed);
		var temp = start;
		while(temp != end ){
            var tile = surrounding[temp];
            if(!map.isCellClicked(tile) && tile != map.catTile){
                this.findPathStep(map, tile , index , start , end)
            }
			temp++;
			if (temp > surrounding.length - 1 && end != surrounding.length ){
				temp = 0;
			}
        }
    }
	this.NumberOfStepOfEachDirection[index] -= 1;
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
		
		this.smallestValue = 0;
		this.shortestPathIndex = 0;
		
		this.pathList = [];
		var shortestPathList = [];
	  
		var surrounding = map.getSurroundingTiles(map.catTile);
	
		for(var i=0; i<  surrounding.length; ++i){
			for(var start=0; start<  surrounding.length; ++start){
				this.NumberOfStepOfEachDirection[i] = 0;
				var tile = surrounding[i];
				if(!map.isCellClicked(tile)){
					this.findPathStep(map.clone(),tile, i, start, surrounding.length - start );
				}
			  }
		  }
		  
		  for(var i = 0; i < this.pathList.length; i++ ){
			this.getSmallerStep(this.pathList[i].step_ , this.pathList[i].directionID_ + 1);
		  }
		  
		  	  
		  for(var i = 0; i < this.pathList.length; i++ ){
			if(this.smallestValue == this.pathList[i].step_){
				shortestPathList.push(this.pathList[i]);
			}
		  }
		  
		  this.shortestPathIndex = shortestPathList[Util.RandomRange(0,shortestPathList.length-1)].directionID_ + 1;
		  

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





