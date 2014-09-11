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
function loadingStart()
{
    canvas = document.getElementById('canvas');
    stretcher = new Stretcher(canvas);
    preloaderApp = new CanvasPreloaderApp([
        'imgs/bg.png',
        'imgs/blue.png',
        'imgs/red.png'
    ], imgContainer, stretcher);
    preloaderApp.addEventListener(Event.COMPLETE, assetsLoaded);

    preloaderApp.start();
	createjs.Sound.registerSound("sound/AMemoryAway.ogg","bgm");
	createjs.Sound.registerSound("sound/Blop-Mark_DiAngelo-79054334.mp3","pop");
}
/**
 * @ assetsLoaded
 * */
function assetsLoaded()
{

    //start main game here
	var game = new GameClass(stretcher, imgContainer);
	game.start();
}
