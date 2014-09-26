


function KeyBoardCode(){
	this.keycodePress = [];
	
	for(var i =0; i < 256;i++){
		this.keycodePress.push(false);
	}
}

KeyBoardCode.prototype.convert_Key_to_Readable = function(k) {
    return this.keycode_dictionary[k];
};

KeyBoardCode.prototype.getKeyPressThroughtCharCode = function(keyCode) {
    return this.keycodePress[keyCode];
};

KeyBoardCode.prototype.getKeyPressThroughtName = function(keyName) {
	if(keyName >= 'a' && keyName <= 'z'){
		keyName = String.fromCharCode(keyName.charCodeAt(0) - 32);
	}
    return this.keycodePress[keyName.charCodeAt(0) ];
};

KeyBoardCode.prototype.setKeyPress = function(keyName , isKeyPress) {
    return this.keycodePress[keyName.charCodeAt(0)] = isKeyPress;
};

KeyBoardCode.prototype.setKeyPress = function(keyCode , isKeyPress) {
    return this.keycodePress[keyCode] = isKeyPress;
};

KeyBoardCode.prototype.reset = function() {
	for(var i  = 0; i < 256;i++){
		this.keycodePress[i] = false;
	}
};




