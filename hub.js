Ether = Ether || {};

Ether.Hub = function(engine) {
	var self = this;

	this.engine = engine;
	this.unit = engine.width/50;
	this.lastTime = 0;
	this.messageExist = false;
	this.messageAlpha = 1;
	this.currentMessage = "";
	this.lastMessageTime = 0;
	this.betweenAlpha = 0.1;
	this.betweenLastTime = 0;
	this.showInfo = true;

	//intro
	this.intro = true;
	this.lastIntroTime = 0;
	this.choice1Alpha = 0.2;
	this.choice2Alpha = 0.2;
	this.introAlpha = 0;
	this.question = 0;
	this.introText = ["An ether is born","you are born","Collect the four elements","grow into yourself","and die, as all things that are born must","To reach the next stage of life collect 5 of each element","don't bite off more than you can chew","seek balance","go"];
	this.introIndex = 0;
	this.timeOffset = 0


	//mousemove
	this.mousemove = function(e){
		var x = e.x;
		var y = e.y;

		if(x <= self.engine.width/2){
			self.choice1Alpha = 0.5;
			self.choice2Alpha = 0.2;
		} else {
			self.choice1Alpha = 0.2;
			self.choice2Alpha = 0.5;
		}
	}

	this.handleClick = function(e){
		switch(self.question){
			case 0 :
				self.showInfo = (self.choice1Alpha > self.choice2Alpha) ? true : false
				break;
		}

		
		if(self.question > 2 && self.introIndex + 1 < self.introText.length){
			self.timeOffset = self.lastIntroTime;
			self.introIndex++;
			if(self.introIndex != self.introText.length -1) self.introAlpha = 0;	

		} else {
			self.question++;
			self.introAlpha = 0;	
		}
	}

}

Ether.Hub.prototype.init = function(){
	if(this.intro == false){
		window.onmousemove = undefined;
		window.onclick = undefined;
		return
	} 

	window.onmousemove = this.mousemove;
	window.onclick = this.handleClick;
}

Ether.Hub.prototype.drawIntro = function(time){
	var ctx = this.engine.ctx;
	if(this.question <= 2){
		this.drawAnswerBoxes(ctx,time);
		this.drawQuestionText(ctx,time);
	} else {
		this.drawIntroText(ctx,time)
	}
}

