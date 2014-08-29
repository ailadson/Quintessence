Ether.Config = function (engine) {
	this.running = false; //inits to true
	this.engine = engine;
	this.question = 0;
	this.questionAlpha = 0;
	this.configLastTime = 0;
}

Ether.Config.prototype.draw = function(time){
	if(time > this.configLastTime + 100){
		configLastTime = time;

		this.questionAlpha += 0.01;

		if(this.questionAlpha > 1){ this.questionAlpha = 1 }
	}
}