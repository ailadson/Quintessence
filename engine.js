Ether.Engine = function() {	
	var self = this;

	//Canvas
	this.canvas = document.getElementById('canvas');
	this.ctx = this.canvas.getContext('2d');
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	//components
	this.world = new Ether.World(this);;
	this.hub = new Ether.Hub(this);
	this.util = new Ether.Util(this);

	//Ethers
	this.ethers = [new Ether.Ether(self)];

	//Animate
	this.animate = function(time){
		requestAnimFrame(self.animate);

		//Draw Background
		self.ctx.fillStyle = "black";
		self.ctx.fillRect(0,0,self.width,self.height);

		//Draw Ethers
		for (var i = 0; i < self.ethers.length; i++) {
			self.ethers[i].draw(self);
		};
		self.ctx.globalCompositeOperation = "source-over";

		//Draw World
		self.world.draw(self);

		//Draw Hub
		self.hub.draw(time);
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
	this.ethers[0].init();

	//set up world
	window.onkeydown = function(evt){
		self.world.handleKeyDown(evt.keyCode,self)
	}

	window.onkeyup = function(evt){
		self.world.handleKeyUp(evt.keyCode,self)
	}

	this.world.init();

	//start animation
	window.requestAnimFrame(this.animate);
}


//////////////////
//////////////////

var e = new Ether.Engine();
e.init();