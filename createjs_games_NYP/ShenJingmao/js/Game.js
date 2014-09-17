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
	
	this.simplePathFind = new SimplePathFinding();
	
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
		 }
	 }
	 
	 //reset AI
	var startTile = 40;
	this.cat.x = this.mapTileView[startTile].x ;
	this.cat.y = this.mapTileView[startTile].y - this.mapTileView[startTile].getRadius()*2;
	this.cat.whichTile_ = startTile;
	this.cat.isWeiZhu = false;
	this.cat.changeAnimation();


	
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
	

				if(this.simplePathFind.leftCheck(this.mapTileModel.clone()))
				{

					this.moveLeft();
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
	/*if(this.pathFind.hiveCheck[1].value_ == desination){
		this.moveTopLeft();
	}else if(this.pathFind.hiveCheck[2].value_ == desination){
		this.moveTopRight();
	}else if(this.pathFind.hiveCheck[3].value_ == desination){
		this.moveLeft();
	}else if(this.pathFind.hiveCheck[4].value_ == desination){
		this.moveRight();
	}else if(this.pathFind.hiveCheck[5].value_ == desination){
		this.moveBottomLeft();
	}else if(this.pathFind.hiveCheck[6].value_ == desination){
		this.moveBottomRight();
	}*/
};
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
};

Game.prototype.moveLeft = function(){
	if( this.cat.whichTile_ -1 >= this.catWhichRow*9 ){
		this.cat.x = this.mapTileView[this.cat.whichTile_ -1].x;
		this.cat.whichTile_ = this.cat.whichTile_ -1;
	}
};

Game.prototype.moveRight = function(){
	if( this.cat.whichTile_ + 1 <= this.catWhichRow*9 + 8 ){
		this.cat.x = this.mapTileView[this.cat.whichTile_ +1].x;
		this.cat.whichTile_ = this.cat.whichTile_ +1;
	}
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
};
/**
 * @ start
 * */
Game.prototype.start = function() {
	this.loadImage();
};