Ether.Hub.prototype.drawIntroText = function(ctx,time){
	if(time > this.lastIntroTime + 50){
		this.introAlpha += 0.05;
		this.lastIntroTime = time;
		if(this.introAlpha > 1) this.introAlpha = 1;
		console.log(this.timeOffset)
		if(this.lastIntroTime-this.timeOffset > 4000){
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
	var questions = ["Which is more true?","To which place are you destined?","Which is more desireable?"];

	var answers = [["Knowledge is power.","The unknown is reality."],
					["The journey of a galaxy","The home of concious life"],
					["A Butterfly","A Snail"]];

	var currentQuestion = questions[this.question];
	var currentAnswers = answers[this.question];
	var qWidth = ctx.measureText(currentQuestion).width;

	if(time > this.lastIntroTime + 50){
		this.lastIntroTime = time;
		this.introAlpha += 0.05;
		if(this.introAlpha > 1) this.introAlpha = 1;
	}

	//quetion
	ctx.font = "28pt Arial"
	ctx.fillStyle="rgba(255,255,255,"+this.introAlpha+")";
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
}

Ether.Hub.prototype.draw = function(time){
	var stats = this.getStats();
	var ctx = this.engine.ctx;

	//convert stability
	var hubStab = (stats.stab > 100) ? 0 : (100 - stats.stab)

	if(this.showInfo){
		ctx.font = this.unit + "px Arial";
		ctx.fillStyle = "rgba(20,70,200,1)"
		ctx.fillText("Mass: " + Math.floor(stats.mass), this.unit,this.unit*1.5)
		ctx.fillText("Stability: " + hubStab, this.unit,this.unit*2.5)
	}

	//in between ages?
	this.drawInbetween(ctx,time);

	if(this.showInfo) this.drawElementStats(stats,ctx);
	this.drawLifeBar(ctx, time);
	this.drawMessage(ctx,time);
}

Ether.Hub.prototype.drawInbetween = function(ctx,time,success){
	var age = this.engine.ethers[0].age;

	if(this.engine.betweenAges){

		//alpha
		if(time > this.betweenLastTime + 100){
			this.betweenLastTime = time;
			ctx.fillStyle = "rgba(0,0,0,"+this.betweenAlpha+")";
		    ctx.fillRect(0,0,this.engine.width,this.engine.height);
		}

		
	}
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

Ether.Hub.prototype.drawElementStats = function(stats, ctx){
	ctx.font = this.unit/2 + "px Arial";

	ctx.fillStyle = "red";
	ctx.fillText("Fire: " + stats.elementCount.f, this.unit, this.unit*3.2);

	ctx.fillStyle = "blue";
	ctx.fillText("Water: " + stats.elementCount.w, this.unit * 3.5, this.unit*3.2);

	ctx.fillStyle = "white";
	ctx.fillText("Air: " + stats.elementCount.a, this.unit, this.unit*4.1);

	ctx.fillStyle = "green";
	ctx.fillText("Earth: " + stats.elementCount.e, this.unit * 3.5, this.unit*4.1);
}

Ether.Hub.prototype.drawLifeBar = function(ctx, time){
	if(this.engine.betweenAges) { return }

	var colors = ["green","yellow","orange","red"];
	var ether = this.engine.ethers[0];
	var ratio = (ether.age != 3) ? (ether.currentSpan/ether.lifeSpan[ether.age]) : (ether.elements.length/ether.finalElementLength)

	ctx.fillStyle = colors[ether.age];
	ctx.fillRect(this.engine.width - (this.unit * 0.5), this.unit * 1.5, -(this.unit * 5) * ratio, this.unit * 0.5)

	ctx.strokeStyle = "red";
	ctx.strokeRect(this.engine.width - (this.unit * 5.5), this.unit * 1.5, this.unit * 5, this.unit * 0.5)

	//MOVE THIS TO ETHER!!???
	if(time > this.lastTime + 1000 && !ether.inVoid){
		this.lastTime = time;
		if(ratio > 0){
			ether.currentSpan--;
		} else {
			this.engine.betweenAges = true;
		}
	}

}

//messages
Ether.Hub.prototype.drawMessage = function(ctx,time){
	var ether = this.engine.ethers[0];

	var borderMssg = "in the boundless void, time is not";
	var age0WinMssg = "absorbing the elements, you grow into a fine young ether";
	var age0FailMssg = "you cannot subsist on the little you've aquired; dead";
	var age1Mssg = "let your wings spread";
	var age2Mssg = "you are giant. all things die";
	var age3Mssg = "dead";

	if(!this.messageExist){

		//leaving game border
		if(this.hasLeftBorder() && this.currentMessage != borderMssg){
			this.messageExist = true;
			this.currentMessage = borderMssg;
		
		//new age
		} else if(this.engine.betweenAges){
			this.messageExist = true;

			switch(ether.age){
				case 0 :
					if(ether.dead){
						this.currentMessage = age0FailMssg;
					} else {
						this.currentMessage = age0WinMssg;
					}
					break;

				case 1 :
					this.currentMessage = age1Mssg;
					break;

				case 2 :
					this.currentMessage = age2Mssg;
					break;

				case 3 :
					this.currentMessage = age3Mssg;
					break;

			}


		}

	} else {
		this.renderMessage(ctx,time);
	}
}

Ether.Hub.prototype.renderMessage = function(ctx,time){
	ctx.font = "30px Arial";
	ctx.fillStyle = "rgba(255,255,255,"+this.messageAlpha+")";
	var textWidth = ctx.measureText(this.currentMessage).width;
	ctx.fillText(this.currentMessage,(this.engine.width/2) - (textWidth / 2), (this.engine.height/2)-this.unit);

	if(time > this.lastMessageTime + 100){
		this.messageAlpha-=0.01;

		if(this.messageAlpha <= 0.01){
			this.messageExist = false;
			this.messageAlpha = 1;
			
			//in between message?
			if(this.engine.betweenAges && !this.engine.ethers[0].dead){
				this.currentMessage = "";
				this.engine.betweenAges = false;
				this.engine.ethers[0].age++;
				this.engine.ethers[0].currentSpan = this.engine.ethers[0].lifeSpan[this.engine.ethers[0].age];

				if(this.engine.ethers[0].age < 4){
					this.engine.init();
				} else {
					//TO DO END GAME?!?!?
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

Ether.Hub.prototype.gameOver = function(){
	
}