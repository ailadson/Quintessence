/**
 * @constructor
 */
 Ether.World = function (engine) {
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
}