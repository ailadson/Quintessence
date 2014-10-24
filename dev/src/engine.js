/**
 * @constructor
 */
 Ether.Engine = function() {	
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

	//award
	this.awardDelay = -5000;

	//Animate
	this.animate = function(time){
		requestAnimFrame(self.animate);

		if(self.upgradeScreen) return

		//Draw Background
		if(!self.gameOver){
			self.ctx.fillStyle = "black";
			self.ctx.fillRect(0,0,self.width,self.height);
		}

		//if configuration is running...
		if(self.hub.intro){
			self.hub.drawIntro(time);

		//otherwise, if between ages...
		} else if(!self.gameOver){

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