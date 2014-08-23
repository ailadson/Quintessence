Ether = Ether || {}

Ether.World = function (engine) {
	this.engine = engine;

	//world positioning values
	this.width = engine.width*30;
	this.height = engine.height*30;
	this.x = engine.width/2;
	this.y = engine.height/2;
	this.xv = 0;
	this.yv = 0;
	this.dragX = false;
	this.dragY = false;

	//elements
	this.fire = [];
	this.water = [];
	this.earth = [];
	this.air = [];
	this.elements = [this.earth,this.air,this.fire,this.water];
	this.driftArray = [];
	this.sizeOffset = 5000;

}

//WORLD INIT
Ether.World.prototype.init = function(){
	var eleStrings = ['earth','air','fire','water'];

	for (var i = 0; i < this.elements.length; i++) {
		var collection = this.elements[i];
		var type = eleStrings[i];

		for (var j = 0; j < 1000; j++) {
			//get values that will be used to create element
			var xOffset = ((Math.random()*(this.width*2)) - this.width)/2;
			var yOffset = ((Math.random()*(this.height*2)) - this.height)/2;
			var size = this.getDistanceFromCenter({x:xOffset,y:yOffset});
			
			var element = new Ether.Element(type,size/this.sizeOffset);
			element.xOffset = xOffset;
			element.yOffset = yOffset;
			collection.push(element);
		};
	};
}


//DRAWING
Ether.World.prototype.draw = function(engine){
		this.x += this.xv;
		this.y += this.yv;

	for (var i = 0; i < this.elements.length; i++) {
		var collection = this.elements[i];

		for (var j = 0; j < collection.length; j++) {
			var e = collection[j];

			if(!this.isInView(e)){ continue }

			//reverse direction of jitter
			e.jitter *= -1;

			//x and y positions determined on the fly
			var x = this.x + e.xOffset + e.jitter;
			var y = this.y + e.yOffset;


			//start rendering
			engine.ctx.beginPath();

			//create gradient
			var gradient = engine.ctx.createRadialGradient(x,y,0,x,y,e.radius);
			gradient.addColorStop(0.1,"white");
			gradient.addColorStop(0.1,"white");
			gradient.addColorStop(0.8,e.color);
			gradient.addColorStop(0.1,"black");

			engine.ctx.fillStyle = gradient;
			engine.ctx.arc(x,y,e.radius,Math.PI*2,false);
			engine.ctx.fill();

			//see if the element is in range of the ether
			this.isInRangeOfEther(e,i,j);
		};
	};

	this.drawDriftingElements(engine); //TO DO!!
	this.drawBorder(engine);
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
		gradient.addColorStop(0.1,"white");
		gradient.addColorStop(0.1,"white");
		gradient.addColorStop(0.8,e.color);
		gradient.addColorStop(0.1,"black");

		engine.ctx.fillStyle = gradient;
		engine.ctx.arc(x,y,e.radius,Math.PI*2,false);
		engine.ctx.fill();

		if(!e.newElement){
			var index = e.type  == 'earth' ? 0 : (e.type == 'air' ? 1 : (e.type == 'fire' ? 2 : (e.type == 'water' ? 3 : undefined)))
			e.jitter /= 5;
			this.driftArray.splice(i,1);
			i--;
			console.log(index + " || " + e.type)
			this.elements[index].push(e)
		} else {
			e.newElement--;
		}
	};
}

Ether.World.prototype.isInRangeOfEther = function(e,collection,index){
	//make sure the element is on the screen
	if(!this.isInView(e)){ return }

	var ether = this.engine.ethers[0];
	var range = ether.range + e.radius/2;
	var x = e.xOffset + this.x;
	var y = e.yOffset + this.y;
	var distance = ether.getDistanceFromCenter({x:x,y:y});

	if(distance < range){
		//give the element an 'x, y' relative to the ether
		e.x = x;
		e.y = y;
		//add to ether.elements[] and remove from world.elements[]
		this.engine.ethers[0].newElement(e);
		this.elements[collection].splice(index,1);
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
	var xDif = this.x - Math.abs(e.x);
	var yDif = this.y - Math.abs(e.y);

	return Math.sqrt((xDif * xDif) + (yDif * yDif))
}

//interaction
Ether.World.prototype.handleKeyDown = function(e){
	//if(!this.draggingX || !this.draggingY){
		switch(e){
			case 38 :
				this.yv = 13//this.dragMotion('up',this.yv);
				break;
			case 39 :
				this.xv = -13//this.dragMotion('up',-this.xv) * -1;
				break;
			case 40 :
				this.yv = -13//this.dragMotion('up',-this.yv) * -1;
				break;
			case 37 :
				this.xv = 13//this.dragMotion('up',this.xv);
				break;
		}
	//}
}

Ether.World.prototype.handleKeyUp = function(e){
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

//Elements
Ether.World.prototype.newElement = function(e){
	var ether = this.engine.ethers[0]

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