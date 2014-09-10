
function GameClass(stage, imgContainer)
{
	console.log("hi!");
    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.png"]);
	this.red = new Creep(1);
	this.blue = new createjs.Bitmap(imgContainer["imgs/blue.png"]);
	this.blue = new BlueCreep(2);
	
    this.bg.addEventListener('click', this.onMouseClick);

}

GameClass.prototype.tick = function() {
	this.red.move();
	this.blue.move();
};

GameClass.prototype.loadImage = function() {
    this.blue.y = 150;
    this.stage_.addChild(this.bg);
    this.stage_.addChild(this.red);
    this.stage_.addChild(this.blue);

};

GameClass.prototype.onMouseClick = function(e) {
    console.log('stage clicked!');
};

GameClass.prototype.start = function() {
    this.loadImage();
	this.red.addEventListener('tick' Delegate.create(this, this.tick);
};

