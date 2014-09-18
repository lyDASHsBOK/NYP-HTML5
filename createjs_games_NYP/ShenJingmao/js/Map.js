/**
 * Created by Enveesoft.
 * User: Liu Xinyi
 * Date: 14-9-17
 * Time: 下午5:36
 * Map is something like:
 * odd: 01 02 03 04 05 06 07 08 09
 * even: 10 11 12 13 14 15 16 17 18
 * odd: 19 20 21 22 23 24 25 26 27
 * even: 28 29 30 31 32 33 34 35 36
 * odd: 37 38 39 40 41 42 43 44 45
 * even: 46 47 48 49 50 51 52 53 54
 * odd: 55 56 57 58 59 60 61 62 63
 * even: 64 65 66 67 68 69 70 71 72
 * odd: 73 74 75 76 77 78 79 80 81
 */
function Map() {
    this.cells_ = [];
    this.catTile;
}

Map.ROW_LENGTH = 9;
Map.ROW_NUMBER = 9;

Map.prototype.clone = function(){
    var newMap = new Map();
    newMap.cells_ = BOK.cloneObject(this.cells_);
    newMap.setCatTile(this.catTile);
    return newMap;
};
Map.prototype.setCatTile = function(tileID){
    this.catTile = tileID;
};
Map.prototype.addCell = function(cell){
    this.cells_.push(cell);
};
Map.prototype.markCellColored = function(id){
    this.cells_[id].click = true;
};
Map.prototype.markCellBlank = function(id){
    this.cells_[id].click = false;
};
Map.prototype.isCellClicked = function(id){
    return this.cells_[id].click;
};

/**
 * @return {Array} the order of tiles are topLeft, topRight, left, right, botLeft, botRight
 * */
Map.prototype.getSurroundingTiles = function(id){
    var MAX_TILE = Map.ROW_LENGTH * Map.ROW_NUMBER;
    var result = [];
    //six directions are lt, rt, l, r, lb, rb
    var l = id -1, r = id + 1;
    if(this.getTileRow_(id) % 2) {
        //odd rows
        var lt = id - (Map.ROW_LENGTH + 1),
            rt = id - Map.ROW_LENGTH,
            lb = id + (Map.ROW_LENGTH - 1),
            rb = id + Map.ROW_LENGTH;
    } else {
        //even rows
        var lt = id - Map.ROW_LENGTH,
            rt = id - (Map.ROW_LENGTH - 1),
            lb = id + Map.ROW_LENGTH,
            rb = id + (Map.ROW_LENGTH + 1);
    }

    if(lt >= 0)
        result.push(lt);
    if(rt >= 0)
        result.push(rt);
    if(l >= 0)
        result.push(l);
    if(r < MAX_TILE)
        result.push(r);
    if(lb < MAX_TILE)
        result.push(lb);
    if(rb < MAX_TILE)
        result.push(rb);

    return result;
};

/**
 * @return {Array} the order of tiles are topLeft, topRight, left, right, botLeft, botRight
 * */
Map.prototype.getTileRow_ = function(id){
    return Math.floor(id / Map.ROW_LENGTH) + 1;
};

