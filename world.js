Ether = Ether || {}

Ether.World = function (engine) {
	this.x = engine.width/2;
	this.y = engine.height/2;
	this.xv = 0;
	this.yv = 0;

	this.width = engine.width*15;
	this.height = engine.height*15;

	this.fire = [];
	this.water = [];
	this.earth = [];
	this.air = [];

	this.elements = [this.earth,this.air,this.fire,this.water];

	this.draggingX = false;
	this.draggingY = false;

}

Ether.World.prototype.init = function(){
	var eleStrings = ['earth','air','fire','water'];

	for (var i = 0; i < this.elements.length; i++) {
		var collection = this.elements[i];
		var type = eleStrings[i];

		for (var j = 0; j < 100; j++) {
			var xOffset = ((Math.random()*(this.width*2)) - this.width)/2;
			var yOffset = ((Math.random()*(this.height*2)) - this.height)/2;

			/*switch(type){
				case 'earth' :
					xOffset = 
					break;
			}*/

			var size = this.getDistanceFromCenter({x:xOffset,y:yOffset});

			var element = new Ether.Element(type,size/400);
			element.xOffset = xOffset;
			element.yOffset = yOffset;
			collection.push(element);
		};
	};
	console.log(this.elements)
}

Ether.World.prototype.draw = function(engine){
	for (var i = 0; i < this.elements.length; i++) {
		var collection = this.elements[i];

		for (var j = 0; j < collection.length; j++) {
			var e = collection[j];

			this.x += this.xv;
			this.y += this.yv;
			var x = this.x + e.xOffset;
			var y = this.y + e.yOffset;

			engine.ctx.beginPath();

			var gradient = engine.ctx.createRadialGradient(x,y,0,x,y,e.radius);
			gradient.addColorStop(0.1,"white");
			gradient.addColorStop(0.1,"white");
			gradient.addColorStop(0.8,e.color);
			gradient.addColorStop(0.1,"black");

			engine.ctx.fillStyle = gradient;
			engine.ctx.arc(x,y,e.radius,Math.PI*2,false);
			engine.ctx.fill();
		};
	};
}


Ether.World.prototype.getDistanceFromCenter = function(e){
	var xDif = this.x - Math.abs(e.x);
	var yDif = this.y - Math.abs(e.y);

	return Math.sqrt((xDif * xDif) + (yDif * yDif))
}

Ether.World.prototype.moveWorld = function(e){
	//if(!this.draggingX || !this.draggingY){
		switch(e){
			case 38 :
				this.yv = 0.05//this.dragMotion('up',this.yv);
				break;
			case 39 :
				this.xv = -0.05//this.dragMotion('up',-this.xv) * -1;
				break;
			case 40 :
				this.yv = -0.05//this.dragMotion('up',-this.yv) * -1;
				break;
			case 37 :
				this.xv = 0.05//this.dragMotion('up',this.xv);
				break;
		}
	//}
}

Ether.World.prototype.stopWorld = function(e){
		switch(e){
			case 38 :
				this.yv = 0//this.dragMotion('up',this.yv);
				break;
			case 39 :
				this.xv = 0//this.dragMotion('up',-this.xv) * -1;
				break;
			case 40 :
				this.yv = 0//this.dragMotion('up',-this.yv) * -1;
				break;
			case 37 :
				this.xv = 0//this.dragMotion('up',this.xv);
				break;
		}
}

Ether.World.prototype.dragMotion = function(direction,val){
	var n = val;

	if(direction == 'up'){
		if(n <= 1){
			n += 0.05;
		} else {
			n = 1
		}
	}else{
		if(n >= 0){
			n -= 0.05;
		} else {
			n = 0
		}
	}

	return n
}

