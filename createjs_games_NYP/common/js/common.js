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
	return Math.floor( (Math.random() * range ) + min );
};
/**
 * @ Bounding Box 
 * a simple collision detection between two rectangle
 * */
 Util.boxCollision = function(x, y, w, h, x1, y1, w1, h1 ){
	
		return ( ( x < x1+w1 && x+w > x1-w1 && ((y < y1+h1  && y+h > y1) || (y+h < y1+h1  && y+h > y1 -h1) ) )
		||( x > x1 && x-w < x1+w1 && ( (y < y1+h1  && y+h > y1) || (y+h < y1+h1  && y+h > y1 -h1) )) );
	
 };