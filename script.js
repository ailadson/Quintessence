/**
 * @constructor
 */
var Ether = Ether || {};

Ether.Element = function(type,size,config,bad){
	var config = config || {};
	this["type"] = config["type"] || type;
	this.bad = bad;

	//color
	config.rgb = config.rgb || {};
	var r = config.rgb.r || Math.random()*255>>0;
	var g = config.rgb.g || Math.random()*255>>0;
	var b = config.rgb.b || Math.random()*255>>0;
		
	switch(type){
		case 'core' :
			if (r <= 150) r += 100
			if (g <= 150) g += 100
			if (b <= 150) b += 100
			break;
		case 'fire' :
			r = 255;
			if (g >= 125) g = 75
			if (b >= 100) b = 50
			break;
		case 'water' :
			b = 255;
			if (r >= 75) r = 50
			if (g >= 175) g -= 100
			break;
		case 'air' :
			if (r <= 185) r = 230
			if (g <= 185) g = 230
			b = 255
			break;
		case 'earth' :
			b = 0;
			if (r > 200 || r < 100) r = 150
			if (g > 175 || g < 120) g = 150
			break;

	}
	
	this.color = "rgba("+r+","+g+","+b+",0.5)";
	this.rgb = {r : r, g : g, b : b}

	//size
	var _size = size || 0.5;
	this.radius = config.radius;

	if(!this.radius){
		switch(type){
			case 'core' :
				this.radius = Math.random()*15+(_size*5)
			default :
				this.radius = Math.random()*15+(_size*5)

		}
	}

	//velocity
	this.vx = Math.random()*10-5;
	this.vy = Math.random()*10-5;

	//position
	this.x;
	this.y;
	this.xOffset = config.xOffset;
	this.yOffset = config.yOffset;

	//jitter
	this.jitter = bad ? -5: -1;

}

Ether.awards = {};

Ether.awards["consciousness"] = [
	{
		text : "I"
	},{
		text : "I am"
	},{
		text : "You"
	},{
		text : "Mine"
	},{
		text : "I love"
	},{
		text : "I am sleepy"
	},{
		text : "I am hot"
	},{
		text : "I am cold"
	},{
		text : "I am thirsty"
	},{
		text : "I am hungry"
	},{
		text : "I am horny"
	},{
		text : "I am in the world"
	},{
		text : "What is this?"
	},{
		text : "I want that"
	},{
		text : "I can be hurt"
	},{
		text : "I fear"
	},{
		text : "Why do I hurt?"
	},{
		text : "How do I get?"
	},{
		text : "Who are my friends?"
	},{
		text : "How can I thrive?"
	},{
		text : "This is my stuff"
	},{
		text : "They are wrong"
	},{
		text : "I am right"
	},{
		text : "I can create"
	},{
		text : "Will I die?"
	},{
		text : "Everything dies"
	},{
		text : "Why am I here?"
	},{
		text : "I will die"
	},{
		text : "Who am I?"
	},{
		text : "Where did I come from?"
	},{
		text : "My Truth"
	},{
		text : "Not your Truth"
	},{
		text : "This is who I am"
	},{
		text : "Everything changes"
	},{
		text : "I think; I am"
	},{
		text : "My thoughts always change"
	},{
		text : "Do I change?"
	},{
		text : "Has anything ever remained constant?"
	},{
		text : "Am I seperate from my perceptions?"
	},{
		text : "I am all"
	},{
		text : "I am nothing"
	},{
		text : "Death is just another change"
	},{
		text : "What is born will die"
	},{
		text : "All comes from nothing"
	},{
		text : "All goes to nothing"
	},{
		text : "What I percieve, I cannot be"
	},{
		text : "Truth is self evident; I am self evident"
	},{
		text : "How can words describe silence?"
	},{
		text : "No word is true"
	},{
		text : "[silence]"
	}
];


Ether.awards["matter"] = [
	{
		text : "String(1 x 10^-35)"
	},{
		text : "Quantum Foam(1 x 10^-35)"
	},{
		text : "Neutrino(1 x 10^-24)"
	},{
		text : "Top Quark(1 x 10^-22)"
	},{
		text : "Bottom Quark(3 x 10^-20)"
	},{
		text : "Charm Quark(1 x 10^-19)"
	},{
		text : "Strange Quark(4 x 10^-19)"
	},{
		text : "Up Quark(1 x 10^-18)"
	},{
		text : "Down Quark(1 x 10^-18)"
	},{
		text : "Proton(1 x 10^-15)"
	},{
		text : "Neutron(1 x 10^-15)"
	},{
		text : "Electron(1 x 10^-15)"
	},{
		text : "Ray(1 x 10^-12)"
	},{
		text : "Atom(1 x 10^-10)"
	},{
		text : "Protein(1 x 10^-10)"
	},{
		text : "Molecule(1 x 10^-9)"
	},{
		text : "Clay Particle(1 x 10^-6)"
	},{
		text : "Mist Droplet(1 x 10^-5)"
	},{
		text : "Virus(1 x 10^-8)"
	},{
		text : "Large Rock(5 x 10^3)"
	},{
		text : "Moon(1.5 x 10^5)"
	},{
		text : "Planet(1.27 x 10^7)"
	},{
		text : "Planet(1.27 x 10^7)"
	},{
		text : "Nebula(8^10 x 16)"
	},{
		text : "Unicellular Organism(1 x 10^-5)"
	},{
		text : "Star(5.8 x 10^9)"
	},{
		text : "Galaxy(1.2 x 10^21)"
	},{
		text : "Cluster(3 x 10^23)"
	},{
		text : "Multicellular Organism(1 x 10^-3)"
	},{
		text : "Seed(7 x 10^3)"
	},{
		text : "Multicellular Organism(4 x 10-2)"
	},{
		text : "Vertebrate(1 x 10^-1)"
	},{
		text : "Flora(1.5 x 10^1)"
	},{
		text : "Fauna(3 x 10^0)"
	},{
		text : "Intelligence(1.7 x 10^0)"
	},{
		text : "Tools(3 x 10^-1)"
	},{
		text : "Culture(1.7 x x10^0)"
	},{
		text : "Mechanical System(1.7 x x10^0)"
	},{
		text : "Digital System(1.7 x x10^0)"
	},{
		text : "Genetically Modified System(1.7 x x10^0)"
	},{
		text : "Quantum System(1.7 x x10^0)"
	},{
		text : "Artifical Intelligence"
	},{
		text : "Solar Society"
	},{
		text : "Synchronized Organism"
	},{
		text : "Astral Computing"
	},{
		text : "Giant"
	},{
		text : "Dwarf"
	},{
		text : "Supernova"
	},{
		text : "Black Hole"
	},{
		text : "[silence]"
	}
];

