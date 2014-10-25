/*! Quintessence - v0.0.1 - 2014-10-25 */window.mobilecheck = function() {
var check = false;
(function(a){if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|iris|kindle|lge |maemo|midp|mmp|mobile.+firefox|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(a)||/1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(a.substr(0,4)))check = true})(navigator.userAgent||navigator.vendor||window.opera);
return check; };Ether.Element = function(type,size,config,bad){
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
	this.rgb = {r : r, g : g, b : b, a : 0.5}

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

};Ether.MsgQue = function(){
	this.que = [];
}

Ether.MsgQue.prototype.addMsg = function(config){
	this.que.push(new Ether.Msg(config));
}

Ether.MsgQue.prototype.getMsg = function(){
	return this.que.shift();
}

Ether.MsgQue.prototype.hasMsg = function(){
	return this.que.length > 0
}

Ether.Msg = function(c){
	this.str = c.string
	this.sub = c.sub || ""
	this.alpha = 1
	this.alphaStep = c.alphaStep || 0.02
	this.alphaTime = c.alphaTime || 100;
	this.type = c.type
	this.fill = c.fill || "rgba(164,161,151,"
}

Ether.Msg.prototype.lowerAlpha = function(){
	this.alpha -= this.alphaStep
	if(this.alpha < 0) this.alpha = 0
	return this.alpha
}

Ether.Msg.prototype.isFadedEnuf = function(){
	return this.alpha < 0.3
};Ether.awards = {};

Ether.awards["matter"] = [
	{
		text : "String(1 x 10^-35)"
	},{
		text : "Quantum Foam(1 x 10^-35)"
	},{
		text : "Neutrino(1 x 10^-24)"
	},{
		text : "Quark(1 x 10^-19)"
	},{
		text : "Proton(1 x 10^-15)"
	},{
		text : "Neutron(1 x 10^-15)"
	},{
		text : "Electrons(1 x 10^-15)"
	},{
		text : "Rays(1 x 10^-12)"
	},{
		text : "Atoms(1 x 10^-10)"
	},{
		text : "Proteins(1 x 10^-10)"
	},{
		text : "Molecules(1 x 10^-9)"
	},{
		text : "Clay Particles(1 x 10^-6)"
	},{
		text : "Mist Droplets(1 x 10^-5)"
	},{
		text : "Viruses(1 x 10^-8)"
	},{
		text : "Large Rocks(5 x 10^3)"
	},{
		text : "Moons(1.5 x 10^5)"
	},{
		text : "Bacteria(1 x 10^-3)"
	},{
		text : "Planets(1.27 x 10^7)"
	},{
		text : "Nebula(8^10 x 16)"
	},{
		text : "Protozoa(1 x 10^-5)"
	},{
		text : "Choanoflagellate(7 x 10^-6)"
	},{
		text : "Stars(5.8 x 10^9)"
	},{
		text : "Galaxies(1.2 x 10^21)"
	},{
		text : "Clusters(3 x 10^23)"
	},{
		text : "Chromistas(1 x 10^-1)"
	},{
		text : "Fungi(7 x 10^3)"
	},{
		text : "Invertebrates(4 x 10-2)"
	},{
		text : "Plants(1.5 x 10^1)"
	},{
		text : "Vertebrates(1 x 10^-1)"
	},{
		text : "Land Animals(3 x 10^0)"
	},{
		text : "Intelligence(1.7 x 10^0)"
	},{
		text : "Symbolic Systems(1.7 x 10^0)"
	},{
		text : "Mechanical Systems(1.5 x 10^1)"
	},{
		text : "Digital Systems(3.2 x 10^-8)"
	},{
		text : "Bioengineered Systems(1.7 x 10^0)"
	},{
		text : "Quantum Systems(1 x 10^-10)"
	},{
		text : "Artifical Intelligence(3.2 x 10^-8)"
	},{
		text : "Planetary Societies(1.27 x 10^7)"
	},{
		text : "Synchronized Mind(1.7 x x10^0)"
	},{
		text : "Solar Societies(1.2 x 10^10)"
	},{
		text : "Giant Stars(8 x 10^11)"
	},{
		text : "Dwarf Stars(1.27 x 10^7)"
	},{
		text : "String Computing(1 x 10^-35)"
	},{
		text : "Neutron Stars(1.3 x 10^4)"
	},{
		text : "Supernovas(9.5 x 10^16)"
	},{
		text : "Galactic Societies(1.2 x 10^21)"
	},{
		text : "Multi-Demensional Computing(~)"
	},{
		text : "Black Holes"
	},{
		text : "Thermal Equilibrium"
	},{
		text : "[silence]"
	}
];

