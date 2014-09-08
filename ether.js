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

	//life and death
	this.health = 5000;
	this.lifeSpan = [90,90,90,90]; //in seconds
	this.currentSpan = this.lifeSpan[this.age];
	this.totalLifeSpan = 0;
	this.dying = false;
	this.dead = false;
	this.ageLastTime = 0;
	this.finalElementLength = 1;
	this.stabilityLastTime = 0;

	this.rotateLastTime = 0;
	this.rotateDirection = -1;
	this.degreeChange = 0;

}

Ether.Ether.prototype.init = function(){
	switch(this.age){
		case 0 :
			var element = new Ether.Element('core');
			element.x = this.x;
			element.y = this.y;
			this.coreElements.push(element);

			for (var i = 0; i < this.lifeSpan.length; i++) {
				this.totalLifeSpan += this.lifeSpan[i]
			};
			break;

		case 1 : 
			var count = this.getElementCount();
			var total = 0;

			for(e in count){
				count[e] -= 5;
				total += count[e];
			}

			this.mass = total;
			this.range += total*2;

			for (var i = 0; i < total.length; i++) {
				var element = new Ether.Element('core');
				element.x = this.x;
				element.y = this.y;
				this.coreElements.push(element); 
			};

			for (var i = 0; i < this.elements.length; i++) {
				this.elements[i].radius /= 2;
			};

			break;

		case 2 : 
			for (var i = 0; i < this.elements.length; i++) {
				this.elements[i].radius /= 1.5;
			};

			break;

		case 3 :
			for (var i = 0; i < this.elements.length; i++) {
				this.elements[i].radius /= 1.5;
			};

			this.finalElementLength = this.elements.length;
			console.log("finalElementLength set to :" + this.finalElementLength)
			break;
	}
}

Ether.Ether.prototype.draw = function(engine,time){
	this.drawCoreElements(engine);
	this.drawElements(engine,time);
	this.stabilityCheck(time);
	//if(this.elements.length = 0) this.dead = true;
}

Ether.Ether.prototype.drawElements = function(engine,time){
	for (var i = 0; i < this.elements.length; i++) {
		var e = this.elements[i];

		//update the x and y position
		e.x = this.x + e.xOffset + (e.jitter * (this.getStability()/10));
		e.y = this.y + e.yOffset;
		e.jitter *= -1;

		//if(!this.loseElement(e)){

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
					this.ageEther(time);
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
		//}

	};

	//time has to be updated outside of the loop
	if(this.age == 2 && time > this.rotateLastTime + 500) this.rotateLastTime = time;
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

Ether.Ether.prototype.stabilityCheck = function(time){
	var stability = this.getStability();

	if(stability >= 50 && this.age < 3){
		if(time > this.stabilityLastTime + 2000 - stability){
			this.stabilityLastTime = time;
			var random = Math.floor(Math.random() * this.elements.length)
		
			if(this.elements.length != 0){
				this.loseElement(this.elements[this.elements.length-1],true)
			} else {
				console.log('elements array is 0')
			}

			if(this.elements.length != 0){
				this.loseElement(this.elements[random],true)
			} else {
				console.log('elements array is 0')
			}

			if(this.elements.length != 0){
				this.loseElement(this.elements[random],true)
			} else {
				console.log('elements array is 0')
			}
		}
	}
}

Ether.Ether.prototype.getDistanceFromCenter = function(e){
	return this.engine.util.getDistanceFromCenter(this,e);
}

Ether.Ether.prototype.ageEther = function(time){
	console.log(this.healthRate(time));
	if(time > this.ageLastTime + this.healthRate(time)){
		this.ageLastTime = time;
		
		if(this.elements.length != 0){
			this.loseElement(this.elements[this.elements.length-1],true)
		} else {
			console.log('elements array is 0')
		}
	}
}

//Stats
Ether.Ether.prototype.healthRate = function(time){
	var aging = (time - this.totalLifeSpan * 1000);
	var val = this.health + this.mass - aging - this.getStability();
	var returnVal = (val > 200) ? val : 200;
	
	return returnVal; 
}

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
	

	switch(this.age){
		case 0 :
			break;
		
		case 1 :
			this.increaseMass(e,1,2);
			break;
		
		case 2 :
			this.increaseMass(e,2,3);
			break;

		case 3 :
			break;
	}
	e.xOffset = e.x - this.x; 
	e.yOffset = e.y - this.y;
	e.range = this.range;
	e.degree = (e.yOffset,this.getDistanceFromCenter(e));
	e.newElement = this.mass/2;
	this.elements.push(e);
}

Ether.Ether.prototype.loseElement = function(e,override){
	if(e.newElement && !override) { return }

	//if(Math.floor(this.getDistanceFromCenter(e) + (e.radius/4) - this.mass) >= this.range - (this.getStability() * 2)){
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

	//}
}

Ether.Ether.prototype.increaseMass = function(e,massOffset,range){
	var element = new Ether.Element('core');
	element.x = this.x;
	element.y = this.y;
	this.coreElements.push(element);
	this.mass += e.radius/massOffset;
	this.range += range;
}

Ether.Ether.prototype.decreaseMass = function(){
	this.coreElements.pop();
	this.mass -= 1;
	this.range -= 2;
}

Ether.Ether.prototype.rotateElement = function(e,time){
	if(time > this.rotateLastTime + 500){

		if(this.rotateDirection < 0){
			this.degreeChange += 0.001;
			if(this.degreeChange > 1) {this.degreeChange = 1 }
			if(this.currentSpan < (this.lifeSpan[this.age]/3) * 2){ this.rotateDirection++; }

		} else if(this.rotateDirection > 0){
			this.degreeChange -= 0.001;
			if(this.degreeChange < 0.001) {this.degreeChange = 0.001 }

		} else {
			if(this.currentSpan < this.lifeSpan[this.age]/3){ this.rotateDirection++; }

		}
	}

	if(e.degree == 360){
		e.degree = 0;
	} else {
		e.degree+=this.degreeChange;
	}

	e.xOffset = (e.range * Math.cos(this.engine.util.degToRad(e.degree)));
	e.yOffset = (e.xOffset * Math.tan(this.engine.util.degToRad(e.degree)));
	
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

//awards
Ether.Ether.prototype.receiveAward = function(amount){
	this.currentSpan += amount;
}

