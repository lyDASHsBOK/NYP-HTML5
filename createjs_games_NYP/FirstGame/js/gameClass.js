


function GameClass(stage, imgContainer)
{
	
	console.log("hi!");
    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.png"]);
	this.red = new createjs.Bitmap(imgContainer["imgs/red.png"]);
	this.blue = new createjs.Bitmap(imgContainer["imgs/blue.png"]);
}

GameClass.prototype.loadImage = function() {
    this.blue.y = 150;
    this.stage_.addChild(this.bg);
    this.stage_.addChild(this.red);
    this.stage_.addChild(this.blue);

};

GameClass.prototype.onMouseClick = function(e) {
    console.log('clicked!');
};
GameClass.prototype.start = function() {
    this.loadImage();
};