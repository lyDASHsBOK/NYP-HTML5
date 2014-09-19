 /**
 * @ Note
 * left  = 1
 * topLeft = 2 
 * topRight = 3
 * Right = 4
 * bottomRight = 5
 * bottomLeft = 6
 * */


/**
 * @ constructor
 * */
function Game(stage, imgContainer){

    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.jpg"]);
	
	this.mapTileView = [];
	this.mapTileModel = new Map();

	this.gameOver = false;
	this.isWin = false;
	this.isMainMenu = true;
	this.mainMenu = new createjs.Bitmap(imgContainer["imgs/btn_start.png"]);
	this.mainMenu.scaleX = 1.65;
	this.mainMenu.scaleY = 1.65;
	this.mainMenu.y = 130;
	this.numberOfMove = 0;
	
	this.hud = new HUD();
	this.reply = new createjs.Bitmap(imgContainer["imgs/replay.png"]);
	this.reply.scaleX = this.hud.gameOver.scaleX;
	this.reply.scaleY = this.hud.gameOver.scaleY;
	this.reply.x = this.hud.x + 340;
	this.reply.y = this.hud.y + 500;
	
	this.pathFind = new SmartPathFinding();
	
	this.tempY = 500;
	this.tempX = 10;
	for(var  i = 0; i < 9; i++ ){
		for(var  j = 0; j < 9; j++ ){
			this.mapTileView.push(new Circle( j  * 65 + this.tempX,this.tempY, (i * 9) + j ) );
			this.mapTileModel.addCell(new Cell( i * 9 + j ) );
		}
		if( i % 2 == 0 ){
			this.tempX  = 40;
		}
		else{
			this.tempX  = 10;
		}
		
		this.tempY  += 60;
	}
	
	this.numberOfColorTileAtStart =   Math.floor(Util.RandomRange(5,15));
	

	
	 for(var i = 0; i < this.numberOfColorTileAtStart; i++){
		 this.temp =  Math.floor(Util.RandomRange(0,80));
		 if( this.temp >= 36 &&  this.temp <= 44){
			this.temp +=10;
		 }
		if(!this.mapTileModel.isCellClicked(this.temp)){
			this.mapTileView[this.temp].changeColor();
			this.mapTileModel.markCellColored(this.temp);
		 }
	 }
	 
	var startTile = 40;
	this.cat = new CAT(this.mapTileView[startTile].x , this.mapTileView[startTile].y - this.mapTileView[startTile].getRadius()*2,  startTile);
	this.mainMenu.addEventListener('mousedown', Delegate.create(this,this.startGame));
	this.reset();

};
/**
 * @ tick
 * */
Game.prototype.startGame = function(e) {
	this.isMainMenu = false;
	this.stage_.removeChild(this.mainMenu);
	this.mainMenu.removeEventListener('mouseDown');
	this.stage_.addEventListener('click', Delegate.create(this,this.onMouseClick));
};
/**
 * @ checkGameOver
 * */
Game.prototype.checkGameOver = function(){
};
/**
 * @ loadImage
 * */
Game.prototype.loadImage = function() {
    	this.stage_.addChild(this.bg);
		for(var i =0; i < this.mapTileView.length; i++)
		{
			this.stage_.addChild(this.mapTileView[i]);
		}
		this.stage_.addChild(this.cat);
		this.stage_.addChild(this.hud);
		this.stage_.addChild(this.mainMenu);
};
/**
 * @ reset
 * */
Game.prototype.reset = function() {
	
	//reset floor tile
	for(var  i = 0; i < 81; i++ ){
		this.mapTileView[i].reset();
		this.mapTileModel.markCellBlank(i);
	}
	this.numberOfColorTileAtStart =   Math.floor(Util.RandomRange(5,15));
	 for(var i = 0; i < this.numberOfColorTileAtStart; i++){
		 this.temp =  Math.floor(Util.RandomRange(0,80));
		 if( this.temp >= 36 &&  this.temp <= 44){
			this.temp +=10;
		 }
		 
		if(!this.mapTileModel.isCellClicked(this.temp)){
			this.mapTileView[this.temp].changeColor();
			this.mapTileModel.markCellColored(this.temp);
		 }
	 }
	 
	 //reset AI
	var startTile = 40;
	this.cat.x = this.mapTileView[startTile].x ;
	this.cat.y = this.mapTileView[startTile].y - this.mapTileView[startTile].getRadius()*2;
	this.cat.whichTile_ = startTile;
	this.cat.isWeiZhu = false;
	this.cat.changeAnimation();
	
	 this.mapTileModel.setCatTile(this.cat.whichTile_);


	
	if(this.gameOver){
		this.hud.addGameOver(false);
	}
	if(this.isWin){
		this.hud.addWining(false , 0);
	}
	this.gameOver = false;
	this.isWin = false;
	this.numberOfMove = 0;
};
/**
 * @ restart
 * */
