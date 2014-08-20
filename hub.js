Ether = Ether || {};

Ether.Hub = function(engine) {
	this.engine = engine;
}


Ether.Hub.prototype.draw = function(){
	var stats = this.getStats();
	var ctx = this.engine.ctx;

	ctx.font ="30px Arial";
	ctx.fillText("Mass: " + stats.mass, 20,50)
	ctx.fillText("Stability: " + stats.stab, 20,90)
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