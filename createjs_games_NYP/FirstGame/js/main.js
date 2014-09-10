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
goog.require("root.gameclass");

var canvas, preloaderApp, stretcher;
window.addEventListener('load', loadingStart);

imgContainer = {};
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
}

function assetsLoaded()
{

    //start main game here
	var game = new GameClass(stretcher, imgContainer);
	game.start();
}
