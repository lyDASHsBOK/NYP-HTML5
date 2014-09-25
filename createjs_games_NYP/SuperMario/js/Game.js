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
	
	this.fireBall = [];
	this.fireBall.push ( new FireBall(0,0) );
	this.fireBall.push ( new FireBall(0,0) );
	
	this.timeCountDown = 400;
	
	this.monster = [];
	this.monster.push( new Monster(340,220, "mushroom") );
	this.monster.push( new Monster(500,280, "mushroom") );
	this.monster.push( new Monster(650,280, "mushroom") );
	this.monster.push( new Monster(680,280, "mushroom") );
	this.monster.push( new Monster(1300,160, "mushroom") );
	this.monster.push( new Monster(1350,160, "mushroom") );
	this.monster.push( new Monster(1500,280, "mushroom") );
	this.monster.push( new Monster(1550,280, "mushroom") );
	this.monster.push( new Monster(1600,260, "turtle") );
	this.monster.push( new Monster(1700,280, "mushroom") );
	this.monster.push( new Monster(1750,280, "mushroom") );
	this.monster.push( new Monster(1800,280, "mushroom") );
	this.monster.push( new Monster(1850,280, "mushroom") );
	this.monster.push( new Monster(2400,280, "mushroom") );
	this.monster.push( new Monster(2600,280, "mushroom") );
	
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
		createjs.Sound.play("jumpsmall");
		this.mario.jump(-8);
	}
	if(this.keyBoard.getKeyPressThroughtName("x")){
		this.mario.growth();
	}
	if(this.keyBoard.getKeyPressThroughtName("z") && this.mario.size == "redlarge"){
		
		for( var i = 0; i < this.fireBall.length ; i++){
			if(!this.fireBall[i].visible){
				this.fireBall[i].shoot( this.mario.clone() );
				createjs.Sound.play("fireball");
				break;
			}
		}
	}
	this.keyBoard.setKeyPress(e.keyCode,false);
};
/**
 * @ onMouseClick
 * */
