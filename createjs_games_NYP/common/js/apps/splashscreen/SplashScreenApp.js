/**
 * @fileoverview
 * //TODO: write file description here
 *
 * @author xliu
 * Date: 12/06/13
 * Time: 14:20
 */
goog.provide("bok.apps.splashscreen.SplashScreenApp");
goog.require("bok.framework.App");

goog.require("org.createjs.easeljs.EaselJS");
goog.require("org.createjs.tweenjs.TweenJS");

BOK.inherits(SplashScreenApp, App);

SplashScreenApp.DISPLAY_TEXT = 'Huan Win';

/**
 * @param {Element|createjs.Container} stage
 * */
function SplashScreenApp(stage)
{
	App.call(this);
	console.log(stage);
    if(stage.stage instanceof createjs.Stage)
    {
        this.stage_ = new createjs.Container();
        stage.addChild(this.stage_);
        this.width_ = stage.dWidth_;
        this.height_ = stage.dHeight_;
    }
    else
    {
        var canvas = document.createElement('canvas');
        canvas.width = 640;
        canvas.height = 480;
        stage.appendChild(canvas);
        this.stage_ = new createjs.Stage(canvas);
        this.stageUpdateFunc_ = Delegate.create(this.stage_, this.stage_.update);
        createjs.Ticker.setFPS(40);
        createjs.Ticker.addEventListener("tick", this.stageUpdateFunc_);
        this.width_ = canvas.width;
        this.height_ = canvas.height;
    }

	var base = new createjs.Shape();
	base.graphics.beginFill('rgba(0,0,0,1)').drawRect(0, 0, this.width_, this.height_);
	this.stage_.addChild(base);
	this.stage_.addEventListener('click', Delegate.create(this, this.finish_));
	
	console.log(this.height_);
	
	this.TEXT_X = this.width_ * 0.2;
	this.TEXT_Y = this.height_*0.45;

}

/**
 * @override
 * */
SplashScreenApp.prototype.start = function()
{
	SplashScreenApp.superClass_.start.call(this);

	this.show_();
};


/**
 * @private
 * */
SplashScreenApp.prototype.show_ = function()
{
	var textRect = {x:320, y:60};
	var back = new createjs.Shape();
	back.graphics.beginFill('rgba(255,255,255,1)').drawRoundRect(SplashScreenApp.TEXT_X, SplashScreenApp.TEXT_Y, textRect.x, textRect.y, 10);
	back.alpha = 0;
	var text = new createjs.Text(SplashScreenApp.DISPLAY_TEXT, "45px Arial", "#000000");
	text.x = this.TEXT_X;
	text.y = this.TEXT_Y;
	text.alpha = 0;
	
	var temp = [];
	var temp1 = [];
    var that = this;
	var stage = this.stage_;
	var screenHeight = this.height_;
	var spawnSpeed = 1;
	var dotCount = 0;
	var finishFunc = Delegate.create(this, this.finish_);
	this.spawnFunc = function(){
		if(spawnSpeed > 10)
		{
				createjs.Tween.get(stage).wait(600).to({alpha:0}, 300).to({alpha:1}, 300)
				.to({alpha:0}, 200).to({alpha:1}, 200)
				.to({alpha:0}, 100).to({alpha:1}, 100)
				.to({alpha:0}, 50).to({alpha:1}, 50)
				.to({alpha:0}, 50).to({alpha:1}, 50)
				.to({alpha:0}, 50).to({alpha:1}, 50)
				.call(function(){
					 for(i=0; i< temp.length; ++i){
						randX = Math.floor( Math.random()*800);
						randY = Math.floor(Math.random()*800);
						if(randX % 2 == 0)
						{
							randX *= -1;
						}
						if(randY % 2 == 0)
						{
							randY *= -1;
						}
						
						createjs.Tween.get(temp[i]).to( { x:text.x + randX, y:text.y - randY , alpha:0 }, 2000,createjs.Ease.circOut);
					 }
					 createjs.Tween.get(temp[0]).wait(1000).call(finishFunc);
				}
			);
			
            createjs.Ticker.removeEventListener("tick", that.spawnFunc);
			return;
		}

		var randX, randY;
		for(var i=0; i<spawnSpeed; ++i)
		{
			do
			{
				randX = Math.random()*textRect.x;
				randY = Math.random()*textRect.y;
			}while(!text.hitTest(randX, randY));

			var dot = new createjs.Shape();
			var dotRed = new createjs.Shape();
	
			var dotGrey = new createjs.Shape();
	
			var dotBlue = new createjs.Shape();
			
			var color = 'rgba('+Math.floor( Util.RandomRange(150,255) )+', '+Math.floor( Util.RandomRange(150,255) )+', '+255+', 1)';
			dot.graphics.beginFill(color).drawCircle(0, 0, BOK.randN(2)+2);
			dot.x = Math.random()*that.width_;
			dot.y = Math.random()*that.height_;
			dotRed.graphics.beginFill('rgba(255,0,0,0.1)').drawCircle(0, 0, 3);
			dotRed.x = 300;
			dotRed.y = screenHeight * 0.1;
	
			dotGrey.graphics.beginFill('rgba(84,84,84,0.1)').drawCircle(0, 0, 3);
			dotGrey.x = 300;
			dotGrey.y = screenHeight * 0.6;
			dotBlue.graphics.beginFill('rgba(0,0,255,0.1)').drawCircle(0, 0, 3);
			dotBlue.x = 10;
			dotBlue.y = screenHeight* 0.6;
			stage.addChild(dotGrey);
			stage.addChild(dotRed);
			stage.addChild(dotBlue);
			stage.addChild(dot);
			temp.push(dot);
			temp1.push(dotRed);
			createjs.Tween.get(dotRed).to({x:dotGrey.x, y:dotGrey.y}, 1700,createjs.Ease.linear);
			createjs.Tween.get(dotGrey).to({x:dotBlue.x, y:dotBlue.y }, 1700,createjs.Ease.linear);
			createjs.Tween.get(dotBlue).to({x:dotRed.x, y:dotRed.y}, 1700,createjs.Ease.linear);
			createjs.Tween.get(dot).to({x:text.x + randX, y:text.y + randY}, 300,createjs.Ease.bounceOut)
			dotCount++;
		}
		spawnSpeed = Math.ceil(dotCount/50);
	};
	
	createjs.Ticker.addEventListener("tick", this.spawnFunc);
};

/**
 * @private
 * */
SplashScreenApp.prototype.finish_ = function()
{
    if(this.finished_)
        return;

    this.finished_ = true;
    if(this.stageUpdateFunc_)
	    createjs.Ticker.removeEventListener('tick', this.stageUpdateFunc_);
    createjs.Ticker.removeEventListener("tick", this.spawnFunc);
	createjs.Tween.removeAllTweens();
	this.stage_.removeAllChildren();
	this.dispatchEvent(new Event(Event.COMPLETE));
};