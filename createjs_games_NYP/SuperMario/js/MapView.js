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
		frames    : {width: 16, height: 16}, 
	};
	
	
	this.tileSpriteSheet = new createjs.SpriteSheet(this.tileSheet);
	

	this.tile = new createjs.Sprite(this.tileSpriteSheet);
	

	this.tileClone = [];	
	 for (var row = 0; row < this.mapHeight; row++) {
		this.tileClone.push([]);
	 }

        for (var row = 0; row < this.mapHeight; row++) {
            for (var col = 0; col < this.mapWidth; col++) {
				if(this.firstLevel[row][col] > -1){
					this.tileClone[row].push(this.tile.clone());
					this.tileClone[row][col].name = "t_" + row + "_" + col;
					this.tileClone[row][col].gotoAndStop(this.firstLevel[row][col]);
					this.tileClone[row][col].x = col * this.tileSheet.frames.width;
					this.tileClone[row][col].y = row * this.tileSheet.frames.height;
					if( this.tileClone[row][col].x > this.bgWidth_ - this.tileSheet.frames.width || this.tileClone[row][col].x < 0 ){
						this.tileClone[row][col].visible = false;
					}
					this.addChild(this.tileClone[row][col]);
				}
            }
        }
	this.x = x;
	this.y = y;
}












