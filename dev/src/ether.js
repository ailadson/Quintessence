/**
 * @constructor
 */
 Ether.Ether = function(engine) {
	this.engine = engine;
	this.util = engine.util
	this.rotateLastTime = 0;

	//elements
	this.coreElements = [];
	this.elements = [];
	this.moved;

	this.x = engine.width/2;
	this.y = engine.height/2;
	this.xv;
	this.yv;

	//stats
	this.range = 15;
	this.mass = 1;
	this.speed = 18;
	this.control = 10;
	this.getControl = function(){ return this.speed*(this.control * 0.01) };
	this.resistance = 4;
	this.attraction = 0;
	this.balance = 1;
	this.force = 1.5;
	this.elementCount = {f:0,w:0,a:0,e:0}

	//life and death
	this.health = 5000;
	this.lifeSpan = [400]; //in seconds
	this.currentSpan = this.lifeSpan[0];
	this.totalLifeSpan;
	this.dead = false;
	this.ageLastTime = 0;
	this.finalElementLength = 1;
	this.stabilityLastTime = 0;
	
	
	this.transformation;
	this.transformations = [this.rotateElement,this.createSludge]

	this.sludgeTimeOffset = 500;
	this.sludgeAlphaStep = 0.1
	this.sludgeLastTime = 0;

	this.rotateLastTime = 0;
	this.rotateDirection = -1;
	this.degreeChange = 0;

	//zoom out
	this.canZoom = false;
	this.zooming = false;
	this.zoomLastTime = 0;
	this.zoomDelay = 500;
	this.zoomStep = 1.07;
	this.zoomCounter = 4;
	this.zoomCounterMax = this.zoomCounter;
	this.zoom = 1;

}

Ether.Ether.prototype.init = function(){
	this.createCoreElement();
}

Ether.Ether.prototype.draw = function(engine,time){
	if(this.zooming){ this.getMoreScreen(time) }
	this.drawCoreElements(engine);
	this.drawElements(engine,time);
	this.stabilityCheck(engine,time);
}

Ether.Ether.prototype.drawElements = function(engine,time){
	var self = this;

	for (var i = 0; i < this.elements.length; i++) {
		var e = this.elements[i];

		//update the x and y position
		e.x = this.x + e.xOffset + (e.jitter * (this.getStability()/10));
		e.y = this.y + e.yOffset;
		e.jitter *= -1;

		//Butterfly//Snail Transformation
		//if(this.age>=2)this.transformation(e,time)

		//Draw Ether Elements
		engine.ctx.beginPath();

		self.util.drawElement(e, engine.ctx, function(ctx, element){
			var gradient = engine.ctx.createRadialGradient(element.x,element.y,0,element.x,element.y,element.radius);
			return self.util.createGradient(gradient,[[0.1,"white"],[0.1,"white"],[0.8,element.color],[0.1,"black"]])
		})

	};
}

Ether.Ether.prototype.drawCoreElements = function(engine){
	var self = this;
	engine.ctx.globalCompositeOperation = "lighter";

	for (var i = 0; i < this.coreElements.length; i++) {
		var e = this.coreElements[i];

		engine.ctx.beginPath();
		
		// if(this.age == 0){
			self.util.drawElement(e, engine.ctx, function(ctx,element){
				var gradient = ctx.createRadialGradient(element.x,element.y,0,element.x,element.y,element.radius);
				return self.util.createGradient(gradient,[[0.5,"white"],[0.4,element.color],[1,"black"]])
			});	

		//velocity
		e.x += e.vx;
		e.y += e.vy;

		//maintain center
		if(this.getDistanceFromCenter(e) > this.range){ 
			e.x = this.x
			e.y = this.y
			//velocity
			this.vx = Math.random()*10-5;
			this.vy = Math.random()*10-5;
		}
	};
}

Ether.Ether.prototype.stabilityCheck = function(engine,time){
	var stability = this.getStability();
	//stabilit starts at 0 and increases as it become more unstable
	if(stability >= 20){
		engine.hub.unstable = true 
	} else {
		engine.hub.unstable = false
	}

	if(stability >= 50){
		engine.hub.purging = true;
		if(time > this.stabilityLastTime + 2000 - stability){
			this.stabilityLastTime = time;		
			this.loseElements(3);
			this.engine.audio.playSound('purge',1)
		}
	} else {
		engine.hub.purging = false;
	}
}

Ether.Ether.prototype.getMoreScreen = function(time){
	if(this.zoomCounter != 0 && time > this.zoomLastTime + this.zoomDelay){
		this.zoomLastTime = time;
		this.zoomCounter -= 1
		this.zoomOut(this.zoomStep);
		this.engine.world.zoomOutBackground(this.zoomStep+0.1);
		this.engine.world.zoomOutElements(this.zoomStep);
	} else if(this.zoomCounter == 0){
		this.canZoom = false;
		this.zooming = false;
		this.zoomCounter = this.zoomCounterMax
		this.engine.hub.zoomTimeout = 100;
	}

}


