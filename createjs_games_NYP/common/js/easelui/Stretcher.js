/**
 * Created by Enveesoft.
 * User: Liu Xinyi
 * Date: 14-8-5
 * Time: 下午5:25
 * Write the description in this section.
 */
goog.provide("bok.easelui.Stretcher");

goog.require('bok.BOK');
goog.require("org.createjs.easeljs.EaselJS");


BOK.inherits(Stretcher, createjs.Container);

function Stretcher(canvasDom, defaultWidth, defaultHeight) {
    createjs.Container.call(this);

    this.dWidth_ = defaultWidth || canvasDom.width;
    this.dHeight_ = defaultHeight || canvasDom.height;

    this.canvasDom = canvasDom;
    this.stage = new createjs.Stage(canvasDom);
    this.stage.addChild(this);

    //stage setup
    createjs.Ticker.setFPS(40);
    createjs.Ticker.addEventListener("tick", Delegate.create(this.stage, this.stage.update));
    createjs.Touch.enable(this.stage);

    this.layout_();

    window.addEventListener('resize', Delegate.create(this, this.onWindowResize_));
}


Stretcher.prototype.onWindowResize_ = function() {
    if(this.timeoutId_)
        clearTimeout(this.timeoutId_);

    this.timeoutId_ = setTimeout(Delegate.create(this, function(){
        this.layout_();
        this.timeoutId_ = null;
    }), 500);
};

Stretcher.prototype.layout_ = function() {
    //give 2 px space to prevent scroll bar
    var wWidth = window.innerWidth - 2;
    var wHeight = window.innerHeight - 2;

    var scaleX = wWidth / this.dWidth_;
    var scaleY = wHeight / this.dHeight_;
	var currentScreenRatio = wWidth / wHeight;



	var scale = Math.min(scaleX, scaleY);

	var cWidth = this.dWidth_ * scale;
    var cHeight = this.dHeight_ * scale;

	if(currentScreenRatio < 1.5){
	 cWidth = this.dWidth_ * scale;
     cHeight = this.dHeight_ * scale;


    this.set({scaleX: scale, scaleY: scale, x:(wWidth - cWidth) / 2, y:(wHeight - cHeight) / 2 });

	}
	else{
		cWidth = wWidth ;
		cHeight = this.dHeight_ * scale;


		this.set({scaleX: scaleX, scaleY: scale, x:(wWidth - cWidth) / 2, y:(wHeight - cHeight) / 2 });
	}


	this.canvasDom.width = wWidth;
	this.canvasDom.height = wHeight;
};

