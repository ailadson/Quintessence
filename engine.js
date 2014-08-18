var Ether = Ether || {};

Ether.Engine = function() {	
	var self = this;

	//canvas
	this.canvas = document.getElementById('canvas');
	this.ctx = this.canvas.getContext('2d');
	this.width = window.innerWidth;
	this.height = window.innerHeight;

	//ethers
	this.ethers = [];
	this.world = new Ether.World(this);;
	this.hub = new Ether.Hub(this);

	//animate
	this.animate = function(){
		requestAnimFrame(self.animate);

		//background
		self.ctx.fillStyle = "black";
		self.ctx.fillRect(0,0,self.width,self.height);

		for (var i = 0; i < self.ethers.length; i++) {
			self.ethers[i].draw(self);
		};

		self.ctx.globalCompositeOperation = "source-over";
		self.world.draw(self);
		self.hub.draw(self);
	}
}

Ether.Engine.prototype.init = function(){
	var self = this;

	//set canvas dimensions
	this.canvas.width = this.width;
	this.canvas.height = this.height;
	this.ctx.fillStyle = "rgba(0,0,0,0.3)";
	this.ctx.fillRect(0,0,this.width,this.height);

	//create player
	this.ethers.push(new Ether.Ether(this));
	this.ethers[0].init();

	//create world
	window.onkeydown = function(evt){
		self.world.moveWorld(evt.keyCode,self)
	}
	window.onkeyup = function(evt){
		self.world.stopWorld(evt.keyCode,self)
	}

	this.world.init();
	window.requestAnimFrame(this.animate);
}


var e = new Ether.Engine();

e.init();