Ether.Ether.prototype.zoomOut = function(val){
	this.range = Math.round(this.range/val);
	this.zoom = Math.round(this.zoom + val);

	for (var i = 0; i < this.elements.length; i++) {
		var e = this.elements[i]
		e.radius = Math.round(e.radius/val);
		e.xOffset = Math.round(e.xOffset/val);
		e.yOffset = Math.round(e.yOffset/val);
	};

	for (var i = 0; i < this.coreElements.length; i++) {
		this.coreElements[i].radius =  Math.round(this.coreElements[i].radius/val);
	};
}

Ether.Ether.prototype.getDistanceFromCenter = function(e){
	return this.util.getDistanceFromCenter(this,e);
}

Ether.Ether.prototype.findDegree = function(opp,hyp){
	var ratio = opp/hyp;
	var radian = Math.acos(ratio);

	return this.util.radToDeg(radian);
}

Ether.Ether.prototype.ageEther = function(time){
	if(time > this.ageLastTime + this.healthRate(time)){
		this.ageLastTime = time;
		
		if(this.elements.length != 0){
			var e =this.loseElement(this.elements[this.elements.length-1],true)
			this.engine.audio.playElementSound(e);
		}
	}
}

//Stats
Ether.Ether.prototype.healthRate = function(time){
	if(!this.totalLifeSpan) 
		this.totalLifeSpan = time + 70000

	var aging = (time - this.totalLifeSpan);
	var val = this.health + (this.mass*10) - aging - this.getStability();
	var returnVal = (val > 50) ? val : 50;

	return returnVal; 
}

Ether.Ether.prototype.getStability = function(){
	var o = this.getElementCount();

	var dif1 = o["f"] - o["w"];
	var dif2 = o["a"] - o["e"];

	var val = Math.floor(Math.sqrt((dif1 * dif1)+(dif2 * dif2)));
	var rVal = Math.round(val/this.balance);
	return rVal;
}

Ether.Ether.prototype.getElementCount = function(){
	return this.elementCount
}

Ether.Ether.prototype.addToElementCount = function(ele){
	switch(ele.type){
		case 'fire': this.elementCount.f += (Math.round((ele.radius/2)));
			break;
		case 'water': this.elementCount.w += (Math.round((ele.radius/2)));
			break;
		case 'air': this.elementCount.a += (Math.round((ele.radius/2)));
			break;
		case 'earth': this.elementCount.e += (Math.round((ele.radius/2)));
			break;
	}
}

Ether.Ether.prototype.removeFromElementCount = function(ele){
	switch(ele.type){
		case 'fire': this.elementCount.f -= Math.round((ele.radius/2));
			if(this.elementCount.f < 0){ this.elementCount.f = 0}
			break;
		case 'water': this.elementCount.w -= Math.round((ele.radius/2));
			if(this.elementCount.w < 0){ this.elementCount.w = 0}
			break;
		case 'air': this.elementCount.a -= Math.round((ele.radius/2));
			if(this.elementCount.a < 0){ this.elementCount.a = 0}
			break;
		case 'earth': this.elementCount.e -= Math.round((ele.radius/2));
			if(this.elementCount.e < 0){ this.elementCount.e = 0}
			break;
	}
}

//Elements
Ether.Ether.prototype.newElement = function(e){
	this.engine.audio.playElementSound(e);
	this.addToElementCount(e);
	this.increaseMass(e);
			
	e.xOffset = e.x - this.x; 
	e.yOffset = e.y - this.y;
	e.range = this.range;
	e.degree = this.findDegree(e.yOffset,this.getDistanceFromCenter(e));
	e.newElement = this.mass/2;
	this.elements.push(e);
}

Ether.Ether.prototype.loseElement = function(e){
	this.removeFromElementCount(e);
	this.decreaseMass(e);
	
	//remove from elements
	for (var i = 0; i < this.elements.length; i++) {
		var ele = this.elements[i];

		if(ele.x == e.x && ele.y == e.y){
			var worldEle = this.elements.splice(i,1)[0];
			this.engine.world.newElement(worldEle);
			return ele;
		}
	};
}

Ether.Ether.prototype.loseElements = function(val){
	for(var i = 0; i < val; i++){
		random = Math.floor(Math.random() * this.elements.length)

		if(this.elements.length != 0){
			this.loseElement(this.elements[random],true)
		}
	}
}