/**
 * @constructor
 */
Ether.Util = function (engine) {
	this.engine = engine;
}

//Conversion
Ether.Util.prototype.degToRad = function(deg) {
	return (Ether.Util.radianInDeg * deg) 
};

Ether.Util.prototype.radToDeg = function(rad){
	return (Ether.Util.degreeInRad * rad)
}

//Constants
Ether.Util.radianInDeg = 180/Math.PI;
Ether.Util.degreeInRad = Math.PI/180;

//Measurments
Ether.Util.prototype.getDistanceFromCenter = function(e,source){
	var xDif = source.x - Math.abs(e.x);
	var yDif = source.y - Math.abs(e.y);

	return Math.sqrt((xDif * xDif) + (yDif * yDif))
}

Ether.Util.prototype.createGradient = function(grad,set){
	for (var i = 0; i < set.length; i++) {
		var stop = set[i];
		grad.addColorStop(stop[0],stop[1])
	};
	return grad
}

Ether.Util.prototype.drawElement = function(element,ctx,gradFunc){
	var gradient = gradFunc(ctx,element);

	ctx.fillStyle = gradient;
	ctx.arc(element.x,element.y,element.radius,Math.PI*2,false);
	ctx.fill();
}

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
	this.age = 0;
	this.speed = 8;

	//life and death
	this.health = 5000;
	this.lifeSpan = [100,95,90,70]; //in seconds
	this.currentSpan = this.lifeSpan[this.age];
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

}

Ether.Ether.prototype.init = function(){
	switch(this.age){
		case 0 :
			this.createCoreElement();
			break;

		case 1 : 
		case 2 : 
			this.zoomOut(2)
			break;

		case 3 :
			this.zoomOut(2);
			this.sludgeAlphaStep *= 2;
			this.sludgeTimeOffset *= 4;
			this.finalElementLength = this.elements.length;
			break;
	}
}

Ether.Ether.prototype.draw = function(engine,time){
	this.drawCoreElements(engine);
	this.drawElements(engine,time);
	this.stabilityCheck(engine,time);
}

Ether.Ether.prototype.drawElements = function(engine,time){
	var self = this;

	//age ether during the thried life stage
	if(this.age == 3)this.ageEther(time)

	for (var i = 0; i < this.elements.length; i++) {
		var e = this.elements[i];

		//update the x and y position
		e.x = this.x + e.xOffset + (e.jitter * (this.getStability()/10));
		e.y = this.y + e.yOffset;
		e.jitter *= -1;

		//Butterfly//Snail Transformation
		if(this.age>=2)this.transformation(e,time)

		//Draw Ether Elements
		engine.ctx.beginPath();

		self.util.drawElement(e, engine.ctx, function(ctx, element){
			var gradient = engine.ctx.createRadialGradient(element.x,element.y,0,element.x,element.y,element.radius);
			return self.util.createGradient(gradient,[[0.1,"white"],[0.1,"white"],[0.8,element.color],[0.1,"black"]])
		})

	};

	//time has to be updated outside of the loop
	if(this.age == 2 && time > this.rotateLastTime + 500) this.rotateLastTime = time;
}

