/**
 * Created by Enveesoft.
 * User: winston HO
 * Date: 14-9-11
 * Time: 10:01
 * Write the description in this section.
 */
 
/**
 * @ collision
 * */
function collision(x,y,r,x1,y1){
	return ( x1 < x+r && x1 > x-r && y1 < y+r && y1 > y-r)
}

/**
 * @ RandomRange
 * */
function RandomRange(min,max){
	var range = ( max - min ) + 1;
	return (Math.random() * range ) + min;
}