Ether.Ether.prototype.createCoreElement = function(){
	var e = new Ether.Element('core');
	e.x = this.x;
	e.y = this.y;
	this.coreElements.push(e); 
}

Ether.Ether.prototype.increaseMass = function(e){
	this.createCoreElement();
	this.mass += 1//e.radius/massOffset;
	this.range += e.radius/2
}

Ether.Ether.prototype.decreaseMass = function(e){
	if(this.coreElements.length > 1) this.coreElements.pop();
	if(this.mass > 0) this.mass -= 1;
	if(this.range > 2) this.range -= e.radius/2;
}

//awards
Ether.Ether.prototype.receiveAward = function(a){
	//make sure the award wont put the player past the cap
	//givien by the engine
	if(this.currentSpan + a > this.lifeSpan[0]){
		this.currentSpan = this.lifeSpan[0];
	} else {
		this.currentSpan += a;
	}
}


//lifestages
Ether.Ether.prototype.rotateElement = function(e,time){
	if(time > this.rotateLastTime + 500){

		if(this.rotateDirection < 0){ //rDir starts at -1
			this.degreeChange += 0.001;
			if(this.degreeChange > 1) {this.degreeChange = 1 }
			if(this.currentSpan < (this.lifeSpan[0]/3) * 2){ this.rotateDirection++; }

		} else if(this.rotateDirection > 0){
			this.degreeChange -= 0.001;
			if(this.degreeChange < 0.001) {this.degreeChange = 0.001 }

		} else {
			if(this.currentSpan < this.lifeSpan[0]/3){ this.rotateDirection++; }

		}
	}

	if(e.degree == 360){
		e.degree = 0;
	} else {
		e.degree+=this.degreeChange;
	}

	e.xOffset = (e.range * Math.cos(this.util.degToRad(e.degree)));
	e.yOffset = (e.xOffset * Math.tan(this.util.degToRad(e.degree)));
	
}

Ether.Ether.prototype.createSludge = function(e,time){
	if(time > this.sludgeLastTime + this.sludgeTimeOffset){
		this.sludgeLastTime = time; //lock after 1st iteration. for the sake of delay.
		
		var sludge = new Sludge(this.engine,this);

		for (var i = 0; i < this.elements.length; i++) {
			var e = this.elements[i];

			//create sludge based on direction
			if(this.xv > 0 && (e.x > this.x)){
				this.pushSludge(sludge,e);
				continue; 
			} else if(this.xv < 0 && e.x < this.x){
				this.pushSludge(sludge,e);
				continue;
			}

			if(this.yv > 0 && (e.y > this.y)){
				this.pushSludge(sludge,e);
			} else if(this.yv < 0 && (e.y < this.y)){
				this.pushSludge(sludge,e);
			}
		};

		this.engine.ethers.push(sludge) 
	}
}

Ether.Ether.prototype.pushSludge = function(s,e){
	var ele = new Ether.Element(0,0,e);
	s.elements.push(ele);
}

/**
 * @constructor
 */
function Sludge(engine,player){
	var self = this;
	this.engine = engine;
	this.world = engine.world;
	this.player = player;

	this.elements = [];
	this.alpha = 0.5
	this.alphaTime = 0;
	this.nTime = 0;
	this.x = player.x;
	this.y = player.y;
	this.xOffset = this.x - this.world.x;
	this.yOffset = this.y - this.world.y;

	this.draw = function(engine,time){
		self.x = this.world.x + this.xOffset;
		self.y = this.world.y + this.yOffset;

		//alpha decay
		if(time > self.alphaTime + 200){ 
			self.alphaTime = time;
			if(self.alpha == 0){
				self.destroy();
				return
			}
			self.alpha -= this.player.sludgeAlphaStep;
			if(self.alpha < 0) self.alpha = 0;
		}

		//drawing elements
		for (var i = 0; i < self.elements.length; i++) {
			var ele = self.elements[i];

			//radius
			if(time > self.nTime + 50){
				if(i == self.elements.length-1) self.nTime = time;

				ele.radius+= 1;
			}

			ele.x = self.x + ele.xOffset;
			ele.y = self.y + ele.yOffset;

			if((ele.x > -(ele.radius+3) && ele.x < engine.width+ ele.radius+3) &&
				(ele.y > -(ele.radius+3) && ele.y < engine.height + ele.radius + 3)){
				engine.ctx.beginPath();

				self.engine.util.drawElement(ele,engine.ctx,function(ctx,e){
					var color = "rgba("+e.rgb.r+","+e.rgb.g+","+e.rgb.b+","+self.alpha+")"
					return color;
				});
			}
		};
	}

	this.destroy = function(){
		self.engine.removeEther(self);
	}
}


Ether.Ether.prototype.save = function(){
	//this.engine.trophy.save(this);
	console.log('save')
}