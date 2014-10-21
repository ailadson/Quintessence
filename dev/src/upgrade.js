Ether.Upgrade = function(engine){
	var self = this;
	this.engine = engine;
	this.player;
	this.upgradeCheck = {w:[13],f:[13],a:[13],e:[]}
	this.container = document.getElementById('upgrade');

	this.cy = cytoscape({
		container : self.container,
		elements : self.getNodes().concat(self.edges),
		style : self.style,
		layout : {
			name : "breadthfirst",
			roots : '#nparent'
		},
		ready : function(evt){
			
			var cy = evt.cy

			cy.elements("node").data("activated",false);
			cy.elements("node[id='nparent']").data("activated",true);
			cy.elements("node[id='nparent']").addClass("activated");
			self.addData(cy);

			cy.elements("node").addClass("unactive")

			cy.on('click','node',function(e){
				if(self.isUpgradable(e.cyTarget)){
					if(self.hasEnoughEnergy(e.cyTarget)){
						e.cyTarget.data("activated",true);
						cy.elements('node[id = "'+e.cyTarget.id()+'"]').removeClass("showingInfo");
						e.cyTarget.addClass("activated");
						self.handleClick(e.cyTarget);
					} else {
						self.engine.audio.playSound('nope');
					}
				} else {
					self.engine.audio.playSound('nope');
				}
			});


			cy.on('mouseover','node',function(e){
				var ele = e.cyTarget;

				if(self.isUpgradable(ele)){
					cy.elements('node[id = "'+ele.id()+'"]').addClass("showingInfo");					
				 } else if(!ele.data().activated){
					cy.elements('node[id = "'+ele.id()+'"]').addClass("notActive");									 	
				 }
			});

			cy.on('mouseout','node',function(e){
				var ele = e.cyTarget;

				if(self.isUpgradable(ele)){
					cy.elements('node[id = "'+ele.id()+'"]').removeClass("showingInfo");
				 } else if(!ele.data("activated")){
					cy.elements('node[id = "'+ele.id()+'"]').removeClass("notActive");									 					 	
				 }
			});

			self.container.style.display = "none"

		
		},
		zoomingEnabled : false,
		panningEnabled : false
	})
}

Ether.Upgrade.prototype.init = function(){
	this.container.style.height = window.innerHeight;
	this.player = this.engine.ethers[0];
}

Ether.Upgrade.prototype.hasEnoughEnergy = function(e){
	var count = this.player.getElementCount();
	var cost = e.data("cost")
	var id = e.id().split(".")[0];
	
	if(id == "attraction" && count.f >= cost){
		count.f -= cost
		return true
	}

	if(id == "resistance" && count.e >= cost){
		count.e -= cost
		return true
	}

	if(id == "balance" && count.a >= cost){
		count.a -= cost
		return true
	}

	if(id == "movement" && count.w >= cost){
		count.w -= cost
		return true
	}

	if(id.indexOf("T") == 0){
		if(count.f >= cost && count.w >= cost && count.e >= cost && count.a >= cost){
			count.f -= cost;
			count.e -= cost;
			count.a -= cost;
			count.w -= cost;
			return true
		}
	}
}

Ether.Upgrade.prototype.addData = function(cy){
	for(var i in cy.elements("node")){
		var node = cy.elements("node")[i]
		if(node && node.data && !node.data("activated")){
			var level = parseInt(node.id().split(".")[1]);
			var type = node.id().split(".")[0].charAt(0).toUpperCase() + node.id().split(".")[0].slice(1)
			node.data("cost",level*(7 + level));

			switch(type.toLowerCase()){
				case "movement" :
					node.data("info",type+" : "+ (level*(12 + level)) + " : Water");
					break;
				case "resistance" :
					node.data("info",type+" : "+ (level*(12 + level)) + " : Earth");
					break;
				case "attraction" :
					node.data("info",type+" : "+ (level*(12 + level)) + " : Fire");
					break;
				case "balance" :
					node.data("info",type+" : "+ (level*(12 + level)) + " : Air");
					break;
				case "tsnail" :
				case "tbutterfly":
					var len = type.length;
					var lStr = type.slice(1,len);
					var str = lStr.charAt(0).toUpperCase() + lStr.slice(1)
					node.data("info",str+" : "+ Math.round(level*(12 + level)/1.3));
			}
		}
		
	}
}

