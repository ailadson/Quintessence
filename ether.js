var Ether = Ether || {};

Ether.Ether = function(engine) {
	this.coreElements = [];
	this.elements = [];
	this.x = engine.width/2;
	this.y = engine.height/2;

	//stats
	this.range = 30;
	this.mass = 10;
}

Ether.Ether.prototype.getStability = function(){
	var o = this.getElementCount();

	var dif1 = o.f - o.w;
	var dif2 = o.a - o.e;

	return Math.sqrt((dif1 * dif1)+(dif2 * dif2));
}

Ether.Ether.prototype.getElementCount = function(){
	var f =w=a=e = 0;

	for (var i = 0; i < this.elements.length; i++) {
		var type = this.elements[i].type;
		switch(type){
			case 'fire': f++;
				break;
			case 'water': w++;
				break;
			case 'air': a++;
				break;
			case 'earth': e++
				break;
		}
	};

	return { f : f, w: w, a: a, e: e}
}

Ether.Ether.prototype.init = function(){
	for(var i=0;i<this.mass;i++){
		var element = new Ether.Element('core');
		element.x = this.x;
		element.y = this.y;
		this.coreElements.push(element)
	}
}

Ether.Ether.prototype.increaseMass = function(){
	var element = new Ether.Element('core');
	element.x = this.x;
	element.y = this.y;
	this.coreElements.push(element)
}

Ether.Ether.prototype.decreaseMass = function(){
	this.coreElements.pop();
}

Ether.Ether.prototype.draw = function(engine){
	engine.ctx.globalCompositeOperation = "lighter";

	for (var i = 0; i < this.coreElements.length; i++) {
		var e = this.coreElements[i];

		engine.ctx.beginPath();

		//gradient
		var gradient = engine.ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.radius);
		gradient.addColorStop(0.5,"white");
		//gradient.addColorStop(0.4,"white");
		gradient.addColorStop(0.4,e.color);
		gradient.addColorStop(1,"black");

		engine.ctx.fillStyle = gradient;
		engine.ctx.arc(e.x,e.y,e.radius,Math.PI*2,false);
		engine.ctx.fill();

		//velocity
		e.x += e.vx;
		e.y += e.vy;

		//maintain center
		switch(e.type){
			case 'core':
				if(this.getDistanceFromCenter(e) > this.range){ 
					e.x = this.x
					e.y = this.y
					//velocity
					this.vx = Math.random()*10-5;
					this.vy = Math.random()*10-5;
				}
				
		}
	};
}

Ether.Ether.prototype.getDistanceFromCenter = function(e){
	var xDif = e.x - this.x;
	var yDif = e.y - this.y;

	return Math.sqrt((xDif * xDif) + (yDif * yDif))
}