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
	ctx.font = "28pt Titillium Web"
	ctx.fillStyle="rgba(164,161,151,"+this.introAlpha+")";
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

	ctx.fillStyle = "black";
	ctx.fillRect(0,0,width,this.unit*3);
}

Ether.Hub.prototype.draw = function(time){
	var stats = this.getStats();
	var ctx = this.engine.ctx;

	//convert stability
	var hubStab = (stats.stab > 100) ? 0 : (100 - stats.stab)

	if(this.showInfo){

		ctx.font = this.unit + "30px Titillium Web";
		ctx.fillStyle = "rgba(164,161,151,1)"
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
				ctx.fillStyle = "rgba(164,161,151,"+this.betweenAlpha+")";
			    //ctx.fillRect(0,0,this.engine.width,this.engine.height);
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
	ctx.font = this.unit * .75 + "px Titillium Web";

	ctx.fillStyle = "red";
	ctx.fillText("Fire: " + count["f"], this.unit, this.unit*3.2);

	ctx.fillStyle = "#3399FF";
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

	ctx.fillStyle = "#FFF4E9";
	ctx.font = this.unit + "px Titillium Web"
	ctx.fillText("Lifespan " + (this.engine.ethers[0].age + 1),this.engine.width-(this.unit * 5.5), this.unit);

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
	ctx.font = (this.currentMessage == this.awardMssg) ? "90px Titillium Web" : "30px Titillium Web";
	var textWidth = ctx.measureText(this.currentMessage).width;

	if(textWidth > this.engine.width - 10){ 
		ctx.font = "70px Titillium Web"
		textWidth = ctx.measureText(this.currentMessage).width
	}

	var x = (this.engine.width/2) - (textWidth / 2);
	var y = (this.engine.height/2)-this.unit;

	ctx.fillStyle = "rgba(0,0,0,"+this.messageAlpha+")";
	ctx.fillText(this.currentMessage,x+2,y+2);

	ctx.fillStyle = "rgba(164,161,151,"+this.messageAlpha+")";
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
//				this.engine.ethers[0].save(this.engine.ethers[0].age);
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
