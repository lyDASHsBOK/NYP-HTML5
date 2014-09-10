function GameClass(stage, imgContainer)
{
	
	console.log("hi!");
    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.png"]);
	this.red = new Creep(1);
	this.blue = new BlueCreep(2);

   // this.bg.addEventListener('click', this.onMouseClick);
	

}

GameClass.prototype.tick = function(event) {
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

    //this is the proper way of monitoring system tick in createjs
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};


=======

    //this is the proper way of monitoring system tick in createjs
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};
>>>>>>> 68985ea6199f58a8b21bba9f478b74f4a29bad86
