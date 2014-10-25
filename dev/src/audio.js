Ether.Audio = function (engine) {
	this.engine;
	this.ctx;
	this.audio = {};
	this.ambientSounds = 10;
	this.ambientTime = 0;
}

Ether.Audio.prototype.init = function(){
	this.loadSounds();
}

Ether.Audio.prototype.loadSounds = function(index){
	var urls = ["fire","water","air","earth","life","upgrade","purge","nope","tutorial"];

	//add ambient
	for (var i = 1; i <= this.ambientSounds; i++) {
		urls.push("ambient"+i);
	};

	var index = index || 0;
	var self = this;
	var url = urls[index];
	
	this.audio[url] = new Audio("audio/"+url+".wav");
	
	if(index != urls.length-1){
		index++;
		self.loadSounds(index);
	} else {
		self.loaded = true;
	}
}


Ether.Audio.prototype.playElementSound = function(element){
	var volume = element.bad ? 1 : element.radius/125;
	if(volume > 1) volume = 1
	this.audio[element.type].volume = volume;
	this.audio[element.type].play();
}

Ether.Audio.prototype.playSound = function(type,volume){
	this.muteOtherSound();
	var v = volume || .8
	this.audio[type].volume = v;
	this.audio[type].play();
}

Ether.Audio.prototype.muteOtherSound = function(){
	for(var s in this.audio){
		if(!this.audio[s].ended)
			this.audio[s].pause()
	}
}

Ether.Audio.prototype.playAmbience = function(time){
	
	if(time > this.ambientTime + 3000){
		this.ambientTime = time;

		var chance = Math.round(Math.random() * 3)

		if(chance >= 1){
			var rand = Math.floor(Math.random()*10) + 1;
			var sound = this.audio["ambient"+rand];

			sound.volume = 0.2;
			sound.play();
		}
	}
}