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
	this.dragLastTime = 0;
	this.speedUp = {x:false,y:false}

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
		collection.length = 0; //clear out array
		var type = eleStrings[i];

		switch(this.engine.ethers[0].age){
			case 0 :
				this.initElement(type,collection,300,9000,function(e){
					if(e.radius > 5) e.radius = 5
				});

				this.initElement(type,collection,50,100,function(e,self){
					if(e.radius < 150) e.radius = 150;
					if(e.radius > 300) e.radius = 250;
					e.killer = true;

					//To prevent 1 hit KOs
					e.x = self.x + e.xOffset;
					e.y = self.y + e.yOffset;
					
					if((e.x >= 0 && e.x <= self.engine.width) &&
						(e.y >= 0 && e.y <= self.engine.height)){
						e.xOffset += (e.radius + self.engine.width)
					}
				},this)
				break;

			case 1 :
				this.initElement(type,collection,200,3000,function(e){
					if(e.radius < 10) e.radius = 10;
					if(e.radius > 70) e.radius = 70;
				})
				this.initElement(type,collection,30,1000,function(e){
					if(e.radius < 150) e.radius = 150;
					if(e.radius > 200) e.radius = 200;
				})
				break;
			case 2 :
				this.initElement(type,collection,150,5000,function(e){
					if(e.radius > 20) e.radius = 20;
				})
				this.initElement(type,collection,150,1000,function(e){
					if(e.radius > 80) e.radius = 80;
				})
				break;
			case 3 :
				this.initElement(type,collection,250,6000,function(e){
					if(e.radius > 50) e.radius = 50;
				})
				break;
		}


		
	};
}

Ether.World.prototype.initElement = function(type,collection,amount,sizeOffset,eFunc,ctx){
	for (var j = 0; j < amount; j++) {
			//get values that will be used to create element
			var xOffset = ((Math.random()*(this.width*2)) - this.width)/2;
			var yOffset = ((Math.random()*(this.height*2)) - this.height)/2;
			var size = this.getDistanceFromCenter({x:xOffset,y:yOffset});
			
			var element = new Ether.Element(type,size/sizeOffset);
			element.xOffset = xOffset;
			element.yOffset = yOffset;
			eFunc(element,ctx);
			collection.push(element);
		};
}


//DRAWING
Ether.World.prototype.draw = function(engine,time){
		this.xv = this.adjustVelocity("x",this.xv,time);
		this.yv = this.adjustVelocity("y",this.yv,time);

		//velocity time
		if(time > this.dragLastTime + 200){this.dragLastTime = time}

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
			e.x = this.x + e.xOffset + e.jitter;
			e.y = this.y + e.yOffset;

			this.driftTowardsEther(e);


			//start rendering
			engine.ctx.beginPath();

			//create gradient
			var gradient = engine.ctx.createRadialGradient(e.x,e.y,0,e.x,e.y,e.radius);
			gradient.addColorStop(0.1,"white");
			gradient.addColorStop(0.1,"white");
			gradient.addColorStop(0.8,e.color);
			gradient.addColorStop(0.1,"black");

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

Ether.World.prototype.driftTowardsEther = function(element){
	var util = this.engine.util;
	var ether = this.engine.ethers[0];
	var radius = element.radius < 40 ? element.radius * 20 : element.radius * 2
	var speed = element.radius > 50 ? element.radius/50 : element.radius/5

	if(util.getDistanceFromCenter(element,ether) <= radius){

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
	return this.engine.util.getDistanceFromCenter(e,this);
}

Ether.World.prototype.adjustVelocity = function(axis,val,time){
	if(time > this.dragLastTime + 200){
		if(this.speedUp[axis]){
			if(val > 0 && val <= this.engine.ethers[0].speed){
				val+=2;
				if(val > this.engine.ethers[0].speed) val = this.engine.ethers[0].speed
			} else if(val < 0 && val >= -this.engine.ethers[0].speed){
				val-=2;
				if(val < -this.engine.ethers[0].speed) val = -this.engine.ethers[0].speed
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
			case 38 :
				if(!this.speedUp.y && this.yv >= -5){ 
					this.speedUp.y = true;
					this.yv = 1;

				} else if(this.yv < -5){
					this.speedUp.y = false
				}
				break;
			case 39 :
				if(!this.speedUp.x && this.xv <= 5){ 
					this.speedUp.x = true;
					this.xv = -1;

				} else if(this.xv > 5){
					this.speedUp.x = false
				}
				break;
			case 40 :
				if(!this.speedUp.y && this.yv <= 5){ 
					this.speedUp.y = true;
					this.yv = -1;

				} else if(this.yv > 5){
					this.speedUp.y = false
				}
				break;
			case 37 :
				if(!this.speedUp.x && this.xv >= -5){ 
					this.speedUp.x = true;
					this.xv = 1;

				} else if(this.xv < -5){
					this.speedUp.x = false
				}
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

Ether.World.prototype.dragMotion = function(direction,val){
	if(time)
	if(faster){

	}
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