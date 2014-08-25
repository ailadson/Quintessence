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

	//endgame
	this.gameOverAlpha = 0;
	this.gameOverTime = 0;

	//Animate
	this.animate = function(time){
		requestAnimFrame(self.animate);

		if(!self.ethers[0].dead){
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

		//gameOver fade
		} else if(self.ethers[0].dead){
			if(self.gameOverAlpha < 0.35 && time > self.gameOverTime + 100){
				self.gameOverAlpha+=0.01;
				self.gameOverTime = time;

				self.ctx.fillStyle = "rgba(255,255,255,+"+self.gameOverAlpha+");";
				self.ctx.fillRect(0,0,self.width,self.height);
			} else if(self.gameOverAlpha >= 0.35){
			
				self.ctx.font = "30px Arial"
				self.ctx.fillStyle = "black";
				self.ctx.fillText("Dead",self.width/2,self.height/2);
				console.log('hit')
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