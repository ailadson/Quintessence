Ether.Audio = function (engine) {
	this.engine;
	this.ctx;
	this.audio = {};
}

Ether.Audio.prototype.init = function(){
	/*if(this.loaded) return
	//try{
		window.AudioContext = window.AudioContext || window.webkitAudioContext;
		this.ctx = new window.AudioContext();
		console.log(this.ctx)
		this.loadSounds();
/*	} catch(e){
		alert('Your brower does not support Web Audio API. Please update.');
	}*/
	this.loadSounds();
}

Ether.Audio.prototype.loadSounds = function(index){
	var urls = ["fire","water","air","earth"];
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
	/*request.open('GET',"audio/"+url+".wav",true);
	request.responseType = 'arraybuffer';

	request.onload = function(){
		self.decodeAudioData(request.response, function(buffer){
			self.buffer[url] = buffer;
			
		})
	}

	request.send();

	//};*/
}


Ether.Audio.prototype.playSound = function(element){
	var volume = element.radius/125;
	if(volume > 1) volume = 1
	this.audio[element.type].volume = volume;
	this.audio[element.type].play();
}