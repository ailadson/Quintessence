/**
 * @constructor
 */
Ether.Util = function (engine) {
	this.engine = engine;
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

//Measurments
Ether.Util.prototype.getDistanceFromCenter = function(e,source){
	var xDif = source.x - Math.abs(e.x);
	var yDif = source.y - Math.abs(e.y);

	return Math.sqrt((xDif * xDif) + (yDif * yDif))
}

Ether.Util.prototype.createGradient = function(grad,set){
	for (var i = 0; i < set.length; i++) {
		var stop = set[i];
		grad.addColorStop(stop[0],stop[1])
	};
	return grad
}

Ether.Util.prototype.drawElement = function(element,ctx,gradFunc){
	var gradient = gradFunc(ctx,element);

	ctx.fillStyle = gradient;
	ctx.arc(element.x,element.y,element.radius,Math.PI*2,false);
	ctx.fill();
}