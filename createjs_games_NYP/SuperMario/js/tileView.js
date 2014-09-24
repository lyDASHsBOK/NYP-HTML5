BOK.inherits(tileView, createjs.Container);

function tileView (x,y,image,type){
	
	createjs.Container.call(this);
	
	this.image_ = image;
	this.type_ = type; 
	
	this.addChild(this.image_);
	

	this.orginalY = y;
	
	this.x = x;
	this.y = y;
	
	this.MoveY = 2;
	this.isMove =  false;
	this.tempY = 0.5;
}



tileView.prototype.move = function(){
	if(this.isMove == true){
	
		
		if(this.MoveY < 0){
			this.tempY *=-2
		}
		this.y -= this.tempY;
		this.MoveY -= this.tempY;
		
		if(this.MoveY > 2){
			this.MoveY = 2;
			this.isMove = false;
			this.tempY = 0.5;
			this.y = this.orginalY;
		}
		
	}
};
