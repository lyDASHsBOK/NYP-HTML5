/**
 * Created by Enveesoft.
 * User: winston HO
 * Date: 14-9-11
 * Time: 10:01
 * Write the description in this section.
 */
 

 
var Util = {};

/**
 * @ collision
 * a simple point circle collision detition
 * */
Util.collision = function (x,y,r,x1,y1){
	return ( x1 < x+r && x1 > x-r && y1 < y+r && y1 > y-r)
};
/**
 * @ RandomRange
 * randomise a range from min to max number in float 
 * */
Util.RandomRange = function (min,max){
	var range = ( max - min ) + 1;
	return (Math.random() * range ) + min;
};