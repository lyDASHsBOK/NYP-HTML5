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
goog.require("root.gameClass");

var canvas, preloaderApp, game, stretcher;
window.addEventListener('load', loadingStart);

imgContainer = {};
/**
 * @ loadingStart
 * */
function loadingStart(){
    canvas = document.getElementById('canvas');
    stretcher = new Stretcher(canvas);
    preloaderApp = new CanvasPreloaderApp([
        'imgs/bg.jpg',
		'imgs/pot1.png',
		'imgs/pot2.png'
    ], imgContainer, stretcher);
    preloaderApp.addEventListener(Event.COMPLETE, assetsLoaded);

    preloaderApp.start();
}
/**
 * @ assetsLoaded
 * */
function assetsLoaded(){
    //start main game here
	var game = new GameClass(stretcher, imgContainer);
	game.start();
}
