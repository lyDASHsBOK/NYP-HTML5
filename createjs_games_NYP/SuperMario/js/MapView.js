/**
 * Created by Enveesoft.
 * User: winstonho
 * Date: 14-9-10
 * Time: 16:08
 * Write the description in this section.
 */

//this function does the inheritance
BOK.inherits(MapView, createjs.Container);

/**
 * @ constructor
 * */
function MapView(x,y , MapModule , bgWidth) {
    //this line is a must-have in prototype-chain style inheritance
    //Compare to JAVA this works as super();
	
    createjs.Container.call(this);
	
	
	this.mapTiles = {};
	this.bgWidth_ = bgWidth;
	 
	this.firstLevel = MapModule.getMapData();
	
	
	this.mapWidth =  MapModule.mapWidth;
    this.mapHeight = MapModule.mapHeight;
	 

	
	
	 // animation frames are not required
     
	
	this.tileSheet = {
		// image to use
		images    : [imgContainer["imgs/tileSet2.png"]], 
		// width, height & registration point of each sprite
		frames    : {width: 16, height: 16 , regX: 0 , regY: 0}, 
	};
	
	
	this.tileSpriteSheet = new createjs.SpriteSheet(this.tileSheet);
	
	
	this.tileClone = [];	
	 for (var row = 0; row < this.mapHeight; row++) {
		this.tileClone.push([]);
	 }

        for (var row = 0; row < this.mapHeight; row++) {
            for (var col = 0; col < this.mapWidth; col++) {
					var image = new createjs.Bitmap(createjs.SpriteSheetUtils.extractFrame(this.tileSpriteSheet,this.firstLevel[row][col]));
					if(this.firstLevel[row][col] == 28){
					this.tileClone[row].push(new TileView(col * this.tileSheet.frames.width + 8,row * this.tileSheet.frames.height,image , 0) );
					}
					else{
						this.tileClone[row].push(new TileView(col * this.tileSheet.frames.width,row * this.tileSheet.frames.height,image , 0) );
					}
					if( this.tileClone[row][col].x > this.bgWidth_ - this.tileSheet.frames.width || this.tileClone[row][col].x < 0 ){
						this.tileClone[row][col].visible = false;
					}
					if(this.firstLevel[row][col] > -1){
					this.addChild(this.tileClone[row][col]);
				}
            }
        }
	this.x = x;
	this.y = y;
}

MapView.prototype.scrolLeft = function() {
	if(this.x > - ( (this.tileClone[0].length - 1) * this.tileSheet.frames.width - this.bgWidth_ ) ){
	this.x -= 3;
	  for (var row = 0; row < this.mapHeight; row++) {
            for (var col = 0; col < this.mapWidth; col++) {
				if(this.firstLevel[row][col] > -1){
					if( this.tileClone[row][col].x + this.x > this.bgWidth_ + this.tileSheet.frames.width || this.tileClone[row][col].x  + this.x < - this.tileSheet.frames.width ){
						this.tileClone[row][col].visible = false;
					}else{
						this.tileClone[row][col].visible = true;
					}
				}
            }
        }
		return true;
	}
	return false;
};
MapView.prototype.scrolRight = function() {
	if(this.x <= -this.tileSheet.frames.width *0.1){
		this.x += 3;
		  for (var row = 0; row < this.mapHeight; row++) {
				for (var col = 0; col < this.mapWidth; col++) {
					if(this.firstLevel[row][col] > -1){
						if( this.tileClone[row][col].x + this.x > this.bgWidth_ + this.tileSheet.frames.width || this.tileClone[row][col].x  + this.x < - this.tileSheet.frames.width ){
							this.tileClone[row][col].visible = false;
						}else{
							this.tileClone[row][col].visible = true;
						}
					}
				}
			}
			return true;
		}
	return false;
};

MapView.prototype.move = function(row,col) {
	this.tileClone[row][col].isMove = true;
	
};

MapView.prototype.update = function() {
  var start = Math.floor(this.x  * -1 / this.tileSheet.frames.width);
  for (var row = 0; row < this.mapHeight; row++) {
	for (var col = start ; col < start + 26; col++) {
			this.tileClone[row][col].move();
		}
	}
};

MapView.prototype.reset = function() {
  for (var row = 0; row < this.mapHeight; row++) {
	for (var col = 0 ; col < this.mapWidth ; col++) {
			this.tileClone[row][col].reset;
		}
	}
	this.x = 0;
	this.y = 0;
	
	for (var row = 0; row < this.mapHeight; row++) {
				for (var col = 0; col < this.mapWidth; col++) {
					if(this.firstLevel[row][col] > -1){
						if( this.tileClone[row][col].x + this.x > this.bgWidth_ + this.tileSheet.frames.width || this.tileClone[row][col].x  + this.x < - this.tileSheet.frames.width ){
							this.tileClone[row][col].visible = false;
						}else{
							this.tileClone[row][col].visible = true;
						}
					}
				}
			}
			
};

















