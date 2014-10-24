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
	//this.messageAlpha = 1;
	this.currentMessage = "";
	this.lastMessageTime = 0;
	this.msgQue = new Ether.MsgQue();

	//intro
	this.intro = true;
	this.lastIntroTime = 0;
	this.introAlpha = 0;
	this.introText = ["an ether is born","you are born","collect the four elements","grow into yourself","and die","as all things that are born must","seek balance"];
	this.introIndex = 0;
	this.timeOffset = 0

	//zoom
	this.zoomTimeout = 100
	this.zoomLastTime = 0
	this.zoomMessage = ""
	this.zoomMessageShown = false
	this.zoomMessage0 = ""
	this.zoomMessage1 = "It means you can zoom out."
	this.zoomMessage2 = "Press Z to zoom out"
	
	//awards
	this.awardMssg = "";
	this.lifeStageMssg = "";
	this.lifeStageOpts = ["spread your wings","spread your trail"]
	this.subMessage = "";

	this.gameOverLastTime = 0;
	this.gameOverAlpha = 0;
	this.gameOverWidth;
	this.gameOverColor = "rgba(0,0,0,"

	//tutorial
	this.lifeSpanMssgShown = false;

	this.stableWarned = false;
	this.stableMssg0 = "Vibration is a sign of imbalance."
	this.stableMssg1 = "You will purge yourself if BALANCE falls below 50."
	this.purgeMssg = "PURGING"
	this.purgeNotified = false;
	this.unstable = false;

	this.firstElementMessage0 = "You have acquired your first element."
	this.firstElementMessage11 = "New elements change your BALANCE."
	this.firstElementMessage10 = "Don't let it become too low (< 50)."
	this.firstElementShown = false;

	this.lifeBarMessage0 = "Your lifespan is represented at the top of the screen."
	this.lifeBarMessage1 = "When it runs out, you will die."

	this.enemyMessage0 = "Rainbow Voids will purge you of all your elements."
	this.enemyMessage1 = " Stay away from them."
	this.enemyMessageShown = false;

	this.bigElementMessageShowing = false;
	this.bigElementMessageShown = false;
	this.bigElementSub = "CAREFUL!"
	this.bigElementMessage = "Large elements can cause a sudden imbalance."

	this.upgradeMessageShown = false;
	this.upgradeAvailable = false;
	this.upgradeMessage0 = "See (U)pgrades in the lower-right corner."
	this.upgradeMessage1 = "It means you have an available upgrade."
	this.upgradeMessage2 = "Press 'U' to access upgrades."


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
		
		if(self.introIndex + 1 < self.introText.length){
			self.timeOffset = self.lastIntroTime;
			self.introIndex++;
			if(self.introIndex != self.introText.length -1) self.introAlpha = 0;	

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
	this.drawIntroText(ctx,time)
}

