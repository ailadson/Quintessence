Ether = Ether || {};

Ether.Hub = function(engine) {
	this.engine = engine;
	this.unit = engine.width/50;
	this.lastTime = 0;
	this.messageExist = false;
	this.messageAlpha = 1;
	this.currentMessage = "";
	this.lastMessageTime = 0;
}


Ether.Hub.prototype.draw = function(time){
	var stats = this.getStats();
	var ctx = this.engine.ctx;

	//convert stability
	var hubStab = (stats.stab > 100) ? 0 : (100 - stats.stab)

	ctx.font = this.unit + "px Arial";
	ctx.fillStyle = "rgba(20,70,200,1)"
	ctx.fillText("Mass: " + stats.mass, this.unit,this.unit*1.5)
	ctx.fillText("Stability: " + hubStab, this.unit,this.unit*2.5)

	this.drawElementStats(stats,ctx);
	this.drawLifeBar(ctx, time);
	this.drawMessage(ctx,time);
}

Ether.Hub.prototype.getStats = function(){
	var o = {};
	var e = this.engine.ethers[0];

	o.mass = e.mass;
	o.stab = e.getStability();
	o.elementCount = e.getElementCount();
	o.range = e.range

	return o;
}

Ether.Hub.prototype.drawElementStats = function(stats, ctx){
	ctx.font = this.unit/2 + "px Arial";

	ctx.fillStyle = "red";
	ctx.fillText("Fire: " + stats.elementCount.f, this.unit, this.unit*3.2);

	ctx.fillStyle = "blue";
	ctx.fillText("Water: " + stats.elementCount.w, this.unit * 3.5, this.unit*3.2);

	ctx.fillStyle = "white";
	ctx.fillText("Air: " + stats.elementCount.a, this.unit, this.unit*4.1);

	ctx.fillStyle = "green";
	ctx.fillText("Earth: " + stats.elementCount.e, this.unit * 3.5, this.unit*4.1);
}

Ether.Hub.prototype.drawLifeBar = function(ctx, time){
	var colors = ["green","yellow","orange","red"];
	var ether = this.engine.ethers[0];
	var ratio = ether.currentSpan/ether.lifeSpan[ether.age];

	ctx.fillStyle = colors[ether.age];
	ctx.fillRect(this.engine.width - (this.unit * 0.5), this.unit * 1.5, -(this.unit * 5) * ratio, this.unit * 0.5)

	ctx.strokeStyle = "red";
	ctx.strokeRect(this.engine.width - (this.unit * 5.5), this.unit * 1.5, this.unit * 5, this.unit * 0.5)

	//MOVE THIS TO ETHER!!???
	if(time > this.lastTime + 1000 && !ether.inVoid){
		this.lastTime = time;
		if(ratio > 0){
			ether.currentSpan--;
		} else {
			ether.age += 1
			ether.currentSpan = ether.lifeSpan[ether.age];
		}
	}

}

//messages
Ether.Hub.prototype.drawMessage = function(ctx,time){
	var borderMssg = "in the boundless void, time is not"

	if(!this.messageExist){

		if(this.hasLeftBorder() && this.currentMessage != borderMssg){
			this.messageExist = true;
			this.currentMessage = borderMssg;
		}

	} else {
		this.renderMessage(ctx,time);
	}
}

Ether.Hub.prototype.renderMessage = function(ctx,time){
	ctx.font = "30px Arial";
	ctx.fillStyle = "rgba(255,255,255,"+this.messageAlpha+")";
	var textWidth = ctx.measureText(this.currentMessage).width;
	ctx.fillText(this.currentMessage,(this.engine.width/2) - (textWidth / 2), (this.engine.height/2)-this.unit);

	if(time > this.lastMessageTime + 100){
		this.messageAlpha-=0.01;

		if(this.messageAlpha <= 0.01){
			this.messageExist = false;
			this.messageAlpha = 1;
		}

		this.lastMessageTime = time;
	}
}

Ether.Hub.prototype.hasLeftBorder = function(){
	var ether = this.engine.ethers[0];
	var world = this.engine.world;
	
	if((ether.x <= world.borderX) ||
		(ether.y <= world.borderY) ||
		(ether.x >= world.borderW) ||
		(ether.y >= world.borderH)){
		ether.inVoid = true;
		return true
	} else {
		ether.inVoid = false;
	}
}