Ether.Upgrade.prototype.isUpgradable = function(ele){
	if(ele.data().activated == true) {  return false }

	var id = ele.id();
	var edges = [];
	var rVal = false;

	for(var i in ele.connectedEdges()){
		var edge = ele.connectedEdges()[i];
		
		if(edge.data){
			var data = edge.data();
			
			if(data.source != id)
				edges.push(edge);
		}
		
	}

	if(edges.length == 0){
		return true
	}

	for (var i = 0; i < edges.length; i++) {
		var edge = edges[i];
		var parentNode = edge.source();

		if(parentNode.data().activated){
			rVal = parentNode.data().activated
		}
	};

	return rVal
}

Ether.Upgrade.prototype.handleClick = function(e){
	var a = e.id().split(".");
	var type = a[0];
	var cost = e.data("cost")
	var config = {
		string : "",
		type : "upgrade",
		alphaStep : 0.03
	}

	 switch(type){
	 	case "movement" :
	 		this.player.control += 10;
	 		this.player.speed += 1;
	 		this.upgradeCheck.w.shift();
	 		config.fill = "rgba(71,189,222,"
	 		config.sub = "- " + cost + " water";
	 		this.engine.hub.msgQue.addMsg(config);
	 		break
	 	case "balance" :
	 		this.player.balance += 0.5;
	 		this.upgradeCheck.a.shift();
	 		config.fill = "rgba(237,237,235,"
	 		config.sub = "- " + cost + " air";
	 		this.engine.hub.msgQue.addMsg(config);
	 		break;
	 	case "attraction" :
	 		this.player.attraction += 2
	 		this.player.force -= 0.1
	 		this.upgradeCheck.f.shift();
	 		config.fill = "rgba(224,102,74,"
	 		config.sub = "- " + cost + " fire";	 		 
	 		this.engine.hub.msgQue.addMsg(config);
	 		break
	 	case "resistance" :
	 		this.player.resistance += 1;
	 		this.upgradeCheck.e.shift();
	 		config.fill = "rgba(108,127,46,"
	 		config.sub = "- " + cost + " earth";
	 		this.engine.hub.msgQue.addMsg(config);
	 		break;
	 	case "Tsnail" :
	 		this.player.transformation = this.player.transformations.snail;
	 		break;
	 	case "Tbutterfly" :
	 		this.player.transformation = this.player.transformations.butterfly;
	 		break;
	 }


	//update upgrade check
	var edges = e.connectedEdges();
	for(i in edges){
		var edge = edges[i];

		if(edge.target){
			var target = edge.target();
			var type = target.id().split(".")[0]
			var cost = target.data().cost

			switch(type){
				case "movement" :
			 		this.upgradeCheck.w.push(cost);
			 		break
			 	case "balance" :
			 		this.upgradeCheck.a.push(cost);
			 		break;
			 	case "attraction" :
			 		this.upgradeCheck.f.push(cost);
			 		break
			 	case "resistance" :
			 		this.upgradeCheck.e.push(cost);
			 		break;
			}

		}
	}

	this.engine.audio.playSound('upgrade');
	this.engine.container.style.display = "";
	this.container.style.display = "none";
	this.engine.upgradeScreen = false;
}

Ether.Upgrade.prototype.canUpgrade = function(){
	var count = this.player.getElementCount();

	if(count.w >= this.upgradeCheck.w[0]){
		return true
	} else if(count.f >= this.upgradeCheck.f[0]){
		return true
	} else if(count.a >= this.upgradeCheck.a[0]){
		return true
	} else if(count.e >= this.upgradeCheck.e[0]){
		return true
	} else {
		return false
	}
}

