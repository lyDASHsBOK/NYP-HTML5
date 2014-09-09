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

var canvas, preloaderApp, game, stretcher;
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
    var stage = stretcher;

    canvas.addEventListener('click', onCanvasClicked);

    //start main game here
    var bg = new createjs.Bitmap(imgContainer["imgs/bg.png"]);
    var red = new createjs.Bitmap(imgContainer["imgs/red.png"]);
    var blue = new createjs.Bitmap(imgContainer["imgs/blue.png"]);
    blue.y = 150;
    stage.addChild(bg);
    stage.addChild(red);
    stage.addChild(blue);
}

function onCanvasClicked(e){
    console.log('clicked!')
}
