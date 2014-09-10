function GameClass(stage, imgContainer)
{
	console.log("hi!");
    this.stage_ = stage;
	this.bg = new createjs.Bitmap(imgContainer["imgs/bg.png"]);
	this.red = [];
	this.red.push(new Creep(1, 0));
	this.red.push(new Creep(0.1, 0));
	this.blue = new BlueCreep(2);
	
	for( var i = 0; i < this.red.length; i++){
		this.red[i].addEventListener('click', Delegate.create(this.red[i],this.red[i].destory));
	}
}

GameClass.prototype.tick = function(event) {
	for( var i = 0; i < this.red.length; i++){
			this.red[i].move();
			
			if(this.red[i].remove()){
				console.log("e!");
				if(this.stage_.removeChild(this.red[i])){
					console.log("s!");
					this.red.splice(i,1);
				}
			}
	}
   this.blue.move();
};

			

GameClass.prototype.loadImage = function() {
    this.blue.y = 150;
    this.stage_.addChild(this.bg);
	for( var i = 0; i < this.red.length; i++){
		this.stage_.addChild(this.red[i]);
	}
    this.stage_.addChild(this.blue);

};

GameClass.prototype.onMouseClick = function(e) {
    console.log('stage clicked!');
	/*if(this.stage_.removeChild(this.red)){
		this.stage_.addChild(this.red);
		this.red.x = 0;
	}*/
};

GameClass.prototype.start = function() {
    this.loadImage();

    //this is the proper way of monitoring system tick in createjs
	createjs.Ticker.addEventListener('tick', Delegate.create(this,this.tick));
};
