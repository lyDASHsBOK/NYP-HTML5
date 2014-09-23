/**
 * @ constructor
 * */
function Game(stage, imgContainer){

	createjs.Sound.play("bgm",0,0,0,-1,1,0);
    this.stage_ = stage;
	
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.png"]);
	
	
	this.mapModule = new MapModule(20,213);
	this.keyBoard = new KeyBoardCode();
	this.mapView = new MapView(0,0,this.mapModule , this.bg.image.width);
	this.stage_.addEventListener('mousedown', Delegate.create(this,this.onMouseClick));
	this.mario = new Character(0+8,272+8);
	
	document.addEventListener("keydown", Delegate.create(this,this.keyBoardDown));
    document.addEventListener("keyup", Delegate.create(this,this.keyBoardUp));
};
/**
 * @ keyBoardDown
 * */
Game.prototype.keyBoardDown = function(e) {
		this.keyBoard.setKeyPress(e.keyCode,true);	
};
/**
 * @ keyBoardUp
 * */
Game.prototype.keyBoardUp = function(e) {
	if(this.keyBoard.getKeyPressThroughtName(" ") && !this.mario.jumping){
		this.mario.maxVelocity = -8;
		createjs.Sound.play("jumpsmall");
		this.mario.jump();
	}
	this.keyBoard.setKeyPress(e.keyCode,false);
};
/**
 * @ onMouseClick
 * */
Game.prototype.onMouseClick = function(e) {

};
Game.prototype.tick = function(e) {
	/*
	
	if(this.keyBoard.getKeyPressThroughtName("d")){
		this.mapView.scrolLeft();
	}
	
	if(this.keyBoard.getKeyPressThroughtName("a")){
		this.mapView.scrolRight();
	}*/
	
	
	
	
	
	if(this.keyBoard.getKeyPressThroughtName(" ") && !this.mario.jumping){
	
		if( this.mario.maxVelocity <= -15 ){
			this.mario.maxVelocity = -12;
			createjs.Sound.play("jumpsuper");
			this.mario.jump();
		}else{
			this.mario.maxVelocity -= 1;
		}
	}	
	
	if(this.keyBoard.getKeyPressThroughtName("d") && !this.CheckWalkableLeftRight(1)){	
		this.mario.moveRight();
		if(!this.mario.jumping){
			this.mario.walkRightAnimation();
		}
		if(this.mario.x >= this.bg.image.width * 0.5){
			if(this.mapView.scrolLeft()){
				this.mario.x = this.bg.image.width * 0.5;
			}
		}
	} else if(this.keyBoard.getKeyPressThroughtName("a") && !this.CheckWalkableLeftRight(-1)){
		this.mario.moveLeft();
		if(!this.mario.jumping){
			this.mario.walkLeftAnimation();
		}
		if(this.mario.x <= this.bg.image.width * 0.5){
			if(this.mapView.scrolRight()){
				this.mario.x = this.bg.image.width * 0.5;
			}
		}
	}else if(!this.mario.jumping){
		if(this.mario.currentSide == "Left"){
			this.mario.idleLeftAnimation();
		}else{
			this.mario.idleRightAnimation();
		}
	}
	
	this.mario.gravity();	
	
	this.mario.onGround  = this.CheckWalkableUpDown(-1);
	
	if(this.mario.onGround){
		this.mario.velocity = 0;
		this.mario.jumping = false;
	}else if(!this.mario.onGround){
		//this.mario.velocity = 0;
		this.mario.jumping = true;
	}
	
	if(!this.mario.onGround){
		if(this.CheckWalkableUpDown(1)){
			if( this.mario.velocity < 0){
				createjs.Sound.play("bump");
				this.mario.velocity *= -1;
			 }
		}
	}
	
	this.mapView.update();
	

};