Game.prototype.restart = function(e) {
	this.hud.addGameOver(false);
	this.reply.removeEventListener('mousedown');
	this.stage_.removeChild(this.reply);
	this.stage_.addEventListener('click', Delegate.create(this,this.onMouseClick));
	this.reset();
};

/**
 * @ onMouseClick
 * */
Game.prototype.onMouseClick = function(e) {
	/**
	 * @ tile change color
	 * check the range of all the tile
	 * find the column array position 
	 * check whether it click before
	 * else change the color of the tile
	 * */
	if( e.localY > 500 && e.localY < 1140 && !this.gameOver && !this.isMainMenu && !this.isWin){
		var tempYValue = Math.floor((e.localY - 500) / 60) ;
		for(var i = tempYValue *9; i <  tempYValue *9 + 9; i++ ){
			if( Util.collision(this.mapTileView[i].x + this.mapTileView[i].getRadius() ,this.mapTileView[i].y + this.mapTileView[i].getRadius(), this.mapTileView[i].getRadius() , e.localX ,e.localY) &&  !this.mapTileModel.isCellClicked(i) ){
				
				this.numberOfMove +=1;
				this.mapTileModel.markCellColored(i);
                this.mapTileModel.setCatTile(this.cat.whichTile_);
				this.mapTileView[i].changeColor();

		
				//find the cat which row is on
				this.catWhichRow = Math.floor((this.cat.y + this.mapTileView[40].getRadius()*2 - 500) / 60) ;
				if(!this.cat.isWeiZhu){
					this.moveDecision( this.pathFind.findPath( this.mapTileModel.clone() ) );
				}else{
					var surrounding = this.mapTileModel.getSurroundingTiles(this.mapTileModel.catTile);
					console.log(this.mapTileModel.catTile);
					for(var i = 0;i < surrounding.length; i++){
						if(!this.mapTileModel.isCellClicked(surrounding[i])){
							this.moveDecision(i + 1);	
							break;
						}
					
					}
					this.moveDecision(this.pathFind.DIRECTION.NO_DIRECTION);
				}
			}
		}
	}
};
/**
 * @ moveDecision
 * decide which direction to move
 * base on the value pass in
 * compare it with the cat position
 * with the hive
 * */
Game.prototype.moveDecision = function(desination){
	//console.log(desination);
	if(desination  == this.pathFind.DIRECTION.LEFT){
		this.moveLeft();
	}else if( desination == this.pathFind.DIRECTION.TOP_LEFT){
		this.moveTopLeft();
	}else if( desination == this.pathFind.DIRECTION.TOP_RIGHT){
		this.moveTopRight();
	}else if(desination == this.pathFind.DIRECTION.RIGHT){
		this.moveRight();
	}else if(desination == this.pathFind.DIRECTION.BOTTOM_RIGHT){
		this.moveBottomRight();
	}else if(desination == this.pathFind.DIRECTION.BOTTOM_LEFT){
		this.moveBottomLeft();
	}
	else if(desination == this.pathFind.DIRECTION.NO_DIRECTION){
			 this.checkCondition();
	}
};
Game.prototype.checkCondition = function(){
		if( UtilCheck.checkLose(this.mapTileModel.clone()) ){
				this.gameOver = true;
				this.hud.addGameOver(true);
				this.stage_.addChild(this.reply);
				this.stage_.removeEventListener('click');
				this.reply.addEventListener('mousedown', Delegate.create(this,this.restart));
		}else if(UtilCheck.checkWin(this.mapTileModel.clone())){
				this.isWin = true;
				this.hud.addWining(true , this.numberOfMove);
				this.stage_.addChild(this.reply);
				this.stage_.removeEventListener('click');
				this.reply.addEventListener('mousedown', Delegate.create(this,this.restart));
		
		}else if(UtilCheck.checkWeiZhu(this.mapTileModel.clone())){
			this.cat.isWeiZhu = true;
			this.cat.changeAnimation();
		}
}