Ether.Ether.prototype.drawCoreElements = function(engine){
	var self = this;
	engine.ctx.globalCompositeOperation = "lighter";

	for (var i = 0; i < this.coreElements.length; i++) {
		var e = this.coreElements[i];

		engine.ctx.beginPath();
		
		if(this.age == 0){
			self.util.drawElement(e, engine.ctx, function(ctx,element){
				var gradient = ctx.createRadialGradient(element.x,element.y,0,element.x,element.y,element.radius);
				return self.util.createGradient(gradient,[[0.5,"white"],[1,"black"]])
			});	
		} else {
			self.util.drawElement(e, engine.ctx, function(ctx,element){
				var gradient = ctx.createRadialGradient(element.x,element.y,0,element.x,element.y,element.radius);
				return self.util.createGradient(gradient,[[0.5,"white"],[0.4,element.color],[1,"black"]])
			});	
		}	

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

	if(stability > 40 && this.age < 3){
		engine.hub.unstable = true 

		if(stability >= 50){
			if(time > this.stabilityLastTime + 2000 - stability){
				this.stabilityLastTime = time;		
				this.loseElements(3);
			}
		}
	}
}

Ether.Ether.prototype.zoomOut = function(val){
	this.range /= val;

	for (var i = 0; i < this.elements.length; i++) {
		var e = this.elements[i]
		e.radius /= val;
		e.xOffset /= val;
		e.yOffset /= val;
	};

	for (var i = 0; i < this.coreElements.length; i++) {
		this.coreElements[i].radius /= val;
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
			this.loseElement(this.elements[this.elements.length-1],true)
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

	var obj = {}
	obj["f"] = f;
	obj["w"] = w;
	obj["a"] = a;
	obj["e"] = e;
	return obj
}

//Elements
Ether.Ether.prototype.newElement = function(e){
	this.engine.audio.playSound(e)
	if(this.age != 3){
		this.increaseMass(e);
	}
			
	e.xOffset = e.x - this.x; 
	e.yOffset = e.y - this.y;
	e.range = this.range;
	e.degree = this.findDegree(e.yOffset,this.getDistanceFromCenter(e));
	e.newElement = this.mass/2;
	this.elements.push(e);
}

Ether.Ether.prototype.loseElement = function(e){

	this.decreaseMass(e);
	
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
	this.range += Math.round(e.radius/6)
}

Ether.Ether.prototype.decreaseMass = function(e){
	if(this.coreElements.length > 1) this.coreElements.pop();
	if(this.mass > 0) this.mass -= 1;
	if(this.range > 2) this.range -= Math.round(e.radius/6);
}

//awards
Ether.Ether.prototype.receiveAward = function(a){
	//make sure the award wont put the player past the cap
	//givien by the engine
	if(this.currentSpan + a > this.lifeSpan[this.age]){
		this.currentSpan = this.lifeSpan[this.age];
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
			} else if(this.yv < 0 && (e.x < this.x)){
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
Sludge = function(engine,player){
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

/**
 * @constructor
 */
 Ether.World = function (engine) {
	this.engine = engine;
	this.util;
	this.player;

	//world positioning values
	this.width = engine.width*30;
	this.height = engine.height*30;
	this.x = engine.width/2;
	this.y = engine.height/2;
	this.xv = 0;
	this.yv = 0;
	this.dragLastTime = 0;
	this.speedUp = {}

	this.speedUp["x"] = false;
	this.speedUp["y"] = false;

	//elements
	this.fire = [];
	this.water = [];
	this.earth = [];
	this.air = [];
	this.elements = [this.earth,this.air,this.fire,this.water];
	this.driftArray = [];
	this.sizeOffset = 5000;

	this.hills = [];
	this.hillWidthAmount = 4
	this.hillHeightAmount = 2;
	this.hillWidth = engine.width/this.hillWidthAmount;
	this.hillHeight = engine.height/this.hillHeightAmount;

}

//WORLD INIT
Ether.World.prototype.init = function(engine){
	var eleStrings = ['earth','air','fire','water'];
	
	if(engine.ethers[0].age != 0){ 
		this.zoomOut(2) 
	} else {
		this.player = engine.ethers[0]
		this.util = engine.util;
	}

	this.initBackground();

	for (var i = 0; i < this.elements.length; i++) {
		var collection = this.elements[i];
		collection.length = 0; //clear out array
		var type = eleStrings[i];

		switch(engine.ethers[0].age){
			case 0 :
				this.initElements(type,collection,[5,300],[0,200],[300,50],[9000,100])
				this.initBadGuys(type,collection,120,true);
				break;

			case 1 :
				this.initElements(type,collection,[70,200],[10,180],[250,50],[7000,2000])
				//this.initBadGuys(type,collection,90);
				break;
			case 2 :
				this.initElements(type,collection,[],[20,80],[200,200],[5000,1000])
				this.initBadGuys(type,collection,60);
				break;
			case 3 :
				this.initElements(type,collection,[0],[50],[300],[6000])
				this.initBadGuys(type,collection,30);
				break;
		}		
	};
}

Ether.World.prototype.initElements = function(type,collection,max,min,n,sizeOffset){
	for (var i = 0; i < n.length; i++) {
		this.initElement(type,collection,n[i],sizeOffset[i],function(e){
			if(min[i] && e.radius > min[i]) e.radius = min[i];
			if(max[i] && e.radius < max[i]) e.radius = max[i];
		})
	};

	
}

Ether.World.prototype.initBadGuys = function(type,collection,max,t){
	var bool = t || this.engine.badGuys;
	if(bool){
			this.initElement(type,collection,25,100,function(e){
				if(e.radius > max) e.radius = max;
			},true)
		}
}

Ether.World.prototype.initElement = function(type,collection,amount,sizeOffset,eFunc,bad){
	for (var j = 0; j < amount; j++) {
			//get values that will be used to create element
			var xOffset = ((Math.random()*(this.width*2)) - this.width)/2;
			var yOffset = ((Math.random()*(this.height*2)) - this.height)/2;
			var size = this.getDistanceFromCenter({x:xOffset,y:yOffset});
			
			var element = new Ether.Element(type,size/sizeOffset,{},bad);
			eFunc(element)
			element.xOffset = xOffset;
			element.yOffset = yOffset;
			collection.push(element);
		};
}

Ether.World.prototype.initBackground = function(){
	for (var i = 0; i < this.hillHeightAmount + 2; i++) {
		var hills = [];
		for (var j = 0; j < this.hillWidthAmount+2; j++) {
			hills[j] = {x: (this.hillWidth*j), y: (this.hillHeight*i)}
		};
		this.hills.push(hills);
	};
}

//DRAWING
Ether.World.prototype.draw = function(engine,time){
		this.xv = this.adjustVelocity("x",this.xv,time);
		this.yv = this.adjustVelocity("y",this.yv,time);
	
		//drag timer
		if(time > this.dragLastTime + 200){ this.dragLastTime = time }
		
		//DrawBackground
		this.drawBackground(this.xv,this.yv);
		
		//update x+y
		this.x += this.xv;
		this.y += this.yv;

		this.player.xv = this.xv;
		this.player.yv = this.yv;

		engine.xv = this.xv;
		engine.yv = this.yv;

		

	for (var i = 0; i < this.elements.length; i++) {
		var collection = this.elements[i];

		for (var j = 0; j < collection.length; j++) {
			var e = collection[j];

			if(!this.isInView(e)){ continue }

			//reverse direction of jitter
			e.jitter *= -1;

			//x and y positions determined on the fly
			e.x = this.x + e.xOffset + e.jitter;
			e.y = this.y + e.yOffset;

			this.driftTowardsEther(e)

			//start rendering
			engine.ctx.beginPath();

			//create 
			var gradient = engine.ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.radius);

			if(e.bad){
				this.util.createGradient(gradient,[
					[0.1,"rgba("+(Math.round(Math.random()*255))+","+(Math.round(Math.random()*255))+","+(Math.round(Math.random()*255))+",1)"],
					[0.3,"black"],
					[0.7,"black"],
					[0.9,"rgba("+(Math.round(Math.random()*255))+","+(Math.round(Math.random()*255))+","+(Math.round(Math.random()*255))+",1)"]
				]);

			} else {
				this.util.createGradient(gradient,[[0.1,"white"],[0.1,"white"],[0.8,e.color],[0.1,"black"]])
			}

			engine.ctx.fillStyle = gradient;
			engine.ctx.arc(e.x,e.y,e.radius,Math.PI*2,false);
			engine.ctx.fill();

			//see if the element is in range of the ether
			this.isInRangeOfEther(e,i,j);
		};
	};

	this.drawDriftingElements(engine); //TO DO!!
	this.drawBorder(engine);
}



Ether.World.prototype.zoomOut = function(val){
	this.hillHeightAmount *= val;
	this.hillWidthAmount *= val;
	this.hillWidth = this.engine.width/this.hillWidthAmount;
	this.hillHeight = this.engine.height/this.hillHeightAmount;
}

Ether.World.prototype.drawBackground = function(xv,yv){
	for (var j = 0; j < this.hills.length; j++) {
		var row = this.hills[j]

		for (var i = 0; i < row.length; i++) {
			var hill = row[i];

			hill.x += xv
			hill.y += yv

			if(hill.x+this.hillWidth < 0) hill.x = this.engine.width
			if(hill.x > this.engine.width) hill.x = -this.hillWidth
			if(hill.y+this.hillHeight < 0) hill.y = this.engine.height
			if(hill.y > this.engine.height) hill.y = -this.hillHeight

			var gradient = this.engine.ctx.createLinearGradient(hill.x,hill.y,hill.x+this.hillWidth,hill.y+this.hillHeight);
			this.engine.ctx.fillStyle = this.util.createGradient(gradient,[[0.05,"rgba(0,0,0,1)"],[0.95,"rgba(20,20,20,1)"]]);
			this.engine.ctx.fillRect(hill.x,hill.y,this.hillWidth+5,this.hillHeight+5)
		};
	}

}

Ether.World.prototype.driftTowardsEther = function(element){
	var ether = this.player;
	var radius = element.radius < 40 ? element.radius * 20 : element.radius * 2
	var speed;

	 if(element.bad){
	 	speed = ether.speed-2
	 }else if(element.radius > 50){ 
	 	speed = element.radius/50 
	 }else{ 
	 	speed = element.radius/5
	 }

	if(element.bad || this.util.getDistanceFromCenter(element,ether) <= radius){

		var check;

		while(!check){
			var x = Math.floor(Math.random()*4);

			switch(x){
				case 0 :
					if(element.x < ether.x+5){ 
						element.xOffset+=speed
						check = true;
					}
					break;

				case 1 :
					if(element.x > ether.x-5){
						element.xOffset-=speed
						check = true;
					}
					break;

				case 2 :
					if(element.y < ether.y+5){ 
						element.yOffset+=speed
						check = true;
					}
					break;

				case 3 :
					if(element.y > ether.y-5){ 
						element.yOffset-=speed
						check = true;
					}
					break;
			}
		}
	}
}

Ether.World.prototype.removeBadElements = function(){
	for (var j = 0; j < this.elements.length; j++) {
		var collection = this.elements[j];

		for (var i = 0; i < collection.length; i+=1) {
			var e = collection[i]
			if(e.bad){
				collection.splice(i,1);
				i-=1;
			}
		};		
	};
}


Ether.World.prototype.drawBorder = function(engine){
	engine.ctx.fillStyle = "white";
	this.borderX = this.x - this.width/2;
	this.borderY = this.y - this.height/2;
	this.borderW = this.width;
	this.borderH = this.height;

	engine.ctx.strokeRect(this.borderX,this.borderY,this.borderW,this.borderH);
}

Ether.World.prototype.drawDriftingElements = function(engine){
	for (var i = 0; i < this.driftArray.length; i++) {
		var e = this.driftArray[i];
		e.xOffset += (e.jitter * e.radius/2);

		//x and y positions determined on the fly
		var x = this.x + e.xOffset;
		var y = this.y + e.yOffset;


		//start rendering
		engine.ctx.beginPath();

		//create gradient
		var gradient = engine.ctx.createRadialGradient(x,y,0,x,y,e.radius);
		
		engine.ctx.fillStyle = this.util.createGradient(gradient,[[0.1,"white"],[0.1,"white"],[0.8,e.color],[0.1,"black"]]);
		engine.ctx.arc(x,y,e.radius,Math.PI*2,false);
		engine.ctx.fill();

		if(!e.newElement){
			var index = e.type  == 'earth' ? 0 : (e.type == 'air' ? 1 : (e.type == 'fire' ? 2 : (e.type == 'water' ? 3 : undefined)))
			e.jitter /= 5;
			this.driftArray.splice(i,1);
			i--;
			this.elements[index].push(e)
		} else {
			e.newElement--;
		}
	};
}

Ether.World.prototype.isInRangeOfEther = function(e,collection,index){
	//make sure the element is on the screen
	if(!this.isInView(e)){ return }

	var ether = this.player;
	var range = ether.range + e.radius/2;
	var x = e.xOffset + this.x;
	var y = e.yOffset + this.y;
	var distance = ether.getDistanceFromCenter({x:x,y:y});

	if(distance < range){
		if(!e.bad){
			//give the element an 'x, y' relative to the ether
			e.x = x;
			e.y = y;
			//add to ether.elements[] and remove from world.elements[]
			ether.newElement(e);
			this.elements[collection].splice(index,1);
		} else {
			this.engine.audio.playSound(e)
			ether.loseElements(1);
			if(ether.elements.length > 6) ether.tripleLoss();
		}
	}
}

Ether.World.prototype.isInView = function(e){
	//get the elements x and y position
	var x = e.xOffset + this.x;
	var y = e.yOffset + this.y;

	//if they are in the screen boundaries, return true
	if((x > -e.radius && x < this.engine.width + e.radius) &&
		(y > -e.radius && y < this.engine.height + e.radius)){
		return true
	}
}

Ether.World.prototype.getDistanceFromCenter = function(e){
	return this.engine.util.getDistanceFromCenter(e,this);
}

Ether.World.prototype.adjustVelocity = function(axis,val,time){
	if(time > this.dragLastTime + 200){
		if(this.speedUp[axis]){
			if(val > 0 && val <= this.player.speed){
				val+=2;
				if(val > this.player.speed) val = this.player.speed
			} else if(val < 0 && val >= -this.player.speed){
				val-=2;
				if(val < -this.player.speed) val = -this.player.speed
			}
		} else if (val != 0){
			if(val > 0){
				val-=2;
				if(val < 0) val = 0
			} else if(val < 0){
				val+=2;
				if(val > 0) val = 0
			}
		}
	}
	return val
}

//interaction
Ether.World.prototype.handleKeyDown = function(e){
	//if(!this.draggingX || !this.draggingY){
		switch(e){
			case 87:
			case 38 :
				if(!this.speedUp.y && this.yv >= -5){ 
					this.speedUp.y = true;
					this.yv = 1;

				} else if(this.yv < -5){
					this.speedUp.y = false
				}
				this.player.moved = true
				break;
			case 68 :
			case 39 :
				if(!this.speedUp.x && this.xv <= 5){ 
					this.speedUp.x = true;
					this.xv = -1;

				} else if(this.xv > 5){
					this.speedUp.x = false
				}
				this.player.moved = true
				break;
			case 83 : 
			case 40 :
				if(!this.speedUp.y && this.yv <= 5){ 
					this.speedUp.y = true;
					this.yv = -1;

				} else if(this.yv > 5){
					this.speedUp.y = false
				}
				this.player.moved = true
				break;
			case 65 :
			case 37 :
				if(!this.speedUp.x && this.xv >= -5){ 
					this.speedUp.x = true;
					this.xv = 1;

				} else if(this.xv < -5){
					this.speedUp.x = false
				}
				this.player.moved = true
				break;
		}
	//}
}

Ether.World.prototype.handleKeyUp = function(e){
		switch(e){
			case 38 :
				this.speedUp.y = false//this.dragMotion('up',this.yv);
				break;
			case 39 :
				this.speedUp.x = false//this.dragMotion('up',-this.xv) * -1;
				break;
			case 40 :
				this.speedUp.y = false//this.dragMotion('up',-this.yv) * -1;
				break;
			case 37 :
				this.speedUp.x = false//this.dragMotion('up',this.xv);
				break;
		}
}

//Elements
Ether.World.prototype.newElement = function(e){
	var ether = this.player

	//reset coordination variables (x,y,offsets,and drift)
	e.xOffset = e.x - this.x
	e.yOffset = e.y - this.y
	e.newElement = 10;
	e.jitter *= 4;

	if((e.x < ether.x && e.jitter > 0) ||
		(e.x > ether.x && e.jitter < 0)){
		e.jitter *= -1
	}
	

	//place in drifting array
	this.driftArray.push(e);
}

/**
 * @constructor
 */
Ether.Hub = function(engine) {
	var self = this;
	this.engine = engine;
	this.unit = engine.width/50;

	this.showInfo = true;

	//messages
	this.lastTime = 0;
	this.messageExist = false;
	this.messageAlpha = 1;
	this.currentMessage = "";
	this.lastMessageTime = 0;

	//between stages
	this.betweenAlpha = 0.1;
	this.betweenLastTime = 0;

	//intro
	this.intro = true;
	this.lastIntroTime = 0;
	this.introAlpha = 0;
	this.introText = ["","an ether is born","you are born","collect the four elements","grow into yourself","and die","as all things that are born must","seek balance"];
	this.introIndex = 0;
	this.timeOffset = 0

	//questions
	this.choice1Alpha = 0.2;
	this.choice2Alpha = 0.2;
	this.question = 0;
	
	//awards
	this.awardMssg = "";
	this.lifeStageMssg = "";
	this.lifeStageOpts = ["spread your wings","spread your trail"]

	

	this.gameOverLastTime = 0;
	this.gameOverAlpha = 0;
	this.gameOverWidth;
	this.gameOverColor = "rgba(255,255,255,"


	//mousemove
	this.mousemove = function(e){
		var x = e.x;
		var y = e.y;

		if(self.gameOverWidth){

			if((self.gameOverColor != "rgba(255,0,0,") &&
				(e.x > self.engine.width-self.gameOverWidth*2) &&
				(e.y > self.engine.height-self.gameOverWidth*2)){
				self.gameOverColor = "rgba(255,0,0,"
			} else {
				self.gameOverColor = "rgba(255,255,255,"
			}
			return
		}

		if(x <= self.engine.width/2){
			self.choice1Alpha = 0.5;
			self.choice2Alpha = 0.2;
		} else {
			self.choice1Alpha = 0.2;
			self.choice2Alpha = 0.5;
		}
	}

	this.handleClick = function(e){

		if(self.gameOverWidth){
			if((e.x > self.engine.width-self.gameOverWidth*2) &&
				(e.y > self.engine.height-self.gameOverWidth*2)){
				window.location.href = "index.html"
			}
			return
		}

		switch(self.question){
			case 0 :
				self.showInfo = (self.choice1Alpha > self.choice2Alpha) ? true : false
				break;
			case 1 :
				if(self.choice1Alpha > self.choice2Alpha)
					self.engine.setAwards("matter") 
				else
					self.engine.setAwards("consciousness"); 
				break;
			case 2 :
				var ether = self.engine.ethers[0];
				ether.transformation = (self.choice1Alpha > self.choice2Alpha) ? ether.transformations[0] : ether.transformations[1];
				self.lifeStageMssg = (self.choice1Alpha > self.choice2Alpha) ? self.lifeStageOpts[0] : self.lifeStageOpts[1];
				break;
			case 3 :
				self.engine.badGuys = (self.choice1Alpha > self.choice2Alpha) ? true : false
				if(!self.engine.badGuys){ self.engine.world.removeBadElements()}
		}

		
		if(self.question > 3 && self.introIndex + 1 < self.introText.length){
			self.timeOffset = self.lastIntroTime;
			self.introIndex++;
			if(self.introIndex != self.introText.length -1) self.introAlpha = 0;	

		} else if(self.introIndex + 1 != self.introText.length){
			self.question++;
			self.introAlpha = 0;	
		}
	}

	this.handleKeyDown = function(){
			if(self.question > 3 && self.introIndex + 1 < self.introText.length){
				self.timeOffset = self.lastIntroTime;
				self.introIndex++;
				if(self.introIndex != self.introText.length -1) self.introAlpha = 0;	

			}	
	}

}

Ether.Hub.prototype.init = function(){
	window.onmousemove = this.mousemove;
	window.onclick = this.handleClick;
}

Ether.Hub.prototype.drawIntro = function(time){
	var ctx = this.engine.ctx;
	if(this.question <= 3){
		this.drawAnswerBoxes(ctx,time);
		this.drawQuestionText(ctx,time);
	} else {
		this.drawIntroText(ctx,time)
	}
}

Ether.Hub.prototype.drawIntroText = function(ctx,time){
	if(time > this.lastIntroTime + 50){
		this.introAlpha += 0.1;
		this.lastIntroTime = time;
		if(this.introAlpha > 1) this.introAlpha = 1;

		if(this.lastIntroTime-this.timeOffset > 3000){
			this.timeOffset = this.lastIntroTime;
			this.introAlpha = 0;
			this.introIndex++;
			if(this.introIndex == this.introText.length){ this.intro = false }
		}
	}

	var txt = this.introText[this.introIndex];
	var iWidth = ctx.measureText(txt).width;
	ctx.fillStyle="rgba(255,255,255,"+this.introAlpha+")"
	ctx.fillText(txt,(this.engine.width/2)-(iWidth/2),this.engine.height/2)
}

Ether.Hub.prototype.drawQuestionText = function(ctx,time){
	var questions = ["Which is more true?","To which are you destined?","Which is your body?","Which do you desire?"];

	var answers = [["Knowledge is Power.","Reality is Unknown."],
					["Matter","Consciousness"],
					["A Butterfly","A Snail"],
					["Struggle","Peace"]];

	var currentQuestion = questions[this.question];
	var currentAnswers = answers[this.question];
	var qWidth = ctx.measureText(currentQuestion).width;

	if(time > this.lastIntroTime + 50){
		this.lastIntroTime = time;
		this.introAlpha += 0.05;
		if(this.introAlpha > 1) this.introAlpha = 1;
	}

	//quetion
	ctx.font = "28pt Verdana"
	ctx.fillStyle="rgba(255,255,255,"+this.introAlpha+")";
	ctx.fillText(currentQuestion,(this.engine.width/2)-(qWidth/2),this.unit * 2);

	//answers
	var aWidth0 = ctx.measureText(currentAnswers[0]).width;
	var aWidth1 = ctx.measureText(currentAnswers[1]).width;

	ctx.fillText(currentAnswers[0],(this.engine.width/4)-(aWidth0/2),this.engine.height/2)
	ctx.fillText(currentAnswers[1],((this.engine.width/4) * 3)-(aWidth1/2),this.engine.height/2)
}

Ether.Hub.prototype.drawAnswerBoxes = function(ctx){
	var width = this.engine.width;
	var height = this.engine.height;

	ctx.fillStyle = "rgba(75,100,75,"+this.choice1Alpha+")";
	ctx.fillRect(0,0,width/2,height);

	ctx.fillStyle = "rgba(75,75,100,"+this.choice2Alpha+")";
	ctx.fillRect(width/2,0,width/2,height)
}

Ether.Hub.prototype.draw = function(time){
	var stats = this.getStats();
	var ctx = this.engine.ctx;

	//convert stability
	var hubStab = (stats.stab > 100) ? 0 : (100 - stats.stab)

	if(this.showInfo){
		ctx.font = this.unit + "30px Verdana";
		ctx.fillStyle = "rgba(20,70,200,1)"
		ctx.fillText("Mass: " + Math.floor(stats.mass), this.unit,this.unit*1.5)
		ctx.fillText("Balance: " + hubStab, this.unit,this.unit*2.5)
	}

	//in between ages?
	this.drawInbetween(ctx,time);

	if(this.showInfo) this.drawElementStats(stats.elementCount,ctx);
	this.drawLifeBar(ctx, time);
	this.drawMessage(ctx,time);
}

Ether.Hub.prototype.drawInbetween = function(ctx,time){
	var age = this.engine.ethers[0].age;

	if(this.engine.betweenAges){
		if(age < 3){
			//alpha
			if(time > this.betweenLastTime + 100){
				this.betweenLastTime = time;
				ctx.fillStyle = "rgba(0,0,0,"+this.betweenAlpha+")";
			    ctx.fillRect(0,0,this.engine.width,this.engine.height);
			}
		} else{
			this.gameOver(ctx,time)
		}
		
	}
}

Ether.Hub.prototype.newAward = function(text){
	this.awardMssg = text;
	this.drawMessage(0,0,true);
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

Ether.Hub.prototype.drawElementStats = function(count, ctx){
	ctx.font = this.unit/2 + "px Verdana";

	ctx.fillStyle = "red";
	ctx.fillText("Fire: " + count["f"], this.unit, this.unit*3.2);

	ctx.fillStyle = "blue";
	ctx.fillText("Water: " + count["w"], this.unit * 3.5, this.unit*3.2);

	ctx.fillStyle = "white";
	ctx.fillText("Air: " + count["a"], this.unit, this.unit*4.1);

	ctx.fillStyle = "green";
	ctx.fillText("Earth: " + count["e"], this.unit * 3.5, this.unit*4.1);
}

Ether.Hub.prototype.drawLifeBar = function(ctx, time){
	if(this.engine.betweenAges) { return }

	var colors = ["green","yellow","orange","red"];
	var ether = this.engine.ethers[0];
	var ratio = (ether.age != 3) ? (ether.currentSpan/ether.lifeSpan[ether.age]) : (ether.elements.length/ether.finalElementLength)

	ctx.fillStyle = colors[ether.age];
	ctx.fillRect(this.engine.width - (this.unit * 0.5), this.unit * 1.5, -(this.unit * 5) * ratio, this.unit * 0.5)

	ctx.strokeStyle = "red";
	ctx.strokeRect(this.engine.width - (this.unit * 5.5), this.unit * 1.5, this.unit * 5, this.unit * 0.5)

	//MOVE THIS TO ETHER!!???
	if(!ether.moved){return}
		
	if(time > this.lastTime + 1000 && !ether.inVoid){
		this.lastTime = time;
		if(ratio > 0){
			ether.currentSpan--;
		} else {
			this.engine.betweenAges = true;
			this.messageExist = false;
		}
	}

}

//messages
Ether.Hub.prototype.drawMessage = function(ctx,time,award){
	var ether = this.engine.ethers[0];

	var borderMssg = "there is no time in the boundless void";
	var age0Mssg = "you are no longer an infant";
	var age2Mssg = "give back you borrowed";
	var age3Mssg = "so it goes";
	var killerMssg = "Save The Big Ones For Post-Infancy"
	var stableMssg = "You Are Becoming Too Unstable"

	if(award && !this.engine.betweenAges){ this.messageExist = false; this.messageAlpha = 1 }

	if(!this.messageExist){
		//new age
		if(this.engine.betweenAges){
			this.messageExist = true;

			switch(ether.age){
				case 0 :
						this.currentMessage = age0Mssg;
					break;

				case 1 :
					this.currentMessage = this.lifeStageMssg;
					break;

				case 2 :
					this.currentMessage = age2Mssg;
					break;

				case 3 :
					this.currentMessage = age3Mssg;
					break;

			}

		//award
		} else if(this.awardMssg){
			this.messageExist = true;
			this.currentMessage = this.awardMssg;

		//leaving game border
		} else if(this.hasLeftBorder() && this.currentMessage != borderMssg){
			this.messageExist = true;
			this.currentMessage = borderMssg;
		
		//killer element
		} else if(this.killerElement){
			this.messageExist = true;
			this.currentMessage = killerMssg;

		//stability
		} else if(this.unstable && !this.stableWarned){
			this.messageExist = true;
			this.stableWarned = true;
			this.currentMessage = stableMssg;
		}

	} else {
		if(!award) this.renderMessage(ctx,time);
	}
}

Ether.Hub.prototype.renderMessage = function(ctx,time){
	ctx.font = (this.currentMessage == this.awardMssg) ? "90px Verdana" : "30px Verdana";
	var textWidth = ctx.measureText(this.currentMessage).width;

	if(textWidth > this.engine.width - 10){ 
		ctx.font = "70px Verdana"
		textWidth = ctx.measureText(this.currentMessage).width
	}

	var x = (this.engine.width/2) - (textWidth / 2);
	var y = (this.engine.height/2)-this.unit;

	ctx.fillStyle = "rgba(0,0,0,"+this.messageAlpha+")";
	ctx.fillText(this.currentMessage,x+2,y+2);

	ctx.fillStyle = "rgba(255,255,255,"+this.messageAlpha+")";
	ctx.fillText(this.currentMessage,x,y);

	if(time > this.lastMessageTime + 100){
		this.messageAlpha-=0.01;

		if(this.messageAlpha <= 0.01){
			this.messageExist = false;
			this.messageAlpha = 1;
			this.awardMssg = "";
			this.killerElement = false;
			
			//in between message?
			if(this.engine.betweenAges && !this.engine.ethers[0].dead){
				this.currentMessage = "";
				this.engine.betweenAges = false;
				this.engine.ethers[0].age++;
				this.engine.ethers[0].currentSpan = this.engine.ethers[0].lifeSpan[this.engine.ethers[0].age];

				if(this.engine.ethers[0].age < 4){
					this.engine.init();
				}
			}
		}
		this.lastMessageTime = time;
	}

}

Ether.Hub.prototype.hasLeftBorder = function(){
	var ether = this.engine.ethers[0];
	var world = this.engine.world;

	if((ether.x <= world.borderX) ||
		(ether.y <= world.borderY) ||
		(ether.x >= world.vorderX + world.borderW) ||
		(ether.y >= world.borderY + world.borderH)){
		ether.inVoid = true;
		return true
	} else {
		ether.inVoid = false;
	}
}

Ether.Hub.prototype.gameOver = function(ctx,time){
	if(time > this.gameOverLastTime + 100 && this.gameOverAlpha != 1){
		this.gameOverAlpha+= 0.02;
		if(this.gameOverAlpha > 1) this.gameOverAlpha = 1
	}

	ctx.fillStyle = this.gameOverColor+this.gameOverAlpha+")";
	ctx.font = "1em Courier";
	var s = "Restart"
	this.gameOverWidth = ctx.measureText(s).width;
	ctx.fillText(s, this.engine.width-this.gameOverWidth*1.5, this.engine.height-10)
}

Ether.Audio = function (engine) {
	this.engine;
	this.ctx;
	this.audio = {};
}

Ether.Audio.prototype.init = function(){
	/*if(this.loaded) return
	//try{
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		this.ctx = new window.AudioContext();
		console.log(this.ctx)
		this.loadSounds();
/*	} catch(e){
		alert('Your brower does not support Web Audio API. Please update.');
	}*/
	this.loadSounds();
}

Ether.Audio.prototype.loadSounds = function(index){
	var urls = ["fire","water","air","earth"];
	var index = index || 0;
	var self = this;
	var url = urls[index];
	
	this.audio[url] = new Audio("audio/"+url+".wav");
	
	if(index != urls.length-1){
		index++;
		self.loadSounds(index);
	} else {
		self.loaded = true;
	}
}


Ether.Audio.prototype.playSound = function(element){
	var volume = element.bad ? 1 : element.radius/125;
	if(volume > 1) volume = 1
	this.audio[element.type].volume = volume;
	this.audio[element.type].play();
}

/**
 * @constructor
 */
 Ether.Engine = function() {	
	var self = this;

	//Canvas
	this.canvas = document.getElementById('canvas');
	this.ctx = this.canvas.getContext('2d');
	this.width = window.innerWidth;
	this.height = window.innerHeight;
	this.xv;
	this.yv;

	//components
	this.world = new Ether.World(this);;
	this.hub = new Ether.Hub(this);
	this.util = new Ether.Util(this);
	this.audio = new Ether.Audio(this);

	//Ethers
	this.ethers = [new Ether.Ether(self)];
	this.player = this.ethers[0];

	//level
	this.betweenAges = false;

	//endgame
	this.gameOverAlpha = 0;
	this.gameOverTime = 0;

	//award
	this.awardDelay = -5000;

	//Animate
	this.animate = function(time){
		requestAnimFrame(self.animate);

		//Draw Background
		if(!self.player.dead){
			self.ctx.fillStyle = "black";
			self.ctx.fillRect(0,0,self.width,self.height);
		}

		//if configuration is running...
		if(self.hub.intro){
			self.hub.drawIntro(time);

		//otherwise, if between ages...
		} else if(self.betweenAges){
			self.hub.draw(time);

		//otherwise, if player is not dead...
		} else if(!self.player.dead){

			//Draw World
			self.world.draw(self,time);

			//check awards
			if(!self.player.dying){ self.checkAwards(time) };
			//Draw Ethers
			for (var i = 0; i < self.ethers.length; i++) {
				self.ethers[i].draw(self,time);
			};
			self.ctx.globalCompositeOperation = "source-over";

			//Draw Hub
			self.hub.draw(time);

			//

		//otherwise, if player is dead
		} else if(self.player.dead){
			if(time > self.gameOverTime + 100){//self.gameOverAlpha < 0.35){
				self.gameOverAlpha+=0.01;
				self.gameOverTime = time;

				self.ctx.fillStyle = "rgba(255,255,255,+"+self.gameOverAlpha+");";
				self.ctx.fillRect(0,0,self.width,self.height);
			//} else if(self.gameOverAlpha >= 0.35){
			
				self.ctx.font = "30px Arial"
				self.ctx.fillStyle = "black";
				self.ctx.fillText("Dead",self.width/2,self.height/2);
			}
		}
	}

}

Ether.Engine.prototype.init = function(){
	var self = this;

	//set up canvas
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.ctx.fillStyle = "rgba(0,0,0,0.3)";
	this.ctx.fillRect(0,0,this.width,this.height);


	//create player
	//this.ethers.push(new Ether.Ether(this));
	this.player.init();
	
	//set up world
	window.onkeydown = function(evt){
		self.world.handleKeyDown(evt.keyCode,self)
		self.hub.handleKeyDown();
	}

	window.onkeyup = function(evt){
		self.world.handleKeyUp(evt.keyCode,self)
	}

	this.hub.init();

	this.world.init(this);

	this.audio.init();

	//start animation
	if(this.player.age == 0)
		window.requestAnimFrame(this.animate);
}

Ether.Engine.prototype.checkAwards = function(time){
	var stats = this.player.getElementCount();

	if(time > this.awardDelay + 5000){
		this.awardLastTime = time;

		for (var i = 0; i < this.awards.length; i++) {
			var award = this.awards[i];

			//if the award has been awarded, contiue to the next one
			if(award.awarded){ continue }

			var elements = ["f","w","e","a"]
		//	console.log(elements); console.log(award.amount)
			for (var j = 0; j < elements.length; j++) {
				if(stats[elements[j]] >= award.amount){
					if(j == elements.length-1){
						award.awarded = true;
						this.hub.newAward(award.text);
						this.player.receiveAward(award.award);
						this.awardDelay = time;
					}
				} else {
					break;
				}
			};

			break; //awards must be won in order
		};
	}
}

Ether.Engine.prototype.setAwards = function(type){
	this.awards = Ether.awards[type];

	var amount = 1;
	var award = 1;

	for (var i = 0; i < this.awards.length; i++) {
		this.awards[i].amount = amount;
		this.awards[i].award = Math.ceil(award/5);
		//console.log(this.awards[i].amount)
		amount += 4;
		award = i+1;
	};
}

Ether.Engine.prototype.removeEther = function (ether){
	for (var i = this.ethers.length; i > 0; i--) {
		if(this.ethers[i] && this.ethers[i].x == ether.x && this.ethers[i].y == ether.y){
			this.ethers.splice(i,1);
			return
		}
	};
}
//////////////////
//////////////////

var e = new Ether.Engine();
e.init();