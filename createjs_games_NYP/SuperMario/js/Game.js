/**
 * @ constructor
 * */
function Game(stage, imgContainer){

	createjs.Sound.play("bgm",0,0,0,-1,1,0);
    this.stage_ = stage;
	
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.png"]);
	
	this.hud = new HUD();
	
	this.mapModule = new MapModule(20,213);
	this.keyBoard = new KeyBoardCode();
	this.mapView = new MapView(0,0,this.mapModule , this.bg.image.width);
	this.stage_.addEventListener('mousedown', Delegate.create(this,this.onMouseClick));
	this.mario = new Character(0+8,272+8);
	
	this.fireBall = [];
	this.fireBall.push ( new FireBall(0,0) );
	this.fireBall.push ( new FireBall(0,0) );
	
	this.timeCountDown = 400;
	this.scoreCount = 0;
	this.coinCount = 0;
	this.musicChange = false;
	
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
	if(this.keyBoard.getKeyPressThroughtName(" ") && !this.mario.jumping && this.mario.alive){
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

	if(this.timeCountDown < 100 && !this.musicChange){
		createjs.Sound.stop("bgm");
		createjs.Sound.play("bgm1");
		this.musicChange = true;
	}
	this.timeCountDown -= (e.delta/1000);
	
	this.hud.update(this.timeCountDown, this.scoreCount, this.coinCount);
	
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
			
			for( var j = 0; j < this.monster.length ; j ++){
						if(  this.monster[j].x < this.stage_.dWidth_ + this.monster[j].getWidth() && this.monster[j].x > -this.monster[j].getWidth() && this.monster[j].alive ){
							if(Util.boxCollision(this.fireBall[i].x, this.fireBall[i].y, this.fireBall[i].getWidth() * 0.5 , this.fireBall[i].getHeight() * 0.5,
								this.monster[j].x, this.monster[j].y, this.monster[j].getWidth() * 0.5, this.monster[j].getHeight() * 0.5)){
								this.fireBall[i].setToBomb();
								this.monster[j].dead(2);
								this.scoreCount += 100;
								createjs.Sound.play("kick");
							}
						}
					}
		}
		
		if( this.fireBall[i].x < 0 || this.fireBall[i].x > this.stage_.dWidth_){
			this.fireBall[i].setAliveFalse();
		}
		
	}
	
	if(this.keyBoard.getKeyPressThroughtName(" ") && !this.mario.jumping && this.mario.alive){
	
		if( this.mario.count > 3 ){
			createjs.Sound.play("jumpsuper");
			this.mario.jump(-12);
		}else{
			this.mario.count += 1;
		}
	}

	if(this.keyBoard.getKeyPressThroughtName("r") && this.mario.gameOver){
		this.reset();
	}	
	
	if(this.keyBoard.getKeyPressThroughtName("d") && !this.CheckWalkableLeftRight(1,this.mario) && this.mario.alive){	
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
	} else if(this.keyBoard.getKeyPressThroughtName("a") && !this.CheckWalkableLeftRight(-1,this.mario) && this.mario.alive){
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
	}else if(!this.mario.jumping && this.mario.alive){
		if(this.mario.currentSide == "Left"){
			this.mario.idleLeftAnimation();
		}else{
			this.mario.idleRightAnimation();
		}
	}
	
	this.mario.gravity();	
	
	if(this.mario.alive){
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
	}
	

	
	this.mario.update(e.delta/1000);	
	
	this.checkMonsterandPlayer();
	
	this.mapView.update();
	
	if(this.mario.gameOver){
		this.hud.ShowGameOver();
	}
	
	if(this.getMarioTileIDAt(true,false) == 379 || this.getMarioTileIDAt(true,false) == 36){
		this.hud.ShowGameOver();
	}
	

};
Game.prototype.checkMonsterandPlayer = function() {

		// if mario is invisible
	if(this.mario.getAlpha() != 0.5 && this.mario.alive){
		var Check = false;
		// collision for monster and character
		for( var i = 0; i < this.monster.length ; i ++){
			if(  this.monster[i].x < this.stage_.dWidth_  + this.monster[i].getWidth()  && this.monster[i].x > -this.monster[i].getWidth() * 1.1){
				this.monster[i].update();
				if(this.monster[i].isDead() && this.monster[i].isDead2()){
				
				Check =	Util.boxCollision(this.mario.x, this.mario.y, this.mario.getWidth() * 0.5, this.mario.getHeight() * 0.5,
						this.monster[i].x, this.monster[i].y, this.monster[i].getWidth() * 0.5 , this.monster[i].getHeight() * 0.5);

					if(Check){
						if( (this.mario.y  < this.monster[i].y && this.mario.size =="small")|| (this.mario.y + this.mario.getHeight() * 0.5 < this.monster[i].y && this.mario.size !="small") ){
							this.monster[i].currentSide = this.mario.currentSide;
							this.monster[i].dead(1);
							this.scoreCount += 100;
							createjs.Sound.play("stomp");
							this.mario.jump(-4);
							break;
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
						if( this.monster[j].x < this.stage_.dWidth_ + this.monster[j].getWidth() && this.monster[j].x > -this.monster[j].getWidth() && i !=j && this.monster[j].isDead() && this.monster[j].isDead2()){
							if(Util.boxCollision(this.monster[i].x, this.monster[i].y, this.monster[i].getWidth() * 0.5 , this.monster[i].getHeight() * 0.5,
								this.monster[j].x, this.monster[j].y, this.monster[j].getWidth() * 0.5, this.monster[j].getHeight() * 0.5)){
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
	   formulaB = Math.floor(((object.x + object.getWidth() * 0.5) - this.mapView.x ) / this.mapView.tileSheet.frames.width);
	   var topRight = this.mapModule.walkable(formulaC,formulaB);
		var bottomRight = this.mapModule.walkable(formulaD , formulaB);
		return (topRight && bottomRight); 
	}
	
};
Game.prototype.getMarioTileIDAt = function( xDirection , yDirection ) {
    var formulaA, formulaB, formulaC, formulaD;

	formulaC = Math.floor((this.mario.y) / this.mapView.tileSheet.frames.height);
	formulaD = Math.floor((this.mario.y - this.mario.getHeight() * 0.5) / this.mapView.tileSheet.frames.height);
	
	if (xDirection) { // left
		
		if(this.mario.currentSide == "Left"){
			formulaB = Math.floor(((this.mario.x - this.mario.getWidth() * 0.5 ) - this.mapView.x) / this.mapView.tileSheet.frames.width );
		}
		else{
			formulaB = Math.floor(((this.mario.x + this.mario.getWidth() * 0.5) - this.mapView.x ) / this.mapView.tileSheet.frames.width);
		}
		return this.mapModule.getID(formulaC,formulaB);
		
	} else if (yDirection) { // right
	  formulaB = Math.floor(((this.mario.x ) - this.mapView.x) / this.mapView.tileSheet.frames.width );
	  return this.mapModule.getID(formulaD,formulaB);
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
		this.stage_.addChild(this.hud);
};
/**
 * @ reset
 * */
Game.prototype.reset = function() {
	this.mapView.reset();
	this.mario.reset();
	this.timeCountDown = 400;
	this.scoreCount = 0;
	this.coinCount = 0;
	
	for( var i=0; i < this.fireBall.length ; i++){
		this.fireBall[i].reset();
	}
	for( var i=0; i < this.monster.length ; i++){
		this.monster[i].reset();
	}
	this.keyBoard.reset();
	this.hud.reset();
};
/**
 * @ start
 * */
Game.prototype.start = function() {
	this.loadImage();
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};