/**
 * @ movement
 * find the cat at which row,
 * decide how much to add or minus depend on row
 * moveLeft() & moveRight() does not affected
 * */
Game.prototype.moveTopLeft = function(){
	if(this.catWhichRow % 2 == 0){
		if(  this.cat.whichTile_ -10 > 0 && this.cat.whichTile_  !=  this.catWhichRow * 9 ){
			this.cat.x = this.mapTileView[this.cat.whichTile_ -10].x;
			this.cat.y = this.mapTileView[this.cat.whichTile_ -10].y - this.mapTileView[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ - 10;
		}
	}
	else{
		if( this.cat.whichTile_ -9 > 0 ){
			this.cat.x = this.mapTileView[this.cat.whichTile_ -9].x;
			this.cat.y = this.mapTileView[this.cat.whichTile_ - 9].y - this.mapTileView[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ -9;
		}
	}
	 this.mapTileModel.setCatTile(this.cat.whichTile_);
};

Game.prototype.moveTopRight = function(){
	if(this.catWhichRow % 2 == 0){
		if(  this.cat.whichTile_ - 9 > 0 ){
			this.cat.x = this.mapTileView[this.cat.whichTile_ - 9].x;
			this.cat.y = this.mapTileView[this.cat.whichTile_ - 9].y - this.mapTileView[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ - 9;
		}
	}
	else{
		if( this.cat.whichTile_ -8 > 0 &&  this.cat.whichTile_  !=  this.catWhichRow * 9 + 8){
			this.cat.x = this.mapTileView[this.cat.whichTile_ -8].x;
			this.cat.y = this.mapTileView[this.cat.whichTile_ - 8].y - this.mapTileView[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ -8;
		}
	}
	 this.mapTileModel.setCatTile(this.cat.whichTile_);
};

Game.prototype.moveLeft = function(){
	if( this.cat.whichTile_ -1 >= this.catWhichRow*9 ){
		this.cat.x = this.mapTileView[this.cat.whichTile_ -1].x;
		this.cat.whichTile_ = this.cat.whichTile_ -1;
	}
	 this.mapTileModel.setCatTile(this.cat.whichTile_);
};

Game.prototype.moveRight = function(){
	if( this.cat.whichTile_ + 1 <= this.catWhichRow*9 + 8 ){
		this.cat.x = this.mapTileView[this.cat.whichTile_ +1].x;
		this.cat.whichTile_ = this.cat.whichTile_ +1;
	}
	 this.mapTileModel.setCatTile(this.cat.whichTile_);
};

Game.prototype.moveBottomLeft = function(){
	if(this.catWhichRow % 2 == 0){
		if(  this.cat.whichTile_ + 8 < 80 && this.cat.whichTile_  !=  this.catWhichRow * 9 ){
			this.cat.x = this.mapTileView[this.cat.whichTile_ + 8].x;
			this.cat.y = this.mapTileView[this.cat.whichTile_ + 8].y - this.mapTileView[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ +8;
		}
	}
	else{
		if( this.cat.whichTile_ + 9 < 80 ){
			this.cat.x = this.mapTileView[this.cat.whichTile_  + 9].x;
			this.cat.y = this.mapTileView[this.cat.whichTile_ + 9].y - this.mapTileView[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ +9;
		}
	}
	this.mapTileModel.setCatTile(this.cat.whichTile_);
};
Game.prototype.moveBottomRight = function(){
	if(this.catWhichRow % 2 == 0){
		if( this.cat.whichTile_ + 9 < 80  ){
			this.cat.x = this.mapTileView[this.cat.whichTile_ + 9].x;
			this.cat.y = this.mapTileView[this.cat.whichTile_ + 9].y - this.mapTileView[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ + 9;
		}
	}
	else{
		if( this.cat.whichTile_ + 10 < 80 &&  this.cat.whichTile_  !=  this.catWhichRow * 9 + 8 ){
			this.cat.x = this.mapTileView[this.cat.whichTile_ + 10].x;
			this.cat.y = this.mapTileView[this.cat.whichTile_ + 10].y - this.mapTileView[40].getRadius()*2;
			this.cat.whichTile_ = this.cat.whichTile_ + 10;
		}
	}
	this.mapTileModel.setCatTile(this.cat.whichTile_);
};
/**
 * @ start
 * */
Game.prototype.start = function() {
	this.loadImage();
};