Ether = Ether || {};

Ether.Hub = function(engine) {
	this.engine = engine;
	this.unit = engine.width/50;
}


Ether.Hub.prototype.draw = function(){
	var stats = this.getStats();
	var ctx = this.engine.ctx;

	//convert stability
	var hubStab = (stats.stab > 100) ? 0 : (100 - stats.stab)

	ctx.font = this.unit + "px Arial";
	ctx.fillText("Mass: " + stats.mass, this.unit,this.unit*1.5)
	ctx.fillText("Stability: " + hubStab, this.unit,this.unit*2.5)

	this.drawElementStats(stats,ctx);
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