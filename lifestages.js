Ether = {};

Ether.LifeStages = function (engine) {
	//this.ether = engne.ethers[0];
	this.stages = {};
}

Ether.LifeStages.prototype.createLifeStage = function(string) {
	//var splitString = string.trim().split("function(e,time){");
	//console.log(splitString);
};

var rotateElement = /*"function(e,time){
	if(time > this.rotateLastTime + 500){

		if(this.rotateDirection < 0){
			this.degreeChange += 0.001;
			if(this.degreeChange > 1) {this.degreeChange = 1 }
			if(this.currentSpan < (this.lifeSpan[this.age]/3) * 2){ this.rotateDirection++; }

		} else if(this.rotateDirection > 0){
			this.degreeChange -= 0.001;
			if(this.degreeChange < 0.001) {this.degreeChange = 0.001 }

		} else {
			if(this.currentSpan < this.lifeSpan[this.age]/3){ this.rotateDirection++; }

		}
	}

	if(e.degree == 360){
		e.degree = 0;
	} else {
		e.degree+=this.degreeChange;
	}

	e.xOffset = (e.range * Math.cos(this.engine.util.degToRad(e.degree)));
	e.yOffset = (e.xOffset * Math.tan(this.engine.util.degToRad(e.degree)));
	
}"*/

var x = new Ether.LifeStages();
x.createLifeStage(rotateElement);
