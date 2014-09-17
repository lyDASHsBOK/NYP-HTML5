/**
 * Created by Enveesoft.
 * User: Liu Xinyi
 * Date: 14-9-17
 * Time: 下午5:36
 * Write the description in this section.
 */
function Map() {
    this.cells_ = [];
    this.catTile;
}

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