Ether.Hub.prototype.drawIntroText = function(ctx,time){
	if(time > this.lastIntroTime + 50){
		ctx.font = "28pt simple"
		ctx.fillStyle="rgba(164,161,151,"+this.introAlpha+")";

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

Ether.Hub.prototype.draw = function(time){
	var ctx = this.engine.ctx;
	var stats = this.getStats();

	var balanceWidth = this.drawBalance(stats.stab,ctx);
	this.drawElementStats(stats.elementCount,ctx,balanceWidth);
	this.drawLifeBar(ctx, time);
	this.updateMsgQue();
	this.drawMessage(ctx,time);
	this.drawZoom(ctx,time);
	this.drawUpgrade(ctx,time);
}

Ether.Hub.prototype.drawZoom = function(ctx,time){
	if(!this.engine.player.moved){return}

	if(!this.engine.player.canZoom){
		ctx.fillStyle = "rgba(65,78,78,.2)"
	} else {
		ctx.fillStyle = "#A3C2C2"
	}
	ctx.font = this.unit*1.5 + "px simple";
	ctx.fillText("(Z)oom Out",this.engine.width - this.unit*8,this.engine.height - this.unit*2.5)
}

Ether.Hub.prototype.drawUpgrade = function(ctx,time){
	if(!this.engine.player.moved){return}

	if(!this.engine.upgrade.canUpgrade()){	
		ctx.fillStyle = "rgba(65,78,78,.2)"
	} else {
		this.upgradeAvailable = true;	
		ctx.fillStyle = "#A3C2C2"
	}

	ctx.font = this.unit*1.5 + "px simple";
	ctx.fillText("(U)pgrades",this.engine.width - this.unit*8,this.engine.height - this.unit)
}


Ether.Hub.prototype.newAward = function(text,amount){
	this.awardMssg = [text,amount];
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

Ether.Hub.prototype.drawBalance = function(stab,ctx){
	var hubStab = (stab > 100) ? 0 : (100 - stab)
	
	ctx.font =this.unit*2+"px simple";
	ctx.fillStyle = "#414E4E";
	ctx.fillText("Balance: " + hubStab, this.unit*.9-2,(this.engine.height - this.unit*1.2)-2);
	
	ctx.fillStyle = "#A3C2C2";
	ctx.fillText("Balance: " + hubStab, this.unit *.9,this.engine.height - this.unit*1.2);

	return this.unit
}

Ether.Hub.prototype.drawElementStats = function(count, ctx, width){
	ctx.font = this.unit + "px simple";

	var fWidth = ctx.measureText("Fire: " + count["f"]).width
	var aWidth = ctx.measureText("Air: " + count["a"]).width
	var eleWidth = (fWidth >= aWidth) ? fWidth : aWidth

	ctx.fillStyle =  "#6B504A";
	ctx.fillText("Fire: " + count["f"], width-1, this.engine.height - this.unit*4.5 -1);
	ctx.fillStyle = "#E0664A";
	ctx.fillText("Fire: " + count["f"], width, this.engine.height - this.unit*4.5);

	ctx.fillStyle ='#243F63',
	ctx.fillText("Water: " + count["w"], width + eleWidth + this.unit * 2 - 1, this.engine.height - this.unit*4.5 -1);	
	ctx.fillStyle = "#47BDDE";
	ctx.fillText("Water: " + count["w"], width + eleWidth + this.unit * 2, this.engine.height - this.unit*4.5);

	ctx.fillStyle = "#9E9E99";
	ctx.fillText("Air: " + count["a"], width  -1, this.engine.height - this.unit*3-1);
	ctx.fillStyle = "#EDEDEB";
	ctx.fillText("Air: " + count["a"], width , this.engine.height - this.unit*3);

	ctx.fillStyle = '#858063'
	ctx.fillText("Earth: " + count["e"], width + eleWidth + this.unit * 2 -1, this.engine.height - this.unit*3-1)
	ctx.fillStyle = '#6C7F2E';
	ctx.fillText("Earth: " + count["e"], width + eleWidth + this.unit * 2, this.engine.height - this.unit*3);

	var fwSign = this.getEqualitySign(count['f'],count['w']);
	var aeSign = this.getEqualitySign(count['a'],count['e']);

	ctx.fillStyle = "#414E4E";
	ctx.fillText(fwSign, width + eleWidth + this.unit*.75-1, this.engine.height - this.unit * 4.5 - 1)
	ctx.fillText(aeSign, width + eleWidth + this.unit*.75- 1, this.engine.height - this.unit *3- 1)
	ctx.fillStyle = "#A3C2C2";
	ctx.fillText(fwSign, width + eleWidth + this.unit*.75, this.engine.height - this.unit * 4.5)
	ctx.fillText(aeSign, width + eleWidth + this.unit*.75, this.engine.height - this.unit*3)
}

Ether.Hub.prototype.getEqualitySign = function(val1,val2){
	if(val1 > val2){
		return ">"
	} else if(val1 < val2){
		return "<"
	} else{
		return "="
	}
}

Ether.Hub.prototype.drawLifeBar = function(ctx, time){

	var ether = this.engine.ethers[0];
	var ratio = ether.currentSpan/ether.lifeSpan[0]
	var color = this.getLifeBarColor(ratio);

	ctx.fillStyle = "#FFF4E9";
	ctx.font = this.unit + "px simple"
	var w = ctx.measureText("Lifespan").width
	ctx.fillText("Lifespan",(this.engine.width/2)-(w/2), this.unit);

	ctx.fillStyle = color;
	ctx.fillRect(this.engine.width -(this.unit * 2), this.unit * 1.5, -(this.unit * 46) * ratio, this.unit * 0.5)

	ctx.strokeStyle = "red";
	ctx.strokeRect((this.unit * 2), this.unit * 1.5, this.unit * 46, this.unit * 0.5)

	//MOVE THIS TO ETHER!!???
	if(!ether.moved){return}
		
	if(time > this.lastTime + 1000 && !ether.inVoid &&!this.engine.isPaused){
		this.lastTime = time;
		if(ratio > 0){
			ether.currentSpan--;
		} else {
			ether.dead = true;
		}
	}

}

Ether.Hub.prototype.getLifeBarColor = function(ratio){
	if(ratio <= .25){
		return "red"
	} else if(ratio <= .5){
		return "orange"
	} else if(ratio <= .75){
		return "yellow"
	}else{
		return "green"
	}
}

//messages
Ether.Hub.prototype.drawMessage = function(ctx,time,award){
	var player = this.engine.ethers[0];

	if(!this.messageExist || (this.messageExist && !this.msgQue.hasMsg())){
		if(this.msgQue.hasMsg()){
			var msg = this.msgQue.getMsg()

			this.messageExist = true
			this.currentMessage = msg

			switch(msg.type){
				case "blank" : 
					msg.alphaStep = 1;
					msg.alphaTime = 1;
					msg.fontSize = 1;
					break;
				case "award" : 
					msg.fontSize = 2.5
					this.subMessage = msg.sub
					this.engine.audio.playSound('life');
					break;
				case "tutorial" :
					if(Ether.Tutorial){
						this.engine.isPaused = true;
						msg.alphaTime = 5000;
						msg.alphaStep = 1;
						msg.fontSize = 2;
					} else {
						this.messageExist = false;
						this.currentMessage = "";
					}

					break; 
				case "purge" :
					msg.fontSize = 3;
					this.engine.audio.playSound('purge');
					break;
				case "stability" :
					msg.fontSize = 2;
					break;
				case "default" :
					msg.fontSize = 2;
					break
					
			}
		} else {
			this.renderMessage(ctx,time);
		}
	} else {
		this.renderMessage(ctx,time);
	}
}

Ether.Hub.prototype.updateMsgQue = function(){
	var config = {}

	if(!this.lifeSpanMssgShown){
		this.addBlankMsg();

		config.type = "tutorial";

		config.string = this.lifeBarMessage0;
		this.msgQue.addMsg(config);

		config.string = this.lifeBarMessage1;
		this.msgQue.addMsg(config);

		this.lifeSpanMssgShown = true;

	} else if(this.engine.player.receivedFirstElement && !this.firstElementShown){
		this.addBlankMsg();
		config.type = "tutorial";
		config.alphaStep = 0.015;
		config.string = this.firstElementMessage0;
		this.msgQue.addMsg(config);
		
		config.alphaStep = undefined;
		config.string = this.firstElementMessage11;
		this.msgQue.addMsg(config);
		config.string = this.firstElementMessage10;
		this.msgQue.addMsg(config);

		this.firstElementShown = true;

	} else if(!this.upgradeMessageShown && this.upgradeAvailable){
		this.addBlankMsg();
		config.type = "tutorial";

		config.string = this.upgradeMessage0;
		this.msgQue.addMsg(config);

		config.string = this.upgradeMessage1;
		this.msgQue.addMsg(config);

		config.string = this.upgradeMessage2;
		this.msgQue.addMsg(config);

		this.upgradeMessageShown = true;

	} else if(this.engine.player.unstable && this.engine.player.bigElementIncrease && !this.bigElementMessageShown){
		this.addBlankMsg();
		config.string = this.bigElementMessage;
		config.sub = this.purgeMssg;
		config.type = "tutorial";
		this.msgQue.addMsg(config);

		this.engine.player.bigElementIncrease = false;
		this.bigElementMessageShowing = true;
		this.bigElementMessageShown = true;

	} else if(this.engine.player.unstable && !this.bigElementMessageShowing && !this.purgeNotified && !this.stableWarned){
	 	this.addBlankMsg();
	 	config.type = "tutorial";
	 	this.stableWarned = true;

	 	config.string = this.stableMssg0;
	 	this.msgQue.addMsg(config);

	 	config.string = this.stableMssg1;
	 	this.msgQue.addMsg(config);
	} else if(!this.enemyMessageShown && this.engine.player.enemySeen){
		this.addBlankMsg();
		config.type = "tutorial";
		config.string = this.enemyMessage0;
		this.msgQue.addMsg(config);
		config.string = this.enemyMessage1;
		this.msgQue.addMsg(config);
		this.enemyMessageShown = true;

	} else if(!this.zoomMessageShown && this.zoomMessage0 != ""){
		config.type = "tutorial";

		config.string = this.zoomMessage0;
		this.msgQue.addMsg(config);

		config.string = this.zoomMessage1;
		this.msgQue.addMsg(config);

		config.string = this.zoomMessage2;
		this.msgQue.addMsg(config);

		 this.zoomMessage = "";
		this.zoomMessageShown = true;

	} else if(this.engine.player.unstable){

		 if(!this.bigElementMessageShowing && this.engine.player.purging && !this.purgeNotified){
		 	config.string = this.purgeMssg;
		 	config.type = "purge";

			this.msgQue.addMsg(config)
		 	this.purgeNotified = true;
		 	this.engine.player.purging = false;

		} 

		
	} else if(this.awardMssg){
		config.string = this.awardMssg[0];
		config.type = "award";
		config.sub = "+"+this.awardMssg[1]+" Lifespan";

		this.msgQue.addMsg(config)
		this.awardMssg = "";

	} else if(this.lifeStageMssg != ""){
		config.string = this.lifeStageMssg;
		config.type = "transform";

		this.msgQue.addMsg(config);
		this.lifeStageMssg = "";

	} 
}

Ether.Hub.prototype.addBlankMsg = function(){
	config = {};
	config.type = "blank";
	config.string = "";
	this.msgQue.addMsg(config); //there is a weird timing thing. messy hack
}

Ether.Hub.prototype.renderMessage = function(ctx,time){
	if(this.currentMessage == ""){ return}
	var ether = this.engine.ethers[0];
	var message = this.currentMessage.str
	var sub = this.currentMessage.sub
	var fill = this.currentMessage.fill
	var fontsize = this.currentMessage.fontSize;

	ctx.font = (fontsize*this.unit)+"px simple"

	if(typeof ctx.measureText != 'function'){ //fix. dont remove
		console.log(ctx) ;
		return 
	}

	var textWidth = ctx.measureText(message).width;

	if(textWidth > this.engine.width - 10 && this.currentMessage.type == "award"){ 
		ctx.font = (1.5*this.unit)+"px simple"
		textWidth = ctx.measureText(message).width
	}

	var x = (this.engine.width/2) - (textWidth / 2);
	var y = (this.engine.height/2)-this.unit;

	ctx.fillStyle = "rgba(0,0,0,"+this.currentMessage.alpha+")";
	ctx.fillText(message,x+2,y+2);

	ctx.fillStyle = fill+this.currentMessage.alpha+")";
	ctx.fillText(message,x,y);

	if(sub != ""){
		ctx.font = this.unit+"px simple";
		textWidth = ctx.measureText(sub).width;
		x = (this.engine.width/2) - (textWidth / 2);
		ctx.fillStyle = "rgba(0,0,0,"+this.currentMessage.alpha+")";
		ctx.fillText(sub,x+2,y-this.unit*3+2);
		ctx.fillStyle = fill+this.currentMessage.alpha+")";
		ctx.fillText(sub,x,y-this.unit*3);
	}

	if(time > this.lastMessageTime + this.currentMessage.alphaTime){

		if(this.currentMessage.lowerAlpha() < 0.3){
			this.messageExist = false;
			switch(this.currentMessage.type){
				case "purge" : this.purgeNotified = false;
					break;
				case "bigElement" : this.bigElementMessageShowing = false;
					break;
				case "tutorial" : this.engine.isPaused = false
					break;
			}
			
			if(this.currentMessage.alpha <= 0)this.currentMessage = ""
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