Game.prototype.onMouseClick = function(e) {

};
Game.prototype.tick = function(e) {

	for( var i = 0; i < this.fireBall.length ; i++){
		if(this.fireBall[i].getAlive()){
	
		
			var checkFireBallCollide = false;
			if(this.fireBall[i].currentSide == "Left"){
				checkFireBallCollide = this.CheckWalkableLeftRight(-1,this.fireBall[i]);
				
			}
			else{
				checkFireBallCollide = this.CheckWalkableLeftRight(1,this.fireBall[i]);
			}
						
			if(checkFireBallCollide){
				this.fireBall[i].setToBomb();
			}
			
			if(this.fireBall[i].state != "bomb"){
				if(this.CheckWalkableUpDown(-1,this.fireBall[i])){
					this.fireBall[i].setToBounce();
				}
			}
				
			this.fireBall[i].update((e.delta/200));
		}
		
		if( this.fireBall[i].x < 0 || this.fireBall[i].x > this.stage_.dWidth_){
			this.fireBall[i].setAliveFalse();
		}
		
			for( var j = 0; j < this.monster.length ; j ++){
						if(  this.monster[j].x < this.stage_.dWidth_ + this.monster[j].getWidth() && this.monster[j].x > -this.monster[j].getWidth() && this.monster[j].alive ){
							if(Util.boxCollision(this.fireBall[i].x, this.fireBall[i].y, this.fireBall[i].getWidth() * 0.5 , this.fireBall[i].getHeight() * 0.5,
								this.monster[j].x, this.monster[j].y, this.monster[j].getWidth() * 0.5, this.monster[j].getHeight() * 0.5, 1)){
								this.fireBall[i].setToBomb();
								this.monster[j].dead(2);
								createjs.Sound.play("kick");
								break;
							}
						}
					}
		
	}
	
	this.timeCountDown -= (e.delta/1000);
	
	if(this.keyBoard.getKeyPressThroughtName(" ") && !this.mario.jumping){
	
		if( this.mario.count > 3 ){
			createjs.Sound.play("jumpsuper");
			this.mario.jump(-12);
		}else{
			this.mario.count += 1;
		}
	}	
	
	if(this.keyBoard.getKeyPressThroughtName("d") && !this.CheckWalkableLeftRight(1,this.mario)){	
		this.mario.moveRight();
		if(!this.mario.jumping){
			this.mario.walkRightAnimation();
		}
		if(this.mario.x >= this.bg.image.width * 0.5){
			if(this.mapView.scrolLeft()){
				this.mario.x = this.bg.image.width * 0.5;
				for( var i = 0; i < this.monster.length ; i ++){
					this.monster[i].x  -= 3;
				}
				for( var i = 0; i < this.fireBall.length ; i++){
					this.fireBall[i].x -=3;
				}
			}
		}
	} else if(this.keyBoard.getKeyPressThroughtName("a") && !this.CheckWalkableLeftRight(-1,this.mario)){
		this.mario.moveLeft();
		if(!this.mario.jumping){
			this.mario.walkLeftAnimation();
		}
		if(this.mario.x <= this.bg.image.width * 0.5){
			if(this.mapView.scrolRight()){
				this.mario.x = this.bg.image.width * 0.5;
				for( var i = 0; i < this.monster.length ; i ++){
					this.monster[i].x  += 3;
				}
				for( var i = 0; i < this.fireBall.length ; i++){
					this.fireBall[i].x +=3;
				}
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
	
	this.mario.onGround  = this.CheckWalkableUpDown(-1 ,this.mario);
	
	if(this.mario.onGround){
		this.mario.velocity = 0;
		this.mario.jumping = false;
	}else if(!this.mario.onGround){
		this.mario.jumping = true;
	}
	
	if(!this.mario.onGround){
		if(this.CheckWalkableUpDown(1 ,this.mario)){
			if( this.mario.velocity < 0){
				createjs.Sound.play("bump");
				this.mario.velocity *= -1;
			 }
		}
	}
	
	// if mario is invisible
	if(this.mario.getAlpha() != 0.5){
		var leftCheck = false;
		var rightCheck = false;
		// collision for monster and character
		for( var i = 0; i < this.monster.length ; i ++){
			if(  this.monster[i].x < this.stage_.dWidth_  + this.monster[i].getWidth()  && this.monster[i].x > -this.monster[i].getWidth() * 1.1){
				this.monster[i].update();
			if(this.monster[i].alive){
				
					leftCheck =	Util.boxCollision(this.mario.x, this.mario.y, this.mario.getWidth() * 0.5, this.mario.getHeight() * 0.5,
							this.monster[i].x, this.monster[i].y, this.monster[i].getWidth() * 0.5 , this.monster[i].getHeight() * 0.5 , -1);
		
					rightCheck = Util.boxCollision(this.mario.x, this.mario.y, this.mario.getWidth() * 0.5, this.mario.getHeight() * 0.5,
							this.monster[i].x, this.monster[i].y, this.monster[i].getWidth() * 0.5 , this.monster[i].getHeight() * 0.5, 1);
							
						if(leftCheck || rightCheck){
							console.log(this.monster[i].y + ":" + (this.mario.y + this.mario.getHeight() * 0.5 ) )
							if( (this.mario.y  < this.monster[i].y && this.mario.size =="small")|| (this.mario.y + this.mario.getHeight() * 0.5 < this.monster[i].y && this.mario.size !="small") ){
								this.monster[i].dead(1);
								createjs.Sound.play("stomp");
								this.mario.jump(-4);
							}else{
								this.mario.deadAnimation();
							}
						}
						
					this.monster[i].onGround = this.CheckWalkableUpDown(-1 ,this.monster[i]);
					
					if(this.monster[i].onGround){
						if( this.CheckWalkableLeftRight(1,this.monster[i]) || this.CheckWalkableLeftRight(-1,this.monster[i]) ){
							this.monster[i].changeDirection();
						}
					}
					
					for( var j = 0; j < this.monster.length ; j ++){
						if(  this.monster[j].x < this.stage_.dWidth_ + this.monster[j].getWidth() && this.monster[j].x > -this.monster[j].getWidth() && i !=j){
							if(Util.boxCollision(this.monster[i].x, this.monster[i].y, this.monster[i].getWidth() * 0.5 , this.monster[i].getHeight() * 0.5,
								this.monster[j].x, this.monster[j].y, this.monster[j].getWidth() * 0.5, this.monster[j].getHeight() * 0.5, 1)){
								this.monster[i].changeDirection();
								this.monster[j].changeDirection();
								break;
							}
						}
					}
						
				}
			}
		}
	}
	
	this.mario.update(e.delta/1000);
	
	this.mapView.update();
	

};

Game.prototype.CheckWalkableLeftRight = function(dirx , object) {
        var formulaA, formulaB, formulaC, formulaD;
      
            formulaC = Math.floor((object.y) / this.mapView.tileSheet.frames.height);
            formulaD = Math.floor((object.y + object.getHeight() * 0.5) / this.mapView.tileSheet.frames.height);
			
            if (dirx === -1) { // left
                formulaA = Math.floor(((object.x - object.getWidth() * 0.5 ) - this.mapView.x) / this.mapView.tileSheet.frames.width );
				var topLeft =  this.mapModule.walkable(formulaC ,formulaA );
                var bottomLeft = this.mapModule.walkable(formulaD , formulaA );
				
                return (topLeft && bottomLeft);
				
            } else if (dirx === 1) { // right
               formulaB = Math.floor(((object.x - object.getWidth() * 0.5) - this.mapView.x ) / this.mapView.tileSheet.frames.width);
			   var topRight = this.mapModule.walkable(formulaC,formulaB +1);
                var bottomRight = this.mapModule.walkable(formulaD , formulaB+1);
                return (topRight && bottomRight); 
            }
			
};

Game.prototype.CheckWalkableUpDown = function(diry ,object) {
        
        var formulaA, formulaB, formulaC, formulaD;
      
            formulaC = Math.floor((object.y - object.getHeight() * 0.5) / this.mapView.tileSheet.frames.height);
            formulaD = Math.floor((object.y + object.getHeight() * 0.5) / this.mapView.tileSheet.frames.height);
			
            if (diry === 1) { // up
                formulaA = Math.floor(((object.x - object.getWidth() * 0.5 ) - this.mapView.x) / this.mapView.tileSheet.frames.width );
				formulaB = Math.floor(((object.x + object.getWidth() * 0.5 ) - this.mapView.x) / this.mapView.tileSheet.frames.width );
				
				var topLeft =  this.mapModule.walkable(formulaC ,formulaA);
                var topRight = this.mapModule.walkable(formulaC , formulaB);
				
				if(this.mapModule.getID(formulaC,formulaB) == 1 || this.mapModule.getID(formulaC,formulaA) == 1
				|| this.mapModule.getID(formulaC,formulaB) == 24 || this.mapModule.getID(formulaC,formulaA) == 24){
					
					var formulaCenterX = Math.floor(((object.x  - this.mapView.x) / this.mapView.tileSheet.frames.width ))
					if(topLeft){
						if(object.currentSide == "Right"){
							this.mapView.move(formulaC,formulaA);
						}
						else{
							this.mapView.move(formulaC,formulaCenterX);
						}
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
               
			   if(object.currentSide == "Right"){
					formulaB = Math.floor(((object.x + object.getWidth() * 0.3) - this.mapView.x ) / this.mapView.tileSheet.frames.width);
			   }
			   else{
			   formulaB = Math.floor(((object.x - object.getWidth() * 0.3) - this.mapView.x ) / this.mapView.tileSheet.frames.width);
			   }
			   formulaA = Math.floor(((object.x ) - this.mapView.x ) / this.mapView.tileSheet.frames.width);
			   
			   var bottomLeft = this.mapModule.walkable(formulaD, formulaA);
                var bottomRight = this.mapModule.walkable(formulaD ,formulaB);
				if( bottomLeft || bottomRight){
					object.y =  formulaD   * this.mapView.tileSheet.frames.width - object.getHeight() * 0.5 ;
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
		for( var i=0; i < this.fireBall.length ; i++){
			this.stage_.addChild(this.fireBall[i]);
		}
		
		for( var i=0; i < this.monster.length ; i++){
			this.stage_.addChild(this.monster[i]);
		}
};
/**
 * @ start
 * */
Game.prototype.start = function() {
	this.loadImage();
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};