Ether.Upgrade.prototype.style = [
	{
		selector : 'node[id ^= "movement"]',
		css : {
			'background-color':'#47BDDE',
			'border-width' : '2',
			'border-color' : '#243F63',
			'shape' : "pentagon",
			"color" : '#47BDDE',
			"text-outline-color" : '#243F63'
		}
	},{
		selector : 'node[id ^= "attraction"]',
		css : {
			'background-color':'#E0664A',
			'border-width' : '2',
			'border-color' : '#6B504A',
			'shape' : "heptagon",
			"color" : '#E0664A',
			"text-outline-color" : '#6B504A'
		}
	},{
		selector : 'node[id ^= "resistance"]',
		css : {
			'background-color':'#6C7F2E',
			'border-width' : '2',
			'border-color' : '#858063',
			'color' : '#6C7F2E',
			'shape' : 'rectangle',
			"text-outline-color" : '#858063'
		}
	},{
		selector : 'node[id ^= "balance"]',
		css : {
			'background-color':'#EDEDEB',
			'border-width' : '2',
			'border-color' : '#9E9E99',
			"color" : "#EDEDEB",
			'shape' : 'triangle',
			"text-outline-color" : '#9F9FA0'
		}
	},{
		selector : 'node[id ^= "T"]',
		css : {
			'background-color':'#FFD700',
			'border-width' : '2',
			'border-color' : '#8F8F00',
			"color" : "#FFD700",
			'shape' : 'star',
			"text-outline-color" : "#8F8F00"
		}
	},{
		selector : 'edge',
		css : {
			"line-color" : "#D1E6E6",
			"width" : "4",
			"haystack-radius" : "1",
			"target-arrow-color" : "#D1E6E6",
			"target-arrow-shape" : "triangle",
		}
	},{
		selector : ".showingInfo",
		css : {
			"font-family" : "simple",
			"font-size" : "25",
			"text-outline-width" : "1",
			"content" : "data(info)"
		}
	},{
		selector : ".notActive",
		css : {
			"shape" : "ellipse",
			"background-color" : "black",
			"border-width" : "0"
		}
	},{
		selector : ".activated",
		css : {
			"shape" : "ellipse",
			"background-color" : "white",
			"border-width" : "0"
		}
	}
];

Ether.Upgrade.prototype.getNodes = function(){
	return [
		// {
		// 	group : "nodes",
		// 	data : {
		// 		id : "zoom"
		// 	}
		 //},
		 {
			group : "nodes",
			data : { id: "nparent" },
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "Tbutterfly.9"
			}
		},{
			group : "nodes",
			data : {
				id : "Tsnail.9"
			}
		},{
			group : "nodes",
			data : {
				id : "balance.1",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.1",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.1",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.2",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.2",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.2",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "balance.2",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.3",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.3",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.3",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "balance.4",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.4",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.4",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.4",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "balance.5",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.5",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.5",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.6",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.6",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "balance.6",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.6",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.7",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.7",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "balance.7",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "resistance.8",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "balance.8",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "attraction.8",
			},
			grabbable : false
		},{
			group : "nodes",
			data : {
				id : "movement.8",
			},
			grabbable : false
		}
	];
}

