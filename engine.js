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