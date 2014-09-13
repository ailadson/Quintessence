var Ether = Ether || {};

Ether.Element = function(type,size,config,bad){
	var config = config || {};
	this["type"] = config["type"] || type;
	this.bad = bad;

	//color
	config.rgb = config.rgb || {};
	var r = config.rgb.r || Math.random()*255>>0;
	var g = config.rgb.g || Math.random()*255>>0;
	var b = config.rgb.b || Math.random()*255>>0;
		
	switch(type){
		case 'core' :
			if (r <= 150) r += 100
			if (g <= 150) g += 100
			if (b <= 150) b += 100
			break;
		case 'fire' :
			r = 255;
			if (g >= 125) g = 75
			if (b >= 100) b = 50
			break;
		case 'water' :
			b = 255;
			if (r >= 75) r = 50
			if (g >= 175) g -= 100
			break;
		case 'air' :
			if (r <= 185) r = 230
			if (g <= 185) g = 230
			b = 255
			break;
		case 'earth' :
			b = 0;
			if (r > 200 || r < 100) r = 150
			if (g > 175 || g < 120) g = 150
			break;

	}
	
	this.color = "rgba("+r+","+g+","+b+",0.5)";
	this.rgb = {r : r, g : g, b : b}

	//size
	var _size = size || 0.5;
	this.radius = config.radius;

	if(!this.radius){
		switch(type){
			case 'core' :
				this.radius = Math.random()*15+(_size*5)
			default :
				this.radius = Math.random()*15+(_size*5)

		}
	}

	//velocity
	this.vx = Math.random()*10-5;
	this.vy = Math.random()*10-5;

	//position
	this.x;
	this.y;
	this.xOffset = config.xOffset;
	this.yOffset = config.yOffset;

	//jitter
	this.jitter = bad ? -5: -1;

}