Ether.Upgrade.prototype.edges = [
		{
			group : "edges",
			data : {
				id : "movement.t.snail",
				source : "movement.8",
				target : "Tsnail.9"
			}
		},{
			group : "edges",
			data : {
				id : "attraction.t.snail",
				source : "attraction.8",
				target : "Tsnail.9"
			}
		},{
			group : "edges",
			data : {
				id : "balance.t.butterfly",
				source : "balance.8",
				target : "Tbutterfly.9"
			}
		},{
			group : "edges",
			data : {
				id : "resistance.t.butterfly",
				source : "resistance.8",
				target : "Tbutterfly.9"
			}
		},{
			group : "edges",
			data : {
				id : "parent.1.balance",
				source : "nparent",
				target : "balance.1"
			}
		},
		{
			group : "edges",
			data : {
				id : "parent.1.movement",
				source : "nparent",
				target : "movement.1"
			}
		},
		{
			group : "edges",
			data : {
				id : "parent.1.attraction",
				source : "nparent",
				target : "attraction.1"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.2.movement",
				source : "balance.1",
				target : "movement.2"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.2.attraction",
				source : "balance.1",
				target : "attraction.2"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.2.attraction",
				source : "movement.1",
				target : "attraction.2"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.2.resistance",
				source : "movement.1",
				target : "resistance.2"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.2.resistance",
				source : "attraction.1",
				target : "resistance.2"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.balance",
				source : "attraction.1",
				target : "balance.2"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.3.movement",
				source : "movement.2",
				target : "movement.3"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.3.movement",
				source : "attraction.2",
				target : "movement.3"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.3.attraction",
				source : "attraction.2",
				target : "attraction.3"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.3.attraction",
				source : "resistance.2",
				target : "attraction.3"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.3.resistance",
				source : "resistance.2",
				target : "resistance.3"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.3.resistance",
				source : "balance.2",
				target : "resistance.3"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.4.balance",
				source : "movement.3",
				target : "balance.4"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.4.resistance",
				source : "movement.3",
				target : "resistance.4"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.4.resistance",
				source : "attraction.3",
				target : "resistance.4"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.4.movement",
				source : "attraction.3",
				target : "movement.4"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.4.movement",
				source : "resistance.3",
				target : "movement.4"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.4.attraction",
				source : "resistance.3",
				target : "attraction.4"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.5.balance",
				source : "balance.4",
				target : "balance.5"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.5.balance",
				source : "resistance.4",
				target : "balance.5"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.5.resistance",
				source : "resistance.4",
				target : "resistance.5"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.5.resistance",
				source : "movement.4",
				target : "resistance.5"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.5.movement",
				source : "movement.4",
				target : "movement.5"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.5.movement",
				source : "attraction.4",
				target : "movement.5"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.6.attraction",
				source : "balance.5",
				target : "attraction.6"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.6.movement",
				source : "balance.5",
				target : "movement.6"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.6.movement",
				source : "resistance.5",
				target : "movement.6"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.6.balance",
				source : "resistance.5",
				target : "balance.6"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.6.balance",
				source : "movement.5",
				target : "balance.6"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.6.resistance",
				source : "movement.5",
				target : "resistance.6"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.7.resistance",
				source : "attraction.6",
				target : "resistance.7"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.7.resistance",
				source : "movement.6",
				target : "resistance.7"
			}
		},
		{
			group : "edges",
			data : {
				id : "movement.7.attraction",
				source : "movement.6",
				target : "attraction.7"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.7.attraction",
				source : "balance.6",
				target : "attraction.7"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.7.balance",
				source : "balance.6",
				target : "balance.7"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.7.balance",
				source : "resistance.6",
				target : "balance.7"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.8.resistance",
				source : "resistance.7",
				target : "resistance.8"
			}
		},
		{
			group : "edges",
			data : {
				id : "resistance.8.balance",
				source : "resistance.7",
				target : "balance.8"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.8.balance",
				source : "attraction.7",
				target : "balance.8"
			}
		},
		{
			group : "edges",
			data : {
				id : "attraction.8.attraction",
				source : "attraction.7",
				target : "attraction.8"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.8.attraction",
				source : "balance.7",
				target : "attraction.8"
			}
		},
		{
			group : "edges",
			data : {
				id : "balance.8.movement",
				source : "balance.7",
				target : "movement.8"
			}
		}
];


// Ether.Upgrade.prototype.createEdges = function(){
// 	var currentNumber = "1";
// 	var oldNodes = [];
// 	var currentNodes = [];
// 	var nodeNumb = 0;

// 	for (var i = 0; i < this.elements.length; i++) {
// 		var id = this.elements[i].data.id;
// 		var ele = id.split(".");
// 		var type = ele[0];
// 		var tier = ele[1];

// 		if(!tier) continue

// 		if(currentNumber != tier){
// 			oldNodes = currentNodes;
// 			currentNodes = [];
// 			currentNumber = tier;
// 			nodeNumb = 0
// 		}

// 		currentNodes.push(id);
// 		nodeNumb+=1;

// 		var src = this.getSrc(oldNodes,tier,nodeNumb);
// 		var trgt = e


// 		var obj = {
// 			group : "edges",
// 			data : {
// 				id : "e."+tier+"."+src[0]+"."+target[0],
// 				source : src,
// 				target : trgt
// 			}
// 		}

// 		console.log(obj)
// 	};	
// }

// Ether.Upgrade.prototype.getSrc = function(oldN,tier,number){
// 	if(oldN.length < 1){ return "nparent" }

// 	if(number%2 == 0){

// 	}

// }



