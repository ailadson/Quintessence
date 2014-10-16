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
	this.zoomSubMessage = "Press Z to zoom out"
	
	//awards
	this.awardMssg = "";
	this.lifeStageMssg = "";
	this.lifeStageOpts = ["spread your wings","spread your trail"]
	this.subMessage = "";

	this.stableWarned = false
	this.stableMssg = "The vibration is a sign of your imbalance"
	this.purgeMssg = "PURGING"
	this.purgeNotified = false;
	this.unstable = false;

	this.gameOverLastTime = 0;
	this.gameOverAlpha = 0;
	this.gameOverWidth;
	this.gameOverColor = "rgba(0,0,0,"


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

	if(this.zoomTimeout != 0){
		if(time > this.zoomLastTime + 1000){
			this.zoomLastTime = time;
			this.zoomTimeout -= 1;
			if(this.zoomTimeout == 0){
				this.engine.player.canZoom = true;

				if(!this.zoomMessageShown){
					this.zoomMessage = "See yourself on a different scale";
				}
			}
		}
		ctx.fillStyle = "rgba(65,78,78,.2)"

	} else {
		ctx.fillStyle = "#A3C2C2"
	}
	ctx.font = this.unit*1.5 + "px simple";
	ctx.fillText("Z",this.engine.width - this.unit*2,this.engine.height - this.unit)
}

Ether.Hub.prototype.drawUpgrade = function(ctx,time){
	if(!this.engine.player.moved){return}

	if(!this.engine.upgrade.canUpgrade()){		
		ctx.fillStyle = "rgba(65,78,78,.2)"
	} else {
		ctx.fillStyle = "#A3C2C2"
	}

	ctx.font = this.unit*1.5 + "px simple";
	ctx.fillText("U",this.engine.width - this.unit*4,this.engine.height - this.unit)
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
	//console.log("hub balance: "+stab)
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
	if(this.engine.betweenAges) { return }

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
		
	if(time > this.lastTime + 1000 && !ether.inVoid){
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
				case "award" : 
					this.subMessage = msg.sub
					this.engine.audio.playSound('life');
					break;
				case "zoom" :
					this.zoomMessageShown = true
					break;
				case "stablility" :
					
					break;
				case "purge" :
					
			}
		} else {
			this.renderMessage(ctx,time);
		}
	} else {
		this.renderMessage(ctx,time);
	}
}

Ether.Hub.prototype.updateMsgQue = function(){
	
	if(!this.zoomMessageShown && this.zoomMessage != ""){
		this.msgQue.addMsg(this.zoomMessage,"zoom",this.zoomSubMessage)
		this.zoomMessage = "";
	}

	if(this.awardMssg){
		this.msgQue.addMsg(this.awardMssg[0],"award","+"+this.awardMssg[1]+" Lifespan")
		this.awardMssg = "";
	}

	if(this.lifeStageMssg != ""){
		this.msgQue.addMsg(this.lifeStageMssg,"transform")
		this.lifeStageMssg = ""
	}

	if(this.unstable){
		
		if(this.purging && !this.purgeNotified){
			this.purgeNotified = true;
			this.msgQue.addMsg(this.purgeMssg,"purge")
			this.purging = false;
		} else if(!this.stableWarned){
			this.stableWarned = true;
			this.msgQue.addMsg(this.stableMssg,"stability")
		}

		
	}
}

Ether.Hub.prototype.renderMessage = function(ctx,time){
	if(this.currentMessage == ""){ return}
	var ether = this.engine.ethers[0];
	var message = this.currentMessage.str
	var sub = this.currentMessage.sub


	ctx.font = (this.currentMessage.type == "award") ? "90px simple" : "30px simple";

	if(typeof ctx.measureText != 'function'){ 
		console.log(ctx) ;
		return 
	}

	var textWidth = ctx.measureText(message).width;

	if(textWidth > this.engine.width - 10 && this.currentMessage.type == "award"){ 
		ctx.font = "70px simple"
		textWidth = ctx.measureText(message).width
	}

	var x = (this.engine.width/2) - (textWidth / 2);
	var y = (this.engine.height/2)-this.unit;

	ctx.fillStyle = "rgba(0,0,0,"+this.currentMessage.alpha+")";
	ctx.fillText(message,x+2,y+2);

	ctx.fillStyle = "rgba(164,161,151,"+this.currentMessage.alpha+")";
	ctx.fillText(message,x,y);

	if(sub != ""){
		ctx.font = "25px simple";
		textWidth = ctx.measureText(sub).width;
		x = (this.engine.width/2) - (textWidth / 2);
		ctx.fillStyle = "rgba(0,0,0,"+this.currentMessage.alpha+")";
		ctx.fillText(sub,x+2,y-this.unit*3+2);
		ctx.fillStyle = "rgba(164,161,151,"+this.currentMessage.alpha+")";
		ctx.fillText(sub,x,y-this.unit*3);
	}

	if(time > this.lastMessageTime + 100){

		if(this.currentMessage.lowerAlpha() < 0.3){
			this.messageExist = false;
			if(this.currentMessage.type == "purge"){
				this.purgeNotified = false
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
