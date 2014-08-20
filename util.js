Ether.Util = function (engine) {
	this.engine = engine;
}

//Structures
Ether.Util.prototype.Vec = function(x,y){
	this.x = x;
	this.y = y;
}

//Conversion
Ether.Util.prototype.degToRad = function(deg) {
	return (Ether.Util.radianInDeg * deg) 
};

Ether.Util.prototype.radToDeg = function(rad){
	return (Ether.Util.degreeInRad * rad)
}

//Constants
Ether.Util.radianInDeg = 180/Math.PI;
Ether.Util.degreeInRad = Math.PI/180;

