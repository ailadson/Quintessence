Ether.Ether = function(engine) {
	this.engine = engine
	this.rotateLastTime = 0;

	//elements
	this.coreElements = [];
	this.elements = [];

	this.x = engine.width/2;
	this.y = engine.height/2;

	//stats
	this.range = 15;
	this.mass = 1;
	this.age = 0;
	this.lifeSpan = [90,10,10,10]; //in seconds
	this.currentSpan = this.lifeSpan[this.age];
	this.dying = false;
	this.dead = false;
}

Ether.Ether.prototype.init = function(){
	for(var i=0;i<this.mass;i++){
		var element = new Ether.Element('core');
		element.x = this.x;
		element.y = this.y;
		this.coreElements.push(element)
	}
}

Ether.Ether.prototype.draw = function(engine,time){
	this.drawCoreElements(engine);
	this.drawElements(engine,time);
}

Ether.Ether.prototype.drawElements = function(engine,time){
	for (var i = 0; i < this.elements.length; i++) {
		var e = this.elements[i];

		//update the x and y position
		e.x = this.x + e.xOffset + (e.jitter * (this.getStability()/10));
		e.y = this.y + e.yOffset;
		e.jitter *= -1;

		if(!this.lossElement(e)){


			//AGE RELATED FUCTIONS
			switch(this.age){
				case 0 :
					if(this.dying){
						this.attractEtherToElement(e);
					} else if(this.isKillerElement(e)){ 
						this.dying = true;
					}
					break;

				case 1 :
					break;

				case 2 : 
					this.rotateElement(e,time)
					break;

				case 3 :
					break;
			}

			engine.ctx.beginPath();

			this.drawElement(e, engine.ctx, function(ctx, element){
				var gradient = engine.ctx.createRadialGradient(element.x,element.y,0,element.x,element.y,element.radius);
				gradient.addColorStop(0.1,"white");
				gradient.addColorStop(0.1,"white");
				gradient.addColorStop(0.8,element.color);
				gradient.addColorStop(0.1,"black");

				return gradient
			})

			if(e.newElement) e.newElement--;
		}

	};

	//time has to be updated outside of the loop
	//if(time > this.rotateLastTime + 3) this.rotateLastTime = time;
}

Ether.Ether.prototype.drawCoreElements = function(engine){
	for (var i = 0; i < this.coreElements.length; i++) {
		var e = this.coreElements[i];

		engine.ctx.beginPath();
		engine.ctx.globalCompositeOperation = "lighter";

		if(this.age == 0){
			this.drawElement(e, engine.ctx, function(ctx,element){
				var gradient = ctx.createRadialGradient(element.x,element.y,0,element.x,element.y,element.radius);
				gradient.addColorStop(0.5,"white");
				gradient.addColorStop(1,"black");

				return gradient;
			});	
		} else {
			this.drawElement(e, engine.ctx, function(ctx,element){
				var gradient = ctx.createRadialGradient(element.x,element.y,0,element.x,element.y,element.radius);
				gradient.addColorStop(0.5,"white");
				gradient.addColorStop(0.4,element.color);
				gradient.addColorStop(1,"black");

				return gradient;
			});	
		}	

		//velocity
		e.x += e.vx;
		e.y += e.vy;

		//maintain center
		switch(e.type){
			case 'core':
				if(this.getDistanceFromCenter(e) > this.range/2){ 
					e.x = this.x
					e.y = this.y
					//velocity
					this.vx = Math.random()*10-5;
					this.vy = Math.random()*10-5;
				}
				
		}
	};
}

Ether.Ether.prototype.drawElement = function(element,ctx,gradFunc){
	var gradient = gradFunc(ctx,element);

	ctx.fillStyle = gradient;
	ctx.arc(element.x,element.y,element.radius,Math.PI*2,false);
	ctx.fill();
}


Ether.Ether.prototype.getDistanceFromCenter = function(e){
	var xDif = e.x - this.x;
	var yDif = e.y - this.y;

	return Math.sqrt((xDif * xDif) + (yDif * yDif))
}

//Stats
Ether.Ether.prototype.getStability = function(){
	var o = this.getElementCount();

	var dif1 = o.f - o.w;
	var dif2 = o.a - o.e;

	return Math.floor(Math.sqrt((dif1 * dif1)+(dif2 * dif2)));
}

Ether.Ether.prototype.getElementCount = function(){
	var f=w=a=e = 0;

	for (var i = 0; i < this.elements.length; i++) {
		var ele = this.elements[i];
		switch(ele.type){
			case 'fire': f += Math.round((ele.radius/5));
				break;
			case 'water': w += Math.round((ele.radius/5));
				break;
			case 'air': a += Math.round((ele.radius/5));
				break;
			case 'earth': e += Math.round((ele.radius/5));
				break;
		}
	};

	return { f : f, w: w, a: a, e: e}
}

//Elements
Ether.Ether.prototype.newElement = function(e){
	this.increaseMass();
	e.xOffset = e.x - this.x; 
	e.yOffset = e.y - this.y;
	e.range = this.range;
	e.degree = (e.yOffset,this.getDistanceFromCenter(e));
	e.newElement = this.mass/2;
	this.elements.push(e);
}

Ether.Ether.prototype.lossElement = function(e){
	if(e.newElement) { return }

	if(Math.floor(this.getDistanceFromCenter(e) + (e.radius/4) - this.mass) >= this.range - (this.getStability() * 2)){
		//console.log(this.getDistanceFromCenter(e)+ (e.radius/2) -this.mass);
		//console.log(this.range - this.getStability() * 2);
		this.decreaseMass();
		
		//remove from elements
		for (var i = 0; i < this.elements.length; i++) {
			var ele = this.elements[i];

			if(ele.x == e.x && ele.y == e.y){
				var worldEle = this.elements.splice(i,1)[0];
				this.engine.world.newElement(worldEle);
				return true;
			}
		};

	}
}

Ether.Ether.prototype.increaseMass = function(){
	var element = new Ether.Element('core');
	element.x = this.x;
	element.y = this.y;
	this.coreElements.push(element);
	this.mass += element.radius/2;
	this.range += 2;
}

Ether.Ether.prototype.decreaseMass = function(){
	this.coreElements.pop();
	this.mass -= 1;
	this.range -= 2;
}

Ether.Ether.prototype.rotateElement = function(e,time){
	//if(time > this.rotateLastTime + 278){
		if(e.degree == 360){
			e.degree = 0;
		} else {
			e.degree++;
		}

		e.xOffset = (e.range * Math.cos(this.engine.util.degToRad(e.degree)));
		e.yOffset = (e.xOffset * Math.tan(this.engine.util.degToRad(e.degree)));
	//}
}

Ether.Ether.prototype.findDegree = function(opp,hyp){
	var ratio = opp/hyp;
	var radian = Math.acos(ratio);

	return this.engine.util.radToDeg(radian);
}

Ether.Ether.prototype.isKillerElement = function(e){
	if(e.killer){ 
		return true;
	}
}

Ether.Ether.prototype.attractEtherToElement = function(e){
	if(e.x < this.x){
		this.x--;
		e.xOffset++;
	} else if(e.x > this.x){
		this.x++;
		e.xOffset--;
	}

	if(e.y < this.y){
		this.y--;
		e.yOffset++;
	} else if(e.y > this.y){
		this.y++;
		e.yOffset--;
	}

	if((e.x > this.x - 10 && e.x < this.x + 10) &&
		(e.y > this.y - 10 && e.y < this.y + 10)){
		 this.dead = true;
	}
}



