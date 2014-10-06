Ether.MsgQue = function(){
	this.que = [];
}

Ether.MsgQue.prototype.addMsg = function(string,type,sub){
	this.que.push(new Ether.Msg(string,type,sub));
}

Ether.MsgQue.prototype.getMsg = function(){
	return this.que.shift();
}

Ether.MsgQue.prototype.hasMsg = function(){
	return this.que.length > 0
}

Ether.Msg = function(s,t,sb){
	this.str = s
	this.sub = sb || ""
	this.alpha = 1
	this.alphaStep = 0.01
	this.type = t
}

Ether.Msg.prototype.lowerAlpha = function(){
	this.alpha -= this.alphaStep
	if(this.alpha < 0) this.alpha = 0
	return this.alpha
}

Ether.Msg.prototype.isFadedEnuf = function(){
	return this.alpha < 0.3
}