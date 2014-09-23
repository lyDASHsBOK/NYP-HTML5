/**
 * Created by JetBrains PhpStorm.
 * User: xliu
 * Date: 04/10/13
 * Time: 16:18
 * To change this template use File | Settings | File Templates.
 */

goog.provide("root.main");
goog.require("org.createjs.easeljs.SoundJS");
goog.require("bok.apps.preloader.CanvasPreloaderApp");
goog.require("root.Game");

var canvas, preloaderApp, game, stretcher;
window.addEventListener('load', splashScreenStart);

//splash screen
function splashScreenStart() {
    canvas = document.getElementById('canvas');
    stretcher = new Stretcher(canvas);
    var splash = new SplashScreenApp(stretcher);
    splash.addEventListener(Event.COMPLETE, loadingStart);
    splash.start();
}

imgContainer = {};
/**
 * @ loadingStart
 * */
function loadingStart(){
    preloaderApp = new CanvasPreloaderApp([
        'imgs/bg.png',
		'imgs/tileSet2.png',
		'imgs/character_small.png',
    ], imgContainer, stretcher);
    preloaderApp.addEventListener(Event.COMPLETE, assetsLoaded);

    preloaderApp.start();
	
	createjs.Sound.registerSound("sound/01-main-theme-overworld.mp3","bgm");
	createjs.Sound.registerSound("sound/smb_jump-small.wav","jumpsmall");
	createjs.Sound.registerSound("sound/smb_jump-super.wav","jumpsuper");
	createjs.Sound.registerSound("sound/smb_bump.wav","bump");
}
/**
 * @ assetsLoaded
 * */
function assetsLoaded(){
    //start main game here
	var game = new Game(stretcher, imgContainer);
	game.start();
}
