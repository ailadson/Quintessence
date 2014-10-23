Ether.MsgQue = function(){
	this.que = [];
}

Ether.MsgQue.prototype.addMsg = function(config){
	this.que.push(new Ether.Msg(config));
}

Ether.MsgQue.prototype.getMsg = function(){
	return this.que.shift();
}

Ether.MsgQue.prototype.hasMsg = function(){
	return this.que.length > 0
}

Ether.Msg = function(c){
	this.str = c.string
	this.sub = c.sub || ""
	this.alpha = 1
	this.alphaStep = c.alphaStep || 0.02
	this.alphaTime = c.alphaTime || 100;
	this.type = c.type
	this.fill = c.fill || "rgba(164,161,151,"
}

Ether.Msg.prototype.lowerAlpha = function(){
	this.alpha -= this.alphaStep
	if(this.alpha < 0) this.alpha = 0
	return this.alpha
}

Ether.Msg.prototype.isFadedEnuf = function(){
	return this.alpha < 0.3
}