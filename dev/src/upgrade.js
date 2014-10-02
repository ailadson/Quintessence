Ether.Upgrade = function(engine){
	var self = this;

	this.container = document.getElementById('upgrade');
	this.tierCounter = {
		movement : 0,
		attraction : 0,
		resistance : 0,
		balance : 0
	}

	this.cy = cytoscape({
		container : self.container,
		elements : self.nodes.concat(self.edges),
		style : self.style,
		layout : {
			name : "breadthfirst",
			roots : '#nparent'
		},
		ready : function(evt){
			
			var cy = evt.cy

			

			//setTimeout(function(){
				
				cy.on('click','node',function(e){
					self.handleClick(e.cyTarget.id());
				});

				cy.on('mouseover','node',function(e){
					var ele = e.cyTarget;

					//if(self.isUpgradable(ele)){

						cy.elements('node[id = "'+ele.id()+'"]').flashClass("rollover",1000)
					// } else {

					// }
				});

				self.container.style.display = "none"

			//},1000);
		},
		zoomingEnabled : false,
		panningEnabled : false
	})
}

Ether.Upgrade.prototype.init = function(){
	this.container.style.height = window.innerHeight;
}

Ether.Upgrade.prototype.handleClick = function(id){
	var a = id.split(".");
	var type = a[0];
	var tier = a[1];

	if(tier > this.tierCounter.type){
		this.tierCounter.type += tier;
	}
}

Ether.Upgrade.prototype.style = [
	{
		selector : 'node[id ^= "movement"]',
		css : {
			'background-color':'#47BDDE',
			'border-width' : '2',
			'border-color' : '#243F63',
			'shape' : "pentagon"
		}
	},{
		selector : 'node[id ^= "attraction"]',
		css : {
			'background-color':'#E0664A',
			'border-width' : '2',
			'border-color' : '#6B504A',
			'shape' : "heptagon"
		}
	},{
		selector : 'node[id ^= "resistance"]',
		css : {
			'background-color':'#CCD9B4',
			'border-width' : '2',
			'border-color' : '#858063',
			'shape' : 'rectangle'
		}
	},{
		selector : 'node[id ^= "balance"]',
		css : {
			'background-color':'#EDEDEB',
			'border-width' : '2',
			'border-color' : '#9E9E99',
			'shape' : 'triangle'
		}
	},{
		selector : 'edge',
		css : {
			"line-color" : "#D1E6E6",
			"width" : "3",
			//"curve-style" : "haystack",
			"haystack-radius" : "1",
			"target-arrow-color" : "#D1E6E6",
			"target-arrow-shape" : "triangle",
		}
	},{
		selector : '.rollover',
		css : {
			"text-outline-color" : "white",
			"text-outline-width" : "2",
			"color" : "black",
			"font-size" : "50",
			"font-family" : "Titillium Web",
			"text-halign" : "center",
			"content" : "hey yall"
		}
	}
];

Ether.Upgrade.prototype.nodes = [
		{
			group : "nodes",
			data : { id: "nparent" }
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

Ether.Upgrade.prototype.edges = [
		{
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