Ether.awards["consciousness"] = [
	{
		text : "I"
	},{
		text : "I am"
	},{
		text : "Me"
	},{
		text : "Mine"
	},{
		text : "You"
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
		text : "I want this"
	},{
		text : "Why can't I have that?"
	},{
		text : "I'm afraid"
	},{
		text : "Why do I hurt?"
	},{
		text : "How do I get more?"
	},{
		text : "Who are my friends?"
	},{
		text : "How can I thrive?"
	},{
		text : "This is my stuff"
	},{
		text : "I am right"
	},{
		text : "They are wrong"
	},{
		text : "I will create"
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
		text : "This is the truth"
	},{
		text : "That is not the truth"
	},{
		text : "This is who I am"
	},{
		text : "Who I am keeps changing"
	},{
		text : "I am my thougts"
	},{
		text : "My thoughts always change"
	},{
		text : "Do I change?"
	},{
		text : "What is constant?"
	},{
		text : "I am awareness"
	},{
		text : "Was awareness always here?"
	},{
		text : "From here did this awareness come?"
	},{
		text : "All comes from nothing"
	},{
		text : "All goes to nothing"
	},{
		text : "I am all"
	},{
		text : "I am nothing"
	},{
		text : "I am self evident"
	},{
		text : "I am self here"
	},{
		text : "No word is true"
	},{
		text : "How can sounds describe silence?"
	},{
		text : "[silence]"
	}
];;Ether.Util = function (engine) {
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

Ether.Util.prototype.getLocalStorage = function(){
    try {
    	if(!! window.localStorage) return window.localStorage;
    }catch(e){
    	return false;
    }
};Ether.Ether = function(engine) {
	this.engine = engine;
	this.util = engine.util
	this.rotateLastTime = 0;

	//elements
	this.coreElements = [];
	this.elements = [];
	this.moved;
	this.receivedFirstElement = false;
	this.enemySeen = false;

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
	this.force = 100;
	this.elementCount = {f:0,w:0,a:0,e:0}

	//life and death
	this.health = 5000;
	this.lifeSpan = [400]; //in seconds
	this.currentSpan = this.lifeSpan[0];
	this.totalLifeSpan;
	this.ageLastTime = 0;
	this.finalElementLength = 1;
	this.stabilityLastTime = 0;

	this.unstable = false;
	this.bigElementIncrease = false;
	this.oldSum = 9999;
	this.purging = false;
	this.dying = false;
	this.dead = false;
	this.dyingTime = 0;
	this.gameOverCounter = 5;
	this.pulseTimeout = 0;
	
	
	this.transformation;
	this.transformations = {
		butterfly : this.rotateElement,
		snail : this.createSludge
	}

	this.sludgeTimeOffset = 500;
	this.sludgeAlphaStep = 0.1
	this.sludgeLastTime = 0;

	this.rotateLastTime = 0;
	this.rotateDirection = -1;
	this.degreeChange = 0;
	this.blownUpElements = [];
	this.blowUpTime = 0;

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
	this.checkZoom();
	this.ageEther(time);
}

Ether.Ether.prototype.drawElements = function(engine,time){
	var self = this;

	this.bigElementIncrease = this.hadBigElementIncrease();
	for (var i = 0; i < this.elements.length; i++) {
		var e = this.elements[i];

		//update the x and y position
		if(!this.engine.isPaused){
			e.x = this.x + e.xOffset + (e.jitter * (this.getStability()/10));
			e.y = this.y + e.yOffset;
			e.jitter *= -1;
		}

		// console.log("dyingTime: " + this.dyingTime);
		// console.log("time: " + time);
		// console.log("this.dying: " + this.dying)

		if(this.transformation){ 
			this.transformation(e,time) 
		}

		//Draw Ether Elements
		engine.ctx.beginPath();

		self.util.drawElement(e, engine.ctx, function(ctx, element){
			var gradient = engine.ctx.createRadialGradient(element.x,element.y,0,element.x,element.y,element.radius);
			if(element.rgb.a !=0.5){
				return self.util.createGradient(gradient,[[0.1,"white"],[0.1,"white"],[0.8,element.color],[0.1,"black"]])
			 } else {
			 	return self.util.createGradient(gradient,[[0.1,"rgba(255,255,255,"+element.rgb.a+")"],[0.1,"rgba(255,255,255,"+element.rgb.a+")"],[0.8,element.color],[0.1,"rgba(0,0,0,"+element.rgb.a+")"]])				
			 }
		})

	};

	if(this.transformation && time > this.rotateLastTime + 500){
		this.rotateLastTime = time;
	}

	if (!this.transformation && this.dying && time > this.dyingTime + 150){
			this.dyingTime = time;
			this.loseElements(1);
			this.isGameOver();
		}
}

Ether.Ether.prototype.drawCoreElements = function(engine){
	var self = this;
	engine.ctx.globalCompositeOperation = "lighter";

	for (var i = 0; i < this.coreElements.length; i++) {
		var e = this.coreElements[i];

		engine.ctx.beginPath();
		
		self.util.drawElement(e, engine.ctx, function(ctx,element){
			var gradient = ctx.createRadialGradient(element.x,element.y,0,element.x,element.y,element.radius);
			return self.util.createGradient(gradient,[[0.5,"white"],[0.4,element.color],[1,"black"]])
		});	

		if(!this.engine.isPaused){
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
		}
	};
}

Ether.Ether.prototype.stabilityCheck = function(engine,time){
	var stability = this.getStability();
	//stabilit starts at 0 and increases as it become more unstable
	if(stability >= 20 && !this.dying){
		this.unstable = true 
	} else {
		this.unstable = false
	}

	if(stability >= 50 && !this.dying){
		this.purging = true;

		if(time > this.stabilityLastTime + 2000 - stability){
			this.stabilityLastTime = time;		
			this.loseElements(3);
		}
	} else {
		engine.hub.purging = false;
	}
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
	// if(time > this.ageLastTime + this.healthRate(time)){
	// 	this.ageLastTime = time;
		
	// 	if(this.elements.length != 0){
	// 		var e =this.loseElement(this.elements[this.elements.length-1],true)
	// 		this.engine.audio.playElementSound(e);
	// 	}
	// }

	if(this.dying){return}

	var ratio = this.getLifeRatio();

	if(!this.moved){return}
		
	if(time > this.ageLastTime + 1000 && /*!this.inVoid &&*/ !this.engine.isPaused){
		this.ageLastTime = time;

		if(ratio > 0){
			this.currentSpan--;

			if(ratio <= .25){
				if(time > this.pulseTimeout + (ratio*100 *40) + 2000){
					this.engine.audio.playSound("tutorial",0.3);
				}
			}

		} else {
			this.dying = true;
		}
	}
}

Ether.Ether.prototype.getLifeRatio = function(){
	return this.currentSpan/this.lifeSpan[0];
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

Ether.Ether.prototype.hadBigElementIncrease = function(){
	var sum = 4;

	for(var i in this.elementCount){
		sum += this.elementCount[i];
	}

	if(sum >= this.oldSum*2){
		this.oldSum = sum;
		return true;
	} else {
		this.oldSum = sum <= 4 ? 9999 : sum;
		return this.bigElementIncrease
	}
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
	this.receivedFirstElement = true;
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
		var random = Math.floor(Math.random() * this.elements.length)

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


Ether.Ether.prototype.isGameOver = function(){
	if(this.elements.length == 0){
		this.gameOverCounter -= 1;
	}
		
	if(this.gameOverCounter == 0){
		this.dead = true;
		console.log("dead")
	}
}

//zoom
Ether.Ether.prototype.checkZoom = function(){
	if(this.isAtScreenEdge() && !this.canZoom){ 
		console.log("At Screen Edge")
		if(!this.engine.hub.zoomMessageShown){
			this.engine.hub.zoomMessage0 = "See (Z)oom in the lower-right corner.";
		}

		this.canZoom = true;
	}
}

Ether.Ether.prototype.isAtScreenEdge = function(){

	if(this.x + (this.range*1.5) > this.engine.width){
		return true
	} else if(this.y + (this.range*1.5) > this.engine.height){
		return true
	}
}

Ether.Ether.prototype.getMoreScreen = function(time){
	if(this.zoomCounter != 0 && time > this.zoomLastTime + this.zoomDelay){
		this.zoomLastTime = time;
		this.zoomCounter -= 1
		this.zoomOut(this.zoomStep);
		this.engine.world.zoomOutBackground(1.25);
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


//lifestages
Ether.Ether.prototype.rotateElement = function(e,time){
	if(time > this.rotateLastTime + 100){

		if(this.rotateDirection < 0){ //rDir starts at -1
			this.degreeChange += 0.001;
			
			if(this.degreeChange > 1) {
				this.degreeChange = 1;
				this.rotateDirection++; 
			}

		} else if(this.rotateDirection > 0){
			this.degreeChange -= 0.001;
			if(this.degreeChange < 0.001) {this.degreeChange = 0.001 }

		} else {
			if(this.dying){ this.rotateDirection++; }

		}
	}

	if(e.degree == 360){
		e.degree = 0;
	} else {
		e.degree+=this.degreeChange;
	}

	e.xOffset = (e.range * Math.cos(this.util.degToRad(e.degree)));
	e.yOffset = (e.xOffset * Math.tan(this.util.degToRad(e.degree)));

	if(this.dying){this.loseElements(1); this.isGameOver()}
	
}

Ether.Ether.prototype.createSludge = function(e,time){
	if(this.dying){
		this.blowUpElements(time);
	} else if(time > this.sludgeLastTime + this.sludgeTimeOffset){
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

Ether.Ether.prototype.blowUpElements = function (time) {

	if(time > this.blowUpTime + 100){
		this.blowUpTime = time;

		var c = 5 - this.blownUpElements.length;

		if(this.elements.length != 0 && c > 0){
			var random = Math.floor(Math.random() * this.elements.length)
			this.igniteElement(this.elements[random]);
		}

		for (var i = 0; i < this.blownUpElements.length; i++) {
			var e = this.blownUpElements[i]
			if(this.blowUpElement(e)){ //if blown up element is removed
				i--;
			}
		};

		this.isGameOver();
	}
}

Ether.Ether.prototype.blowUpElement = function (e) {
	if(e.rgb.a > 0){
		e.rgb.a -= 0.01;
		if(e.rgb.a < 0){ e.rgb.a = 0; }
		e.radius += 2;
		e.color = "rgba("+e.rgb.r+","+e.rgb.g+","+e.rgb.b+","+e.rgb.a+")"
	} else if(e.rgb.a == 0){
		this.removeFromElementCount(e);
		this.decreaseMass(e);
		
		//remove from elements
		for (var i = 0; i < this.elements.length; i++) {
			var ele = this.elements[i];

			if(ele.x == e.x && ele.y == e.y){
				this.blownUpElements.splice(0,1)
				this.elements.splice(i,1);
				return true
			}
		};
	}
}

Ether.Ether.prototype.igniteElement = function (e) {
	this.blownUpElements.push(e);
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
};Ether.Trophy = function(){
	this.indexedDB = window.indexedDB || window.mozIndexedDB || window.webkitIndexedDB || window.msIndexedDB;
	this.IDBTransaction = window.IDBTransaction || window.webkitIDBTransaction || window.msIDBTransaction;
	this.IDBKeyRange = window.IDBKeyRange || window.webkitIDBKeyRange || window.msIDBKeyRange;
	this.db;
	this.newEther;

	if (!this.indexedDB) {
    	window.alert("Your browser doesn't support IndexedDB. Please update to get the most out of this game.");
	}
}

Ether.Trophy.prototype.extractEtherInfo = function(ether){
	var body = {};
	body.elements = ether.elements;
	body.coreElements = ether.coreElements;
	return body;
}

Ether.Trophy.prototype.init = function(){
	var request = this.indexedDB.open("PastEther",1);

	request.onerror = function(event) {
	  alert("Why didn't you allow my web app to use IndexedDB?!");
	};

	request.onsuccess = function(event) {
		this.db = request.result;
		
		 var transaction = db.transaction()

		console.log(this.db.transaction.objectStore);
		console.log(this.db.transaction.objectStore("ether"));

		if(!this.db.transaction.objectStore("ether")){
			console.log("inside if statement");
			console.log(this.db.createObjectStore);
			var objectStore = this.db.createObjectStore("ether",{ autoIncrement : true });
			console.log("object store made")
			objectStore.createIndex("elements","elements");
			objectStore.createIndex("coreElements","coreElements");
			console.log("index created")
	  	}
	  	console.log('end on request success')
	};
}

Ether.Trophy.prototype.save = function(ether){
	console.log("in save")
	var body = this.extractEtherInfo(ether);
	var etherObjectStore = db.transaction("Ether","readwrite").objectStore("Ether");
	etherObjectStore.add(body);
	console.log(etherObjectStore);
};Ether.World = function (engine) {
	this.engine = engine;
	this.util;
	this.player;

	//world positioning values
	this.width = engine.width*100;
	this.height = engine.height*100;
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

	this.farBackground = [];
	this.midGround = [];
	this.NumberOfStars = 4;

	this.badToggle = 0

}

//WORLD INIT
Ether.World.prototype.init = function(engine){
	var eleStrings = ['earth','air','fire','water'];
	
	// if(engine.ethers[0].age != 0){ 
	// 	this.zoomOut(2) 
	// } else {
		this.player = engine.ethers[0]
		this.util = engine.util;
	// }

	this.initBackground();

	for (var i = 0; i < this.elements.length; i++) {
		var collection = this.elements[i];
		var type = eleStrings[i];

		this.initElements(type,collection,[60,350,500],[3,50,300],[5000,600,150],[40500,600,300])
		this.initBadGuys(type,collection,120,true);
	
	};
}

Ether.World.prototype.initElements = function(type,collection,max,min,n,sizeOffset){
	for (var i = 0; i < n.length; i++) {

		this.initElement(type,collection,n[i],sizeOffset[i],function(e){
			if(max[i] && e.radius > max[i]) e.radius = max[i];
			if(min[i] && e.radius < min[i]) e.radius = min[i];
		})
	
	};

	
}

Ether.World.prototype.initBadGuys = function(type,collection,max,t){
	var bool = t || this.engine.badGuys;
	if(bool){
			this.initElement(type,collection,30,1,function(e){
				if(e.radius > max || e.radius < max) e.radius = max;
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
			var x = element.xOffset+this.x;
			var y =element.yOffset+this.y;

			collection.push(element);
		};
}

Ether.World.prototype.initBackground = function(){
	for (var i = 0; i < 3; i++) {
		this.farBackground[i] = [];

		for (var j = 0; j < 3; j++) {
			this.farBackground[i][j] = new Image();
			this.farBackground[i][j].src = "imgs/background.jpg";
			this.farBackground[i][j].xPos = (i*1356) - 1356;
			this.farBackground[i][j].yPos = (j*1356) - 1356;
		};
	};

	for (var i = 0; i < this.NumberOfStars; i++) {
		this.midGround[i] = new Image();
		this.midGround[i].src = "imgs/star"+i+".png";
		this.midGround[i].xPos = Math.round(Math.random() * this.engine.width*6) - this.engine.width*3;
		this.midGround[i].yPos = Math.round(Math.random() * this.engine.height*6) - this.engine.height*3;
	};
}

//DRAWING
Ether.World.prototype.draw = function(engine,time){
		if(!this.engine.isPaused){
			this.xv = this.adjustVelocity("x",this.xv,time);
			this.yv = this.adjustVelocity("y",this.yv,time);
		} else {
			this.xv = 0;
			this.yv = 0;
		}
	
		//drag timer
		if(time > this.dragLastTime + 200){ this.dragLastTime = time }
		
		//DrawBackground
		this.drawBackground(this.xv,this.yv);
		
		if(!this.engine.isPaused){
			//update x+y
			this.x += this.xv;
			this.y += this.yv;

			this.player.xv = this.xv;
			this.player.yv = this.yv;

			engine.xv = this.xv;
			engine.yv = this.yv;
		}

		

	for (var i = 0; i < this.elements.length; i++) {
		var collection = this.elements[i];

		for (var j = 0; j < collection.length; j++) {
			var e = collection[j];

			if(!this.isInView(e)){ continue }

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



Ether.World.prototype.zoomOutBackground = function(val){
	for (var i = 0; i < this.midGround.length; i++) {
		var star = this.midGround[i];
		star.width /= val;
		star.height /= val;
	};
}

Ether.World.prototype.zoomOutElements = function(val){
	for (var i = 0; i < this.elements.length; i++) {
		for (var j = 0; j < this.elements[i].length; j++) {
			this.elements[i][j].radius /= val;
		};		
	};
}

Ether.World.prototype.drawBackground = function(xv,yv){
	var xvBack = Math.ceil(xv/10);
	var yvBack = Math.ceil(yv/10);
	var xvMid = Math.ceil(xv/5);
	var yvMid = Math.ceil(yv/5);

	var width = this.engine.width;
	var height = this.engine.height;
	
	// for (var j = 0; j < this.hills.length; j++) {
	// 	var row = this.hills[j]

	// 	for (var i = 0; i < row.length; i++) {
	// 		var hill = row[i];

	// 		if(!this.engine.isPaused){
	// 			hill.x += xv
	// 			hill.y += yv
	// 		}

	// 		if(hill.x+this.hillWidth < 0) hill.x = this.engine.width
	// 		if(hill.x > this.engine.width) hill.x = -this.hillWidth
	// 		if(hill.y+this.hillHeight < 0) hill.y = this.engine.height
	// 		if(hill.y > this.engine.height) hill.y = -this.hillHeight

	// 		var gradient = this.engine.ctx.createLinearGradient(hill.x,hill.y,hill.x+this.hillWidth,hill.y+this.hillHeight);
	// 		this.engine.ctx.fillStyle = this.util.createGradient(gradient,[[0.05,"rgba(0,0,0,1)"],[0.95,"rgba(20,20,20,1)"]]);
	// 		this.engine.ctx.fillRect(hill.x,hill.y,this.hillWidth+5,this.hillHeight+5)
	// 	};
	// }

	for (var i = 0; i < this.farBackground.length; i++) {
		var row = this.farBackground[i];

		for (var j = 0; j < row.length; j++) {
			var field = row[j];
			field.xPos += xvBack;
			field.yPos += yvBack;

			if(field.xPos + field.width*2 <= 0){ 
				field.xPos = width
			} else if(field.xPos >= field.width*2){ 
				field.xPos = -field.width;
			}

			if(field.yPos + field.height*2 <= 0){ 
				field.yPos = height;

			}else if(field.yPos >= field.height*2){ 
				field.yPos = -field.height;
			}


			this.engine.ctx.drawImage(field, field.xPos, field.yPos)
		};
		
	};

	for (var i = 0; i < this.midGround.length; i++) {
		var star = this.midGround[i];

		star.xPos += xvMid;
		star.yPos += yvMid;

		if(star.xPos < -width*3){ 
			star.yPos = Math.round(Math.random() * height*6) - height*3;
			star.xPos = (width * 3) - star.width;
		} else if(star.xPos > width * 3){
			star.yPos = Math.round(Math.random() * height*6) - height*3;
			star.xPos = -width*3;
		}

		if(star.yPos < -height*3){
			star.xPos = Math.round(Math.random() * width*6) - width*3;
			star.yPos = height * 3 - star.height;
		} else if(star.yPos > height * 3){
			star.xPos = Math.round(Math.random() * width*6) - width*3;
			star.yPos = -height * 3;
		}

		this.engine.ctx.drawImage(star, star.xPos, star.yPos)

	};
	

}

Ether.World.prototype.driftTowardsEther = function(element){
	if(this.engine.isPaused){ return }
	var ether = this.player;
	var radius = Math.round((element.radius * 2 * ether.attraction) + ether.range + 10);
	var speed;

	 if(element.bad){
	 	speed = ether.speed-ether.resistance
	 }else{ 
	 	speed = Math.round((ether.force/element.radius) * 100) / 100; 
	 }

	 // console.log("DRIFT CHECK")
	 // console.log("SPEED: " + speed)
	 // console.log("RADIUS: " + radius)
	 // console
	 // console.log("~~~~~~~~~~~~~~~~~~")

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
	
	if(e.bad){ ether.enemySeen = true };

	if(distance < range){
		if(!e.bad){
			//give the element an 'x, y' relative to the ether
			e.x = x;
			e.y = y;
			//add to ether.elements[] and remove from world.elements[]
			ether.newElement(e);
			this.elements[collection].splice(index,1);
		} else {
			if(this.badToggle > this.player.resistance*2){
				this.badToggle = 0;
				this.engine.audio.playElementSound(e)
				ether.loseElements(2);
			} else {
				this.badToggle += 1;
			}
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
	var ctrl = this.player.getControl();
	//if(this.engine.player.dying){ return }
	//if(!this.draggingX || !this.draggingY){
		switch(e){
			case 87:
			case 38 :
				if(!this.speedUp.y && this.yv >= -ctrl){ 
					this.speedUp.y = true;
					this.yv = 1;

				} else if(this.yv < -ctrl){
					this.speedUp.y = false
				}
				this.player.moved = true
				break;
			case 68 :
			case 39 :
				if(!this.speedUp.x && this.xv <= ctrl){ 
					this.speedUp.x = true;
					this.xv = -1;

				} else if(this.xv > ctrl){
					this.speedUp.x = false
				}
				this.player.moved = true
				break;
			case 83 : 
			case 40 :
				if(!this.speedUp.y && this.yv <= ctrl){ 
					this.speedUp.y = true;
					this.yv = -1;

				} else if(this.yv > ctrl){
					this.speedUp.y = false
				}
				this.player.moved = true
				break;
			case 65 :
			case 37 :
				if(!this.speedUp.x && this.xv >= -ctrl){ 
					this.speedUp.x = true;
					this.xv = 1;

				} else if(this.xv < -ctrl){
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
			case 87 :
				this.speedUp.y = false//this.dragMotion('up',this.yv);
				break;
			case 68 :
			case 39 :
				this.speedUp.x = false//this.dragMotion('up',-this.xv) * -1;
				break;
			case 40 :
			case 83 :
				this.speedUp.y = false//this.dragMotion('up',-this.yv) * -1;
				break;
			case 37 :
			case 65 :
				this.speedUp.x = false//this.dragMotion('up',this.xv);
				break;
		}
}

Ether.World.prototype.handleTouch = function(e){
	console.log(e.changedTouches)
}

Ether.World.prototype.handleTouchEnd = function(e){
	console.log(e.changedTouches)
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
};Ether.Hub = function(engine) {
	var self = this;
	this.engine = engine;
	this.unit = engine.width/50;

	this.showInfo = true;

	//messages
	this.lastTime = 0;
	this.messageExist = false;
	//this.messageAlpha = 1;
	this.currentMessage = "";
	this.lastMessageTime = 0;
	this.msgQue = new Ether.MsgQue();

	//intro
	this.intro = true;
	this.lastIntroTime = 0;
	this.introAlpha = 0;
	this.introText = ["an ether is born","you are born","collect the four elements","grow into yourself","and die","as all things that are born must","seek balance"];
	this.introIndex = 0;
	this.timeOffset = 0

	//zoom
	this.zoomTimeout = 100
	this.zoomLastTime = 0
	this.zoomMessage = ""
	this.zoomMessageShown = false
	this.zoomMessage0 = ""
	this.zoomMessage1 = "It means you can zoom out."
	this.zoomMessage2 = "Press Z to zoom out"
	
	//awards
	this.awardMssg = "";
	this.lifeStageMssg = "";
	this.lifeStageOpts = ["spread your wings","spread your trail"]
	this.subMessage = "";

	this.gameOverLastTime = 0;
	this.gameOverAlpha = 0;
	this.gameOverWidth;
	this.gameOverColor = "rgba(0,0,0,"

	//tutorial
	this.lifeSpanMssgShown = false;

	this.stableWarned = false;
	this.stableMssg0 = "Vibration is a sign of imbalance."
	this.stableMssg1 = "You will purge yourself if BALANCE falls below 50."
	this.purgeMssg = "PURGING"
	this.purgeNotified = false;
	this.unstable = false;

	this.firstElementMessage0 = "You have acquired your first element."
	this.firstElementMessage11 = "New elements change your BALANCE."
	this.firstElementMessage10 = "Don't let it become too low (< 50)."
	this.firstElementShown = false;

	this.lifeBarMessage0 = "Your lifespan is represented at the top of the screen."
	this.lifeBarMessage1 = "When it runs out, you will die."

	this.enemyMessage0 = "Rainbow Voids will purge you of all your elements."
	this.enemyMessage1 = " Stay away from them."
	this.enemyMessageShown = false;

	this.bigElementMessageShowing = false;
	this.bigElementMessageShown = false;
	this.bigElementSub = "CAREFUL!"
	this.bigElementMessage = "Large elements can cause a sudden imbalance."

	this.upgradeMessageShown = false;
	this.upgradeAvailable = false;
	this.upgradeMessage0 = "See (U)pgrades in the lower-right corner."
	this.upgradeMessage1 = "It means you have an available upgrade."
	this.upgradeMessage2 = "Press 'U' to access upgrades."


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
		
		if(self.introIndex + 1 < self.introText.length){
			self.timeOffset = self.lastIntroTime;
			self.introIndex++;
			if(self.introIndex != self.introText.length -1) self.introAlpha = 0;	

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
	this.drawIntroText(ctx,time)
}

Ether.Hub.prototype.drawIntroText = function(ctx,time){
	if(time > this.lastIntroTime + 50){
		ctx.font = "28pt simple"
		ctx.fillStyle="rgba(164,161,151,"+this.introAlpha+")";

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

Ether.Hub.prototype.draw = function(time){
	var ctx = this.engine.ctx;
	var stats = this.getStats();

	var balanceWidth = this.drawBalance(stats.stab,ctx);
	this.drawElementStats(stats.elementCount,ctx,balanceWidth);
	this.drawLifeBar(ctx, time);
	this.updateMsgQue();
	this.drawMessage(ctx,time);
	this.drawZoom(ctx,time);
	this.drawUpgrade(ctx,time);
}

Ether.Hub.prototype.drawZoom = function(ctx,time){
	if(!this.engine.player.moved){return}

	if(!this.engine.player.canZoom){
		ctx.fillStyle = "rgba(65,78,78,.2)"
	} else {
		ctx.fillStyle = "#A3C2C2"
	}
	ctx.font = this.unit*1.5 + "px simple";
	ctx.fillText("(Z)oom Out",this.engine.width - this.unit*8,this.engine.height - this.unit*2.5)
}

Ether.Hub.prototype.drawUpgrade = function(ctx,time){
	if(!this.engine.player.moved){return}

	if(!this.engine.upgrade.canUpgrade()){	
		ctx.fillStyle = "rgba(65,78,78,.2)"
	} else {
		this.upgradeAvailable = true;	
		ctx.fillStyle = "#A3C2C2"
	}

	ctx.font = this.unit*1.5 + "px simple";
	ctx.fillText("(U)pgrades",this.engine.width - this.unit*8,this.engine.height - this.unit)
}


Ether.Hub.prototype.newAward = function(text,amount){
	this.awardMssg = [text,amount];
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

Ether.Hub.prototype.drawBalance = function(stab,ctx){
	var hubStab = (stab > 100) ? 0 : (100 - stab)
	
	ctx.font =this.unit*2+"px simple";
	ctx.fillStyle = "#414E4E";
	ctx.fillText("Balance: " + hubStab, this.unit*.9-2,(this.engine.height - this.unit*1.2)-2);
	
	ctx.fillStyle = "#A3C2C2";
	ctx.fillText("Balance: " + hubStab, this.unit *.9,this.engine.height - this.unit*1.2);

	return this.unit
}

Ether.Hub.prototype.drawElementStats = function(count, ctx, width){
	ctx.font = this.unit + "px simple";

	var fWidth = ctx.measureText("Fire: " + count["f"]).width
	var aWidth = ctx.measureText("Air: " + count["a"]).width
	var eleWidth = (fWidth >= aWidth) ? fWidth : aWidth

	ctx.fillStyle =  "#6B504A";
	ctx.fillText("Fire: " + count["f"], width-1, this.engine.height - this.unit*4.5 -1);
	ctx.fillStyle = "#E0664A";
	ctx.fillText("Fire: " + count["f"], width, this.engine.height - this.unit*4.5);

	ctx.fillStyle ='#243F63',
	ctx.fillText("Water: " + count["w"], width + eleWidth + this.unit * 2 - 1, this.engine.height - this.unit*4.5 -1);	
	ctx.fillStyle = "#47BDDE";
	ctx.fillText("Water: " + count["w"], width + eleWidth + this.unit * 2, this.engine.height - this.unit*4.5);

	ctx.fillStyle = "#9E9E99";
	ctx.fillText("Air: " + count["a"], width  -1, this.engine.height - this.unit*3-1);
	ctx.fillStyle = "#EDEDEB";
	ctx.fillText("Air: " + count["a"], width , this.engine.height - this.unit*3);

	ctx.fillStyle = '#858063'
	ctx.fillText("Earth: " + count["e"], width + eleWidth + this.unit * 2 -1, this.engine.height - this.unit*3-1)
	ctx.fillStyle = '#6C7F2E';
	ctx.fillText("Earth: " + count["e"], width + eleWidth + this.unit * 2, this.engine.height - this.unit*3);

	var fwSign = this.getEqualitySign(count['f'],count['w']);
	var aeSign = this.getEqualitySign(count['a'],count['e']);

	ctx.fillStyle = "#414E4E";
	ctx.fillText(fwSign, width + eleWidth + this.unit*.75-1, this.engine.height - this.unit * 4.5 - 1)
	ctx.fillText(aeSign, width + eleWidth + this.unit*.75- 1, this.engine.height - this.unit *3- 1)
	ctx.fillStyle = "#A3C2C2";
	ctx.fillText(fwSign, width + eleWidth + this.unit*.75, this.engine.height - this.unit * 4.5)
	ctx.fillText(aeSign, width + eleWidth + this.unit*.75, this.engine.height - this.unit*3)
}

Ether.Hub.prototype.getEqualitySign = function(val1,val2){
	if(val1 > val2){
		return ">"
	} else if(val1 < val2){
		return "<"
	} else{
		return "="
	}
}

Ether.Hub.prototype.drawLifeBar = function(ctx, time){

	var ether = this.engine.ethers[0];
	 var ratio = ether.getLifeRatio();
	var color = this.getLifeBarColor(ratio);

	ctx.fillStyle = "#FFF4E9";
	ctx.font = this.unit + "px simple"
	var w = ctx.measureText("Lifespan").width
	ctx.fillText("Lifespan",(this.engine.width/2)-(w/2), this.unit);

	ctx.fillStyle = color;
	ctx.fillRect(this.engine.width -(this.unit * 2), this.unit * 1.5, -(this.unit * 46) * ratio, this.unit * 0.5)

	ctx.strokeStyle = "red";
	ctx.strokeRect((this.unit * 2), this.unit * 1.5, this.unit * 46, this.unit * 0.5)

	//MOVE THIS TO ETHER!!???
	// if(!ether.moved){return}
		
	// if(time > this.lastTime + 1000 && !ether.inVoid &&!this.engine.isPaused){
	// 	this.lastTime = time;
	// 	if(ratio > 0){
	// 		ether.currentSpan--;

	// 		if(ratio)
	// 	} else {
	// 		ether.dying = true;
	// 	}
	// }

}

Ether.Hub.prototype.getLifeBarColor = function(ratio){
	if(ratio <= .25){
		return "red"
	} else if(ratio <= .5){
		return "orange"
	} else if(ratio <= .75){
		return "yellow"
	}else{
		return "green"
	}
}

//messages
Ether.Hub.prototype.drawMessage = function(ctx,time,award){
	var player = this.engine.ethers[0];

	if(!this.messageExist || (this.messageExist && !this.msgQue.hasMsg())){
		if(this.msgQue.hasMsg()){
			var msg = this.msgQue.getMsg()

			this.messageExist = true
			this.currentMessage = msg

			switch(msg.type){
				case "blank" : 
					msg.alphaStep = 1;
					msg.alphaTime = 1;
					msg.fontSize = 1;
					break;
				case "award" : 
					msg.fontSize = 2.5
					this.subMessage = msg.sub
					this.engine.audio.playSound('life');
					break;
				case "tutorial" :
					if(Ether.Tutorial){
						this.engine.isPaused = true;
						msg.alphaTime = 3000;
						msg.alphaStep = 1;
						msg.fontSize = 2;
						this.engine.audio.playSound('tutorial');
					} else {
						this.messageExist = false;
						this.currentMessage = "";
					}

					break; 
				case "purge" :
					msg.fontSize = 3;
					this.engine.audio.playSound('purge');
					break;
				case "stability" :
					msg.fontSize = 2;
					break;
				case "default" :
					msg.fontSize = 2;
					break
					
			}
		} else {
			this.renderMessage(ctx,time);
		}
	} else {
		this.renderMessage(ctx,time);
	}
}

Ether.Hub.prototype.updateMsgQue = function(){
	var config = {}

	if(!this.lifeSpanMssgShown){
		this.addBlankMsg();

		config.type = "tutorial";

		config.string = this.lifeBarMessage0;
		this.msgQue.addMsg(config);

		config.string = this.lifeBarMessage1;
		this.msgQue.addMsg(config);

		this.lifeSpanMssgShown = true;

	} else if(this.engine.player.receivedFirstElement && !this.firstElementShown){
		this.addBlankMsg();
		config.type = "tutorial";
		config.alphaStep = 0.015;
		config.string = this.firstElementMessage0;
		this.msgQue.addMsg(config);
		
		config.alphaStep = undefined;
		config.string = this.firstElementMessage11;
		this.msgQue.addMsg(config);
		config.string = this.firstElementMessage10;
		this.msgQue.addMsg(config);

		this.firstElementShown = true;

	} else if(!this.upgradeMessageShown && this.upgradeAvailable){
		this.addBlankMsg();
		config.type = "tutorial";

		config.string = this.upgradeMessage0;
		this.msgQue.addMsg(config);

		config.string = this.upgradeMessage1;
		this.msgQue.addMsg(config);

		config.string = this.upgradeMessage2;
		this.msgQue.addMsg(config);

		this.upgradeMessageShown = true;

	} else if(this.engine.player.unstable && this.engine.player.bigElementIncrease && !this.bigElementMessageShown){
		this.addBlankMsg();
		config.string = this.bigElementMessage;
		config.sub = this.purgeMssg;
		config.type = "tutorial";
		this.msgQue.addMsg(config);

		this.engine.player.bigElementIncrease = false;
		this.bigElementMessageShowing = true;
		this.bigElementMessageShown = true;

	} else if(this.engine.player.unstable && !this.bigElementMessageShowing && !this.purgeNotified && !this.stableWarned){
	 	this.addBlankMsg();
	 	config.type = "tutorial";
	 	this.stableWarned = true;

	 	config.string = this.stableMssg0;
	 	this.msgQue.addMsg(config);

	 	config.string = this.stableMssg1;
	 	this.msgQue.addMsg(config);
	} else if(!this.enemyMessageShown && this.engine.player.enemySeen){
		this.addBlankMsg();
		config.type = "tutorial";
		config.string = this.enemyMessage0;
		this.msgQue.addMsg(config);
		config.string = this.enemyMessage1;
		this.msgQue.addMsg(config);
		this.enemyMessageShown = true;

	} else if(!this.zoomMessageShown && this.zoomMessage0 != ""){
		config.type = "tutorial";

		config.string = this.zoomMessage0;
		this.msgQue.addMsg(config);

		config.string = this.zoomMessage1;
		this.msgQue.addMsg(config);

		config.string = this.zoomMessage2;
		this.msgQue.addMsg(config);

		 this.zoomMessage = "";
		this.zoomMessageShown = true;

	} else if(this.engine.player.unstable){

		 if(!this.bigElementMessageShowing && this.engine.player.purging && !this.purgeNotified){
		 	config.string = this.purgeMssg;
		 	config.type = "purge";

			this.msgQue.addMsg(config)
		 	this.purgeNotified = true;
		 	this.engine.player.purging = false;

		} 

		
	} else if(this.awardMssg){
		config.string = this.awardMssg[0];
		config.type = "award";
		config.sub = "+"+this.awardMssg[1]+" Lifespan";

		this.msgQue.addMsg(config)
		this.awardMssg = "";

	} else if(this.lifeStageMssg != ""){
		config.string = this.lifeStageMssg;
		config.type = "transform";

		this.msgQue.addMsg(config);
		this.lifeStageMssg = "";

	} 
}

Ether.Hub.prototype.addBlankMsg = function(){
	config = {};
	config.type = "blank";
	config.string = "";
	this.msgQue.addMsg(config); //there is a weird timing thing. messy hack
}

Ether.Hub.prototype.renderMessage = function(ctx,time){
	if(this.currentMessage == ""){ return}
	var ether = this.engine.ethers[0];
	var message = this.currentMessage.str
	var sub = this.currentMessage.sub
	var fill = this.currentMessage.fill
	var fontsize = this.currentMessage.fontSize;

	ctx.font = (fontsize*this.unit)+"px simple"

	if(typeof ctx.measureText != 'function'){ //fix. dont remove
		return 
	}

	var textWidth = ctx.measureText(message).width;

	if(textWidth > this.engine.width - 10 && this.currentMessage.type == "award"){ 
		ctx.font = (1.5*this.unit)+"px simple"
		textWidth = ctx.measureText(message).width
	}

	var x = (this.engine.width/2) - (textWidth / 2);
	var y = (this.engine.height/2)-this.unit;

	ctx.fillStyle = "rgba(0,0,0,"+this.currentMessage.alpha+")";
	ctx.fillText(message,x+2,y+2);

	ctx.fillStyle = fill+this.currentMessage.alpha+")";
	ctx.fillText(message,x,y);

	if(sub != ""){
		ctx.font = this.unit+"px simple";
		textWidth = ctx.measureText(sub).width;
		x = (this.engine.width/2) - (textWidth / 2);
		ctx.fillStyle = "rgba(0,0,0,"+this.currentMessage.alpha+")";
		ctx.fillText(sub,x+2,y-this.unit*3+2);
		ctx.fillStyle = fill+this.currentMessage.alpha+")";
		ctx.fillText(sub,x,y-this.unit*3);
	}

	if(time > this.lastMessageTime + this.currentMessage.alphaTime){

		if(this.currentMessage.lowerAlpha() < 0.3){
			this.messageExist = false;
			switch(this.currentMessage.type){
				case "purge" : this.purgeNotified = false;
					break;
				case "bigElement" : this.bigElementMessageShowing = false;
					break;
				case "tutorial" : this.engine.isPaused = false
					break;
			}
			
			if(this.currentMessage.alpha <= 0)this.currentMessage = ""
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
;Ether.Audio = function (engine) {
	this.engine;
	this.ctx;
	this.audio = {};
	this.ambientSounds = 10;
	this.ambientTime = 0;
}

Ether.Audio.prototype.init = function(){
	this.loadSounds();
}

Ether.Audio.prototype.loadSounds = function(index){
	var urls = ["fire","water","air","earth","life","upgrade","purge","nope","tutorial"];

	//add ambient
	for (var i = 1; i <= this.ambientSounds; i++) {
		urls.push("ambient"+i);
	};

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


Ether.Audio.prototype.playElementSound = function(element){
	var volume = element.bad ? 1 : element.radius/125;
	if(volume > 1) volume = 1
	this.audio[element.type].volume = volume;
	this.audio[element.type].play();
}

Ether.Audio.prototype.playSound = function(type,volume){
	this.muteOtherSound();
	var v = volume || .8
	this.audio[type].volume = v;
	this.audio[type].play();
}

Ether.Audio.prototype.muteOtherSound = function(){
	for(var s in this.audio){
		if(!this.audio[s].ended)
			this.audio[s].pause()
	}
}

Ether.Audio.prototype.playAmbience = function(time){
	
	if(time > this.ambientTime + 3000){
		this.ambientTime = time;

		var chance = Math.round(Math.random() * 3)

		if(chance >= 1){
			var rand = Math.floor(Math.random()*10) + 1;
			var sound = this.audio["ambient"+rand];

			sound.volume = 0.2;
			sound.play();
		}
	}
};Ether.Upgrade = function(engine){
	var self = this;
	this.engine = engine;
	this.player;
	this.upgradeCheck = {w:[13],f:[13],a:[13],e:[]}
	this.container = document.getElementById('upgrade');

	this.cy = cytoscape({
		container : self.container,
		elements : self.getNodes().concat(self.edges),
		style : self.style,
		layout : {
			name : "breadthfirst",
			roots : '#nparent'
		},
		ready : function(evt){
			
			var cy = evt.cy

			cy.elements("node").data("activated",false);
			cy.elements("node[id='nparent']").data("activated",true);
			cy.elements("node[id='nparent']").addClass("activated");
			self.addData(cy);

			cy.elements("node").addClass("unactive")

			cy.on('click','node',function(e){
				if(self.isUpgradable(e.cyTarget)){
					if(self.hasEnoughEnergy(e.cyTarget)){
						e.cyTarget.data("activated",true);
						cy.elements('node[id = "'+e.cyTarget.id()+'"]').removeClass("showingInfo");
						e.cyTarget.addClass("activated");
						self.handleClick(e.cyTarget);
					} else {
						self.engine.audio.playSound('nope');
					}
				} else {
					self.engine.audio.playSound('nope');
				}
			});


			cy.on('mouseover','node',function(e){
				var ele = e.cyTarget;

				if(self.isUpgradable(ele)){
					cy.elements('node[id = "'+ele.id()+'"]').addClass("showingInfo");					
				 } else if(!ele.data().activated){
					cy.elements('node[id = "'+ele.id()+'"]').addClass("notActive");									 	
				 }
			});

			cy.on('mouseout','node',function(e){
				var ele = e.cyTarget;

				if(self.isUpgradable(ele)){
					cy.elements('node[id = "'+ele.id()+'"]').removeClass("showingInfo");
				 } else if(!ele.data("activated")){
					cy.elements('node[id = "'+ele.id()+'"]').removeClass("notActive");									 					 	
				 }
			});

			self.container.style.display = "none"

		
		},
		zoomingEnabled : false,
		panningEnabled : false
	})
}

Ether.Upgrade.prototype.init = function(){
	this.container.style.height = window.innerHeight;
	this.player = this.engine.ethers[0];
}

Ether.Upgrade.prototype.hasEnoughEnergy = function(e){
	var count = this.player.getElementCount();
	var cost = e.data("cost")
	var id = e.id().split(".")[0];
	
	if(id == "attraction" && count.f >= cost){
		count.f -= cost
		return true
	}

	if(id == "resistance" && count.e >= cost){
		count.e -= cost
		return true
	}

	if(id == "balance" && count.a >= cost){
		count.a -= cost
		return true
	}

	if(id == "movement" && count.w >= cost){
		count.w -= cost
		return true
	}

	if(id.indexOf("T") == 0){
		if(count.f >= cost && count.w >= cost && count.e >= cost && count.a >= cost){
			count.f -= cost;
			count.e -= cost;
			count.a -= cost;
			count.w -= cost;
			return true
		}
	}
}

Ether.Upgrade.prototype.addData = function(cy){
	for(var i in cy.elements("node")){
		var node = cy.elements("node")[i]
		if(node && node.data && !node.data("activated")){
			var level = parseInt(node.id().split(".")[1]);
			var type = node.id().split(".")[0].charAt(0).toUpperCase() + node.id().split(".")[0].slice(1)
			node.data("cost",level*(7 + level));

			switch(type.toLowerCase()){
				case "movement" :
					node.data("info",type+" : "+ (level*(11 + level)) + " : Water");
					break;
				case "resistance" :
					node.data("info",type+" : "+ (level*(11 + level)) + " : Earth");
					break;
				case "attraction" :
					node.data("info",type+" : "+ (level*(11 + level)) + " : Fire");
					break;
				case "balance" :
					node.data("info",type+" : "+ (level*(11 + level)) + " : Air");
					break;
				case "tsnail" :
				case "tbutterfly":
					var len = type.length;
					var lStr = type.slice(1,len);
					var str = lStr.charAt(0).toUpperCase() + lStr.slice(1)
					node.data("info",str+" : "+ Math.round(level*(10 + level)/1.3));
			}
		}
		
	}
}

Ether.Upgrade.prototype.isUpgradable = function(ele){
	if(ele.data().activated == true) {  return false }

	var id = ele.id();
	var edges = [];
	var rVal = false;

	for(var i in ele.connectedEdges()){
		var edge = ele.connectedEdges()[i];
		
		if(edge.data){
			var data = edge.data();
			
			if(data.source != id)
				edges.push(edge);
		}
		
	}

	if(edges.length == 0){
		return true
	}

	for (var i = 0; i < edges.length; i++) {
		var edge = edges[i];
		var parentNode = edge.source();

		if(parentNode.data().activated){
			rVal = parentNode.data().activated
		}
	};

	return rVal
}

Ether.Upgrade.prototype.handleClick = function(e){
	var a = e.id().split(".");
	var type = a[0];
	var cost = e.data("cost")
	var config = {
		string : "",
		type : "upgrade",
		alphaStep : 0.03
	}

	 switch(type){
	 	case "movement" :
	 		this.player.control += 10;
	 		this.player.speed += 1;
	 		this.upgradeCheck.w.shift();
	 		config.fill = "rgba(71,189,222,"
	 		config.sub = "- " + cost + " water";
	 		this.engine.hub.msgQue.addMsg(config);
	 		break
	 	case "balance" :
	 		this.player.balance += 0.5;
	 		this.upgradeCheck.a.shift();
	 		config.fill = "rgba(237,237,235,"
	 		config.sub = "- " + cost + " air";
	 		this.engine.hub.msgQue.addMsg(config);
	 		break;
	 	case "attraction" :
	 		this.player.attraction += (3/7);
	 		this.player.force -= (50/7)
	 		this.upgradeCheck.f.shift();
	 		config.fill = "rgba(224,102,74,"
	 		config.sub = "- " + cost + " fire";	 		 
	 		this.engine.hub.msgQue.addMsg(config);
	 		break
	 	case "resistance" :
	 		this.player.resistance += 1;
	 		this.upgradeCheck.e.shift();
	 		config.fill = "rgba(108,127,46,"
	 		config.sub = "- " + cost + " earth";
	 		this.engine.hub.msgQue.addMsg(config);
	 		break;
	 	case "Tsnail" :
	 		this.player.transformation = this.player.transformations.snail;
	 		break;
	 	case "Tbutterfly" :
	 		this.player.transformation = this.player.transformations.butterfly;
	 		break;
	 }


	//update upgrade check
	var edges = e.connectedEdges();
	for(i in edges){
		var edge = edges[i];

		if(edge.target){
			var target = edge.target();
			var type = target.id().split(".")[0]
			var cost = target.data().cost

			switch(type){
				case "movement" :
			 		this.upgradeCheck.w.push(cost);
			 		break
			 	case "balance" :
			 		this.upgradeCheck.a.push(cost);
			 		break;
			 	case "attraction" :
			 		this.upgradeCheck.f.push(cost);
			 		break
			 	case "resistance" :
			 		this.upgradeCheck.e.push(cost);
			 		break;
			}

		}
	}

	this.engine.audio.playSound('upgrade');
	this.engine.container.style.display = "";
	this.container.style.display = "none";
	this.engine.upgradeScreen = false;
}

Ether.Upgrade.prototype.canUpgrade = function(){
	var count = this.player.getElementCount();

	if(count.w >= this.upgradeCheck.w[0]){
		return true
	} else if(count.f >= this.upgradeCheck.f[0]){
		return true
	} else if(count.a >= this.upgradeCheck.a[0]){
		return true
	} else if(count.e >= this.upgradeCheck.e[0]){
		return true
	} else {
		return false
	}
}

Ether.Upgrade.prototype.style = [
	{
		selector : 'node[id ^= "movement"]',
		css : {
			'background-color':'#47BDDE',
			'border-width' : '2',
			'border-color' : '#243F63',
			'shape' : "pentagon",
			"color" : '#47BDDE',
			"text-outline-color" : '#243F63'
		}
	},{
		selector : 'node[id ^= "attraction"]',
		css : {
			'background-color':'#E0664A',
			'border-width' : '2',
			'border-color' : '#6B504A',
			'shape' : "heptagon",
			"color" : '#E0664A',
			"text-outline-color" : '#6B504A'
		}
	},{
		selector : 'node[id ^= "resistance"]',
		css : {
			'background-color':'#6C7F2E',
			'border-width' : '2',
			'border-color' : '#858063',
			'color' : '#6C7F2E',
			'shape' : 'rectangle',
			"text-outline-color" : '#858063'
		}
	},{
		selector : 'node[id ^= "balance"]',
		css : {
			'background-color':'#EDEDEB',
			'border-width' : '2',
			'border-color' : '#9E9E99',
			"color" : "#EDEDEB",
			'shape' : 'triangle',
			"text-outline-color" : '#9F9FA0'
		}
	},{
		selector : 'node[id ^= "T"]',
		css : {
			'background-color':'#FFD700',
			'border-width' : '2',
			'border-color' : '#8F8F00',
			"color" : "#FFD700",
			'shape' : 'star',
			"text-outline-color" : "#8F8F00"
		}
	},{
		selector : 'edge',
		css : {
			"line-color" : "#D1E6E6",
			"width" : "4",
			"haystack-radius" : "1",
			"target-arrow-color" : "#D1E6E6",
			"target-arrow-shape" : "triangle",
		}
	},{
		selector : ".showingInfo",
		css : {
			"font-family" : "simple",
			"font-size" : "25",
			"text-outline-width" : "1",
			"content" : "data(info)"
		}
	},{
		selector : ".notActive",
		css : {
			"shape" : "ellipse",
			"background-color" : "black",
			"border-width" : "0"
		}
	},{
		selector : ".activated",
		css : {
			"shape" : "ellipse",
			"background-color" : "white",
			"border-width" : "0"
		}
	}
];

Ether.Upgrade.prototype.getNodes = function(){
	return [
		// {
		// 	group : "nodes",
		// 	data : {
		// 		id : "zoom"
		// 	}
		 //},
		 {
			group : "nodes",
			data : { id: "nparent" },
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "Tbutterfly.9"
			}
		},{
			group : "nodes",
			data : {
				id : "Tsnail.9"
			}
		},{
			group : "nodes",
			data : {
				id : "balance.1",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.1",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.1",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.2",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.2",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.2",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "balance.2",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.3",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.3",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.3",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "balance.4",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.4",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.4",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.4",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "balance.5",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.5",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.5",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.6",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.6",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "balance.6",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.6",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.7",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.7",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "balance.7",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.8",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "balance.8",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.8",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.8",
			},
			grabbable : false
		}
	];
}

Ether.Upgrade.prototype.edges = [
		{
			group : "edges",
			data : {
				id : "movement.t.snail",
				source : "movement.8",
				target : "Tsnail.9"
			}
		},{
			group : "edges",
			data : {
				id : "attraction.t.snail",
				source : "attraction.8",
				target : "Tsnail.9"
			}
		},{
			group : "edges",
			data : {
				id : "balance.t.butterfly",
				source : "balance.8",
				target : "Tbutterfly.9"
			}
		},{
			group : "edges",
			data : {
				id : "resistance.t.butterfly",
				source : "resistance.8",
				target : "Tbutterfly.9"
			}
		},{
			group : "edges",
			data : {
				id : "parent.1.balance",
				source : "nparent",
				target : "balance.1"
			}
		},
		{
			group : "edges",
			data : {
				id : "parent.1.movement",
				source : "nparent",
				target : "movement.1"
			}
		},
		{
			group : "edges",
			data : {
				id : "parent.1.attraction",
				source : "nparent",
				target : "attraction.1"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.2.movement",
				source : "balance.1",
				target : "movement.2"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.2.attraction",
				source : "balance.1",
				target : "attraction.2"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.2.attraction",
				source : "movement.1",
				target : "attraction.2"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.2.resistance",
				source : "movement.1",
				target : "resistance.2"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.2.resistance",
				source : "attraction.1",
				target : "resistance.2"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.balance",
				source : "attraction.1",
				target : "balance.2"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.3.movement",
				source : "movement.2",
				target : "movement.3"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.3.movement",
				source : "attraction.2",
				target : "movement.3"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.3.attraction",
				source : "attraction.2",
				target : "attraction.3"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.3.attraction",
				source : "resistance.2",
				target : "attraction.3"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.3.resistance",
				source : "resistance.2",
				target : "resistance.3"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.3.resistance",
				source : "balance.2",
				target : "resistance.3"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.4.balance",
				source : "movement.3",
				target : "balance.4"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.4.resistance",
				source : "movement.3",
				target : "resistance.4"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.4.resistance",
				source : "attraction.3",
				target : "resistance.4"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.4.movement",
				source : "attraction.3",
				target : "movement.4"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.4.movement",
				source : "resistance.3",
				target : "movement.4"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.4.attraction",
				source : "resistance.3",
				target : "attraction.4"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.5.balance",
				source : "balance.4",
				target : "balance.5"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.5.balance",
				source : "resistance.4",
				target : "balance.5"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.5.resistance",
				source : "resistance.4",
				target : "resistance.5"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.5.resistance",
				source : "movement.4",
				target : "resistance.5"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.5.movement",
				source : "movement.4",
				target : "movement.5"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.5.movement",
				source : "attraction.4",
				target : "movement.5"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.6.attraction",
				source : "balance.5",
				target : "attraction.6"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.6.movement",
				source : "balance.5",
				target : "movement.6"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.6.movement",
				source : "resistance.5",
				target : "movement.6"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.6.balance",
				source : "resistance.5",
				target : "balance.6"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.6.balance",
				source : "movement.5",
				target : "balance.6"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.6.resistance",
				source : "movement.5",
				target : "resistance.6"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.7.resistance",
				source : "attraction.6",
				target : "resistance.7"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.7.resistance",
				source : "movement.6",
				target : "resistance.7"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.7.attraction",
				source : "movement.6",
				target : "attraction.7"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.7.attraction",
				source : "balance.6",
				target : "attraction.7"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.7.balance",
				source : "balance.6",
				target : "balance.7"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.7.balance",
				source : "resistance.6",
				target : "balance.7"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.8.resistance",
				source : "resistance.7",
				target : "resistance.8"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.8.balance",
				source : "resistance.7",
				target : "balance.8"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.8.balance",
				source : "attraction.7",
				target : "balance.8"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.8.attraction",
				source : "attraction.7",
				target : "attraction.8"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.8.attraction",
				source : "balance.7",
				target : "attraction.8"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.8.movement",
				source : "balance.7",
				target : "movement.8"
			}
		}
];


// Ether.Upgrade.prototype.createEdges = function(){
// 	var currentNumber = "1";
// 	var oldNodes = [];
// 	var currentNodes = [];
// 	var nodeNumb = 0;

// 	for (var i = 0; i < this.elements.length; i++) {
// 		var id = this.elements[i].data.id;
// 		var ele = id.split(".");
// 		var type = ele[0];
// 		var tier = ele[1];

// 		if(!tier) continue

// 		if(currentNumber != tier){
// 			oldNodes = currentNodes;
// 			currentNodes = [];
// 			currentNumber = tier;
// 			nodeNumb = 0
// 		}

// 		currentNodes.push(id);
// 		nodeNumb+=1;

// 		var src = this.getSrc(oldNodes,tier,nodeNumb);
// 		var trgt = e


// 		var obj = {
// 			group : "edges",
// 			data : {
// 				id : "e."+tier+"."+src[0]+"."+target[0],
// 				source : src,
// 				target : trgt
// 			}
// 		}

// 		console.log(obj)
// 	};	
// }

// Ether.Upgrade.prototype.getSrc = function(oldN,tier,number){
// 	if(oldN.length < 1){ return "nparent" }

// 	if(number%2 == 0){

// 	}

// }



;Ether.Engine = function() {	
	var self = this;

	//div
	this.container = document.getElementById('container');

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
	this.upgrade = new Ether.Upgrade(this);

	//Ethers
	this.ethers = [new Ether.Ether(self)];
	this.player = this.ethers[0];

	//level
	this.isPaused = false;
	this.upgradeScreen = false;

	//endgame
	this.gameOver = false;
	this.gameOverAlpha = 0;
	this.gameOverTime = 0;
	this.gameOverDelay = 0;

	//award
	this.awardDelay = -5000;

	//Animate
	this.animate = function(time){
		requestAnimFrame(self.animate);

		if(self.upgradeScreen) return

		self.audio.playAmbience(time);

		//Draw Background
		if(!self.gameOver && !self.player.dead){
			self.ctx.fillStyle = "black";
			self.ctx.fillRect(0,0,self.width,self.height);
		}

		//if configuration is running...
		if(self.hub.intro){
			self.hub.drawIntro(time);

		//otherwise, if between ages...
		} else if(!self.player.dead){

			//if(!self.isPaused){

			//Draw World
			self.world.draw(self,time);

			//check awards
			if(!self.player.dying){ self.checkAwards(time) };

			//Draw Ethers
			for (var i = 0; i < self.ethers.length; i++) {
				self.ethers[i].draw(self,time);
			};
			self.ctx.globalCompositeOperation = "source-over";
		//	}

			//Draw Hub
			self.hub.draw(time);

			//

		//otherwise, if player is dead
		} else if(self.player.dead && !self.gameOver){
			if(self.gameOverDelay == 0){
				self.gameOverDelay = time;
			}

			if(time > self.gameOverDelay + 6000){
				self.gameOver = true;
			}

		} else if(self.gameOver){
			if(time > self.gameOverTime + 100){
				self.gameOverAlpha+=0.01;
				self.gameOverTime = time;

				self.ctx.fillStyle = "rgba(255,255,255,+"+self.gameOverAlpha+");";
				self.ctx.fillRect(0,0,self.width,self.height);
			
				self.ctx.font = "30px simple"
				var width = self.ctx.measureText("so it goes").width;
				self.ctx.fillStyle = "black";
				self.ctx.fillText("so it goes",self.width/2 - width/2,self.height/2);
			}
			
			self.hub.gameOver(self.ctx,time);
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
	if(!window.mobilecheck()){
		window.onkeydown = function(evt){
			evt.preventDefault();
			self.world.handleKeyDown(evt.keyCode,self)
			self.hub.handleKeyDown();
			self.handleKeyDown(evt.keyCode);
		}

		window.onkeyup = function(evt){
			self.world.handleKeyUp(evt.keyCode,self)
		}
	} else {
		this.canvas.addEventListener('touchstart',function(evt){
			evt.preventDefault();
			self.world.handleTouch(evt,self)
			self.hub.handleKeyDown();
		});

		this.canvas.addEventListener('touchmove',function(evt){
			evt.preventDefault();
			self.world.handleTouch(evt,self)
			self.hub.handleKeyDown();
		});
	}

	this.hub.init();

	this.world.init(this);

	this.audio.init();

	this.upgrade.init();
	
	this.setAwards(Ether.AwardType)


	//this.trophy.init();

	//start animation
	//if(this.player.age == 0)
		window.requestAnimFrame(this.animate);
}

Ether.Engine.prototype.handleKeyDown =function(key){
	if(this.hub.intro) return

	var display = this.container.style.display;
	switch(key){

		case 85 : 
			if(display != "none"){ 
				this.container.style.display = "none";
				this.upgrade.container.style.display = "";
				this.upgrade.cy.forceRender();
				this.upgradeScreen = true;
			} else {
				this.container.style.display = "";
				this.upgrade.container.style.display = "none";
				this.upgradeScreen = false;
			}
			break;
		case 90 :
			if(this.player.canZoom){ this.player.zooming = true }
			break
	}
}

Ether.Engine.prototype.checkAwards = function(time){
	if(this.player.unstable){ return }

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
						this.hub.newAward(award.text,award.award);
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
		this.awards[i].award = Math.ceil(award/2);
		amount += 2;
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