(function (){
	//define variables
	var bgCanvas	= document.getElementById('myBackground'); 
	var bgContext 	= bgCanvas.getContext('2d');
	var ctx 		= bgCanvas.getContext('2d');
	var canvas  	= document.getElementById('myCanvas');
	
	var score, gameOver, level, timer, maxNumberOfEnemy;
	var platformWidth = 32;
	var spawnRed = 0;
	var redEnemies = [];
	var blueEnemies = [];
	
	/**
	* Asset pre-loader object. Loads all images
	*/
	var assetLoader = (function() {
		// images dictionary
		this.imgs = {
		'bg' : 'imgs/bg.png',
		'redobj' : 'imgs/red.png',
		'blueobj' : 'imgs/blue.png'
		};
		
	var assetsLoaded = 0; // how many assets have been loaded
	var numImgs = Object.keys(this.imgs).length; // total number of image assets
	this.totalAssest = numImgs; // total number of assets
	/**
	* Ensure all assets are loaded before using them
	* @param {number} dic - Dictionary name ('imgs', 'sounds', 'fonts')
	* @param {number} name - Asset name in the dictionary
	*/
	function assetLoaded(dic, name) {
		// don't count assets that have already loaded
		if (this[dic][name].status !== 'loading') {
			return;
		}
		
		this[dic][name].status = 'loaded';
		assetsLoaded++;
		
		// finished callback
		if (assetsLoaded === this.totalAssest && typeof this.finished === 'function') {
		this.finished();
		}
	}
	/**
	* Create assets, set callback for asset loading, set asset source
	*/
	this.downloadAll = function() {
		var _this = this;
		var src;
		// load images
		for (var img in this.imgs) {
		if (this.imgs.hasOwnProperty(img)) {
			src = this.imgs[img];
			// create a closure for event binding
			(function(_this, img) {
			_this.imgs[img] = new Image();
			_this.imgs[img].status = 'loading';
			_this.imgs[img].name = img;
			_this.imgs[img].onload = function() { assetLoaded.call(_this, 'imgs', img) };
			_this.imgs[img].src = src;
			})(_this, img);
			}
		}
	}
	return {
		imgs: this.imgs,
		totalAssest: this.totalAssest,
		downloadAll: this.downloadAll
	};
	})();
	
	assetLoader.finished = function() {
		startGame();
	}
	
	/**
	* A vector for 2d space.
	* @param {integer} x - Center x coordinate.
	* @param {integer} y - Center y coordinate.
	* @param {integer} dx - Change in x.
	* @param {integer} dy - Change in y.
	*/
	function Vector(x, y, dx, dy) {
		// position
		this.x = x || 0;
		this.y = y || 0;
		// direction
		this.dx = dx || 0;
		this.dy = dy || 0;
	}
	
	/**
	* Sprites are anything drawn to the screen (ground, enemies, etc.)
	* @param {integer} x - Starting x position of the player
	* @param {integer} y - Starting y position of the player
	* @param {string} type - Type of sprite
	*/
	function Sprite(x, y, type, speed1) {
		this.x = x;
		this.y = y;
		this.dx = 1;
		this.width = platformWidth;
		this.height = platformWidth;
		this.type = type;
		this.speed = speed1;
		/**
		* Draw the sprite at it's current position
		*/
		this.draw = function() {
			ctx.save(); //push
			ctx.drawImage(assetLoader.imgs[this.type], this.x, this.y, 64, 64);
			ctx.restore(); //pop
		};
	}
	Sprite.prototype = Object.create(Vector.prototype);
	
	/**
	* Random function
	*/
	function RandomRange(min,max){
		var range = ( max - min ) + 1;
		return (Math.random() * range ) + min;
	}
	
	/**
	* Spawn enemy
	*/
	function spawnEnemySprites(type) {
		if(type == 'redobj'){
			redEnemies.push(new Sprite(RandomRange(canvas.width * 0.5,30),RandomRange(530,30),'redobj' , 1+level*0.02));
			//		Math.random() > 0.5 ? 'spikes' : 'slime'
		}
		if(type == 'blueobj'){
			blueEnemies.push(new Sprite(RandomRange(canvas.width * 0.3,30),RandomRange(530,30),'blueobj' , 1.5+level*0.01));
			
		}
	}
	
	/**
	* Background
	*/
	var background = (function() {
		//Draw the screen
		this.draw = function() {
			bgContext.drawImage(assetLoader.imgs.bg, 0, 0, 800, 600);
		};
		
		return {
			draw: this.draw
		};
	})();
	
	/**
	* SpawnEnemy
	*/
	function SpawnEnemy(){
		if(redEnemies.length === 0 && blueEnemies.length == 0){
			spawnRed = 1;
		}
		if(spawnRed == 1){
			if(redEnemies.length < maxNumberOfEnemy){
				spawnEnemySprites('redobj');
			}
			else{
				spawnRed = 0;
			}
		}
		if(level%5 == 0){
			if(blueEnemies.length < 1 && spawnRed == 1){
				spawnEnemySprites('blueobj');
			}
		}
		//spawn one more red enemy in every five level
		if(level % 5 == 0 && score % 10 == 0  && level != 0 )
		{
			maxNumberOfEnemy++;
			score++;
		}
	}
	/**
	* Mouse Input
	*/
	var mousePos;
	function mouseCheck(canvas){
		canvas.addEventListener('mousemove', function(evt) {
			mousePos = getMousePos(canvas, evt);
		  }, false);
		canvas.addEventListener('mousedown', doMouseDown, false);
		
		canvas.addEventListener('mouseup', doMouseUp, false);
	}
	 
	function doMouseUp(event){
		//score += 10;
	}
	function doMouseDown(){
		for(var i = 0; i < redEnemies.length; i++){
			if(redEnemies[i].x - mousePos.x < assetLoader.imgs[redEnemies[i].type].width && redEnemies[i].x - mousePos.x >  - assetLoader.imgs[redEnemies[i].type].width )
			{
				if(collision(redEnemies[i].x + assetLoader.imgs[redEnemies[i].type].width * 0.5,redEnemies[i].y+assetLoader.imgs[redEnemies[i].type].height * 0.5,assetLoader.imgs[redEnemies[i].type].width * 0.5,mousePos.x,mousePos.y)){
					score += 11;
					if( (level + 1) * 100 - score  == 1)
					{
						score +=1;
					}
					redEnemies[i] = null;
					delete 	redEnemies[i];
					redEnemies.splice(i,1);
					break;
				}
			}
		}
		for(var i = 0; i < blueEnemies.length; i++){
			if(blueEnemies[i].x - mousePos.x < assetLoader.imgs[blueEnemies[i].type].width && blueEnemies[i].x - mousePos.x >  - assetLoader.imgs[blueEnemies[i].type].width )
			{
				if(collision(blueEnemies[i].x + assetLoader.imgs[blueEnemies[i].type].width * 0.5,blueEnemies[i].y+assetLoader.imgs[blueEnemies[i].type].height * 0.5,assetLoader.imgs[blueEnemies[i].type].width * 0.5,mousePos.x,mousePos.y)){
					score += 11;
					if( (level + 1) * 100 - score  == 1)
					{
						score +=1;
					}
					blueEnemies[i] = null;
					delete 	blueEnemies[i];
					blueEnemies.splice(i,1);
					break;
				}
			}
		}
	}
	  
	function collision(x,y,r,x1,y1){
		if( x1 < x+r && x1 > x-r && y1 < y+r && y1 > y-r){
			return true;
		}
		return false;
	}
	
	function getMousePos(canvas, evt) {
        var rect = canvas.getBoundingClientRect();
        return {
          x: evt.clientX - rect.left,
          y: evt.clientY - rect.top
        };
      }
	
	/**
	* Update 
	*/
	function Update(){
		SpawnEnemy();
		
		if(score > 100){
			level = Math.floor(score * 0.01);
		}
		for(var i = 0; i < redEnemies.length; i++){				
			redEnemies[i].x = redEnemies[i].x + redEnemies[i].dx * redEnemies[i].speed;
			if( redEnemies[i].x > canvas.width )
			{
				gameOver = true;
			}
		}
		
		for(var i = 0; i < blueEnemies.length; i++){
			blueEnemies[i].x = blueEnemies[i].x + blueEnemies[i].dx * blueEnemies[i].speed;
			if( blueEnemies[i].x > canvas.width )
			{
				gameOver = true;
			}
		}
	}
	
	/**
	* Render 
	*/
	function Render(){
		bgContext.clearRect(0, 0, canvas.width, canvas.height);	
		background.draw();
	
		for(var i = 0; i < redEnemies.length; i++){				
			redEnemies[i].draw();
		}
		
		for(var i = 0; i < blueEnemies.length; i++){
			blueEnemies[i].draw();
		}
		
		// draw the score
		bgContext.font = '18pt Calibri';
		bgContext.fillText('Score: ' + score, canvas.width - 140, 30);
		bgContext.fillText('Level: ' + level, 0, 30);
	}

	 /**
	 * Game Loop
	 */
	function animate() {
		if(!gameOver){
			mouseCheck(myCanvas);
			Update();
			Render();	
			requestAnimFrame( animate );
		}
		if(gameOver){
			gameover();
		}
	}
	
	/**
	* Request Animation Polyfill
	*/
	var requestAnimFrame = (function(){
		return window.requestAnimationFrame ||
		window.webkitRequestAnimationFrame ||
		window.mozRequestAnimationFrame ||
		window.oRequestAnimationFrame ||
		window.msRequestAnimationFrame ||
		function(callback, element){
		window.setTimeout(callback, 1000 / 60);
		};
	})();
	
	/**
	* Start the game
	*/
	function startGame() {	
		document.getElementById('game-over').style.display = 'none';
		gameOver = false;
		for(var i = 0; i < redEnemies.length; i++){
			redEnemies.splice(i,1);
		}
		score = 0;
		rate = 0;
		level = 1;
		timer = 0;
		maxNumberOfEnemy = 3;
		if(redEnemies.length != 0)
		{
			for(var i = 0; i < redEnemies.length; i++)
			{
				redEnemies[i] = null;
				delete null;
			}
		}
		redEnemies = [];
		if(blueEnemies.length != 0)
		{
			for(var i = 0; i < blueEnemies.length; i++)
			{
				blueEnemies[i] = null;
				delete null;
			}
		}
		blueEnemies = [];
		animate();
	}
	
	function gameover(){
		bgContext.fillText('Game Over' , canvas.width *0.5, canvas.height*0.5);
		document.getElementById('game-over').style.display = 'block';
	}
	
	document.getElementById('game-over').addEventListener('click', startGame);
	
	assetLoader.downloadAll();
})();
