/**
 * Created by JetBrains PhpStorm.
 * User: xliu
 * Date: 04/10/13
 * Time: 16:19
 * To change this template use File | Settings | File Templates.
 */
goog.provide("miniiw.MiniIWApp");
goog.require('bok.framework.App');
goog.require("bok.easelui.Stretcher");

goog.require('miniiw.features.factoryminigame.FactoryMiniGameFeature');

/**
 * @param {createjs.Container} stageDiv a div element on DOM which will be used as game stage.
 * @constructor
 * */
function MiniIWApp(stage)
{
    App.call(this);

    //init assets & components

    //init mvc features
    this.addFeature(new miniiw.features.factoryminigame.FactoryMiniGameFeature(stage));
}
BOK.inherits(MiniIWApp, App);