Game.prototype.CheckWalkableLeftRight = function(dirx) {
        
        var formulaA, formulaB, formulaC, formulaD;
      
            formulaC = Math.floor((this.mario.y - this.mario.getHeight() * 0.5) / this.mapView.tileSheet.frames.height);
            formulaD = Math.floor((this.mario.y + this.mario.getHeight() * 0.5) / this.mapView.tileSheet.frames.height);
			
            if (dirx === -1) { // left
                formulaA = Math.floor(((this.mario.x - this.mario.getWidth() * 0.5 ) - this.mapView.x) / this.mapView.tileSheet.frames.width );
				var topLeft =  this.mapModule.walkable(formulaC ,formulaA);
                var bottomLeft = this.mapModule.walkable(formulaD , formulaA);
				
                return (topLeft && bottomLeft);
				
            } else if (dirx === 1) { // right
               formulaB = Math.floor(((this.mario.x - this.mario.getWidth() * 0.5) - this.mapView.x ) / this.mapView.tileSheet.frames.width);
			   var topRight = this.mapModule.walkable(formulaC,formulaB +1);
                var bottomRight = this.mapModule.walkable(formulaD , formulaB+1);
                return (topRight && bottomRight); 
            }
			
};

Game.prototype.CheckWalkableUpDown = function(diry) {
        
        var formulaA, formulaB, formulaC, formulaD;
      
            formulaC = Math.floor((this.mario.y - this.mario.getHeight() * 0.5) / this.mapView.tileSheet.frames.height);
            formulaD = Math.floor((this.mario.y + this.mario.getHeight() * 0.5) / this.mapView.tileSheet.frames.height);
			
            if (diry === 1) { // up
                formulaA = Math.floor(((this.mario.x - this.mario.getWidth() * 0.5 ) - this.mapView.x) / this.mapView.tileSheet.frames.width );
				formulaB = Math.floor(((this.mario.x + this.mario.getWidth() * 0.5 ) - this.mapView.x) / this.mapView.tileSheet.frames.width );
				
				var topLeft =  this.mapModule.walkable(formulaC ,formulaA);
                var topRight = this.mapModule.walkable(formulaC , formulaB);
				
				if(this.mapModule.getID(formulaC,formulaB) == 1 || this.mapModule.getID(formulaC,formulaA) == 1
				|| this.mapModule.getID(formulaC,formulaB) == 24 || this.mapModule.getID(formulaC,formulaA) == 24){
					
					if(topLeft){
						this.mapView.move(formulaC,formulaA);
					}
					else if(topRight){
						this.mapView.move(formulaC,formulaB);
					}
					
					return (topLeft || topRight);
				}
				else{
					return (topLeft && topRight);
				}
				
            } else if (diry === -1) { // down
               
			   if(this.mario.currentSide == "Right"){
			   formulaB = Math.floor(((this.mario.x - this.mario.getWidth() * 0.5) - this.mapView.x ) / this.mapView.tileSheet.frames.width);
			   }
			   else{
			   formulaB = Math.floor(((this.mario.x + this.mario.getWidth() * 0.5) - this.mapView.x ) / this.mapView.tileSheet.frames.width);
			   
			   }
			   formulaA = Math.floor(((this.mario.x ) - this.mapView.x ) / this.mapView.tileSheet.frames.width);
			   
			   var bottomLeft = this.mapModule.walkable(formulaD, formulaA);
                var bottomRight = this.mapModule.walkable(formulaD ,formulaB);
				var nextTile = this.mapModule.walkable(formulaD ,formulaB + 1)
				
				if( bottomLeft || bottomRight){
					this.mario.y =  formulaD   * this.mapView.tileSheet.frames.width - this.mapView.tileSheet.frames.width * 0.5;
				}
				
				return (bottomLeft || bottomRight); 
            }
};
/**
 * @ loadImage
 * */
Game.prototype.loadImage = function() {
		this.stage_.addChild(this.bg);
		this.stage_.addChild(this.mapView);
		this.stage_.addChild(this.mario);
};
/**
 * @ start
 * */
Game.prototype.start = function() {
	this.loadImage();
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};


